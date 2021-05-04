namespace xhys{
    export class BattleScene extends ComponentController {
        private static _instance : BattleScene;

        public static get instance() : BattleScene {
            if(!BattleScene._instance)
                return BattleScene._instance = new BattleScene();;
            return BattleScene._instance;
        }

        public hpBar:eui.ProgressBar = new eui.ProgressBar(); 

        public _battleData : BattleData = null;

        public _battlePlayer : BattlePlayer = null;
        public _battleEnemies : BattleEnemy[] = [];
        public _bulletManager : BulletManager = null;
        public _bulletBoard : egret.Sprite;
        public _battleBoard : egret.Sprite;

        public _directionOperate : DirectionOperate;
        public _skillOperate : SkillOperate;

        public constructor(){
            super();
            this._battleBoard = new egret.Sprite();
            this._battleBoard.x = BattleData.side_left;
            this._battleBoard.y = BattleData.side_top;
            this._battleBoard.width = BattleData.side_right - this._battleBoard.x;
            this._battleBoard.height = BattleData.side_bottom - this._battleBoard.y;
            //this.addChild(this._battleBoard);
            this.skinName = "resource/eui_skins/scene/BattleSceneSkin.exml";
            this._bulletManager = BulletManager.instance;
            this._bulletBoard = new egret.Sprite();
            //this._battleBoard.addChild(this._bulletBoard);

            //this.createView();

            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            //this.addEventListener(egret.Event.REMOVED, this.release, this);
        }

        public createView(bd : BattleData){
            this._battleData = bd;
            //this.addChild(bd.background);
            this.addChildAt(bd.background, 0);
            this._battleEnemies = bd.enemies;

            this.addChild(this._battleBoard);
            this._battleBoard.addChild(this._bulletBoard);

            this._battlePlayer = new BattlePlayer(new PlayerData());
            this._battleBoard.addChild(this._battlePlayer);
            this._directionOperate = new DirectionOperate();
            this._directionOperate.operaObj = this._battlePlayer;
            this.addChild(this._directionOperate);
            this._skillOperate = new SkillOperate(this._battlePlayer);
            this.addChild(this._skillOperate);

            this.hpBar.value = this._battlePlayer._battlePlayerData._playerData._hp;
            this.hpBar.maximum = this._battlePlayer._battlePlayerData._playerData._maxHp;

            //for(var i = 0; i < 1; i++)
            //this._battleEnemies.push(
            //    new BattleEnemy(
            //        EnemyDataParse.parse(
            //            RES.getRes("slime_json")
            //        )
            //    )
            //);
            //this._battleEnemies[1].x -= 300;
            //this._battleEnemies[1].y += 300;

            this._battleEnemies.forEach(enemy => {
                this._battleBoard.addChild(enemy);
            });
        }

        private update(){
            if(this._battlePlayer)
            this._battlePlayer.move();
            
            var enemies = this._battleEnemies;
            for(var i = enemies.length - 1; i>=0; i--){
                enemies[i].move();
            }
            //this._battleEnemies.forEach(enemy => {
            //    enemy.move();
            //});
            this._bulletManager.updateAll();
        }

        public release(){
            this._battleData = null;
            this._battlePlayer = null;
            this._battleEnemies = [];
            this.removeChildren();
            this._battleBoard.removeChildren();
            this._bulletBoard.removeChildren();
        }
    }
}
