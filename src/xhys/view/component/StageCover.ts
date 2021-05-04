/*
 * @description: 
 * @version: 
 * @Author: xuankai
 * @Date: 2021-05-04 17:52:31
 * @LastEditors: xuankai
 * @LastEditTime: 2021-05-04 19:00:28
 */
namespace xhys{
    export class StageCover extends ComponentController {
        public stageName:eui.Label;
        public stageId:eui.Label;
        public mainImage:eui.Image;
        public frame:eui.Image;

        public constructor(){
            super();
            this.skinName = "resource/eui_skins/component/StageCoverSkin.exml";

            this.addEventListener(egret.TouchEvent.TOUCH_END, this.stageSelected, this);
        }

        /**
         * stageSelected
         */
        public stageSelected() {
            egret.log(this.stageName.text+"被选择了");
        }

        /**
         * setData
         */
        public setData(stageName: string,stageId: string = null, mainImage: egret.Texture = null) {
            if(stageId != null){
                this.stageId.text = stageId;
            }
            if(stageName != null){
                this.stageName.text = stageName;
            }
            if(mainImage != null){
                this.mainImage.source = mainImage;
            }
        }

        /**
         * setFrame
         */
        public setFrame(type: StageCoverFrameEnum) {
            const frame_silver: egret.Texture = RES.getRes("cm_silver_png");
            const frame_yellow: egret.Texture = RES.getRes("cm_yellow_png");
            const frame_color: egret.Texture = RES.getRes("cm_color_png");

            switch (type) {
                case StageCoverFrameEnum.silver:
                    this.frame.source = frame_silver;
                    break;
                case StageCoverFrameEnum.yellow:
                    this.frame.source = frame_yellow;
                    break;
                case StageCoverFrameEnum.color:
                    this.frame.source = frame_color;
                    break;
                case StageCoverFrameEnum.none:
                default:
                    this.frame.source = null;
                    break;
            }
        }
    }
}