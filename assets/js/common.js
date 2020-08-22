// 统一配置项目的ajax请求

$.ajaxPrefilter(function (option) {
    // option表示ajax选项
    
    // 1.url统一配置(所有接口都需要配置)
    option.url = 'http://ajax.frontend.itheima.net' + option.url;

    // 完整的url http://ajax.frontend.itheima.net/my/userinfo 
    if (option.url.includes('/my/')) {
         // 2.headers 请求头加token(是以 /my 开头的接口 需要这个配置)
        option.headers = {
            Authorization: localStorage.getItem('token')
        }

    // 3.ajax请求完成之后 判断token真假(是以 /my 开头的接口 需要这个配置)
        option.complete = function (xhr) {
            if (xhr.reponseJSON && xhr.reponseJSON.status === 1) {
                // 说明token无效
                // 1. 删除无效token
                localStorage.removeItem('token');
                // 2. 跳转登录页面
                location.href = '/login.html';
            }
        }
        
    }
   
})