/**
 * @description 存储canvas对象与属性
 */

import * as stack from './stack.js';

export let canvasWidth = 0;
export let canvasHeight = 0;
export let canvasInnerWidth = 0;
export let canvasInnerHeight = 0;
export let canvas;
export let ctx;
export let padding = 10;

export function canvasInit (can) {
    canvas = can;
    ctx = canvas.getContext('2d');
    canvasWidth = can.width;
    canvasHeight = can.height;
    // 需要禁止padding 不然进度条的位置有误
    stack.scroll.x = can.offsetWidth - stack.scroll.width;
    stack.scroll.x = can.width - stack.scroll.width;
    // 内容的宽高是否需要考虑padding 可能会影响滚动条高度的计算
    canvasInnerWidth = can.offsetWidth - padding * 2;
    canvasInnerHeight = can.offsetHeight - padding;
    stack.container.width = canvasInnerWidth;
    stack.container.height = canvasInnerHeight;

    stack.cursor.x = padding;
    stack.cursor.y = padding;
};
