<?php
  require("./loginlib.php");
  if (!empty($_POST["user"])) {
    $user = $_POST["user"];
    if (!empty($_POST["passwd"])) {
      $passwd = $_POST["passwd"];
      $ans = login($user, $passwd);
      if ($ans == OK) {
        //ログイン成功時
        include("./ssi.php");
      } else {
        $Msg = "<p id=\"error\">ユーザID又はパスワードが間違ってます</p>";
        include("./login.php");
      }
    }
  }
?>
