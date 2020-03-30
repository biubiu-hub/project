const username = document.querySelector('.username');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');

btn.onclick = function () {
    if (username.value !== '' && password.value !== '') {
        $ajax({
            type: 'post',
            url:'http://localhost/NZ_1903/project/php/login.php',
            data: {
                user: username.value,
                pass: password.value
            },
            success: function (d) {
                if (!d) {
                    alert('用户名或密码输入错误');
                } else {
                    location.href = 'index.html';
                    jscookie.add('loginname', username.value, 7)

                }
            }
        })

    } else{
        alert('用户名或密码输入错误');
    }
}