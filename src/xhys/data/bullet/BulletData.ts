namespace xhys{

    export class BulletData {
        public _battleSkin : string;
        public _isMovieClip : boolean = false;
        public _baseDamage : number;
        public _multiple : number;
        public _damageKind : DamageKind = DamageKind.none;
        public _moveSpeed : number;
        //能否被摧毁
        public _destroyable : boolean = true;
        //持续伤害
        public _stDamage : boolean = false;

        public _route : RouteData;

        public constructor(){

        }
    }
}