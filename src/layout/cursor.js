/*
 * @description 定位光标
 */

import { font } from './font.js';

export var cursorX = 0;
export var cursorY = (function () {
    return parseInt(font.size, 10);
}());

export function cursorPosition (width) {
    cursorX += width;
};
