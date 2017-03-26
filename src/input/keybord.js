/*
 * @description 处理输入内容
 */

import * as draw from '../event/draw.js';
import * as stack from '../layout/stack.js';
import { font } from '../layout/font.js';
import {
    cursorX,
    cursorY
} from '../layout/cursor.js';

var anylyse = function (input, ctx) {
    var pop;
    var code = input.keyCode;

    // backspace
    if (code === 8) {
        pop = stack.txtArr.pop();
        pop && draw.txt(ctx, pop.value, pop);
        return;
    }

    // 文本
    if ((code >= 48 && code <= 57) || 
        (code >= 65 && code <= 90) || 
        (code >=96 && code <= 107) ||
        (code >=109 && code <= 111) ||
        (code >= 186 && code <= 192) ||
        (code >= 219 && code <= 222)) {
        stack.txtArr.push({
            size: font.size,
            weight: font.weight,
            family: font.family,
            color: font.color,
            cursorX: cursorX,
            cursorY: cursorY,
            value: input.key
        });
        draw.txt(ctx, input.key);
    }
};

export default function input (e, ctx, canvas) {
    anylyse(e, ctx);
    stack.cursor.x = cursorX;
    draw.clearCanvas(ctx, canvas);
    draw.drawAll(ctx);
};
