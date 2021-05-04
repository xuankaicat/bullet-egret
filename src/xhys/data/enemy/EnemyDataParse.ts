namespace xhys{
    export class EnemyDataParse {
        public static parse(val : any) : EnemyData{
            var data : EnemyData = new EnemyData();
            data._name = val.name;
            data._battleSkin = val.skin;
            data._hp = data._maxHp = val.hp;
            data._atk = val.atk;
            data._def = val.def;
            data._mdf = val.mdf;
            data._moveSpeed = val.speed;
            data._gold = val.gold;
            data._exp = val.exp;
            //data._bullet = []//val.bullet;
            //val.bullet.forEach(bullet => {
            //    data._bullet.push(BulletDataParse.parse(
            //        RES.getRes(bullet + "_json")
            //    ));
                //egret.log(bullet + "_json")
            //});
            data._route = RouteDataParse.parse(RES.getRes(val.route + "_json"));
            return data;
        }
    }
}