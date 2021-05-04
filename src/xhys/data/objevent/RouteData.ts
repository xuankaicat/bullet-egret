namespace xhys{
    export class RouteData{
        //事件队列
        public queue : RouteEvent[] = [];
        //当前生存时间
        public timer = 0;
        //单位本体
        public obj : BattleBullet|BattleEnemy|BattlePlayer = null;

        public constructor(){

        }

        public bindObj(obj : BattleBullet|BattleEnemy) : RouteData{
            var res = new RouteData();
            res.obj = obj;
            var queue = this.queue;
            for(var i = queue.length - 1; i >=0; i--){
                res.queue.unshift(queue[i]);
            }
            return res;
        }

        public addTimer(){
            if(this.queue.length == 0){
                return;
            }
            this.timer++;
            var queue = this.queue;
            var i = 0;
            var max = queue.length;
            while(i < max && this.timer >= queue[i].time){
                if(queue[i].time == -1 && !queue[i].triggerOrder()){
                    i++;
                    continue;
                }
                this.doRouteEvent(queue[i]);
                //无限重复
                if(queue[i].repeat == -1){
                    i++;
                    continue;
                }
                queue[i].triggerEvent.repeat--;
                if(queue[i].triggerEvent.repeat > 0){
                    i++;
                    continue;
                }
                queue.splice(i, 1);
                max -= 1;
                if(queue.length == 0)
                    this.timer = 0;
            }
        }

        private doRouteEvent(that : RouteEvent){
            var e = that.triggerEvent;
            var ex = e.ex;
            var obj = this.obj;
            var data = obj.getData();
            var player = BattleScene.instance._battlePlayer;
            switch(that.id){
            case 0:
                break;
            case 1://设置dx dy(可加参)
                obj._dx = eval(e.dx);
                obj._dy = eval(e.dy);
                break;
            case 2://根据角度设置dx, dy
                obj._dx = Math.cos(e.angle * Math.PI / 180);
                obj._dy = Math.sin(e.angle * Math.PI / 180);
                break;
            case 3://根据角度(可加参)设置dx, dy
                obj._dx = Math.cos(eval(e.angle) * Math.PI / 180);
                obj._dy = Math.sin(eval(e.angle) * Math.PI / 180);
                break;
            case 4://设置路径点
                var x = eval(e.x);
                var y = eval(e.y);
                var angle = RouteData.getAngle(x - obj.x, y - obj.y);
                obj._dx = Math.cos(angle);
                obj._dy = Math.sin(angle);
                var newevent = new RouteEvent;
                newevent.time = -1;
                newevent.id = 1;
                var dn = data._moveSpeed * 5;
                newevent.triggerOrder = function(){
                    if(obj.x >= x - dn && obj.x <= x + dn
                        && obj.y >= y - dn && obj.y <= y + dn){
                        return true;
                    }
                    return false;
                }
                newevent.triggerEvent = {
                    dx: "0",
                    dy: "0"
                }
                newevent.repeat = 1;
                this.queue.splice(1, 0, newevent)
                break;
            case 5://设置speed
                data._moveSpeed = e.speed;
                break;
            case 6://设置speed(可加参)
                data._moveSpeed = eval(e.speed);
                break;
            case 7://设置x y
                obj.x = e.x;
                obj.y = e.y;
                break;
            case 10://生成子弹
                var newbullet = e.bullet;
                var x = eval(e.x);
                var y = eval(e.y);
                var dx = <number>eval(e.dx);
                var dy = <number>eval(e.dy);
                var bulletobj = BulletManager.instance.getBullet().setData(
                    x, y, dx, dy, newbullet, data);
                bulletobj.visible = true;
                BattleScene.instance._bulletBoard.addChild(bulletobj);
                break;
            case 11://根据角度生成子弹(可加参)
                var newbullet = e.bullet;
                var x = eval(e.x);
                var y = eval(e.y);
                var dx = Math.cos(eval(e.angle) * Math.PI / 180);
                var dy = Math.sin(eval(e.angle) * Math.PI / 180);
                var bulletobj = BulletManager.instance.getBullet().setData(
                    x, y, dx, dy, newbullet, data);
                bulletobj.visible = true;
                BattleScene.instance._bulletBoard.addChild(bulletobj);
                break;
            case 100:
            default:
                break;
            }
            if(e.callback != undefined)
                eval("new function(){" + e.callback + "}");
        }

        protected static getAngle(dx : number, dy : number) : number{
            var point = new egret.Point(dx, dy);
            if(point.x == 0 && point.y > 0){
                return Math.PI * 0.5;
            }else if(point.x == 0 && point.y < 0){
                return Math.PI * 1.5;
            }else if(point.x > 0 && point.y >= 0){
                return Math.atan(point.y / point.x);
            }else if(point.x < 0 && point.y >= 0){
                return Math.atan(Math.abs(point.x / point.y)) + Math.PI * 0.5;
            }else if(point.x > 0 && point.y < 0){
                return Math.atan(point.y / point.x);
            }else if(point.x < 0 && point.y < 0){
                return Math.atan(Math.abs(point.y / point.x)) + Math.PI;
            }
            return 0;
        }
    }
}