namespace xhys{

    export class PlayerSkillData extends SkillData {
        public _skin : string;
        public _coldTime : number = 0;
        public _type : SkillKind = SkillKind.touchKey;
        public _touchEvent : (arg0? : number)=> void = null;
        public _releaseEvent : (arg0? : number)=> void = null;

        public constructor(id : number){
            super();
            switch(id){
            case 0:
                this._skin = "skill_1_moveslow_png"
                this._touchEvent = function(){
                    BattleScene.instance._battlePlayer._moveSlow = true;
                    //egret.log("touched skill0");
                };
                this._releaseEvent = function(){
                    BattleScene.instance._battlePlayer._moveSlow = false;
                };
                break;
            case 1:
                this._skin = "skill_2_sword_1_png"
                this._type = SkillKind.bulletCreator;
                this._bullet = BulletDataParse.parse(RES.getRes("sword_1_json"));
                var coldTime = this._coldTime = 10;
                var bullet = this._bullet;
                this._releaseEvent = function(){
                    if(BattleScene.instance._skillOperate.skill_cold[1] > 0)
                        return;
                    var player = BattleScene.instance._battlePlayer;
                    var dx = player._dx;
                    var dy = player._dy;
                    if(dx == 0 && dy == 0){
                        dx = player._last_dx;
                        dy = player._last_dy;
                        if(dx == 0 && dy == 0)
                            return;
                    }
                    var newobj = BulletManager.instance.getBullet().setData(
                        player.x + player.anchorOffsetX, player.y + player.anchorOffsetY,
                         dx, dy, bullet, player._battlePlayerData, true);
                    newobj.rotation = SkillData.getAngle(dx, dy)*180 / Math.PI - 45;
                    newobj.visible = true;
                    BattleScene.instance._bulletBoard.addChild(newobj);

                    BattleScene.instance._skillOperate.skill_cold[1] = coldTime;
                    BattleScene.instance._skillOperate.addColdTimeSkin(1);
                };
                break;
            default:
                break;
            }
        }
    }
}