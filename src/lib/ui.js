/**
 * @description ui 相关 辅助函数
 */

import {
    canvas,
    ctx
} from '../ui/config.js';

export const txtLength = function (font) {
    const weight = font.weight;
    const size = font.size;
    const family = font.family;
    ctx.font = `${weight} ${size} ${family}`;

    return ctx.measureText(font.value).width;
};
