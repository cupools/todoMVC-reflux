/*jshint esnext:true*/
'use strict';

import './style.css';

import $ from 'zepto';
import todoActions from 'js/actions/todoActions';
import pageActions from 'js/actions/pageActions';
import pageStore from 'js/stores/pageStore';

let dom = {
        textarea: $('#edit_wrap textarea'),
        confirm: $('#edit_wrap .weui_btn_plain_primary'),
        quit: $('#edit_wrap .weui_btn_plain_default')
    };

init();

function init() {
    listener();
    bindEvent();
}

function listener() {
    pageStore.listen(() => {
        dom.textarea.val('');
        dom.textarea.focus();
    });
}

function bindEvent() {
    dom.confirm.on('click', function() {
        if(dom.textarea.val()) {
            todoActions.addItem(dom.textarea.val());
            pageActions.render.list();
        }
    });

    dom.quit.on('click', function() {
        pageActions.render.list();
    });
}