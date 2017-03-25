/*
 * @description draw
 */

import { font } from '../layout/font.js';
import { cursorPosition } from '../layout/cursor.js';

var drawTxt = function (ctx, txt, x, y) {
    ctx.font = `${font.weight} ${font.size} ${font.family}`;
    ctx.fillText(txt, x, y);
    cursorPosition(ctx.measureText(txt).width);
};

export default function init (ctx, key, x, y) {
    drawTxt(ctx, key, x, y);
};
