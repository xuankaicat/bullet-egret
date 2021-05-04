namespace xhys{
    export class BattlePlayer extends BattleObject {
        public _battlePlayerData : BattlePlayerData;
        //慢速移动
        public _moveSlow : boolean = false;

        public isDead : Boolean = false;

        public skillKeyDownEvent : (()=> void)[] = [null, null, null, null];
        public skillKeyUpEvent : (()=> void)[] = [null, null, null, null];

        public _last_dx : number = 0;
        public _last_dy : number = 0;

        public constructor(playerdata : PlayerData){
            super();
            //初始化战斗数据
            this._battlePlayerData = new BattlePlayerData(playerdata);
            //初始化皮肤
            this.skin = new egret.Bitmap(RES.getRes(playerdata._battleSkin));
            this.x = 680 / 2;
            this.y = 598 - 100;
            this.anchorOffsetX = this.skin.width / 2;
            this.anchorOffsetY = this.skin.height / 2;
            //egret.log(this.skin.anchorOffsetX);
            this.addChild(this.skin);

            //键盘控制
            var that = this;
            var battleKeyDownEvent = function(event : any) {
                switch (event.key) {
                    case "ArrowUp":
                        that._dy = -1;
                        break;
                    case "ArrowDown":
                        that._dy = 1;
                        break;
                    case "ArrowLeft":
                        that._dx = -1;
                        break;
                    case "ArrowRight":
                        that._dx = 1;
                        break;
                    case "Shift":
                        if(that.skillKeyDownEvent[0])
                            that.skillKeyDownEvent[0]();
                        break;
                    case "Z":
                    case "z":
                        if(that.skillKeyDownEvent[1])
                            that.skillKeyDownEvent[1]();
                        break;
                    case "X":
                    case "x":
                        if(that.skillKeyDownEvent[2])
                            that.skillKeyDownEvent[2]();
                        break;
                    case "C":
                    case "c":
                        if(that.skillKeyDownEvent[3])
                            that.skillKeyDownEvent[3]();
                        break;
                    default:
                        egret.log(event.key);
                        break;
                }
            }
    
            var battleKeyUpEvent = function(event : any){
                switch (event.key) {
                    case "ArrowUp":
                        if(that._dy == -1)
                        that._dy = 0;
                        break;
                    case "ArrowDown":
                        if(that._dy == 1)
                            that._dy = 0;
                        break;
                    case "ArrowLeft":
                        if(that._dx == -1)
                            that._dx = 0;
                        break;
                    case "ArrowRight":
                        if(that._dx == 1)
                            that._dx = 0;
                        break;
                    case "Shift":
                        if(that.skillKeyUpEvent[0])
                            that.skillKeyUpEvent[0]();
                        break;
                    case "Z":
                    case "z":
                        if(that.skillKeyUpEvent[1])
                            that.skillKeyUpEvent[1]();
                        break;
                    case "X":
                    case "x":
                        if(that.skillKeyUpEvent[2])
                            that.skillKeyUpEvent[2]();
                        break;
                    case "C":
                    case "c":
                        if(that.skillKeyUpEvent[3])
                            that.skillKeyUpEvent[3]();
                        break;
                    default:
                        break;
                }
            }
            this.battleKeyDownEvent = battleKeyDownEvent;
            this.battleKeyUpEvent = battleKeyUpEvent;
            document.addEventListener("keydown", battleKeyDownEvent);
            document.addEventListener("keyup", battleKeyUpEvent);
            //
            //this.addEventListener(egret.Event.REMOVED, this.release, this);
        }

        private battleKeyDownEvent : any;
        private battleKeyUpEvent : any;
        public release(){
            this._moveSlow = false;
            document.removeEventListener("keydown", this.battleKeyDownEvent);
            document.removeEventListener("keyup", this.battleKeyUpEvent);
        }

        public move() : boolean{
            if(this._moveSlow)
                this._battlePlayerData._moveSpeed /= 2;
            if(this._dx != 0 || this._dy != 0){
                this._last_dx = this._dx;
                this._last_dy = this._dy;
            }
            var result = super.move();
            if(this._moveSlow)
                this._battlePlayerData._moveSpeed *= 2;
            return result;
        }

        public beHit(damage : number, kind : DamageKind){
            switch (kind) {
                case DamageKind.physical:
                    damage -= this._battlePlayerData._def;
                    break;
                case DamageKind.magic:
                    damage -= this._battlePlayerData._mdf;
                    break;
                case DamageKind.truely:
                    break;
                default:
                    break;
            }
            if(damage > 0){
                this._battlePlayerData._playerData._hp -= damage;
                if(this._battlePlayerData._playerData._hp <= 0){
                    this._battlePlayerData._playerData._hp = 0;
                    this.isDead = true;
                }
                //刷新血条
                BattleScene.instance.hpBar.value = this._battlePlayerData._playerData._hp;
                if(this.isDead)
                    this.die();
            }
        }

        public die(){
            this.parent.removeChild(this);
            this.release();
            BattleScene.instance._skillOperate.release();
        }

        public getData() : BattlePlayerData{
            return this._battlePlayerData;
        }
    }
}