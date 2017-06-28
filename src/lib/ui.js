/**
 * @description ui 相关 辅助函数
 */

import {
    canvas,
    ctx
} from '../ui/config.js';

export const txtLength = function (key, delFont) {
    let wid;
    let weight = delFont ? delFont.weight : font.weight;
    let size = delFont ? delFont.size : font.size;
    let family = delFont ? delFont.family : font.family;
    ctx.font = `${weight} ${size} ${family}`;
    wid = ctx.measureText(key).width;

    return wid;
};
