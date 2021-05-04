namespace xhys{
    export class BattlePlayerData{
        public _playerData : PlayerData;
        //战斗实时属性
        public _atk : number;
        public _def : number;
        public _mdf : number;
        public _moveSpeed : number;

        public constructor(playerdata : PlayerData){
            this._playerData = playerdata;
            this.initAttrs();
        }

        public initAttrs(){
            this._atk = this._playerData._baseAtk;
            this._def = this._playerData._baseDef;
            this._mdf = this._playerData._baseMdf;
            this._moveSpeed = this._playerData._battleMoveSpeed;
        }
    }
}