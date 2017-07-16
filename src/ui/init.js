/**
 * @ 初始化ui模块observe的入口 把ui模块转化为Observe模块
 */

import {observe, Observer} from '../observe/index.js';
import Watcher from '../observe/watcher.js';
import Dep from '../observe/dep.js';
import {
    isFun
} from '../lib/util.js';

export default function initUi(obj) {
    let $data = {};
    let $computed = {};
    let $method = {};
    for (let i in obj) {

        if (isFun(obj[i])) {
            $method[i] = method[i];
            continue;
        }

        if (i === '$computed') {
            $computed = obj[i];
            continue;
        }

        $data[i] = obj[i];
    }

    $data = initData($data, obj);
    initComputed($computed, $data);

    return $data;
};

const initComputed = function (
    obj: object,
    model: Observer
) {
    console.log(model);
    const noopFun = function () {}; // 空fun
    const computedObject = {
        enumerable: true,
        configurable: true,
        get: noopFun,
        set: noopFun
    };
    const makeComputedGetter = function (
        getter: Function,
        model: Observer
    ) {
        const watcher = new Watcher(model, getter, noopFun);
        return function () {
            debugger;
            if (watcher.lazy) {
                watcher.evaluate();
            }
            if (Dep.target) {
                watcher.depend();
            }

            return watcher.value;
        }
    }
    for (let i in obj) {
        if (!isFun(obj[i])) {
            console.error(obj + ' ' + i + 'is not a computed function!');
            continue;
        }

        // computed function
        let data = obj[i].call(model);
        computedObject.get = makeComputedGetter(obj[i], model);
        computedObject.set = noopFun;

        Object.defineProperty(model, i, computedObject);
    }
};

const initData = function (
    obj: object,
    model: object
) {
    return observe(obj, model);
}
