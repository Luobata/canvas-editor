/**
 * @description dep 主题对象事例
 */

import type Watcher from './watcher.js';

export default class Dep {
    subs: Array<Watcher>;

    constructor () {
        this.subs = [];
    };

    addSub (Watcher) {
        this.subs.push(Watcher);
    };

    removeSub (Watcher) {
        for (let i = 0; i < this.subs.length;) {
            if (this.subs[i] === Watcher) {
                this.subs.splice(i, 1);
                return;
            } else {
                i++;
            }
        }
    };

    depend () {
        if (this.target) {
            Dep.target.addDep(this);
        }
    };

    notify () {
        let sub = this.subs.slice();
        for (let i of sub) {
            i.update();
        }
    };
};

Dep.target = null;
// 可能存在递归调用 需要先把target存入队列中
const targetStack = [];

export const pushTarget = function (
    target: Watcher
) {
    targetStack.push(target);
    Dep.target = target;
}

export const popTarget = function () {
    Dep.target = targetStack.pop();
}
