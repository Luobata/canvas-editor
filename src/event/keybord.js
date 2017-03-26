/*
 * @description init keybord eventListener
 */

import * as draw from './draw.js';
import * as stack from '../layout/stack.js';
import { font } from '../layout/font.js';
import {
    cursorX,
    cursorY
} from '../layout/cursor.js';

export default function init (canvas, ctx) {
    canvas.addEventListener('keydown', function (e) {
        stack.txtArr.push({
            size: font.size,
            weight: font.weight,
            family: font.family,
            color: font.color,
            cursorX: cursorX,
            cursorY: cursorY,
            value: e.key
        });
        draw.txt(ctx, e.key);
        stack.cursor.x = cursorX;
        draw.clearCanvas(ctx, canvas);
        draw.drawAll(ctx);
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
