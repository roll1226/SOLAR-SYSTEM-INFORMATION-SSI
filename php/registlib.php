<?php
  require("./conf.php");
  function regist($user, $passwd, $name) {
    $con = mysqli_connect("mariadb","root","password");
    if (mysqli_connect_errno($con)) {
      $Msg = "<h2>データーの接続に失敗しました。</h2>";
      $ans = 1;
    } else {
      mysqli_set_charset($con,"utf8");
      if (mysqli_select_db($con,"ssi")) {
        //タイムゾーン設定
        //date_default_timezone_set("Asia/Tokyo");
        //登録日取得
        $nowDate = Date("Y/m/d H:i:s");
        //SQL生成(挿入)
        $sql = "insert into ssi values ('".$user."','".$passwd."','".$name."','".$nowDate."');";
        $result = mysqli_query($con,$sql);
        if (!$result) {
          //挿入SQLが失敗
          //$Msg = "<h2>SQLの実行に失敗しました。:".$sql."</h2>";
          // include("./registno.php");
          $ans = ERROR;
        } else {
          // include("./registok.php");
          $ans = OK;
        }
      }
      mysqli_close($con);
    }
    return $ans;
  }
?>
