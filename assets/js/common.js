/**
 * 这里就完成其他页面公共要使用的功能!
 * 功能1.判断用户是否登录
 * 功能2.从cookie读取用户的资料,并展示
 * 功能3.导航菜单交互(展开与收起)
 * 功能4.退出登录
 * 功能5.让页面打开时有进度条,让每个ajax发送过程有进度
 */

define(['jquery','nprogress','cookie'],function($,NProgress){
  NProgress.start()

  validSignIn() //判断是否登录
  getInfo()     //获取用户资料并显示
  navToggle()   //导航菜单交互
  signOut()     //退出登录
    globalAjaxEvent () // 注册全局的ajax事件，添加进度条!

  //功能1. 都放在函数里,使结构清晰
  function validSignIn(){
    //思路是获取cookie中的PHPSESSID这个cookie,只要它的值存在就登录反之就不登录
    var sessionID=$.cookie('PHPSESSID')
    if (!sessionID) {
      //如果没有登录,就跳转登录页面
      window.location.href='/boxuegu/bxg/views/index/login.html'
    }
  }

  //功能2.
  function getInfo() {
    var userInfo=JSON.parse($.cookie('userinfo'))
    //头像
    $('.profile img').attr('src',userInfo.tc_avatar)
    //用户名
    $('.profile h4').text(userInfo.tc_name)
  }
  //功能3.
  function navToggle () {
    $('.navs li a').on('click',function (e) {
        // slideToggle是jquery控制元素展示与隐藏的方法
        $(this).next('ul').slideToggle()
    })
  }
  //功能4.退出登录
 function signOut() {
    $('.fa-sign-out').closest('li').on('click',clickHandler)
  function clickHandler (e) {
    var options={
      url:'/api/logout',
      type:'post',
      success:function (data) {
          if (data.code === 200) {
            window.location.href='/boxuegu/bxg/views/index/login.html'
          }
      }
    }
    $.ajax(options);
  }

 }

// 功能5:
    function globalAjaxEvent() {
        $(document).ajaxStart(function () {
            NProgress.start()
        })
        $(document).ajaxStop(function () {
            NProgress.done()
        })
    }
    $(function () {
        NProgress.done()
    })
})