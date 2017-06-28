/*
 * @description 捕获键盘输入事件
 */
import {
    canvas,
    ctx
} from '../ui/config.js';
import {
    txtLength
} from '../lib/ui.js';
import {
    ui
} from '../ui/index.js';

function anlyse (input) {
    const code = input.keyCode;
    const key = input.key;

    let wid;

    // backspace 并且存在内容
    if (code === 8) {
        ui.cursor.deleteFont(cursor.cursorX, cursor.cursorY);
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
        wid = txtLenth(input.key); 
        ui.cursor.cursorPosition(wid, '', '', parseInt(font.size, 10));
        ui.cursor.addFont({
            size: font.size,
            weight: font.weight,
            family: font.family,
            width: wid,
            height: parseInt(font.size, 10),
            innerHeight: cursor.cursorY,
            color: font.color,
            cursorX: cursor.cursorX,
            cursorY: cursor.cursorY,
            value: input.key
        });
        ui.cursor.cursorChange(wid);
    }
};

export function isEnter (input) {
    return input.key === 'Process' && input.code === 'Enter';
};

export let keyInput = function (e) {
    anlyse(e);
};
