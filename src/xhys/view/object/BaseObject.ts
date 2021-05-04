namespace xhys{
    export class BaseObject extends egret.Sprite {
        //皮肤
        public _usemc : boolean = false;
        //public _skin : egret.Bitmap = null;
        
        private _skin : egret.Bitmap;
        public get skin() : egret.Bitmap|egret.MovieClip {
            if(this._usemc){
                return this._mcskin;
            }
            return this._skin;
        }
        public set skin(v : egret.Bitmap|egret.MovieClip) {
            if(this._usemc){
                this._mcskin = <egret.MovieClip>v;
                return;
            }
            this._skin = <egret.Bitmap>v;
        }
        
        public _mcskin : egret.MovieClip = null;
        //移动方向
        public _dx : number = 0;
        public _dy : number = 0;

        public constructor(){
            super();
        }
/*
        public move(){
            if(this._dx == 0 && this._dy == 0)
                return;
            this.x += this._dx * this._speed;
            this.y += this._dy * this._speed;
        }
*/
    }
}