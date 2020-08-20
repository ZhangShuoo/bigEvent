
// -------------------切换两个登录注册两个盒子--------------
$('.login a').click(function () {
    $('.register').show().prev().hide(); 
});
$('.register a').click(function () {
    $('.login').show().next().hide();
})

// ---------------------登录功能----------------------------
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // 收集账号密码
    var data = $(this).serialize();
    // ajax提交
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                // 把token保存到本地存储
                localStorage.setItem('token', res.token);
                // 跳转到index.html
                location.href = '/index.html';
            }
        }
    })
})


// ---------------------注册功能----------------------------
// 表单提交 阻止默认行为 收集用户名 密码 ajax提交给注册接口
$('.register form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function (res) {
            // console.log(res);
            layer.msg(res.message);
            if (res.status === 0) {
                // 注册成功显示登录的盒子
                $('.login').show().next().hide();
                // 清空注册的表单 reset是dom方法
                $('.register form')[0].reset();

            }

        }
    })
})