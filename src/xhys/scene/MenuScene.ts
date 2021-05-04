/*
 * @description: 
 * @version: 
 * @Author: xuankai
 * @Date: 2021-03-08 13:52:43
 * @LastEditors: xuankai
 * @LastEditTime: 2021-05-04 22:19:36
 */
namespace xhys{
    export class MenuScene extends ComponentController {
        private static _instance : MenuScene;

        public static get instance() : MenuScene {
            if(!MenuScene._instance)
                return MenuScene._instance = new MenuScene();
            return MenuScene._instance;
        }

        public carousel : Carousel = new Carousel();

        public stageBoard : egret.Sprite = new egret.Sprite();
        public stageCoverGroup : StageCover[] = [];
        public stageBg:eui.Rect;

        private stageDataGroup : StageData[] = []

        public constructor(){
            super();
            this.skinName = "resource/eui_skins/scene/MenuSceneSkin.exml";

            this.initStageDataGroup();

            var start_x = 78;
            var add_x = 165;
            var start_y = 97;
            var add_y = 152;

            var coverGroup = this.stageCoverGroup;
            var newCover : StageCover;
            for(var j = 0; j < 3; j++){
                for(var i = 0; i < 6; i++){
                    newCover = new StageCover();
                    newCover.setData("name", (j*6+i+1).toString(), RES.getRes("cm_png"));
                    newCover.x = start_x + add_x * i;
                    newCover.y = start_y + add_y * j;
                    coverGroup.push(newCover);
                }
            }

            this.stageBg.addEventListener(egret.TouchEvent.TOUCH_END, this.closeStageGroup, this);
        }

        public createView(){
            var carousel = this.carousel;
            carousel.createView();
            this.addChildAt(carousel, 0);

            var stageBoard = this.stageBoard;

            this.stageCoverGroup.forEach(s => {
                stageBoard.addChild(s);
            });
            stageBoard.visible = false;
            stageBoard.alpha = 0;
            this.addChild(stageBoard);
        }

        private initStageDataGroup(){
            var carousel =  this.carousel;
            carousel.imageTouchEvent = MenuScene.onCarouselImgTouched;
            var images = carousel.images;

            var stageDataGroup = this.stageDataGroup;
            var registered = StageData.StageDataGroups;
            registered.forEach(data => {
                var n = stageDataGroup.push(StageDataParse.parse(RES.getRes(data+"_json"))) - 1;
                images.push(stageDataGroup[n]._cover);
            });
        }

        public openStageGroup(){
            //设置Cover
            var carousel = this.carousel;
            var coverGroup = this.stageCoverGroup;
            var stageDataGroup = this.stageDataGroup;
            var index = carousel.index;
            for(var i = 0; i < 18; i++){
                var level = stageDataGroup[index].levels[i];
                coverGroup[i].setData(level._name, null, level._cover, level._battleDataName);
            }
            //动画
            var stageBg = this.stageBg;
            stageBg.visible = true;
            egret.Tween.get(stageBg).to({
                'fillAlpha': 0.5
            }, 300);
            var stageBoard = this.stageBoard
            stageBoard.visible = true;
            egret.Tween.get(stageBoard).to({
                'alpha': 1
            }, 500);
        }

        public closeStageGroup(){
            var stageBg = this.stageBg;
            egret.Tween.get(stageBg).to({
                'fillAlpha': 0
            }, 500).call(()=>{stageBg.visible = false;});;
            var stageBoard = this.stageBoard
            egret.Tween.get(stageBoard).to({
                'alpha': 0
            }, 300).call(()=>{stageBoard.visible = false;});
        }

        public static onCarouselImgTouched(index : number){
            var ins = MenuScene.instance;
            
            ins.openStageGroup();
        }        

        public release(){
            this.stageBg.removeEventListener(egret.TouchEvent.TOUCH_END, this.closeStageGroup, this);
        }
    }
}