namespace xhys{
    export class SkillOperate extends egret.Sprite{
        private skill1_png : egret.Bitmap;
        private skill2_png : egret.Bitmap;
        private skill3_png : egret.Bitmap;
        private skill4_png : egret.Bitmap;

        private skill_key_png : egret.Bitmap;

        public skill_cold : number[] = [0, 0, 0, 0];
        public skill_cold_png : egret.Bitmap[] = [];
        public skill_cold_label : eui.Label[] = [];
        public skill_cold_timer : egret.Timer;

        public operaObj : BattlePlayer;

        public constructor(operaobj : BattlePlayer){
            super();
            this.operaObj = operaobj;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(){
            this.x = 927;
            this.y = 376;
            //this.graphics.beginFill(0x00ff00, 0);
            //this.graphics.drawRect(0, 0, 194, 256)
            //this.graphics.endFill();
            //this.touchEnabled = true;
            this.touchChildren = true;

            var cold_png = RES.getRes("skill_cold_png");
            for(var i = 0; i < 3; i++){
                this.skill_cold_png.push(new egret.Bitmap(cold_png));
                this.skill_cold_label.push(new eui.Label);
            }
            this.skill_cold_png.push(new egret.Bitmap(RES.getRes("skill_cold_2_png")));
            this.skill_cold_label.push(new eui.Label);

            var data = this.operaObj._battlePlayerData._playerData;
            if(data._skill1){
                this.skill1_png = new egret.Bitmap(RES.getRes(data._skill1._skin));
                this.skill_cold[0] = data._skill1._coldTime;
                this.addTouchEvent(this.skill1_png, data._skill1, 0);
                this.skill1_png.touchEnabled = true;
            }
            else
                this.skill1_png = new egret.Bitmap(RES.getRes("skill_empty_1_png"));

            if(data._skill2){
                this.skill2_png = new egret.Bitmap(RES.getRes(data._skill2._skin));
                this.skill_cold[1] = data._skill2._coldTime;
                this.addTouchEvent(this.skill2_png, data._skill2, 1);
                this.skill2_png.touchEnabled = true;
            }
            else
                this.skill2_png = new egret.Bitmap(RES.getRes("skill_empty_2_png"));

            if(data._skill3){
                this.skill3_png = new egret.Bitmap(RES.getRes(data._skill3._skin));
                this.skill_cold[2] = data._skill3._coldTime;
                this.addTouchEvent(this.skill3_png, data._skill3, 2);
                this.skill3_png.touchEnabled = true;
            }
            else
                this.skill3_png = new egret.Bitmap(RES.getRes("skill_empty_3_png"));

            if(data._skill4){
                this.skill4_png = new egret.Bitmap(RES.getRes(data._skill4._skin));
                this.skill_cold[3] = data._skill4._coldTime;
                this.addTouchEvent(this.skill4_png, data._skill4, 3);
                this.skill4_png.touchEnabled = true;
            } 
            else
                this.skill4_png = new egret.Bitmap(RES.getRes("skill_empty_4_png"));

            this.skill_cold_png[0].x = this.skill1_png.x = 53.5;
            this.skill_cold_png[0].y = this.skill1_png.y = 170.5;
            this.skill_cold_label[0].x = 53.5 - 15;
            this.skill_cold_label[0].y = 170.5 + 42.5 - 15;
            this.skill_cold_label[0].width = 90;
            this.skill_cold_label[0].textAlign = egret.HorizontalAlign.CENTER;
            this.skill_cold_label[0].anchorOffsetX = 30;
            this.addChild(this.skill1_png);

            this.skill_cold_png[1].y = this.skill2_png.y = 105;
            this.skill_cold_label[1].x = 42.5 - 15;
            this.skill_cold_label[1].y = 105 + 42.5 - 15;
            this.skill_cold_label[1].width = 90;
            this.skill_cold_label[1].textAlign = egret.HorizontalAlign.CENTER;
            this.skill_cold_label[1].anchorOffsetX = 30;
            this.addChild(this.skill2_png);

            this.skill_cold_png[2].x = this.skill3_png.x = 109;
            this.skill_cold_png[2].y = this.skill3_png.y = 105;
            this.skill_cold_label[2].x = 109 + 42.5 - 15;
            this.skill_cold_label[2].y = 105 + 42.5 - 15;
            this.skill_cold_label[2].width = 90;
            this.skill_cold_label[2].textAlign = egret.HorizontalAlign.CENTER;
            this.skill_cold_label[2].anchorOffsetX = 30;
            this.addChild(this.skill3_png);

            this.skill_cold_png[3].x = this.skill4_png.x = 36;
            this.skill_cold_label[3].x = 81;//96;
            this.skill_cold_label[3].y = 60 - 15;
            this.skill_cold_label[3].width = 90;
            this.skill_cold_label[3].textAlign = egret.HorizontalAlign.CENTER;
            this.skill_cold_label[3].anchorOffsetX = 30;
            this.addChild(this.skill4_png);

            this.skill_key_png = new egret.Bitmap(RES.getRes("skill_key_png"));
            this.addChild(this.skill_key_png);

            for(var i = 0; i < 3; i++)
                this.addColdTimeSkin(i);

            var timer = this.skill_cold_timer = new egret.Timer(1000, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.reduceSkillColdTime, this);
            timer.start();
            
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private addTouchEvent(obj : egret.Bitmap, skill : PlayerSkillData, id : number){
            var player = BattleScene.instance._battlePlayer;
            if(skill._touchEvent != null){
                obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, skill._touchEvent, obj);
                player.skillKeyDownEvent[id] = skill._touchEvent;
            }
            if(skill._releaseEvent != null){
                obj.addEventListener(egret.TouchEvent.TOUCH_END, skill._releaseEvent, obj);
                player.skillKeyUpEvent[id] = skill._releaseEvent;
            }
        }

        public removeTouchEvent(obj : egret.Bitmap, skill : PlayerSkillData){
            if(!skill)
                return;
            if(skill._touchEvent != null){
                obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, skill._touchEvent, obj);
            }
            if(skill._releaseEvent != null){
                obj.removeEventListener(egret.TouchEvent.TOUCH_END, skill._releaseEvent, obj);
            }
        }

        public release(){
            var data = this.operaObj._battlePlayerData._playerData;
            this.removeTouchEvent(this.skill1_png, data._skill1);
            this.removeTouchEvent(this.skill2_png, data._skill2);
            this.removeTouchEvent(this.skill3_png, data._skill3);
            this.removeTouchEvent(this.skill4_png, data._skill4);
            this.removeChildren();
        }

        public addColdTimeSkin(i : number){
            var coldTime = this.skill_cold[i];
            if(coldTime > 0){
                this.skill_cold_label[i].text = coldTime.toString();
                this.addChild(this.skill_cold_png[i]);
                this.addChild(this.skill_cold_label[i]);
            }
        }

        public reduceSkillColdTime(){
            for(var i = 0; i < 4; i++){
                if(this.skill_cold[i] > 0){
                    this.skill_cold[i]--;
                    this.skill_cold_label[i].text = this.skill_cold[i].toString();
                }
                if(this.skill_cold_png[i].parent != null && this.skill_cold[i] <= 0){
                    this.removeChild(this.skill_cold_png[i]);
                    this.removeChild(this.skill_cold_label[i]);
                }
            }
        }
    }
}