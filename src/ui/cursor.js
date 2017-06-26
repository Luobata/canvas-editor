/**
 * @description cursor对象
 */

export default class Cursor {

    cursorX: number;
    cursorY: number;
    isShow: boolean;

    $computed: object;

    constructor (obj, ui) {
        this.cursorX = ui.canvas.padding;
        this.cursorY = ui.canvas.padding;
        this.isShow = true;
    }
};
