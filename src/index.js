/**
 * @description init canvas index
 */

import * as layout from './layout/index.js';

var x2 = 10;

var drawTxt = function (ctx, txt, x, y) {
    ctx.font = 'bold 20px consolas';
    ctx.fillText(txt, x, y);
    x2 = x = x + ctx.measureText(txt).width;
};
var drawTxt2 = function (ctx, txt, x, y) {
    ctx.font = 'bold 100px consolas';
    ctx.fillText(txt, x, y);
    x2 = x = x + ctx.measureText(txt).width;
    console.log(1);
};

var draw = function (ctx) {
};

function init (selector) {
    var canvas = document.getElementById('editor');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //ctx.fillRect(25,25,100,100);

    }
    return;

    (function () {
        var i = 1;
        canvas.addEventListener('keydown', function (e) {
            // console.log(e);
            drawTxt(ctx, e.key, x2, 50);
        }, true);
        canvas.focus();
    }());
}

//init('editor');
layout.init('editor');
