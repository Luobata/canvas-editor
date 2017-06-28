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
        if (width >= 0 && isBorder('right', width, cursorX)) {
            cursorX = startX;
            cursorY += parseInt(font.size, 10);
            stack.container.height += height;
            // stack.container.height = stack.txtArr[stack.txtArr.length - 1].innerHeight + 20;
            stack.cursor.y += height;
            scroll.changeScroll();
            if (isBorder('bottom')) {
                // 遇到下边界
                console.log(getBottom());
                draw.scrollerIme(-1, getBottom());
            }
            return;
        }

        // 删除遇到左边界
        if (width < 0 && isBorder('left', width, cursorX)) {
            // 删除 先增加一个字符的长度 后面光标计算的时候减掉
            cursorX = lastX - width;
            cursorY = lastY;
            stack.container.height = cursorY;
            scroll.changeScroll();
            stack.cursor.y = cursorY - parseInt(font.size, 10);
            return;
        }
    };
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
