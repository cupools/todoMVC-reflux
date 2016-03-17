/*jshint esnext:true*/
'use strict';

import Reflux from 'reflux';
import todoActions from '../actions/todoActions';

let identify = 0,
    storage = {
        get: () => {
            let list = JSON.parse(window.localStorage.getItem('todo') || '[]');
            return list.length ? createIdentify(list) : createIdentify([
                    {
                        info: '到西园拿快递',
                        done: false
                    }, {
                        info: '打扫寝室卫生',
                        done: false
                    }, {
                        info: '收拾旧书',
                        done: false
                    }, {
                        info: '聚会吃宵夜',
                        done: true
                    }
                ]);
        },
        set: (list) => {
            window.localStorage.setItem('todo', JSON.stringify(list));
        },
        clean: () => {
            return window.localStorage.removeItem('todo');
        }
    };

function createIdentify(list) {
    return list.map(item => {
        item.id = ++ identify;
        return item;
    });
}

export default Reflux.createStore({
    listenables: [todoActions],
    list: [],
    status: false,
    init: function() {
        this.list = storage.get();
    },
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
        storage.set(this.list);
        this.render();
    },
    render: function() {
        this.trigger({
            list: this.list.filter(item => item.done === this.status),
            status: this.status
        });
    }
});