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

    $(".page").pagination({
        pageCount: 3,
        jump: true,
        prevContent: '上一页',
        nextContent: '下一页',

    })
}(jQuery);