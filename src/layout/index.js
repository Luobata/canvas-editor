/*
 * @description init draw canvas
 */

import keybord from '../event/keybord.js';
import * as can from './canvas';
import {hack} from '../lib/hack.js';

import ui from '../ui/index.js';

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
    var dom2 = document.getElementById('editor2');
    var canvas2 = dom2.querySelector('canvas');

    var text2 = addText(dom2, canvas);
    var ctx;
    var ctx2;
    hack();
    can.canvasInit(canvas);
    

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx2 = canvas2.getContext('2d');
        keybord(canvas, ctx, text);
        keybord(canvas2, ctx2, text2);
        ui(canvas2, ctx2);
    }

};
