/**
 * @description cursor对象
 */

import {
    canvas,
    ctx
} from './config.js';

import {
    drawAll
} from './draw.js';

let uiStack;
let endY;

export default class Cursor {

    cursorX: number;
    cursorY: number;
    cursorShow: boolean;

    timer;

    $computed: object;

    constructor (obj, ui) {
        this.cursorX = ui.canvas.padding;
        this.cursorY = ui.canvas.padding;
        this.cursorTime = obj.cursorTime || 500;
        this.cursorShow = true;
        this.timer = null;

        uiStack = ui;
        endY = ui.canvas.padding;
    };

    draw (
        height: number = 12
    ) {
        ctx.strokeStyle = this.cursorShow? '#FFF' : '#000';
        ctx.lineWidth = 1;
        ctx.lineCap = 'square';
        ctx.beginPath();
        ctx.moveTo(this.cursorX + 1, this.cursorY + 1);
        ctx.lineTo(this.cursorX + 1, this.cursorY + height + 1);
        ctx.stroke();
        ctx.closePath();
    };

    start () {
        this.timer = setInterval(() => {
            this.cursorShow = !this.cursorShow;
            drawAll();
        }, this.cursorTime);
    };

    stop () {
        clearInterval(this.timer);
        this.timer = null;
    };

    cursorPosition (width, lastX, lastY, height) {
        // 输入遇到右边界
        if (width >= 0 && isBorder('right', width, this.cursorX)) {
            this.cursorX = startX;
            this.cursorY += parseInt(font.size, 10);
            //stack.container.height += height;
            //stack.cursor.y += height;
            //scroll.changeScroll();
            if (isBorder('bottom')) {
                // 遇到下边界
                //draw.scrollerIme(-1, getBottom());
            }
            return;
        }

        // 删除遇到左边界
        if (width < 0 && isBorder('left', width, this.cursorX)) {
            // 删除 先增加一个字符的长度 后面光标计算的时候减掉
            this.cursorX = lastX - width;
            this.cursorY = lastY;
            //stack.container.height = this.cursorY;
            //scroll.changeScroll();
            this.cursorY = this.cursorY - parseInt(font.size, 10);
            return;
        }
    };

    cursorChange (width) {
        this.cursorX += width;
    }
};

const isBorder = function (dir, width, cursorX) {
    var flag = false;
    switch (dir) {
        case 'left':
            flag = cursorX === startX;
            break;
        case 'right':
            flag = cursorX + width > canvas.canvasWidth + endY;
            break;
        case 'bottom':
            flag = getBottom() > 0 ? true : false;
            break;
    }

    return flag;
};
