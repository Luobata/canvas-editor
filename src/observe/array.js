/**
 * @description array增强方法
 */

import { def } from '../lib/util.js';
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);


[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
.forEach(function (method) {
    const original = arrayProto[method];
    def(arrayMethods, method, function () {
        let i = arguments.length;
        const args = new Array(i);
        while (i--) {
            args[i] = arguments[i];
        }

        const result = original.apply(this, args);
        const ob = this.__ob__;
        //const ob = this;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }

        debugger;
        if (inserted) ob.observeArray(inserted);

        ob.dep.notify();
        return result;
    });
});
