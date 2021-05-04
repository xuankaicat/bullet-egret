namespace xhys{
    export class BulletDataParse {
        public static parse(val : any) : BulletData{
            var data : BulletData = new BulletData();
            data._battleSkin = val.skin;
            data._baseDamage = val.dmg;
            data._multiple = val.mult;
            data._damageKind = <DamageKind>val.kind;
            data._moveSpeed = val.speed;
            data._isMovieClip = val.mc;
            data._route = RouteDataParse.parse(RES.getRes(val.route + "_json"));
            return data;
        }
    }
}