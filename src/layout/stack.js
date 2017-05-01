/*
 * @description 画布对象队列，每次从队列中画
 */

export let txtArr = [];
export let cursor = {
    x: 0,
    y: 0,
    show: false
};

export let scroll = {
    x: 0,
    y: 0,
    show: true,
    color: '#D3D3D3',
    radius: 2,
    width: 5,
    height: 0
};

export let container = {
    width: 0,
    height: 0
};
