/**
 * @description font对象
 */

import {
    canvas,
    ctx
} from './config.js';

export default class Font {

    size: string;
    width: number;
    height: number;
    weight: string;
    family: string;
    color: strng;
    x: number;
    y: number;
    value: string;

    $computed: object; // 计算属性

    constructor (obj, ui) {
        this.size = obj.size || '12px';
        this.width = obj.width;
        this.height = obj.height;
        this.weight = obj.weight;
        this.family = obj.family;
        this.color = obj.color;
        this.x = obj.x;
        this.y = obj.y;
        this.value = obj.value;
    };

    draw () {
        ctx.font = `${this.weight} ${this.size} ${this.family} ${this.color}`;
        ctx.fillText(this.value, this.x, this.y + this.height);
    };
};
