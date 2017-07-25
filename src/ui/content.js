/**
 * @description font对象
 */

import Font from './font.js';
import {
    canvas,
    ctx,
    fontConf
} from './config.js';

import {
    drawAll
} from './draw.js';
import {
    isBorder 
} from './cursor.js';
import {
    txtLength
} from '../lib/ui.js';

let uiStack;


export default class Content {

    heightCount : number; // 内容区域的高度
    viewY: number; // 内容区域与canvas的区域的交界处的y坐标点
    fontArray: Array<Font>;

    $computed: object; // 计算属性

    constructor (obj, ui) {
        this.fontArray = [];
        this.viewY = 0;

        this.xxx = 0; // 测试数据 暂时保留
        this.yyy = 0;

        uiStack = ui;

        this.$computed = {
            heightCount () {
                let height = 0;
                let y = 0;
                for (let i of this.fontArray) {
                    if (i.y !== y) {
                        //  说明当前内容在下一行
                        height += i.height;
                        y = i.y;
                    }
                }

                return height;
            },
            xx () {
                return this.yyy + this.xxx;
            }
        };
    };

    start() {
        setInterval(() => {
            const x = this.yyy;
            this.xxx = this.xxx + 2;
        }, 1000);
    };

    pushFont (
        font: object
    ) {
        //this.fontArray.push(font);
        //drawAll();
        let i;
        let item;
        let isEnd = true;
        let txtArr = this.fontArray;
        for (i = 0; i < txtArr.length; i++) {
            item = txtArr[i];
            if ((item.x >= font.x && item.y === font.y) || font.y < item.y) {
                isEnd = false;
                if (item.x >= font.x) {
                    font.height = item.height;
                } else {
                    font.height = item.height + (font.y - item.y);
                }
                txtArr.splice(i, 0, new Font(font, uiStack));
                break;
            }
        }
        if (isEnd) {
            txtArr.push(new Font(font, uiStack));
        }

        if (i !== (txtArr.length - 1)) {
            format(i + 1, txtArr);
        }
    };

    deleteFont (
        x: number,
        y: number
    ) {
        let i;
        let item;
        let isEnd = true;
        let txtArr = this.fontArray;
        let deleteFun = (i) => {
            if (i < 0) return;
            item = txtArr.splice(i, 1)[0];
            format(i, txtArr, item);
            uiStack.cursor.cursorPosition(- item.width, item.x, item.y);
            uiStack.cursor.cursorChange(- item.width);
            if (uiStack.cursor.cursorX === uiStack.canvas.padding) {
                let lastFont = this.fontArray[this.fontArray.length - 1];
                uiStack.cursor.cursorX = lastFont.x + lastFont.width;
                uiStack.cursor.cursorY = lastFont.y;
            }
        };
        for (i = 0; i < txtArr.length; i++) {
            item = txtArr[i];
            if ((item.x >= x && item.y === y) || y < item.y) {
                deleteFun(i - 1);
                isEnd = false;
                break;
            }
        }

        if (isEnd) {
            deleteFun(txtArr.length - 1);
        }
    };

    clearFont () {
        this.fontArray.lengt = 0;
    };

    draw () {
        for (let i of this.fontArray) {
            i.draw();
        }
    };
};

const format = function (index, txtArr, fonts) {
    let i;
    let item;
    let wid;
    const startX = uiStack.canvas.padding;
    for (i = index; i < txtArr.length; i++) {
        item = txtArr[i];
        wid = txtLength(item);
        wid = fonts ? - wid : wid;
        if (isBorder('left', wid, item.x) && fonts) {
            // TODO判断删除一个元素后 下一行的第一个元素是否上来是个问题
            item.x = txtArr[i - 1].x - wid;
            item.y = txtArr[i - 1].y;
        } else if (isBorder('right', wid, item.x + fontConf.height) && !fonts) {
            item.x = startX;
            item.y += fontConf.height;
        } else {
            item.x += wid;
        }
    }
};
