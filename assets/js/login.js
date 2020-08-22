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
        url: '/api/login',
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
        url: '/api/reguser',
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


//---------------------注册表单验证-----------------
// 1.用户名 密码 重复密码不能为空
// 2.密码 重复密码长度6-12位 且不能出现空格
// 3.两次密码需一致

// layui自定义验证规则使用步骤
//  1. 加载form模块 模块就layui封装的js对象 所有模块使用前必须先加载 除了弹层模块
var form = layui.form;
//  2. 调用form.verify()编写验证规则
// console.log(form);
form.verify({
    // 键（验证规则）: 值(验证方法 可以使用数字或函数)

    // 使用数组
    //  len: ['正则表达式','验证失败时的提示信息']
    len: [/^\S{6,12}$/,'长度6-12位,不能有空白'], 

    // 使用函数
    same: function (val) {
        // 形参 val, 表示使用验证规则的输入框的值
        // 比如重复密码使用了这个验证规则 形参val表示输入的重复密码
        // 功能代码
        // 获取密码
        var pwd = $('.pwd').val();
        // 比较
        if (pwd !== val) {
        // return 返回的值 就是错误提示信息
            return '两次密码不一致';
        }
    }
});