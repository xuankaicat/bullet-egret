namespace xhys{
    export class RouteDataParse {
        public static parse(val : any) : RouteData{
            var data : RouteData = new RouteData();
            var length = val.queue.length;
            for(var i = 0; i < length; i++){
                var vale = val.queue[i];
                var e = new RouteEvent();
                if(vale.hasOwnProperty("repeat"))
                    e.repeat = vale.repeat;
                e.time = vale.time;
                e.id = vale.id;
                e.triggerEvent = vale.e;
                if(e.triggerEvent.hasOwnProperty("bulletName"))
                    e.triggerEvent["bullet"] = BulletDataParse.parse(
                        RES.getRes(e.triggerEvent.bulletName + "_json")
                    );
                data.queue.push(e);
            }
            return data;
        }
    }
}