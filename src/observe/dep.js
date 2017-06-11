/**
 * @description dep 发布者
 */

export default class Dep {
    subs: Array<Watcher>;

    constructor () {
        this.subs = [];
    };

    addSub (Watcher) {
        this.subs.push(Watcher);
    };

    notify () {
        let sub = this.subs.slice();
        for (let i of sub) {
            i.update();
        }
    }
}

Dep.target = null;
