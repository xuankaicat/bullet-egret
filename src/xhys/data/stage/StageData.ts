/*
 * @description: 
 * @version: 
 * @Author: xuankai
 * @Date: 2021-05-04 20:54:27
 * @LastEditors: xuankai
 * @LastEditTime: 2021-05-04 22:01:37
 */
namespace xhys{

    export class StageData {
        //注册章节
        static StageDataGroups = [
            "stage_1"
        ];
        //目录封面
        public _cover : egret.Texture;
        //章节名称
        public _name : string;
        //章节中的关卡
        public levels : LevelData[] = [];

        public constructor(){

        }
    }
}