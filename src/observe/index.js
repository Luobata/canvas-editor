/**
 * @description 构造函数类 通过Observer创造的对象 所有的属性都会有get set方法
 */

import {
    isObj,
    isFun
} from '../lib/util.js';
import Dep from './dep.js';

export class Observer {
    dep: Dep;
    constructor (obj, model) {
        this.__proto__ = model;
        this.__UINAME = model.constructor.name;
        let decorate = (obj) => {
            let key;
            let value;
            let that = this;
            this.dep = new Dep();
            for (key in obj) {
                value = obj[key];
                if (isObj(value)) {
                    decorate(value);
                    continue;
                }

                if (isFun(value)) {
                    that.key = value;
                    continue;
                }

                (function (key) {
                    defineProperty(that, key, value);
                }(key));
            }
        };

        decorate(obj);
    }
};

export const defineProperty = function (
    obj: Object,
    key: string,
    val: any
) {

    let dep = new Dep();

    const property = Object.getOwnPropertyDescriptor(obj, key);
    const getter = property && property.get;
    const setter = property && property.set;

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set: function (newVal) {
            const value = getter ? getter.call(obj) : val;
            if (val === newVal) return;

            if (setter) {
                setter.call(obj);
            } else {
                val = newVal;
            }
            dep.notify();

            console.log(key + ' : ' + val);
        },
        get: function () {
            // 如果已经赋值过get了 直接调用
            const value = getter ? getter.call(obj) : val;

            if (Dep.target) {
                dep.depend();
            }

            return value;
        }
    });
}

export function observe(obj, model) {
    let observe = new Observer(obj, model);

    return observe;
};
