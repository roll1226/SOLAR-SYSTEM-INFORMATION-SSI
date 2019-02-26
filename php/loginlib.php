<?php
  session_start();
  require("./conf.php");

  function logIn($user, $passwd) {
    $con = mysqli_connect("mariadb","root","password");//DBサーバー接続
    if (mysqli_connect_errno($con)) {
      $Msg = "<p id=\"error\">データーの接続に失敗しました。</p>";
      $ans = 0;
    } else {
      mysqli_set_charset($con, "utf8");
      if (mysqli_select_db($con, "ssi")) {
        $sql = "select count(*) from ssi where UserID ='".$user."' and PassWD = '".$passwd."';";//ログインチェックSQL
        $result = mysqli_query($con, $sql);

        //ログインチェック
        $cnt = mysqli_fetch_array($result);
        if ($cnt["count(*)"] == 1) {
          $sqlName = "select * from ssi where UserID = '".$user."' and PassWD = '".$passwd."';";
          $resultName = mysqli_query($con, $sqlName);
          $row = mysqli_fetch_array($resultName);
          $name = $row["UserNAME"];
          $_SESSION["NAME"] = $name;
          // include("./ssi.php");
          $ans = OK;
        } else {
          //ログイン失敗
          // $Msg = "<p id=\"error\">ユーザID又はパスワードが間違ってます</p>";
          // include("./login.php");
          $ans = ERROR;
        }
      }
      mysqli_close($con);
    }
    return $ans;
  }
?>
