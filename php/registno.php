<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>SSI/登録失敗</title>
  <link rel="stylesheet" href="../css/ress.min.css">
  <link rel="stylesheet" href="../css/registcompletion.css">
</head>

<body>
  <!-- background -->
  <div class="stars"></div>
  <div class="twinkling"></div>
  <div class="clouds"></div>
  <header>
    <h1>既に使用されているユーザーIDです</h1>
  </header>
  <main>
    <?php echo $Msg; ?>
    <p id="loginBtn" onclick="eventClick();">ユーザ登録に戻る</p>
    <p id="time">5秒後にユーザー登録に戻ります</p>
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

    $(function () {
      $('header, main').fadeMover({'inSpeed': 500});
    });

    setTimeout(function () {
      location.href = './regist.php';
    }, 5000);

    function eventClick() {
      location.href = "./regist.php";
    };
  </script>
</body>
</html>
