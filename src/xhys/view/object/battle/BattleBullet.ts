namespace xhys{
    export class BattleBullet extends BattleObject {
        public _battleBulletData : BattleBulletData = null;
        public _createdByPlayer : number = -1;

        //事件
        public _routeData : RouteData;

        public constructor(){
            super();
            //this.addEventListener(egret.Event.REMOVED, this.release, this);
        }

        public setData(x : number, y : number, dx : number, dy : number,
            bulletdata : BulletData, sourcedata : any, createdByPlayer : boolean = false) : BattleBullet{
            //初始化战斗数据
            this._battleBulletData = new BattleBulletData(bulletdata, sourcedata);
            //this._speed = bulletdata._moveSpeed;
            //初始化事件
            this._routeData = this._battleBulletData._bulletData._route.bindObj(this);
            //判断是否由玩家生成
            if(createdByPlayer){
                this._createdByPlayer = BulletManager.instance._playerpool.push(this) - 1;
            }
            //初始化皮肤
            var skin;
            if(bulletdata._isMovieClip){
                this._usemc = true;
                var skinTexture = RES.getRes(bulletdata._battleSkin + "_png");
                var skindata = RES.getRes(bulletdata._battleSkin + "_json");
                //动画
                var mcDataFcatory = new egret.MovieClipDataFactory(skindata, skinTexture);
                this._mcskin =  new egret.MovieClip(mcDataFcatory.generateMovieClipData(bulletdata._battleSkin));
                
                this._mcskin.frameRate=3000;
                this._mcskin.play(-1);
                skin = this._mcskin;
            }else{
                this.skin = new egret.Bitmap(RES.getRes(bulletdata._battleSkin));
                skin = this.skin;
            }
            
            //this._skin.pixelHitTest = true;
            this.x = x;
            this.y = y;
            this.anchorOffsetX = skin.width / 2;
            this.anchorOffsetY = skin.height / 2;
            this.addChild(skin);

            this._dx = dx;
            this._dy = dy;

            return this;
        }

        public move() : boolean{
            if(this.visible == false)
                return false;
            //触发子弹事件
            this._routeData.addTimer();
            //var dir = this._battleBulletData.updateDirection(this._dx, this._dy);
            //this._dx = dir.dx;
            //this._dy = dir.dy;

            var result = super.move();
            //判断移动结束后是否碰到子弹
            var player = BattleScene.instance._battlePlayer;
            
            var px = this.anchorOffsetX + this.x + BattleData.side_left;
            var py = this.anchorOffsetY + this.y + BattleData.side_top;
            //判断是否碰到玩家子弹
            if(this._createdByPlayer == -1){
                var pool = BulletManager.instance._playerpool;
                for(var i = pool.length - 1; i >= 0; i--){
                    if(pool[i].skin.hitTestPoint(px, py, false)){
                        this.destroy();
                        return result;
                    }
                }

                if(!player.isDead && (this.hitTestPoint(player.x + player.anchorOffsetX + BattleData.side_left,
                    player.y + player.anchorOffsetY + BattleData.side_top, false) ||
                    player.skin.hitTestPoint(px, py, false))){
                    player.beHit(this._battleBulletData._damage, this._battleBulletData._bulletData._damageKind);
                    this.destroy();
                    return result;
                }
            }else{
                //是来自玩家子弹的情况判断是否碰到敌人
                var enemies = BattleScene.instance._battleEnemies;
                var epool = this._battleBulletData._damagedPool;
                for(var i = enemies.length - 1; i >= 0; i--){
                    var enemy = enemies[i];
                    //检查是否死亡与是否在池中
                    if(enemy.isDead)
                        continue;
                    //检查是否碰撞到
                    if(this.hitTestPoint(enemy.x + enemy.anchorOffsetX + BattleData.side_left,
                         enemy.y + enemy.anchorOffsetY + BattleData.side_top, false)){
                        var j : number;
                        for(j = epool.length - 1; j >=0; j--){
                            if(epool[j] == enemy.hashCode)
                                break;
                        }
                        if(j != -1)
                            continue;
                        enemy.beHit(this._battleBulletData._damage, this._battleBulletData._bulletData._damageKind);
                        //非持续伤害则将受伤目标加入已受伤池
                        if(!this._battleBulletData._bulletData._stDamage)
                            epool.push(enemy.hashCode);
                    }
                }
            }
            //碰壁则清除子弹
            if(result){
                this.destroy();
            }
            return result;
        }

        public touchedTop(obj : this) : boolean {
            return obj.y <= 0;//BattleData.side_top;
        }

        public touchedBottom(obj : this) : boolean {
            return obj.y >= 598;//BattleData.side_bottom;
        }

        public touchedLeft(obj : this) : boolean {
            return obj.x <= 0;//BattleData.side_left;
        }

        public touchedRight(obj : this) : boolean {
            return obj.x >= 680;//BattleData.side_right;
        }

        public destroy(){
            if(this.visible == false)
                return;
            //初始化战斗数据
            //this._battleBulletData = null;
            //动画
            this.removeChild(this.skin)
            if(this._usemc){
                this._mcskin.stop();
            }
            this.skin = null;
            this._usemc = false;
            if(this._createdByPlayer != -1){
                BulletManager.instance._playerpool.splice(this._createdByPlayer, 1);
            }
            this._createdByPlayer = -1;
            this.parent.removeChild(this);
            this.visible = false;
        }

        public release(){
        }

        public getData() : BattleBulletData{
            return this._battleBulletData;
        }
    }
}