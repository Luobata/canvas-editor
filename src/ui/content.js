/**
 * @description font对象
 */

import type Font from './font.js';
import {
    canvas,
    ctx
} from './config.js';


export default class Content {

    heightCount : number;
    fontArray: Array<Font>;

    $computed: object; // 计算属性

    constructor (obj, ui) {
        this.heightCount = 0;
        this.fontArray = [];
    };

    pushFont (
        font: Font
    ) {
        this.fontArray.push(font);
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
