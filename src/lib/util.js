/**
 * @description 辅助函数
 */

export const isObj = function (obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
};

export const isFun = function (obj) {
    return typeof obj === 'function';
};

export const def = function (
    obj: Object,
    key: string,
    val: any,
    enumerable?: boolean
) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
};


// 判断是否支持__proto__属性
export const hasProto = '__proto__' in {};

// src的__proto__ 移动到target上
export const protoAugment = function (
    target: Object,
    src: Object
) {
    if (hasProto) {
        target.__proto__ = src;
    }
};

// 兼容浏览器的鼠标事件绑定
export const addEvent = (function (window, undefined) {
    var _eventCompat = function(event) {
        var type = event.type;
        if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }

        if (event.srcElement && !event.target) {
            event.target = event.srcElement;    
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function() {
                event.returnValue = false;
            };
        }

        return event;
    };
    if (window.addEventListener) {
        return function(el, type, fn, capture) {
            if (type === "mousewheel" && document.mozHidden !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function(event) {
                fn.call(this, _eventCompat(event));
            }, capture || false);
        }
    } else if (window.attachEvent) {
        return function(el, type, fn, capture) {
            el.attachEvent("on" + type, function(event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));    
            });
        }
    }
    return function() {};    
})(window);
