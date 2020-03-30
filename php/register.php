<?php
include "../php/coon.php";
//接收前端的用户名进行判断
if (isset($_POST['xingming'])) {
    $xingming = $_POST['xingming'];
    $result = $conn->query("select * from preuser where username = '$xingming'");
    if ($result->fetch_assoc()) { //存在
        echo true;  //1
    } else { //不存在
        echo false;  //空隙''
    }
}


if (isset($_POST['submit'])) {
    $username   = $_POST['username'];
    $password = sha1($_POST['password']);
    $repass = sha1($_POST['repass']);
    $email = $_POST['email'];
    // 数据库接收值
    $conn->query("insert preuser values(null,'$username','$password','$repass','$email',NOW())");
    header('location:http://localhost/NZ_1903/project/src/html/login.html');
}
