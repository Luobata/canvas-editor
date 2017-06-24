/**
 * @description 订阅者
 */

import Dep, {
    pushTarget,
} from './dep.js';

class Watcher {

    model: object;
    value: any;
    getter: Function;
    deps: Array<Dep>;

    constructor (
        model: object,
        getter: Function,
        cb: Function
    ) {

        this.model = model;
        this.getter = getter;
        this.value = get();
    };

    get () {
        // 依赖收集
        pushTarget(this);

        const value = this.getter.call(this.model);

        popTarget();

        return value;
    };

    addDep (
        dep: Dep
    ) {
        this.deps.push(dep);
    };
};
