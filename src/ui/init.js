/**
 * @ 初始化ui模块observe的入口 把ui模块转化为Observe模块
 */

import observe from '../observe/index.js';

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

    initComputed($computed);
    initData($data);
};

const initComputed = function (obj) {
    console.log(obj);
};

const initData = function (obj) {
    const $data = observe(obj);
    console.log($data);
}
