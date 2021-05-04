namespace xhys{
    export class RouteEvent{
        public id : number = 0;
        //触发时间
        public time : number;
        //触发条件
        public triggerOrder : ()=>boolean = null;
        //触发事件
        public triggerEvent : any;
        //重复次数
        public repeat : number = 1;

        public constructor(){

        }
    }
}