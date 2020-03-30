!function ($) {
    // 登录
    let $login = $('.login');
    let $admin = $('.admin');
    let $span = $('.admin span')
    let $close = $('.admin a')
    if (jscookie.get('loginname')) {
        $admin.show()
        $login.hide()
        $span.html(jscookie.get('loginname'));
    }
    $close.on('click', function () {
        $admin.hide();
        $login.show();
        jscookie.del('loginname');

    })


    // banner
    const oBanner = document.querySelector('.banner');
    const pic = document.querySelectorAll('.banner ul li');
    const btn = document.querySelectorAll('.banner ol li');
    const leftBn = document.querySelector('.leftBn');
    const rightBn = document.querySelector('.rightBn');

    let $leftBn = $('.leftBn')
    let index = 0
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function () {
            index = i;
            cirswitch();
        }
    }

    leftBn.onclick = function () {
        index--;
        if (index < 0) {
            index = btn.length - 1;
        }
        cirswitch();
    }
    rightBn.onclick = function () {
        index++;
        if (index > btn.length - 1) {
            index = 0;
        }
        cirswitch();
    }

    let timer = setInterval(function () {
        rightBn.onclick();
    }, 3000)
    oBanner.onmouseover = function () {
        clearInterval(timer);
    }
    oBanner.onmouseout = function () {
        timer = setInterval(function () {
            rightBn.onclick();
        }, 3000)
    }

    function cirswitch() {
        for (let j = 0; j < btn.length; j++) {
            btn[j].className = '';
            bufferMove(pic[j], { opacity: 0 });
        }
        btn[index].className = 'active';
        bufferMove(pic[index], { opacity: 100 });
    }

    // 二级菜单链接列表页
    let $menuli = $('.banner_menu li');
    let $banner_menuList = $('#banner_menuList');
    let $item = $('#banner_menuList .item');

    $menuli.on('mouseover', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $banner_menuList.show();
        $item.eq($(this).index()).show().siblings('.item').hide();
    });
    $menuli.on('mouseout', function () {
        $(this).removeClass('active');
        $banner_menuList.hide();
    });
    $banner_menuList.on('mouseover', function () {
        $(this).show();
    })
    $banner_menuList.on('mouseout', function () {
        $(this).hide();
    })

    // 第一块内容渲染
    const $watch_random = $('.watch_random');
    $.ajax({
        url: 'http://localhost/NZ_1903/project/php/index.php',
        dataType: 'json',
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            $strhtml += `
                <li>
                        <img class="lazy" data-original="${value.url}" width="160" height="160"/>
                        <p>${value.title}</p>
                        <span>${value.miaoshu}</span>
                        <strong>￥${value.price}</strong>
                </li>
            `;
        });
        $strhtml += '</ul>';
        $watch_random.html($strhtml);
        // 懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    })


    // 楼梯
    let $louti = $('#loutinav');
    let $loutili = $('#loutinav li');
    let $louceng = $('#content .louceng');
    function scroll() {
        let $top = $(window).scrollTop();
        $top >= 500 && $top <= 3500 ? $louti.show() : $louti.hide();

        $louceng.each(function (index, element) {
            let $lctop = $louceng.eq(index).offset().top + $(element).height() / 2;
            if ($lctop > $top) {
                $loutili.removeClass('active');
                $loutili.eq(index).addClass('active');
                return false;
            }
        });
    }
    scroll();
    $(window).on('scroll', function () {
        scroll();
    })
    $loutili.not('.last').on('click', function () {
        $(window).off('scroll');
        $(this).addClass('active').siblings('li').removeClass('active');
        let $top = $louceng.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop: $top
        }, function () {
            $(window).on('scroll', function () {
                scroll();
            })
        });
    });
}(jQuery);