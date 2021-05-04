namespace xhys{
    export class BattleObject extends BaseObject {

        public constructor(){
            super();
        }

        public touchedTop(obj : this) : boolean {
            return obj.y - obj.anchorOffsetY <= 0;//BattleData.side_top;
        }

        public touchedBottom(obj : this) : boolean {
            return obj.y + obj.anchorOffsetY >= 598;//BattleData.side_bottom;
        }

        public touchedLeft(obj : this) : boolean {
            return obj.x - obj.anchorOffsetX <= 0;//BattleData.side_left;
        }

        public touchedRight(obj : this) : boolean {
            return obj.x + obj.anchorOffsetX >= 680;//BattleData.side_right;
        }

        //返回是否触碰墙壁
        public move() : boolean{
            var obj = this;
            if(!obj){
                return false;
            }
            if(this._dx == 0 && this._dy == 0)
                return false;
            var sign : boolean = false;
            if(this._dx < 0 && this.touchedLeft(obj) || this._dx > 0 && this.touchedRight(obj)){
                sign = true;
            }else{
                obj.x += this._dx * this.getData()._moveSpeed;
            }
                
            if(this._dy < 0 && this.touchedTop(obj) || this._dy > 0 && this.touchedBottom(obj)){
                sign = true;
            }else{
                obj.y += this._dy * this.getData()._moveSpeed;
            }
            return sign;
        }

        public getData() : any{
            return { _moveSpeed: 0};
        }
    }
}