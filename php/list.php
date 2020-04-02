<?php
header('content-type:text/html;charset=utf-8');

include "../php/coon.php";

$pagesize = 8; //单个页面展示的数据条数

$sql = "select * from goods";
$result = $conn->query($sql); //获取数据的结果集(记录集)

$num = $result->num_rows; //记录集的总条数
$pagenum = ceil($num / $pagesize); //获取页数 


if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize;

$sql1 = "select * from goods limit $page,$pagesize";
$res = $conn->query($sql1);

$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}

echo json_encode($arr);//输出接口
