/**
 * @description font对象
 */

import initUi from './init.js';

export default class Font {

    heightCount : number;
    fontArray: array;

    computed: object; // 计算属性

    constructor (obj, ui) {
        this.heightCount = 0;

        return initUi(this);
    }

    pushFont (font) {
    }
};
