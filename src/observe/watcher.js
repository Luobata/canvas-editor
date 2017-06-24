/**
 * @description 订阅者
 */

class Watcher {

    model: object;
    value: any;
    getter: Function;

    constructor (
        model: object,
        getter: Function,
        cb: Function
    ) {

        this.model = model;
        this.getter = getter;
    }
};
