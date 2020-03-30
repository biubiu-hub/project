!(function ($) {
    // 用户名
    let $username = $(".username");
    let $spanerr = $('form p span')
    let $userlock = true;

    // 用户名
    $username.on('blur', function () {
        if ($username.val() !== '') {
            $.ajax({
                type: 'post',
                url: 'http://localhost/NZ_1903/project/php/register.php',
                data: {
                    xingming: $username.val()
                }
            }).done(function (d) {
                if (!d) {
                    $spanerr.eq(0).html('√').css('color', 'green');
                    $userlock = true;
                } else {
                    $spanerr.eq(0).html('用户名已经存在').css('color', 'red');
                    $userlock = false;
                }
            })
        } else {
            $spanerr.eq(0).html('用户名不能为空').css('color', 'red');
            $userlock = false;
        }
    })


    // 输入密码
    let $password = $('.password')
    $password.on('focus', function () {
        $spanerr.eq(1).html('请输入6-12位密码').css('color', '#999');
    })
    $password.on('input', function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 12) {
            let regnum = /[0-9]+/g;  //数字
            let reguppercase = /[A-Z]+/g;//大写
            let reglowercase = /[a-z]+/g;//小写
            let other = /[\W_]+/g;//特殊字符  //\W:非数字字母下划线
            let count = 0;//进行统计种类。
            if (regnum.test($(this).val())) count++;
            if (reguppercase.test($(this).val())) count++;
            if (reglowercase.test($(this).val())) count++;
            if (other.test($(this).val())) count++;
            //通过count的值判断有几种数据类型
            switch (count) {
                case 1:
                    $spanerr.eq(1).html('弱').css('color', 'red');
                    flag4 = true;
                    break;
                case 2:
                case 3:
                    $spanerr.eq(1).html('中').css('color', 'orange');
                    flag4 = true;
                    break;
                case 4:
                    $spanerr.eq(1).html('强').css('color', 'green');
                    flag4 = true;
                    break;
            }
        } else {
            $spanerr.eq(1).html('密码长度有误').css('color', 'red');
            flag4 = false;
        }
    })
    $password.on('blur', function () {
        if ($(this).val() !== '') {
            if (flag4) {
                $spanerr.eq(1).html('√').css('color', 'green');
                flag4 = true;
            } else {
                $spanerr.eq(1).html('密码格式有误').css('color', 'red');
                flag4 = false;
            }
        } else {
            $spanerr.eq(1).html('密码不能为空').css('color', 'red');
            flag4 = false;
        }
    })
    //确认密码
    let $repass = $('.repass')
    $repass.on('focus', function () {
        $spanerr.eq(2).html('请确认密码').css('color', '#999');
    });
    $repass.on('input', function () {
        if ($(this).val() !== $password.val()) $spanerr.eq(2).html('两次密码不一致').css('color', 'red');
        else $spanerr.eq(2).html('√').css('color', 'green');
    })

    //提交事件
    $('form').on('submit', function () {
        if ($username.val() == '') {
            $spanerr.eq(0).html('用户名不能为空').css('color', 'red');
            $userlock = false;
        }else  if ($password.val() == '') {
            $spanerr.eq(1).html('密码不能为空').css('color', 'red');
            $userlock = false;
        }else  if ($repass.val() == '') {
            $spanerr.eq(2).html('请确认密码').css('color', 'red');
            $userlock = false;
        }
        if (!$userlock) {
            return false;//阻止提交
        }
    });
})(jQuery)