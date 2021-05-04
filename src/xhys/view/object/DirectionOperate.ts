namespace xhys{
    export class DirectionOperate extends egret.Sprite{
        private operation_png : egret.Bitmap;
        private operationPath_png : egret.Bitmap;
        public operaObj : BattlePlayer;

        public constructor(){
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event : egret.Event){
            this.x = 0;
            this.y = 0;
            this.graphics.beginFill(0x00ff00, 0);
            //this.graphics.drawCircle(0, 0, 89);
            this.graphics.drawRect(0, 0, 640, 640);
            this.graphics.endFill();
            this.touchEnabled = true;
            //112 476
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            this.operation_png = new egret.Bitmap(RES.getRes("operation_png"));
            this.addChild(this.operation_png);
            this.operation_png.x = 23;
            this.operation_png.y = 385;
            this.operationPath_png = new egret.Bitmap(RES.getRes("operation_path_png"));
            //this.operationPath_png.anchorOffsetX = this.operationPath_png.anchorOffsetY = this.operationPath_png.width / 2;
            this.operationPath_png.x = this.operation_png.x + 90;
            this.operationPath_png.y = this.operation_png.y + 90;
            this.addChild(this.operationPath_png);
            this.operationPath_png.alpha = 0; 

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private _start = new egret.Point(112, 476);

        private onTouchBegin(event: egret.TouchEvent){
            this.operationPath_png.alpha = 1;
            this.operationMove(event);
            egret.ticker.$startTick(this.onMove, this);
        }

        private onTouch(event : egret.TouchEvent){
            this.operationMove(event);
        }

        private onTouchEnd(event : egret.TouchEvent){
            this.operationPath_png.alpha = 0;
            this.operaObj._dx = this.operaObj._dy = 0;
            egret.ticker.$stopTick(this.onMove, this);
        }

        private operationMove(event : egret.TouchEvent){
            var _end = new egret.Point(event.stageX, event.stageY);
            var rotation = this.getAngleByUI(this._start, _end);
            this.rotationMove = rotation;
            this.operationPath_png.rotation = rotation*180 / Math.PI - 45;
        }

        private getAngleByUI(_start : egret.Point, _end : egret.Point) : number{
            var point = new egret.Point(_end.x - _start.x, _end.y - _start.y);
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

        private rotationMove : number;
        private isSpeedUp : boolean;

        private onMove(timeStamp : number) : boolean{
            this.operaObj._dx = Math.cos(this.rotationMove);
            this.operaObj._dy = Math.sin(this.rotationMove)
            return true;
        }
    }
}