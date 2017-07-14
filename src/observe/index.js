/**
 * @description 构造函数类 通过Observer创造的对象 所有的属性都会有get set方法
 */

import {
    isObj,
    isFun,
    def,
    protoAugment
} from '../lib/util.js';
import Dep from './dep.js';
import { arrayMethods } from './array.js';

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
let id = 0;
let uiStack;

export class Observer {
    id: number;
    dep: Dep;
    constructor (obj, model) {
        const origin = this;
        const arrayKeys = Object.getOwnPropertyNames(origin.__proto__);
        origin.id = id++;
        if (model) uiStack = model;
        //origin.__proto__.__proto__ = model; // 这句会有闭包的问题？？？
        this.__UINAME = model.constructor.name;
        this.dep = new Dep();
        def(this, '__ob__', this);
        for (let i of arrayKeys) {
            if (i !== 'constructor') {
                model.__proto__[i] = origin.__proto__[i];
            }
        }
        protoAugment(this, model);
        let decorate = (obj) => {
            let key;
            let value;
            let that = this;
            for (key in obj) {
                value = obj[key];
                if (isObj(value)) {
                    decorate(value);
                    continue;
                }

                if (Array.isArray(value)) {
                    that[key] = value;
                    protoAugment(value, arrayMethods);
                    def(that[key], '__ob__', that);
                }

                if (isFun(value)) {
                    that[key] = value;
                    continue;
                }

                (function (key) {
                    defineProperty(that, key, value);
                }(key));
            }
        };

        decorate(obj);
    };

    observeArray (
        items: Array<any>
    ) {
        for (let i of items) {
            observe(i);
        }
    };
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

            // console.log(key + ' : ' + val);
        },
        get: function () {
            // 如果已经赋值过get了 直接调用
            const value = getter ? getter.call(obj) : val;

            if (Dep.target) {
                dep.depend();
                if (Array.isArray(value)) {
                    value.__ob__.dep = dep;
                    dependArray(value);
                }
            }

            return value;
        }
    });
}

export function observe(obj, model) {
    let observe = new Observer(obj, model || uiStack);

    return observe;
};

const dependArray = function (
    value: Array<any>
) {
    for (let i of value) {
        //i && i.dep.depend();
    }
};
