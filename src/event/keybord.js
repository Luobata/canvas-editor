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
