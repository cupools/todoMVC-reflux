/*jshint esnext:true*/
'use strict';

import 'css/normalize.css';
import 'weui';
import './index.css';

import $ from 'zepto';
import pageActions from 'js/actions/pageActions';
import pageStore from 'js/stores/pageStore';

import 'components/list';
import 'components/edit';

initApp();

function initApp() {
    listener();
    pageActions.render.list();
}

function listener() {
    pageStore.listen(({page}) => {
        $('section').hide();
        $(page).show();
    });
}

if(module.hot) {
    module.hot.accept();
}