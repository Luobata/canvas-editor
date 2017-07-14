/**
 * @description dep 主题对象事例
 */

import type Watcher from './watcher.js';

let uid = 0;

export default class Dep {
    subs: Array<Watcher>;
    id: number;

    constructor () {
        this.id = uid++;
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
        if (Dep.target) {
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
    if (Dep.target) {
        targetStack.push(Dep.target);
    }
    Dep.target = target;
}

export const popTarget = function () {
    Dep.target = targetStack.pop();
}
