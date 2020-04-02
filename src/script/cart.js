!function ($) {
    function showlist(sid, num) {
        $.ajax({
            url: 'http://localhost/NZ_1903/project/php/cart.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.goods-item:hidden').clone(true, true);
                    $clonebox.find('.goods-pic').find('img').attr('src', value.url);//图片地址
                    $clonebox.find('.goods-pic').find('img').attr('sid', value.sid);//图片id
                    $clonebox.find('.goods-d-info').find('a').html(value.title);//标题
                    $clonebox.find('.b-price').find('strong').html(value.price);//价格
                    $clonebox.find('.quantity-form').find('input').val(num);//输入框
                    $clonebox.find('.b-sum').find('strong').html((value.price * num).toFixed(2));//商品价格
                    $clonebox.css('display', 'block');//克隆显示
                    $('.item-list').append($clonebox);//克隆添加
                    calall();
                }
            })
        })
    }
    if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {//获取cookie渲染页面
        let s = jscookie.get('cookiesid').split(',');
        let n = jscookie.get('cookienum').split(',');
        $.each(s, function (index, value) {
            showlist(s[index], n[index]);
        });
    }
    //单价
    function calone(obj) {
        let $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
        let $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
        return ($dj * $num).toFixed(2)
    }
    //总价
    function calall() {
        let $sum = 0;//选择商品的件数
        let $count = 0;//选择商品的总价
        $('.goods-item:visible').each(function (index, ele) {
            if ($(ele).find('.cart-checkbox input').prop('checked')) {
                $sum += parseInt($(ele).find('.quantity-form input').val());
                $count += parseFloat($(ele).find('.b-sum strong').html());
            }
        })
        $('.amount-sum').find('em').html($sum);
        $('.totalprice').html($count.toFixed(2));
    }
    // 全选框
    $('.allsel').on('change', function () {
        $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calall();//计算总价
    });
    let $inputs = $('.goods-item:visible').find(':checkbox');
    $('.item-list').on('change', $inputs, function () {
        if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calall();//计算总价
    });
    //增加商品
    $('.quantity-add').on('click', function () {
        let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
        $num++;
        $(this).parents('.goods-item').find('.quantity-form input').val($num);
        $(this).parents('.goods-item').find('.b-sum strong').html(calone($(this)));//单价
        calall();
        setcookie($(this));

    })
    //减少商品
    $('.quantity-down').on('click', function () {
        let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
        $num--;
        if ($num < 1) {//商品如果小于1的可能
            $num = 1
        }
        $(this).parents('.goods-item').find('.quantity-form input').val($num);
        $(this).parents('.goods-item').find('.b-sum strong').html(calone($(this)));//单价
        calall();
        setcookie($(this));

    })
    // 输入商品
    $('.quantity-form input').on('input', function () {
        let $reg = /^\d+$/g;//只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) {//不是数字
            $(this).val(1);
        }
        $(this).parents('.goods-item').find('.b-sum strong').html(calone($(this)));
        calall();//计算总价
        setcookie($(this));
    });


    let arrsid = [];//存储商品的编号
    let arrnum = [];//存储商品的数量
    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');
            arrnum = jscookie.get('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.goods-item').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
        jscookie.add('cookienum', arrnum, 10);
    }

    // 删除
    function delcookie(sid, arrsid) {
        let $index = -1;
        $.each(arrsid, function (index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        jscookie.add('cookiesid', arrsid, 10)
        jscookie.add('cookienum', arrnum, 10)
    }
    $('.b-action a').on('click', function () {
        cookietoarray();
        if (window.confirm('你确定要删除么？')) {
            $(this).parents('.goods-item').remove();
            delcookie($(this).parents('.goods-item').find('img').attr('sid'), arrsid);
            calall();
        }
    });
    $('.operation a').on('click', function () {
        cookietoarray();
        if (window.confirm('你确定要删除么？')) {
            $('.goods-item:visible').each(function () {
                if ($(this).find(':checkbox').is(':checked')) {
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid)
                }
            })
            calall();
        }
    })


}(jQuery);