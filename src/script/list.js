!function ($) {
    const $list = $('.list');

    $.ajax({
        url: 'http://localhost/NZ_1903/project/php/list.php',
        dataType: 'json'
    }).done(function (data) {
        console.log(data)
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            $strhtml += `
                <li>
                    <a href="datail.html?sid=${value.sid}">
                        <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        <p>${value.title}</p>
                        <p class="miaoshu">${value.miaoshu}</p>
                        <p class="price">
                            <strong>￥${value.price}</strong>
                            <span>销量：${value.salenumber}</span>
                        </p>
                    </a>
                </li>
            `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);
        // 懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

    });

    // 分页
    $('.page').pagination({
        pageCount: 2,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://localhost/NZ_1903/project/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '<ul>';
                $.each(data, function (index, value) {
                    $strhtml += `
                    <li>
                    <a href="datail.html?sid=${value.sid}">
                    <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        <p>${value.title}</p>
                        <p class="miaoshu">${value.miaoshu}</p>
                        <p class="price">
                            <strong>￥${value.price}</strong>
                            <span>销量：${value.salenumber}</span>
                        </p>
                    </a>
                </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                // 懒加载
                $(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            })
        }
    });
}(jQuery);