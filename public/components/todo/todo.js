var dialog = require('../../components/dialog');

$('#tab-todo .weui_cell').on('click', function() {
    dialog.show('已经完成任务 ' + this.querySelector('p').innerText + ' 了吗');
});

if(module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        $('#tab-todo .weui_cell').off();
    });
}