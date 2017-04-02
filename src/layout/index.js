/*
 * @description init draw canvas
 */

import keybord from '../event/keybord.js';
import * as can from './canvas';

var addText = function (dom, canvas) {
    var wid = canvas.offsetWidth;
    var hei = canvas.offsetHeight;
    var padding = canvas.padding;
    var text = document.createElement('textarea');
    text.style.width = wid + 'px';
    text.style.height = hei + 'px';
    text.style.position = 'absolute';
    text.style.opacity = '0';
    text.style.left = '0';
    text.style.top = '0';
    //text.style.padding = getComputedStyle(canvas, false)['padding'];
    dom.style.position = 'relative';
    dom.appendChild(text);

    return text;
};

export var init = function (selector) {
    var dom = document.getElementById(selector);
    var canvas = dom.querySelector('canvas');

    var text = addText(dom, canvas);
    var ctx;
    can.canvasInit(canvas);
    

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        keybord(canvas, ctx, text);
    }
};
