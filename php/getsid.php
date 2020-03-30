<?php
include "../php/coon.php";


if (isset($_GET['sid'])) {
    $sid = $_GET['sid']; //接收前端传入的sid
    $result = $conn->query("select * from goods where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
