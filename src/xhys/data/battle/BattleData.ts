namespace xhys{
    export class BattleData{
        //可移动地图范围 680x598
        public static side_left : number = 228;
        public static side_right : number = 908;
        public static side_top : number = 22;
        public static side_bottom : number = 620;

        public background : eui.Image;
        public enemies : BattleEnemy[] = [];

        public constructor(){

        }
    }
}