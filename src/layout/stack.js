/*
 * @description 画布对象队列，每次从队列中画
 */

import {obs} from '../lib/observer.js';

export let txtArr = [];
export let cursor = {
    x: 0,
    y: 0,
    show: false
};

export let scroll = new obs({
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
