/*jshint esnext:true*/
'use strict';

import Reflux from 'reflux';

export default Reflux.createActions({
    'render': {
        children: ['list', 'edit']
    }
});