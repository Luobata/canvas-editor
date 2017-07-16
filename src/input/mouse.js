import * as draw from '../event/draw.js';
import { addEvent } from '../lib/util.js';
import {
    ui
} from '../ui/index.js';

const scrollDis = 15;

export const mouse = {
    wheelEvent: function (dom) {
        var that = this;
        addEvent(dom, 'mousewheel', function(e) {
            that.wheel(e);
        });
    },
    wheel: function (e) {
        // e.delta > 0 向上
        ui.scroll.scroller(e.delta, scrollDis);
    },
};
