var form = layui.form;
// -----------------------------获取分类 渲染到下拉框-------------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        var html = template('tpl-category', res);
        $('#category').html(html);
        form.render('select');
    }
});


// ---------------------------------初始化富文本编辑器----------------------
initEditor();

//--------------------------------- 处理封面图片-----------------------------
// 1. 初始化图片裁剪器
var $image = $('#image');

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options);

// 点击选择封面 能够选择图片
$('button:contains("选择封面")').click(function () {
    $('#file').click();
});

// 图片切换的时候 更换剪裁区的图片
$('#file').change(function () {
    // 先找到文件对象
    var fileobj = this.files[0];
    // 为选择的图片生成一个临时的url
    var url = URL.createObjectURL(fileobj);
    // 更换图片的src属性(销毁剪裁区  更换src属性  重新创建剪裁框)
    $image.cropper('destroy').attr('src', url).cropper(options);
})


// ------------------完成最终的添加文章----------------------
$('#add-form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据
    var fd = new FormData(this);
    // fd对象中 有content 但是值为空   没有图片
    // 1.获取富文本编辑器内容
    fd.set('content', tinyMCE.activeEditor.getContent());
    // 2.剪裁图片 转成blob形参二进制形式
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    canvas.toBlob(function (blob) {
        //追加到fd中 
        fd.append('cover_img', blob);
    });

    // 检查一些是否取得了接口要求的所有参数
    // fd.forEach((val, key) => {
    //     console.log(key, val);
    // })
    // 发送ajax请求 完成添加
    $.ajax({
        type: 'POST',
        url: '/my/article/add',
        data: fd,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 添加成功 到达列表页
                location.href = '/article/article.html'
            }
        },
        processData: false, //不用处理数据  不要把对象形式的fd转成查询字符串形式
        contentType: false //不要加默认请求头
    });
});