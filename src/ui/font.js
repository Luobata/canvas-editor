/**
 * @description font对象
 */

import {
    canvas,
    ctx
} from './config.js';

export default class Font {

    $computed: object; // 计算属性

    constructor (obj, ui) {
    };

    draw (font) {
        ctx.font = `${font.weight} ${font.size} ${font.family} ${font.color}`;
        ctx.fillText(font.value, font.cursorX, font.cursorY);
    }
};
