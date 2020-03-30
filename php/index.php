<?php
header('content-type:text/html;charset=utf-8');

include "../php/coon.php";
$sql = "select * from goods";

$result = $conn->query($sql); 

$arr = array();
for ($i = 0; $i < 8; $i++) {
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);
