/*
 * @description init keybord eventListener
 */

import * as draw from './draw.js';
import * as stack from '../layout/stack.js';
import {
    cursorX,
    cursorY
} from '../layout/cursor.js';
import { input, isEnter } from '../input/input.js';

export default function init (canvas, ctx, text) {
    var isProcessEnter = false;
    var textTarget;
    var inputFn = function () {
        // 输入多内容的时候分割
        if (textTarget.value.length > 0) {
            textTarget.value.split('').forEach(function (item) {
                input({key: item, keyCode: 'txt'}, ctx, canvas);
            });
        }
        textTarget.value = '';
    };

    text.addEventListener('keydown', function (e) {
        //console.log(e);
        isProcessEnter = isEnter(e);
        input(e, ctx, canvas);
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
    canvas.addEventListener('focus', function (e) {
        text.focus();
    });
    canvas.addEventListener('blur', function (e) {
    });
    canvas.addEventListener('mousedown', function (e) {
        stack.cursor = {
            x: e.layerX,
            y: e.layerY,
            show: true
        };
        draw.cursor(ctx, e.layerX, e.layerY);
    });
};
