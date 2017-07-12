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

export class Observer {
    id: number;
    dep: Dep;
    constructor (obj, model) {
        const origin = this;
        origin.id = id++;
        this.__parent__ = model;
        //origin.__proto__.__proto__ = model; // 这句会有闭包的问题？？？
        protoAugment(this, model);
        this.__UINAME = model.constructor.name;
        //def(this, '__ob__', this);
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

                if (Array.isArray(value)) {
                    protoAugment(value, arrayMethods);
                    //def(that[key], '__ob__', that);
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
                    dependArray(value);
                }
            }

            return value;
        }
    });
}

export function observe(obj, model) {
    let observe = new Observer(obj, model);

    return observe;
};

const dependArray = function (
    value: Array<any>
) {
    for (let i of value) {
        i && i.dep.depend();
    }
};
