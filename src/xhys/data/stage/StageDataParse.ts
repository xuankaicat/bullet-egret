/*
 * @description: 
 * @version: 
 * @Author: xuankai
 * @Date: 2021-05-04 21:51:04
 * @LastEditors: xuankai
 * @LastEditTime: 2021-05-04 22:22:47
 */
namespace xhys{
    export class StageDataParse {
        public static parse(val : any) : StageData{
            var data : StageData = new StageData();
            data._cover = RES.getRes(val.cover);
            data._name = val.name;
            var length = val.levels.length;
            for(var i = 0; i < length; i++){
                var obj = val.levels[i];
                var ld = new LevelData();
                ld._cover = RES.getRes(obj.cover);
                ld._name = obj.name;
                ld._battleDataName = obj.bdn;
                if(ld._battleDataName != null){
                    ld._battleDataName += "_json";
                }
                data.levels.push(ld);
            }
            return data;
        }
    }
}