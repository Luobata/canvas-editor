/*
 * @description init keybord eventListener
 */

import * as draw from './draw.js';
import * as stack from '../layout/stack.js';
import {
    cursorX,
    cursorY
} from '../layout/cursor.js';
import input from '../input/input.js';

export default function init (canvas, ctx, text) {
    text.addEventListener('keydown', function (e) {
        input(e, ctx, canvas);
        e.stopPropagation();
    });
    canvas.addEventListener('focus', function (e) {
        //draw.cursor(ctx);
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
