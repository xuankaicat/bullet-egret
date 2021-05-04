namespace xhys {
    export class BattleDataParse {
        public static parse(val : any) : BattleData {
            var data : BattleData = new BattleData();
            data.background = new eui.Image(val.bg);
            val.enemy.forEach(enemy => {
                var newobj = new BattleEnemy(EnemyDataParse.parse(RES.getRes(enemy.source+"_json")));
                var idx = data.enemies.push(newobj) - 1;
                data.enemies[idx].x = enemy.x;
                data.enemies[idx].y = enemy.y;
            });
            return data;
        }
    }
}