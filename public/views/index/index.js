'use strict';

require('normalize.css');
require('weui');
require('./index.css');

require('../../components/todo/todo.js');
require('../../components/done/done.js');

var $ = require('zepto');

function init() {
    $('#tab-todo').addClass('tab-active');
    $('.weui_tabbar_item').bind('click', toggle);
}

function toggle(ev) {
    var el = $(ev.target),
        target = el.attr('data-target');

    $('.weui_tabbar_item').removeClass('weui_bar_item_on');
    el.addClass('weui_bar_item_on');

    $('.tab').removeClass('tab-active');
    $('#' + target).addClass('tab-active');
}

init();

if(module.hot) {
    module.hot.accept();
}