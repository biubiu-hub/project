!function ($) {
    //1.获取列表页传来的sid
    let $sid = location.search.substring(1).split('=')[1];

    const $smallpic = $('#smallpic');
    const $bpic = $('#bpic');
    const $title = $('.loadtitle');
    const $miaoshu=$('.miaoshu');
    const $price = $('.loadpcp');

    //如果$sid不存在，默认$sid = 1(标题栏处)
    if (!$sid) {
        $sid = 1;
    }

    //2.将sid传给后端
    $.ajax({
        url: 'http://localhost/NZ_1903/project/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (d) {
        $smallpic.attr('src', d.url);//小图添加图片
        $smallpic.attr('sid', d.sid);//给图片添加唯一的sid
        $bpic.attr('src', d.url);//渲染大图
        $title.html(d.title);//渲染标题
        $miaoshu.html(d.miaoshu);//渲染标题

        $price.html(d.price);//渲染价钱
        //渲染箭头小图
        let picarr = d.ullist.split(',');
        let $strhtml = '';
        $.each(picarr, function (index, value) {//遍历每个li
            $strhtml += '<li><img src="' + value + '"/></li>';
            
        });
        $('#list ul').html($strhtml);
    });

    //3.放大镜效果
    const $spic = $('#spic');//小图
    const $sf = $('#sf');//小放
    const $bf = $('#bf');//大放
    const $left = $('#left');//左箭头
    const $right = $('#right');//右箭头
    const $list = $('#list');//小图列表

    //小放/大放=小图/大图
    $sf.width($spic.width() * $bf.width() / $bpic.width());//小放的宽
    $sf.height($spic.height() * $bf.height() / $bpic.height());//小放的高
    let $bili = $bpic.width() / $spic.width();//比例大于1 放大效果


    $spic.hover(function () {
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
        $(this).on('mousemove', function (ev) {
            let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;//小放距离上下的值
            let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
            //限制小放移动范围
            if ($leftvalue < 0) {//左
                $leftvalue = 0;
            } else if ($leftvalue >= $spic.width() - $sf.width()) {//右
                $leftvalue = $spic.width() - $sf.width()
            }

            if ($topvalue < 0) {//上
                $topvalue = 0;
            } else if ($topvalue >= $spic.height() - $sf.height()) {//下
                $topvalue = $spic.height() - $sf.height()
            }

            $sf.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bpic.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });

        });
    }, function () {
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });

    //小图切换
    $('#list ul').on('click', 'li', function () {
        //$(this):当前操作的li
        let $imgurl = $(this).find('img').attr('src');
        $smallpic.attr('src', $imgurl);
        $bpic.attr('src', $imgurl);
    });

    //左右箭头事件
    let $num = 6;//列表显示的图片个数
    
    $right.on('click', function () {
        let $lists = $('#list ul li');
        if ($lists.size() > $num) {//限制点击的条件
            $num++;
            $left.css('color', '#333');
            if ($lists.size() == $num) {
                $right.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });


    $left.on('click', function () {
        let $lists = $('#list ul li');
        if ($num > 6) {//限制点击的条件
            $num--;
            $right.css('color', '#333');
            if ($num <= 6) {
                $left.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });


    // 数量加减
    $('.add').on('click', function () {
        let $num = $(this).parents('.goodsinfo-word').find('.p-btn input').val();
        $num++;
        $(this).parents('.goodsinfo-word').find('.p-btn input').val($num);
    });
    $('.lose').on('click', function () {
        let $num = $(this).parents('.goodsinfo-word').find('.p-btn input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.goodsinfo-word').find('.p-btn input').val($num);
    });
    $('.p-btn input').on('input', function () {
        let $reg = /^\d+$/g;//只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) {//不是数字
            $(this).val(1);
        }
    });


    //2.怎么存储--数组
    let arrsid = [];//存储商品的编号。
    let arrnum = [];//存储商品的数量。

    // 加入购物车

    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');//cookie转数组
            arrnum = jscookie.get('cookienum').split(',');//cookie转数组
        } else {
            arrsid = [];
            arrnum = [];
        }
    }


    $('.join .joincart').on('click', function () {
        //获取当前商品对应的sid
        let $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
        //判断是第一次点击还是多次点击
        //多次点击
        //$.inArray(value,array,[fromIndex])
        //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) {//$sid存在，商品列表存在，数量累加
            //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());//取值
            arrnum[$.inArray($sid, arrsid)] = $num;//赋值
            jscookie.add('cookienum', arrnum, 10);
        } else {
            //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
            arrsid.push($sid);//将编号$sid push到arrsid数组中
            jscookie.add('cookiesid', arrsid, 10);
            arrnum.push($('#count').val());//将数量push到arrnum数组中
            jscookie.add('cookienum', arrnum, 10);
        }
        alert('加入购物车成功');
    });
}(jQuery);