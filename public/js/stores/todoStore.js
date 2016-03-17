/*jshint esnext:true*/
'use strict';

import Reflux from 'reflux';
import todoActions from '../actions/todoActions';

let identify = 0;

export default Reflux.createStore({
    listenables: [todoActions],
    list: [{
        id: 0,
        info: '拖地',
        done: false
    }, {
        id: 1,
        info: '洗澡',
        done: false
    }, {
        id: 2,
        info: '扫地',
        done: false
    }, {
        id: 3,
        info: '洗碗',
        done: true
    }],
    status: false,
    onAddItem: function(info) {
        this.updateList([...this.list, {
            info: info,
            done: false,
            id: ++identify
        }]);
    },
    onDelItem: function(id) {
        this.updateList(this.list.filter(item => id.indexOf(item.id) < 0));
    },
    onFinishItem: function(id) {
        this.updateList(this.list.map(item => {
            if(id.indexOf(item.id) > -1) {
                console.log(item)
                item.done = true;
            }
            return item;
        }));
    },
    onToggleItem: function(status) {
        this.status = !!status;
        this.render();
    },
    updateList: function(list) {
        this.list = [...list];
        this.render();
    },
    render: function() {
        this.trigger({
            list: this.list.filter(item => item.done === this.status),
            status: this.status
        });
    }
});