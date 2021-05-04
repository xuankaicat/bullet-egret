namespace xhys{

    export class SkillData {
        public _bullet : BulletData = null;
        public _bulletSkill : JSON;

        public constructor(){
        }

        protected static getAngle(dx : number, dy : number) : number{
            var point = new egret.Point(dx, dy);
            if(point.x == 0 && point.y > 0){
                return Math.PI * 0.5;
            }else if(point.x == 0 && point.y < 0){
                return Math.PI * 1.5;
            }else if(point.x > 0 && point.y >= 0){
                return Math.atan(point.y / point.x);
            }else if(point.x < 0 && point.y >= 0){
                return Math.atan(Math.abs(point.x / point.y)) + Math.PI * 0.5;
            }else if(point.x > 0 && point.y < 0){
                return Math.atan(point.y / point.x);
            }else if(point.x < 0 && point.y < 0){
                return Math.atan(Math.abs(point.y / point.x)) + Math.PI;
            }
            return 0;
        }
    }
}