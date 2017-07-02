/**
 * @description font对象
 */

import type Font from './font.js';
import {
    canvas,
    ctx
} from './config.js';

import {
    drawAll
} from './draw.js';


export default class Content {

    heightCount : number;
    fontArray: Array<Font>;

    $computed: object; // 计算属性

    constructor (obj, ui) {
        this.heightCount = 0;
        this.fontArray = [];

        this.$computed = {
            heightCount: function () {
                let height = 0;
                let y = 0;
                console.log(1);
                for (let i of this.fontArray) {
                    if (i.y !== y) {
                        //  说明当前内容在下一行
                        height += i.height;
                        y = i.y;
                    }
                }

                return height;
            }
        };
    };

    pushFont (
        font: Font
    ) {
        this.fontArray.push(font);
        drawAll();
    };

    clearFont () {
        this.fontArray.lengt = 0;
    };

    draw () {
        for (let i of this.fontArray) {
            i.draw();
        }
    };
};
