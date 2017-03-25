/*
 * @description init keybord eventListener
 */

import draw from './draw.js';
import {
    cursorX,
    cursorY
} from '../layout/cursor.js';

export default function init (canvas, ctx) {
    canvas.addEventListener('keydown', function (e) {
        draw(ctx, e.key, cursorX, cursorY);
    });
};
