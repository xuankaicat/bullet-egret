namespace xhys{
    export class BattleBulletData{
        public _bulletData : BulletData;
        public _moveSpeed : number = 0;
        public _damage : number = 0;

        public _source : any = null;

        public _damagedPool : number[] = [];
        //public updateDirection : (dx : number, dy : number) => {dx: number, dy: number} =
        //(dx : number, dy : number) => {return {dx, dy}};

        /*
        *bulletdata 子弹数据
        *source 子弹来源
        */
        public constructor(bulletdata : BulletData, source : any = null){
            this._bulletData = bulletdata;
            this._source = source;
            this.initAttrs();
        }

        public initAttrs(){
            this._moveSpeed = this._bulletData._moveSpeed;
            this._damage = this._bulletData._baseDamage;
            if(this._source)
                this._damage += this._bulletData._multiple * this._source._atk;
        }
    }
}