/*jshint esnext:true*/
'use strict';

import Reflux from 'reflux';
import pageActions from '../actions/pageActions';

const PAGE = {
    LIST: '#list_wrap',
    EDIT: '#edit_wrap'
};

export default Reflux.createStore({
    listenables: [pageActions],
    payload: {
        page: null
    },
    onRenderList: function() {
        this.update({
            page: PAGE.LIST
        });
    },
    onRenderEdit: function() {
        this.update({
            page: PAGE.EDIT
        });
    },
    update: function(payload) {
        Object.assign(this.payload, payload);
        this.trigger(payload);
    }
});