namespace xhys{
    export class ComponentController extends eui.Component implements eui.UIComponent{
        public constructor(){
            super();
        }

        public Destroy(ele : egret.DisplayObject){
            if(ele)
                this.removeChild(ele);
        }
    }
}