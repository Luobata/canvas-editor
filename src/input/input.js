/*
 * @description 处理输入内容
 */

import * as draw from '../event/draw.js';
import * as stack from '../layout/stack.js';
import {font} from '../layout/font.js';
import {Obs} from '../lib/observer.js';
import * as cursor from '../layout/cursor.js';

var anylyse = function (input, ctx) {
    var pop;
    var wid = 0;
    var code = input.keyCode;
    var key = input.key;


    // backspace 并且存在内容
    if (code === 8) {
        cursor.deleteFont(cursor.cursorX, cursor.cursorY);
        return;
    }

    // 文本
    if ((code >= 48 && code <= 57) || 
        (code >= 65 && code <= 90) || 
        (code >= 96 && code <= 107) ||
        (code >= 109 && code <= 111) ||
        (code >= 186 && code <= 192) ||
        (code >= 219 && code <= 222) ||
        (code === 'txt')) {
        wid = draw.txtLenth(input.key); 
        cursor.cursorPosition(wid, '', '', parseInt(font.size, 10));
        cursor.addFont({
            size: font.size,
            weight: font.weight,
            family: font.family,
            width: wid,
            height: parseInt(font.size, 10),
            color: font.color,
            cursorX: cursor.cursorX,
            cursorY: cursor.cursorY,
            value: input.key
        });
        cursor.cursorChange(wid);
    }
};

export function isEnter (input) {
    return input.key === 'Process' && input.code === 'Enter';
};

export function input (e, ctx, canvas) {
    anylyse(e, ctx);
    stack.cursor.x = cursor.cursorX;
    draw.clearCanvas(ctx, canvas);
    draw.drawAll();
};
