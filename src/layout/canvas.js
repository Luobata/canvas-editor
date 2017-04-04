/**
 * @description 存储canvas对象与属性
 */

import * as stack from './stack.js';

export let canvasWidth = 0;
export let canvasHeight = 0;
export let canvas;
export let ctx;

export function canvasInit (can) {
    canvas = can;
    ctx = canvas.getContext('2d');
    canvasWidth = can.width;
    canvasHeight = can.height;
    // 需要禁止padding 不然进度条的位置有误
    stack.scroll.x = can.offsetWidth - stack.scroll.width;
    stack.scroll.x = can.width - stack.scroll.width;
};
