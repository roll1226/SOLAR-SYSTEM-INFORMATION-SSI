<?php require("./logoutlib.php"); ?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>SSI/ログインページ</title>
  <link rel="stylesheet" href="../css/loginregist.css">
</head>

<body>
  <!-- background -->
  <div class="stars"></div>
  <div class="twinkling"></div>
  <div class="clouds"></div>
  <header>
    <h1><img src="../images/rogo.png" alt="SSI"></h1>
  </header>
  <main>
    <!-- エラーメッセージ -->
    <?php echo $Msg; ?>
    <form action="./loginfile.php" method="POST">
      <table>
        <tr>
          <!-- ユーザID -->
          <td>
            <input type="text" name="user" id="user" placeholder="ユーザID" autocomplete="off" required>
          </td>
        </tr>
        <tr>
          <!-- パスワード -->
          <td class="passMa">
            <input type="password" name="passwd" id="passwd"placeholder="パスワード" autocomplete="off" required required minlength="4">
          </td>
        </tr>
        <tr>
          <!-- ログインボタン -->
          <td>
            <input type="submit" name="login" value="Lift-Off" id="login">
          </td>
        </tr>
        <tr>
          <td id="or">---------  or  ---------</td>
        </tr>
      </table>
    </form>
    <!-- アカウント作成 -->
    <button id="signup">Create Account</button>
  </main>
  <script src="../js/jquery-3.3.1.min.js"></script>
  <script src="../js/jquery.fademover.min.js"></script>
  <script>
    history.pushState(null, null, null);
    $(window).on('popstate', function (event) {
      if (!event.originalEvent.state) {
        history.pushState(null, null, null);
        return;
      }
    });
    $(function(){
      $('main').fadeMover({'inSpeed': 1000});
    });
    $('#signup').click(function () {
        location.href = './regist.php';
    });
  </script>
</body>

</html>
