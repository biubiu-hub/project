function $ajax(obj) {
    function objtostring(obj) {
        if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
            let arr = [];
            for (let attr in obj) {
                arr.push(attr + '=' + obj[attr])//[a=1, b=2 ,c=3]
            }
            return arr.join('&');//a=1&b=2&c=3
        } else {
            throw new Error('你输入的不是一个纯粹的对象');
        }
    }
    let ajax = new XMLHttpRequest();//新建ajax对象
    //1.默认get请求，此参数可有省略。
    obj.type = obj.type || 'get';

    //2.接口地址不能为空
    if (!obj.url) {
        throw new Error('接口地址不能为空!');
    }
    //3.发送数据的get和post兼容问题。
    if (obj.data) {//判断数据是否存在，同时数据是否是对象。
        if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
            obj.data = objtostring(obj.data);
        } else {//不是对象
            obj.data = obj.data;
        }
    }
    //4.数据存在，是get方式传输数据?
    if (obj.data && obj.type === 'get') {
        obj.url += '?' + obj.data;
    }

    //6.是否异步，如果同步的话，无需进行onreadystatechange事件监听。
    if (obj.async === 'false' || obj.async === false) {
        obj.async = false;
    } else {
        obj.async = true;
    }

    ajax.open(obj.type, obj.url, obj.async);//打开接口，设置请求方式和是否异步


    //5.数据存在，是post方式传输数据?
    if (obj.data && obj.type === 'post') {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(obj.data);
    } else {
        ajax.send();//发送解析。
    }

    //7.同步和异步的判断写法。
    //8.获取接口数据--重点
    //想办法将获取的接口数据传递出来，不能将处理数据的过程放到函数内部做。
    //在函数调用中操作数据，必须在函数调用中获取数据。
    if (obj.async) {//异步
        ajax.onreadystatechange = function () {//监听上面的send方法
            if (ajax.readyState === 4) {//请求成功
                if (ajax.status === 200) {//接口地址正确
                    obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);//执行调用对象的里面方法。
                } else {//接口地址错误
                    obj.error && typeof obj.error === 'function' && obj.error('接口地址有误!' + ajax.status)
                }
            }
        }
    } else {//同步
        if (ajax.status === 200) {//接口地址正确
            obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);//执行调用对象的里面方法。
        } else {//接口地址错误
            obj.error && typeof obj.error === 'function' && obj.error('接口地址有误!' + ajax.status)
        }
    }

}