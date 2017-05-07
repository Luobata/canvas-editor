/**
 * @description 构造函数类 通过Observer创造的对象 所有的属性都会有get set方法
 */

const isObj = function (obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
};

const isFun = function (obj) {
    return typeof obj === 'function';
};

class Observer {
    constructor(obj) {
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

                if (isFun(value)) {
                    continue;
                }

                (function (key) {
                    Object.defineProperty(that, key, {
                        enumerable: true,
                        configurable: true,
                        set: function (val) {
                            // 数据劫持
                            obj[key] = val;
                            if (key === 'show') return;
                            console.log(key + ' : ' + val);
                        },
                        get: function () {
                            return obj[key];
                        }
                    });
                }(key));
            }
        };

        decorate(obj);
    }
};

export const Obs = Observer;
