namespace xhys{
    export class BattleEnemy extends BattleObject {
        public _battleEnemyData : BattleEnemyData;
        //慢速移动
        public _moveSlow : boolean = false;
        //子弹计时器
        //public timer : egret.Timer;
        //事件
        public _routeData : RouteData;

        public hpbar : EnemyHpBar = new EnemyHpBar();

        public isDead : boolean = false;

        public constructor(enemydata : EnemyData){
            super();
            //初始化战斗数据
            this._battleEnemyData = new BattleEnemyData(enemydata);
            //初始化事件
            this._routeData = this._battleEnemyData._enemyData._route.bindObj(this);
            //初始化皮肤
            this.skin = new egret.Bitmap(RES.getRes(enemydata._battleSkin));
            //egret.log(enemydata._battleSkin);
            this.x = 680 / 2;
            this.y = 598 / 4;
            this.anchorOffsetX = this.skin.width / 2;
            this.anchorOffsetY = this.skin.height / 2;
            this.addChild(this.skin);
            //初始化血条
            var hpbar = this.hpbar;
            var hp = this._battleEnemyData._enemyData._hp;
            hpbar.value = hpbar.maximum = hp;
            hpbar.scaleX = 0.3;
            hpbar.scaleY = 0.2;
            hpbar.visible = false;
            hpbar.y = -this.anchorOffsetY;
            this.addChild(hpbar);
        }

        public move() : boolean{
            if(this.isDead)
                return;
            this._routeData.addTimer();
            var result = super.move();
            return result;
        }

        public beHit(damage : number, kind : DamageKind){
            switch (kind) {
                case DamageKind.physical:
                    damage -= this._battleEnemyData._def;
                    break;
                case DamageKind.magic:
                    damage -= this._battleEnemyData._mdf;
                    break;
                case DamageKind.truely:
                    break;
                default:
                    break;
            }
            if(damage > 0){
                this._battleEnemyData._enemyData._hp -= damage;
                this.hpbar.value -= damage;
                this.hpbar.visible = true;
                if(this._battleEnemyData._enemyData._hp <= 0){
                    this._battleEnemyData._enemyData._hp = 0;
                    this.die();
                }
                //刷新血条
                //BattleScene.instance.hpBar.value = this._battlePlayerData._playerData._hp;
            }
        }

        public die(){
            this.isDead = true;
            this.hpbar.visible = false;
            this.parent.removeChild(this);
            this.release();
        }

        public release(){
            this._routeData = null;
        }

        public getData() : BattleEnemyData{
            return this._battleEnemyData;
        }
    }
}