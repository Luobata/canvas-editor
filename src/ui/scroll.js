/**
 * @description scroll对象
 */

import {
    canvas,
    ctx
} from './config.js';

import {
    drawAll
} from './draw.js';

let uiStack;

export default class Scroll {

    scrollHeight: number;
    scrollWidth: number;
    scrollX: number;
    scrollY: number;
    scrollRadius: number;
    scrollColor: string;
    scrollShow: boolean;

    frame: number; // 帧数
    ticker: number; // 每帧的时间
    frameTime: number; // 每次滚动的时间
    scrollArr: Array; // 滚动事件队列

    computed: object; // 计算属性， 依赖其他模块的值

    constructor (obj, ui) {
        this.scrollHeight = obj.height;
        this.scrollWidth = obj.width;
        this.scrollRadius = obj.radius;
        this.scrollColor = obj.color;
        // this.scrollY = 0;
        this.scrollShow = false; // 默认不显示

        this.frame = 60;
        this.ticker = 1 * 1000 / this.frame;
        this.frameTime = 250;
        this.scrollArr = [];

        uiStack = ui;

        this.$computed = {
            scrollX () {
                return ui.canvas.width - this.scrollWidth;
            },
            scrollY () {
                return  - ui.content.viewY * ui.canvas.height / ui.canvas.innerHeight;
            },
            //scrollY () {
            //    return this.scrollShow && this.scrollHeight ? this.scrollHeight * this.scrollY / this.scrollHeight : 0;
            //},
            scrollHeight () {
                return this.getScrollHeight(ui);
            }
        }

    };

    getScrollHeight (ui) {
        // 滚动条高度 = canvas容器高度^2 / 容器的高度
        // barwidth / wrapwidth = wrapwidth / contentwidth
        // stack.scroll.height = canvas.canvasInnerHeight * canvas.canvasInnerHeight / stack.container.height;
        const canvas = ui.canvas;
        if (canvas.height >= canvas.innerHeight) {
            this.scrollShow = false;
            return 0;
        }
        const height = Math.pow(canvas.height, 2) / canvas.innerHeight;
        if (!this.scrollShow) this.scrollShow = true;
        return height;
    };

    setScrollY (
        y: number
    ) {
        this.scrollY = this.scrollShow && this.scrollHeight ? this.scrollHeight * this.scrollY / this.scrollHeight : 0;
    };

    /**
     * 滚动条立即滚动函数
     */
    scrollerIme (
        dir: number,
        dis: number
    ) {
        this.scrollCore(dir * dis);
    };

    /**
     */
    scroller (
        dir: number,
        dis: number
    ) {
        const lon = dir * dis / this.frame / (this.frameTime / 1000);
        let timer;
        let time = new Date().getTime();
        this.scrollArr.push({
            dir: dir,
            lon: lon
        });

        const stopTimer = () => {
            clearInterval(timer);
            timer = null;
            time = new Date().getTime();
        };
        const timerInit = (scroll) => {
            timer = setInterval(() => {
                if (new Date().getTime() - time < this.frameTime && !this.disabled(scroll.dir)) {
                    this.scrollCore(scroll.lon);
                } else if (this.scrollArr.length) {
                    stopTimer();
                    timerInit(this.scrollArr.pop());
                } else {
                    stopTimer();
                }
            }, this.ticker);
        };
        if (this.scrollArr.length === 1) {
            timerInit(this.scrollArr.pop());
        }
    };


    /**
     * 滚动条滚动最小单元函数
     */
    scrollCore (
        lon: number
    ) {
        for (let i of uiStack.content.fontArray) {
            i.y += lon;
        }
        uiStack.cursor.cursorY += lon;
        uiStack.content.viewY += lon;
        //cursorYChange(lon);
        //this.scrollY += this.scrollMoveCal(lon);
        drawAll();
    };

    /**
     * 滚动条根据内容的变化
     */
    scrollMoveCal (
        dis: number // 文字移动距离
    ) {
        const canvas = uiStack.canvas;
        return - canvas.height * dis / canvas.innerHeight;
    };

    disabled (
        dir: number
    ) {
        if (!this.scrollShow) return true;

        if (dir > 0) {
            return this.scrollY <= 0;
        } else {
            return this.scrollY + this.scrollHeight > uiStack.canvas.height;
        }
    };

    draw() {
        if (!this.scrollShow) return;
        ctx.fillStyle = this.scrollColor;
        ctx.lineCap = 'square';
        ctx.beginPath();
        ctx.moveTo(this.scrollX + this.scrollRadius, this.scrollY);
        ctx.arcTo(this.scrollX + this.scrollWidth, this.scrollY, this.scrollX + this.scrollWidth, this.scrollY + this.scrollHeight, + this.scrollRadius);
        ctx.arcTo(this.scrollX + this.scrollWidth, this.scrollY + this.scrollHeight, this.scrollX, this.scrollY + this.scrollHeight, + this.scrollRadius);
        ctx.arcTo(this.scrollX, this.scrollY + this.scrollHeight, this.scrollX, this.scrollY, + this.scrollRadius);
        ctx.arcTo(this.scrollX, this.scrollY, this.scrollX + this.scrollWidth, this.scrollY, + this.scrollRadius);
        ctx.fill();
        ctx.closePath();
    }
};
