/*
 * @description init draw canvas
 */

import keybord from '../event/keybord.js';

export var init = function (selector) {
    var canvas = document.getElementById(selector);
    var ctx;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        keybord(canvas, ctx);
    }
};
