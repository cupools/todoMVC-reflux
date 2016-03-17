/*jshint esnext:true*/
'use strict';

import './style.css';

import todoStore from 'js/stores/todoStore';
import pageActions from 'js/actions/pageActions';
import todoActions from 'js/actions/todoActions';
import compiler from 'js/compiler.js';
import $ from 'zepto';
import tmpl from './tmpl-item.html';

init();

function init() {
    listener();
    bindEvent();

    todoActions.toggleItem(false);
}

function listener() {
    todoStore.listen(render);
}

function bindEvent() {
    $('.weui_tabbar a').on('click', function() {
        let status = (+$(this).attr('data-status') > 0);
        todoActions.toggleItem(status);
    });

    $('.weui_btn').on('click', function() {
        let list = $('input[type=checkbox]:checked'),
            ret = list.map((index, item) => +item.id.slice(1));
        if($(this).hasClass('weui_btn_primary')) {
            todoActions.finishItem([...ret]);
        } else {
            todoActions.delItem([...ret]);
        }
    });

    $('#toggle_btn').on('click', function() {
        pageActions.render.edit();
    });
}

function render(payload) {
    if(payload.status) {
        $('.weui_btn').removeClass('weui_btn_primary').addClass('weui_btn_warn').text('删除');
    } else {
        $('.weui_btn').removeClass('weui_btn_warn').addClass('weui_btn_primary').text('完成');
    }
    if(payload.list.length < 1) {
        $('.weui_btn').hide();
    }  else {
        $('.weui_btn').show();
    }
    $('.weui_bar_item_on').removeClass('weui_bar_item_on');
    $('[data-status="' + (payload.status ? 1 : 0) + '"]').addClass('weui_bar_item_on');
    $('.weui_cells_title').text(payload.status ? '已完成' : '未完成');
    $('.weui_cells_checkbox').html(compiler.render(tmpl, payload));
}
