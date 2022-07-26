window.onload = function () {
    // 获取网页中的所有的表单元素
    var inputs = document.querySelectorAll('input');
    // 遍历表单元素，检查表单元素上是否存在自定义属性
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.dataset['req']) {
            // 表单上有必填自定义属性
            var errMsg = input.dataset['err-msg'] || '数据不能为空';
            var sucMsg = input.dataset['suc-msg'] || '有效数据';
            // 给表单元素绑定onblur事件的处理函数
            bind(input, { name: 'req' }, errMsg, sucMsg);
        }else if (input.dataset['minLen']) {
            // 表单上有必填自定义属性
            var errMsg = input.dataset['err-msg'] || '数据的长度不能小于' + input.dataset['minLen'] + '不能大于' + input.dataset['maxLen'];
            var sucMsg = input.dataset['suc-msg'] || '有效数据';
            // 给表单元素绑定onblur事件的处理函数
            bind(input, { name: 'min-len', val1: input.dataset['minLen'] , val2: input.dataset['maxLen']}, errMsg, sucMsg);
        }else if (input.dataset['len']) {
            // 表单上有必填自定义属性
            var errMsg = input.dataset['err-msg'] || '数据的长度是' + input.dataset['len'] ;
            var sucMsg = input.dataset['suc-msg'] || '有效数据';
            // 给表单元素绑定onblur事件的处理函数
            bind(input, { name: 'len', val: input.dataset['len'] }, errMsg, sucMsg);
        }
    }


    /*
    功能：绑定失去标点事件的处理函数
    参数：el,表单元素
    type,验证的类型，req表示必填 minlen 最小长度
    errMsg,错误提示信息
    sucMsg,成功提示信息
     */
    function bind(el, type, errMsg, sucMsg) {
        // 构造正则表达式对象
        var reg = null;
        switch (type.name) {
            case 'req': reg = /^\w+$/ig;
            break;
            case 'min-len': reg = /\w{3,6}/ig;
                break;
            case 'len': reg = /^\d{6}$/ig;
            break;
        }
        // 获取显示提示信息的元素对象
        var td = el.parentNode.nextElementSibling;
        // 订阅失去焦点事件的处理函数
        input.onblur = function () {
            if (!reg.test(this.value)) {
                td.innerHTML = errMsg;
                td.style.color = 'red';
                return false;
            } else {
                td.innerHTML = sucMsg;
                td.style.color = 'green';
                return true;
            }
        }
    }
}