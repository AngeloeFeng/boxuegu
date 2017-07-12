require(['/boxuegu/bxg/assets/js/config.js'],function () {
    require([
        'jquery',
        '/boxuegu/bxg/assets/js/getarg.js',
        'validate',
        'form',
        'datepicker',
        '/boxuegu/bxg/assets/js/common.js','zh'],function ($,obj) {
        var options = {
            url:'/api/teacher/edit',
            type:'get',
            data:{
                tc_id:obj.tc_id
            },
            success:function (data) {
                console.log(data)
                if (data.code === 200) {
                    var $tcName=$('input[name="tc_name"]')
                    var $tcJoinDate=$('input[name="tc_join_date"]')
                    var $tcType= $('select[name="tc_type"]')
                    var $tcGender = $('input[name="tc_gender"]')
                    var obj=data.result
                    $tcName.val(obj.tc_name)
                    $tcJoinDate.val(obj.tc_join_date)
                    var num=obj.tc_type === 0 ? 1 : 0
                    $($tcType.find('option')[num]).attr('selected',true)
                    var num=obj.tc_gender === 0 ? 1 : 0
                    $($tcGender[num]).attr('checked',true)
                }
            }
        }
        $.ajax(options)

        //进行表单验证
        $('form').validate({
            submitHandler:function () {
                $('form').ajaxSubmit({
                    url:'/api/teacher/update',
                    type:'post',
                    data:{
                        //这个tc_id会被追加到表单中与其他参数一同发给后端
                        tc_id:obj.tc_id
                    },
                    success:function (data) {
                        if (data.code === 200) {
                            window.alert(data.msg)
                        }
                    },
                    error:function () {}
                })
            },
            //规则:
            rules:{
                //规则里是通过name属性值来区分的
                //属性值是对象,就是对这个inout标签值得限制条件
                tc_name:{
                    required:true,
                    rangelength:[2,20]
                },
                tc_join_date:{
                    required:true,
                    date:true
                }
            },
            //规则对应的提示信息
            messages:{
                //规则里是通过name属性值来区分的
                //属性值是对象,就是对这个input标签值得提示信息
                tc_name:{
                    required:'不能为空',
                    rangelength:'长度不正确'
                },
                tc_join_date:{
                    required:'日期不能为空',
                    date:'格式不对'
                }
            }
        })

        //日期插件
        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy/mm/dd',
            language:'zh-CN',
            orientation:'bottom right'
        })
    })
})
