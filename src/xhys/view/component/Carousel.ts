namespace xhys{
    export class Carousel extends ComponentController {
        public showList : eui.Image[] = [];
        public showIndex : number = 2;

        public showDeltaX : number = 0;
        public showMoveTimer : egret.Timer = new egret.Timer(20, 0);
        public tryUpdateImg : boolean = false;

        public images : egret.Texture[] = [];
        //起始
        public index : number = 0;

        public imageTouchEvent : (index? : number)=> void = null;

        public constructor(){
            super();
            this.skinName = "resource/eui_skins/component/CarouselSkin.exml";

            this.y = 80;
            this.width = 1136;
            this.height = 480;

            var startX = -1984;//-1240
            var addX = 744;//248 * 3
            var startY = 0;
            var showList = this.showList;
            for(var i = 0; i < 7; i++){
                var img = new eui.Image;
                img.width = 640;
                img.height = 480;
                img.x = startX + addX * i;
                img.y = startY;
                showList.push(img);
            }

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            this.showMoveTimer.addEventListener(egret.TimerEvent.TIMER, this.showMoveUpdate, this);
        }

        public createView(){
            this.updateShownImage();
            this.showList.forEach(image => {
                this.addChild(image);
            });
        }

        private showMoveUpdate(){
            var showDeltaX = this.showDeltaX;
            if(showDeltaX == 0)
                return;
            var showList = this.showList;
            if(Math.abs(showDeltaX) < 10){
                showList.forEach(img => {
                    this.addShowImageX(img, -showDeltaX);
                });
                this.showDeltaX = 0;
            }else{
                var addValue = showDeltaX > 0 ? -10 : 10;
                showList.forEach(img => {
                    this.addShowImageX(img, addValue);
                });
                this.showDeltaX += addValue;
            }
            if(this.tryUpdateImg){
                this.updateShownImage();
                this.tryUpdateImg = false;
            }
        }

        private addshowImageIndex(value : number){
            var newIndex = this.showIndex += value;
            this.index += value;
            var showDeltaX = this.showDeltaX;
            //只考虑了输入为正负1的情况
            if(value < 0)
                this.showDeltaX = showDeltaX - 744;
            else
                this.showDeltaX = 744 + showDeltaX;
            if(newIndex > 7)
                this.showIndex -= 7;
            else if(newIndex < 0)
                this.showIndex += 7;
            this.tryUpdateImg = true;
        }

        private addShowImageX(img : eui.Image, value : number){
            img.x += value;
            if(img.x > 2480){//1736 + 744
                img.x -= 4464;//2976
            }else if(img.x < -1984){//-1240 - 744
                img.x += 4464;
            }
        }

        private pStart : egret.Point = new egret.Point();
        private pEnd : egret.Point = new egret.Point();
        private endSign : boolean = true;
        private onTouchBegin(event: egret.TouchEvent){
            this.showMoveTimer.stop();
            this.endSign = false;
            var stageX = event.stageX;
            var stageY = event.stageY;
            var ps = this.pStart;
            var pe = this.pEnd;
            pe.x = ps.x = stageX;
            pe.y = ps.y = stageY;
        }

        private onTouch(event: egret.TouchEvent){
            if(this.endSign)
                return;
            var pStart = this.pStart;
            var pEnd = this.pEnd;
            //更新pEnd
            pEnd.x = event.stageX;
            pEnd.y = event.stageY;
            //移动图片
            var offsetX = pEnd.x - pStart.x;
            var showList = this.showList;
            var showDeltaX = this.showDeltaX;
            showList.forEach(img => {
                //img.x += offsetX - showDeltaX;
                this.addShowImageX(img, offsetX - showDeltaX);
            });
            this.showDeltaX = offsetX;
        }

        private onTouchEnd(event: egret.TouchEvent){
            this.endSign = true;
            var pStart = this.pStart;
            var pEnd = this.pEnd;
            var distance = egret.Point.distance(pStart, pEnd);
            if(distance < 15){
                //触发点击事件
                if(pStart.x < 992 && pStart.x > 144){
                    this.imageTouchEvent(this.index);
                }
            }else if(distance < 150){
                //判断是否点在左右两边
                if(pStart.x >= 992){
                    if(this.index + 1 < this.images.length)
                        this.addshowImageIndex(1);
                }else if(pStart.x <= 144){
                    if(this.index - 1 >= 0)
                        this.addshowImageIndex(-1);
                }
            }else if(pStart.x > pEnd.x){
                //向左拖动，往右移
                if(this.index + 1 < this.images.length)
                    this.addshowImageIndex(1);
            }else{
                //向右拖动，往左移
                if(this.index - 1 >= 0)
                    this.addshowImageIndex(-1);
            }
            
            this.showMoveTimer.start();
        }

        private updateShownImage(){
            const colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            const colorFlilter = new egret.ColorMatrixFilter(colorMatrix);

            var index = this.index;
            var showList = this.showList;
            var images = this.images;
            var length = images.length;
            var show = this.showIndex - 2;
            if(show < 0)
                show += 7;
            for(var i = -3; i <= 3; i++, show++){
                if(show == 7)
                    show = 0;
                //showList[show].visible = !(i == -2 || i == 2);
                if(index + i >= 0 && index + i < length){
                    showList[show].source = images[index + i];
                    if(i == 0){
                        showList[show].filters = null;
                    }else{
                        showList[show].filters = [colorFlilter];
                    }
                }else{
                    showList[show].source = null;
                }
            }
        }

        public release(){
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            this.showMoveTimer.removeEventListener(egret.TimerEvent.TIMER, this.showMoveUpdate, this);
        }
    }
}