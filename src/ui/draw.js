/**
 * @description 绘制模块入口
 */

let ui;

export let uiInit = function (ui) {
    this.ui = ui;
}

export let drawAll = function () {
    if (!ui) {
        console.error('ui init first');
        return;
    }

    for (let i in ui) {
        ui[i].draw();
    }
};
