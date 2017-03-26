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
    if (input.keyCode === 8) {
        // backspace
        pop = stack.txtArr.pop();
        pop && draw.txt(ctx, pop.value, pop);
    } else {
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
