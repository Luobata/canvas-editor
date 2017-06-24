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
const targetStack = [];

export const pushTarget = function (
    target: Watcher
) {
    this.target = target;
}

export const popTarget = function () {
    this.target = null;
}
