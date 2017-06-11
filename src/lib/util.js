/**
 * @description 辅助函数
 */

export const isObj = function (obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
};

export const isFun = function (obj) {
    return typeof obj === 'function';
};
