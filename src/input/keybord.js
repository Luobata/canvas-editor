/*
 * @description 捕获键盘输入事件
 */
import {
    canvas,
    ctx,
    fontConf
} from '../ui/config.js';
import {
    txtLength
} from '../lib/ui.js';
import {
    drawAll
} from '../ui/draw.js';
import {
    ui
} from '../ui/index.js';
import Font from '../ui/font.js';


function anlyse (input) {
    const code = input.keyCode;
    const key = input.key;

    let fontObj = Object.assign({}, fontConf);
    let wid;

    // backspace 并且存在内容
    if (code === 8) {
        ui.content.deleteFont(ui.cursor.cursorX, ui.cursor.cursorY);
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
        fontObj.value = input.key;
        fontObj.width = txtLength(fontObj);
        ui.cursor.cursorPosition(fontObj.width, '', '', fontObj.height);
        fontObj.x = ui.cursor.cursorX;
        fontObj.y = ui.cursor.cursorY;
        ui.cursor.cursorChange(fontObj.width);
        ui.content.pushFont(fontObj);
    }
};

export function isEnter (input) {
    return input.key === 'Process' && input.code === 'Enter';
};

export let keyInput = function (e) {
    anlyse(e);
    drawAll();
};
