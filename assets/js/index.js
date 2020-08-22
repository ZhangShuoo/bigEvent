// ----------------------到达index页面 渲染头像和欢迎语---------------
function getUserInfo() {
    // 发送ajax请求 获取用户信息 (必须先登录 保证本地存储有token)
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                // 设置欢迎语(有昵称用昵称 没有昵称用用户名)
                var name = res.data.nickname || res.data.username;
                $('.username').text(name);
                // 渲染头像(有图片使用图片 没有图片使用字体图像)
                if (res.data.user_pic) {
                    // 设置图片
                    // 让img显示
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    // 获取名字的首字符 变为大写 
                    var first = name.substr(0, 1).toUpperCase();
                    // show() 设置元素的display属性 值就是标签的默认值
                    $('.text-avatar').text(first).css('display','inline-block');
                }

            }
        },
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
}
getUserInfo();






// ----------------------------------退出功能---------------------
// 点击退出按钮 询问是否退出 确定退出 1.跳转到登录页面 2.清除本地存储中的token
$('#logout').click(function () {
    // 询问是否退出
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 1. 清除token
        localStorage.removeItem('token');
        // 2. 跳转到登录页面
        location.href = 'login.html';
        layer.close(index);
      });
    
})