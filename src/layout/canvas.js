/**
 * @description 存储canvas对象与属性
 */

export var canvasWidth = 0;
export var canvasHeight = 0;
export var canvas;
export var ctx;

export function canvasInit (can) {
    canvas = can;
    ctx = canvas.getContext('2d');
    canvasWidth = can.width;
    canvasHeight = can.height;
};
