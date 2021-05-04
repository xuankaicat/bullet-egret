/*
 * @description: 
 * @version: 
 * @Author: xuankai
 * @Date: 2021-02-19 00:32:47
 * @LastEditors: xuankai
 * @LastEditTime: 2021-05-04 22:23:33
 */
namespace xhys{
    export class SceneView extends egret.Sprite{
        private static _instance : SceneView;

        public static get instance() : SceneView {
            if(!SceneView._instance)
                SceneView._instance = new SceneView();
            return SceneView._instance;
        }

        private thisContainer:egret.Sprite;
        private activePage:any;

        constructor(){
            super();
            this.thisContainer = new egret.Sprite();

            this.graphics.beginFill(0x000000);
            this.graphics.drawRect(this.x,this.y, this.width, this.height);
            this.graphics.endFill();

            this.addChild(this.thisContainer);
            this.title();
        }

        public title(){
            this.removeAll();
            this.activePage = new TitleScene();
            this.thisContainer.addChild(this.activePage);
        }

        public battle(battleDataName: string){
            this.removeAll();
            var scene = BattleScene.instance;
            scene.createView(BattleDataParse.parse(RES.getRes(battleDataName)));
            this.activePage = scene;
            this.thisContainer.addChild(this.activePage);
        }

        public menu(){
            this.removeAll();
            var scene = MenuScene.instance;
            scene.createView();
            this.activePage = scene;
            this.thisContainer.addChild(this.activePage);
        }

        private removeAll()
        {
           // if(this.activePage && this.activePage.release){
                //this.activePage.release();
                this.activePage = null;
            //}
            this.thisContainer.removeChildren();
        }
    }
}