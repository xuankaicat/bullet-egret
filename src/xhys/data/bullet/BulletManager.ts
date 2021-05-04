namespace xhys{
    export class BulletManager{
        private static _instance : BulletManager;

        public static get instance() : BulletManager {
            if(!BulletManager._instance)
                BulletManager._instance = new BulletManager();
            return BulletManager._instance;
        }

        public _waitpool : BattleBullet[] = [];
        public _pool : BattleBullet[] = [];
        public _playerpool : BattleBullet[] = [];

        public constructor(){
            for(var i = 0; i < 200; i++){
                this._waitpool.push(new BattleBullet());
            }
            //pool
        }

        public updateAll(){
            for(var i = this._pool.length - 1; i >= 0; i--){
                if(this._pool[i].visible == true){
                    this._pool[i].move();
                }else{
                    this._waitpool.push(this._pool[i]);
                    this._pool.splice(i, 1);
                }
            }
            /*
            this._pool.forEach(bullet => {
                if(bullet.visible == true){
                    bullet.move();
                }else{
                    this._waitpool.push(bullet);
                }
            });
            */
        }

        public getBullet() : BattleBullet{
            /*
            for(var i = this._pool.length - 1; i >= 0; i--){
                var bullet = this._pool[i];
                if(!bullet.visible){
                    return bullet;
                }
            }
            */
            var newobj : BattleBullet = null;
            if(!(newobj = this._waitpool.shift())){
                newobj = new BattleBullet();
            }
            this._pool.push(newobj);
            return newobj;
        }
    }
}