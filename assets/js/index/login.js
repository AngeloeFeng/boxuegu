//定义模块
/*
 *1.给登录按钮注册点击事件
 *2.在点击触发时获取用户名与密码
 3.表单验证,判断用户名和密码是否为空,如果用户名和密码为空,则不发送请求
 4.使用jquery发送ajax请求,把数据传给服务器
 *  
 */
require(['/boxuegu/bxg/assets/js/config.js'],function () {
    // 这个函数就是在config.js加载完成后执行!
    require(['jquery','cookie'],function($){
        //1.注册事件
        var $sub=$('#sub');
        $sub.on('click',clickHandler);
        function clickHandler(e){
            e.preventDefault() //禁用默认事件
            //2.获取用户名与密码
            var username=$('#name').val();
            var password=$('#pass').val();
            //3.表单验证

            var options={
                url:'/api/login',
                type:'post',
                data:{
                    tc_name:username,
                    tc_pass:password
                },
                success:function(data){
                    console.log(data);
                    if (data.code == 200){
                        // window.alert('登录成功!')
                        $.cookie('userinfo',JSON.stringify(data.result),{expires:7,path:'/'})
                        window.location.href='/boxuegu/bxg/views/index/dashboard.html'
                    }
                }
            }
            $.ajax(options);
        }
    })
})
