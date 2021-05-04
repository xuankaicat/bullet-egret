namespace xhys{
    export class BattleEnemyData{
        public _enemyData : EnemyData;
        //战斗实时属性
        public _atk : number;
        public _def : number;
        public _mdf : number;
        public _moveSpeed : number;

        public constructor(enemydata : EnemyData){
            this._enemyData = enemydata;
            this.initAttrs();
        }

        public initAttrs(){
            this._atk = this._enemyData._atk;
            this._def = this._enemyData._def;
            this._mdf = this._enemyData._mdf;
            this._moveSpeed = this._enemyData._moveSpeed;
        }
    }
}