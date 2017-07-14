/**
 * @description 订阅者
 */

import Dep, {
    pushTarget,
    popTarget
} from './dep.js';

export default class Watcher {

    model: object;
    value: any;
    getter: Function;
    deps: Array<Dep>;
    newDeps: Array<Dep>;
    depIds: Set;
    newDepIds: Set;
    expression: string;

    constructor (
        model: object,
        getter: Function,
        cb: Function
    ) {

        this.model = model;
        this.getter = getter;
        this.deps = [];
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.expression = getter.toString();

        this.value = this.get();
    };

    get () {
        // 依赖收集
        if (this.expression.indexOf('console.log(2)') !== -1) {
            debugger;
        }
        pushTarget(this);

        const value = this.getter.call(this.model);

        popTarget();
        this.cleanDeps();

        return value;
    };

    evaluate () {
        this.value = this.get();
    };

    addDep (
        dep: Dep
    ) {
        const id = dep.id;
        this.deps.push(dep);
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    };

    cleanDeps () {
        // 清楚多余的dep依赖
        for (let i of this.deps) {
            if (!this.newDepIds.has(i.id)) {
                i.removeSub(this);
            }
        }

        // 交换 depIds 和 newDepIds
        let tmp;
        tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();

        // 交换 deps 和 newDep
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
    };

    depend () {
        for (let i of this.deps) {
            i.depend();
        }
    };

    update () {
        this.value = this.getter.call(this.model);
    };
};
