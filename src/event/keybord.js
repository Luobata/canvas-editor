/*
 * @description init keybord eventListener
 */

import * as draw from './draw.js';
import * as stack from '../layout/stack.js';
import {
    cursorX,
    cursorY
} from '../layout/cursor.js';
import keybord from '../input/keybord.js';

export default function init (canvas, ctx) {
    canvas.addEventListener('keydown', function (e) {
        keybord(e, ctx, canvas);
        e.stopPropagation;
    });
    canvas.addEventListener('focus', function (e) {
        //draw.cursor(ctx);
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
