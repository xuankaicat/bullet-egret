namespace xhys{
    export class PlayerData{
        //战斗移动速度
        public _battleMoveSpeed : number;
        //战斗皮肤
        public _battleSkin : string;
        //当前生命值
        public _hp : number;
        //生命值上限
        public _maxHp : number;
        //基础攻击力
        public _baseAtk : number;
        //基础物理防御力
        public _baseDef : number;
        //基础魔法防御力
        public _baseMdf : number;
        //装备的技能
        public _skill1 : PlayerSkillData = null;
        public _skill2 : PlayerSkillData = null;
        public _skill3 : PlayerSkillData = null;
        public _skill4 : PlayerSkillData = null;

        public constructor(){
            this._battleMoveSpeed = 3;
            this._hp = this._maxHp = 100;
            this._baseAtk = this._baseDef = this._baseMdf = 10;
            this._battleSkin = "love_blue_png";
            this._skill1 = new PlayerSkillData(0);
            this._skill2 = new PlayerSkillData(1);
        }
    }
}