/*
 * @description init keybord eventListener
 */

import * as stack from '../layout/stack.js';
import {
    cursorX,
    cursorY,
    cursorClick
} from '../layout/cursor.js';
import { input, isEnter } from '../input/input.js';
import {
    keyInput
} from '../input/keybord.js';
import {
    ui
} from '../ui/index.js';
import {
    drawAll
} from '../ui/draw.js';

import {
    mouse
} from '../input/mouse.js';

export default function init (canvas, ctx, text) {
    var isProcessEnter = false;
    var textTarget;
    var inputFn = function () {
        // 输入多内容的时候分割
        if (!textTarget) return;
        if (textTarget.value.length > 0) {
            textTarget.value.split('').forEach(function (item) {
                keyInput({key: item, keyCode: 'txt'});
            });
        }
        textTarget.value = '';
    };

    text.addEventListener('keydown', function (e) {
        //console.log(e);
        isProcessEnter = isEnter(e);
        // input(e, ctx, canvas);
        keyInput(e);
        e.target.value = '';
        e.stopPropagation();
    });
    text.addEventListener('input', function (e) {
        //console.log(e);
        // TODO 这样的方式对于输入法处理 只能兼容中文字与回车 理想的方式是 监听 输入法的 space 1 2 3 4 5 鼠标点击情况 即 只触法input没有keydown的时候 然后渲染内容
        // 但是监听内容的问题在于 不同的输入法可能是不同的输入标志 比如按 6 7 8 9也可以输入
        !textTarget && (textTarget = e.target);
        if (/^[\u4E00-\u9FA5]*$/.test(textTarget.value) || isProcessEnter) {
            inputFn();
            isProcessEnter = false;
        }
        e.stopPropagation();
    });
    text.addEventListener('blur', function (e) {
        inputFn();
    });
    text.addEventListener('keyup', function (e) {
    });
    // 鼠标滚动事件
    mouse.wheelEvent(text);

    canvas.addEventListener('focus', function (e) {
        text.focus();
    });
    canvas.addEventListener('blur', function (e) {
    });
    text.addEventListener('mousedown', function (e) {
        ui.cursor.cursorClick(e.layerX, e.layerY);
        drawAll();
    });
};
