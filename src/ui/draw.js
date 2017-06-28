/**
 * @description 绘制模块入口
 */

import {
    canvas,
    ctx
} from './config.js';

let ui;

// 清空画布
export let clearCanvas = function () {
    canvas.height = canvas.height; 
};

export let drawInit = function (uiInit) {
    ui = uiInit;
};

export let drawAll = function () {
    if (!ui) {
        console.error('ui init first');
        return;
    }

    clearCanvas();
    for (let i in ui) {
        ui[i].draw();
    }
};
