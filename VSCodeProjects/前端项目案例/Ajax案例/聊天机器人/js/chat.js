$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();


    // 为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function() {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        // 如果用户输入了内容，则将内容追加到页面上显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+ text +'</span></li>')
        $('#ipt').val('');
        resetui();
        // 发起请求，获取聊天内容
        getMsg(text);
    })

    // 获取聊天机器人发送回来的消息
    // 聊天信息文字 url 用这个地址  http://www.liulongbin.top:3006/api/robot
    function getMsg(text) {
        $.ajax({
            type: "GET",
            url: " http://www.liulongbin.top:3006/api/robot",
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res);
                if (res.message === 'success') {
                    // 接收聊天消息
                    var msg = res.data.info.text;
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+ msg +'</span></li>');
                    // 重置滚动条的位置
                    resetui();

                    // 调用 getVoice 函数，把文字转换为语音
                    getVoice(msg);
                }
            }
        });
    }


    // 把文字转换为语音进行播放
    // 语音 url 用这个地址  http://www.liulongbin.top:3006/api/synthesize 
    function getVoice(text) {
        $.ajax({
            type: "GET",
            url: " http://www.liulongbin.top:3006/api/synthesize",
            data: {
                text: text
            },
            success: function (res) {
                // console.log(res);
                if (res.status === 200) {
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        });
    }

    // 为文本输入框绑定一个按键输入事件
    $('#ipt').on('keyup', function(e) {
        if (e.keyCode === 13) {
            $("#btnSend").click();
        }
    });
})


