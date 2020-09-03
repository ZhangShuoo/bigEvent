
var form = layui.form; //加载表单模块
var laypage = layui.laypage; //加载分页模块

// 全局变量 设置ajax请求(获取文章列表)的参数
var data = {
    pagenum: 1,  //页码值 分页获取数据 表示获取第几页的数据
    pagesize: 2, //每页显示多少条数据
    // cate_id: 1,  //这里应该填分类id 而不是分类名称
    // state: ''
};

// ----------------------1.ajax获取文章列表，渲染到页面-------------------
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                // 调用模板引擎
                // console.log(res);
                var html = template('tpl-list', res);
                $('tbody').html(html);

                // 调用创建分页函数
                createPage(res.total);
            }
        }
    })
}
renderArticle();


// ----------------------------2.发送ajax请求 获取所有分类--------------------
// 获取所有分类后 渲染到页面下拉菜单
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        if (res.status === 0) {
            // console.log(res);
            // 使用模板引擎渲染到下拉框
            var html = template('tpl-cate', res);
            $('#category').html(html);
            // 更新渲染
            form.render('select');
        }
    }
});


// ----------------------------定义模板过滤器 处理时间--------------------
template.defaults.imports.formaDate = function (t) {
    // 创建时间日期对象
    var date = new Date(t);
    // 获取年月日时分秒
    var y = date.getFullYear();
    var m = add0(date.getMonth() + 1);
    var d = add0(date.getDate());
    var hh = add0(date.getHours());
    var mm = add0(date.getMinutes());
    var ss = add0(date.getSeconds());
    return y +'-'+ m + '-' + d + ' ' + hh + ':' + mm + ':' +ss;
}
// 定义补0函数
function add0(n) {
    return n < 10 ? '0' + n : n;
}



// -------------------------------3.layui的分页模块-------------------------
function createPage(total) {
    laypage.render({
        elem: 'page',//注意，这里的 page 是 页面中div的 ID，不用加 # 号
        count: total, //数据总数，从服务端得到文章总数
        limit: data.pagesize,  //每页显示多少条 默认是10 实际开发中 应该让它和data.pagesize一样
        limits: [2,3,5,8],  // 自定义每页显示多少条的下拉菜单
        curr: data.pagenum,      //当前页  实际中 应该和data.pagenum一致
        // prev: '<<'
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        // 刷新页面jump触发一次 切换页码的时候也会触发
        jump: function (obj, first) {
            // obj  当前所有分页的选项值  当前分页所有配置项
            // first 是否首次一般用于初始加载的判断 刷新页面后first==true 后续页码切换时first==undefined
            // console.log(obj);
            if (!first) {
                // 修改ajax请求参数
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                renderArticle();
            }
        }
      });
}
// renderPage();


// -------------------------------4.筛选-------------------------
// 筛选的时候 改变请求参数 重新渲染页面
$('#search').on('submit', function (e) {
    e.preventDefault();
    // 获取分类id和状态
    var cate_id = $('#category').val();
    var state = $('#state').val();
    // console.log(cate_id, state);
    data.cate_id = cate_id;
    data.state = state;
    // 重置页码为1
    data.pagenum = 1;
    renderArticle();
})