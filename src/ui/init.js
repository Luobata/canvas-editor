/**
 * @ 初始化ui模块observe的入口 把ui模块转化为Observe模块
 */

import {observe, Observer} from '../observe/index.js';
import {
    isFun
} from '../lib/util.js';

export default function initUi(obj) {
    let $data = {};
    let $computed = {};
    for (let i in obj) {
        if (i === '$computed') {
            $computed = obj[i];
            continue;
        }

        $data[i] = obj[i];
    }

    $data = initData($data);
    initComputed($computed, $data);
};

const initComputed = function (
    obj: object,
    model: Observer
) {
    console.log(obj);
    for (let i in obj) {
        if (!isFun(obj[i]) {
            console.error(obj + ' ' + i + 'is not a computed function!');
            continue;
        }

        // computed function
    }
};

const initData = function (obj) {
    return observe(obj);
}
