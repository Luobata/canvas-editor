/**
 * @description canvas对象
 */

import {
    canvas,
    ctx
} from './config.js';

export default class Canvas {

    width: number;
    height: number;
    padding: number;
    innerHeight: number;
    innerWidth: number;

    $computed: object; // 计算属性，依赖其他模块的值

    constructor (obj, ui) {
        // 数据初始化 考虑加入assert
        this.width = obj.width;
        this.height = obj.height;
        this.padding = obj.padding;
        this.txtMarginBottom = obj.txtMarginBottom || 1;
        // this.innerHeight = this.height - this.padding * 2;
        this.innerWidth = this.width - this.padding * 2;

        this.$computed = {
            innerHeight () {
                // TODO 这里初始化调用了次 需要优化
                //console.log(1);
                const height = ui.content.heightCount + this.padding * 2;
                const innerHeight = this.height - this.padding * 2;
                return height - innerHeight ? height : innerHeight;
            }
        };
    };

    draw () {
    }
};
