var dialog = require('../../components/dialog');

$('#tab-done .weui_cell').on('click', function() {
    dialog.show('确定删除任务 ' + this.querySelector('p').innerText + ' 了吗');
});

if(module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        $('#tab-done .weui_cell').off();
    });
}