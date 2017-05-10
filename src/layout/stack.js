/*
 * @description 画布对象队列，每次从队列中画
 */

import { Obs } from '../lib/observer.js';

/*
 * txtArr Object Array
 * size: font-size 12px
 * height: parseInt(size, 10)
 * weight: font-weight
 * family: font-family
 * color: color
 * cursorX: positionX
 * cursorY: positionY
 * value: value
 */
export let txtArr = [];
export let cursor = new Obs({
    x: 0,
    y: 0,
    show: false
});

export let scroll = new Obs({
    x: 0,
    y: 0,
    show: false,
    color: '#D3D3D3',
    radius: 2,
    height: 0,
    width: 5
});

export let container = {
    width: 0,
    height: 0
};

export const txtMarginBottom = 1;
