// 加载form模块
var form = layui.form;
// ---------------------数据回填--------------------
// 定义渲染表单的函数
function renderForm() {
    // 发送ajax请求 获取用户信息
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            // 设置每个input的value值
            // $('input[name=username]').val(res.data.username);
            // $('input[name=nickname]').val(res.data.nickname);
            // $('input[name=email]').val(res.data.email);
            // $('input[name=id]').val(res.data.id);
            // 使用layui提供的 form.val()快速为表单赋值
            // form.val('表单的lay-filter属性值', { 回填的数据 });
            form.val('user', res.data);

        }
    });

}
renderForm();



// ---------------------点击确认修改按钮 完成修改--------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据
    var data = $(this).serialize();
    // console.log(data);
    // ajax提交给接口 完成用户信息修改
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data:data,
        success: function (res) {
            // console.log(res);
            layer.msg(res.message);
            if (res.status === 0) {
                // 修改成功 重新渲染index页面
                // 调用父页面的函数
                // getUserInfo();
                // 因为iframe 把userinfo 和 index 确认为父子页面
                window.parent.getUserInfo();
            }
        }
    });
})

// ----------------------------重置表单---------------------
// 点击重置按钮 会默认清空表单 但我们希望恢复成原来的样子
$('button[type=reset]').click(function (e) {
    e.preventDefault();
    // 恢复表单数据和刷新页面后看到的效果一样
    renderForm();
})