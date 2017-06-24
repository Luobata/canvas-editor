/**
 * @description scroll对象
 */

export default class Scroll {

    scrollHeight: number;
    scrollWidth: number;
    scrollX: number;
    scrollY: number;
    scrollRadius: number;
    scrollShow: boolean;

    computed: objcet; // 计算属性， 依赖其他模块的值

    constructor (obj, ui) {
        this.scrollHeight = obj.height;
        this.scrollWidth = obj.width;
        this.scrollY = 0;
        this.scrollShow = false; // 默认不显示
        this.computed = {
            scrollX () {
                return ui.canvas.width - this.scrollWidth;
            },
            scrollY () {
                return this.getScrollHeight(ui) * this.scrollY / this.height;
            },
            scrollHeight () {
                return this.getScrollHeight(ui);
            }
        }

    };

    getScrollHeight(ui) {
        // 滚动条高度 = canvas容器高度^2 / 容器的高度
        // barwidth / wrapwidth = wrapwidth / contentwidth
        // stack.scroll.height = canvas.canvasInnerHeight * canvas.canvasInnerHeight / stack.container.height;
        const canvas = ui.canvas;
        if (canvas.height >= canvas.innerHeight) return 0;
        const height = Math.pow(canvas.height, 2) / canvas.innerHeight;
        return height;
    }
};
