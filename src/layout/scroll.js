/**
 * @description 滚动条对象
 */

import * as stack from './stack.js';
import * as canvas from './canvas.js';
import * as draw from '../event/draw.js';

export let scroll = {
    changeScroll: function () {
        // 滚动条高度 = canvas容器高度^2 / 容器的高度
        // barwidth / wrapwidth = wrapwidth / contentwidth
        stack.scroll.height = canvas.canvasInnerHeight * canvas.canvasInnerHeight / stack.container.height;
        stack.scroll.show = true;
        draw.drawAll();
    },
    /*
     * @description 计算滚动条唯一距离
     * @number dis 文字移动距离
     */
    scrollMoveCal: function (dis) {
        // 移动高度比例占总体比例相等
        let moveHeight = dis;
        let marginHeight = stack.container.height - canvas.canvasInnerHeight;
        let marginScrollHeight = canvas.canvasHeight - stack.scroll.height;

        return - marginScrollHeight * moveHeight / marginHeight;
    },
    /**
     * @description 判断是否到达边界
     * @number dir 滚动方向 1代表上 -1代表下
     */
    disabled: function (dir) {
        if (!stack.scroll.show) return true;

        if (dir > 0) {
            return stack.scroll.y <= 0;
        } else {
            return stack.scroll.y + stack.scroll.height > canvas.canvasHeight;
        }
    }
};
