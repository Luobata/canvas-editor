/**
 * @description 辅助函数
 */

export const isObj = function (obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
};

export const isFun = function (obj) {
    return typeof obj === 'function';
};

export const def = function (
    obj: Object,
    key: string,
    val: any,
    enumerable?: boolean
) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
};

export const hasProto = '__proto__' in {};

export const protoAugment = function (
    target: Object,
    src: Object
) {
    if (hasProto) {
        target.__proto__ = src;
    }
};
