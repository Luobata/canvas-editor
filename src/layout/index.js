/*
 * @description init draw canvas
 */

import keybord from '../event/keybord.js';

var addText = function (dom) {
    var wid = dom.width;
    var hei = dom.height;
    var text = "<textarea class='width=" + wid +";height=" + hei + ";position: abolute;'></textarea>";
};

export var init = function (selector) {
    var canvas = document.getElementById(selector);
    var ctx;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        keybord(canvas, ctx);
    }
};
