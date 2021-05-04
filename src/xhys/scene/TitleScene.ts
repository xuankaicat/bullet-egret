namespace xhys{
    export class TitleScene extends ComponentController {
        public btn_start:eui.Button;

        public constructor(){
            super();
            this.skinName = "resource/eui_skins/scene/TitleSceneSkin.exml";
            this.createView();
        }

        private createView(){
            this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_start, this);
        }

        private onClick_start(){
            SceneView.instance.menu();
        }

        public release(){
        }
    }
}

