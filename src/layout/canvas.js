/**
 * @description 存储canvas对象与属性
 */

export var canvasWidth = 0;
export var canvasHeight = 0;
export var canvas;

export function canvasInit (can) {
    canvas = can;
    canvasWidth = can.width;
    canvasHeight = can.height;
};
