<?php
  session_start();
  // 操作説明初回以降非表示
  $backcnt = 0;
  if ($_SESSION["BACKCNT"]) {
      $backcnt = $_SESSION["BACKCNT"];
  }
  if ($_POST["backcnt"] && $backcnt != 1) {
      $backcnt++;
  }
  $_SESSION["BACKCNT"] = $backcnt;
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SSI</title>
  <link rel="stylesheet" href="../css/ssi.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>

<body>
  <!-- ローディング処理 -->
  <div class="loading loadingIn">
    <div class="loadingimg loadingIn">
      <img src="../images/loadingimage.png" alt="ローリング画像">
      <div id="cnt">
        <p><span class="count fontType" data-num="100">0</span>％</p>
      </div>
    </div>
  </div>

  <div class="operationWrap operationin">
    <!-- bg -->
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="clouds"></div>

    <!-- operationmain -->
    <button id="opeBack"><img src="../images/ope_back.png" alt="戻るボタン"></button>
    <div class="opetitle">
      <h1>操作説明</h1>
    </div>
    <div class="operationposi">
      <!-- 1ページ目 -->
      <div class="page1">
        <div class="operation">
          <img src="../images/operation_one.png" alt="クリック画像">
          <div class="text">
            <p>①惑星を選択すると...？</p>
          </div>
        </div>
        <p class="arrow">&gt;</p>
        <div class="operation">
          <img src="../images/operation_twe.png" alt="勉強例">
          <div class="text">
            <p>②誰よりも物知りに！</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>

      <!-- 2ページ目 -->
      <div class="page2 pagenone">
        <div class="list">
          <ul>
            <li><img src="../images/user_off.png" alt="ユーザーボタン">アカウント管理が出来る。<br>Aキーでも可能。</li>
            <div class="clear"></div>
            <li><img src="../images/stop_off.png" alt="ストップボタン">惑星の動きを制御出来る<br>Sキーでも可能。</li>
            <div class="clear"></div>
          </ul>
        </div>
      </div>

      <!-- 3ページ目 -->
      <div class="page3 pagenone">
        <div class="list">
          <ul>
            <li><img src="../images/speech_off.png" alt="音声認識ボタン">音声入力によって惑星選択が出来る。<br>Dキーでも可能。</li>
            <div class="clear"></div>
            <li><img src="../images/operation_off.png" alt="操作説明ボタン">操作説明表示が出来る。<br>Fキーでも可能。</li>
            <div class="clear"></div>
          </ul>
        </div>
      </div>
    </div>

    <!-- prev -->
    <button class="btn prev btnnone">&lsaquo;</button>
    <!-- next -->
    <button class="btn next">&rsaquo;</button>
  </div>

  <!-- キャンバス処理 -->
  <canvas id="stage" class="move"></canvas>

  <!-- ユーザボタン -->
  <div id="userWrap">
    <button class="infoBtn userBtn"><img src="../images/user_off.png" alt="ユーザー情報"></button>
  </div>

  <!-- ユーザ詳細など -->
  <div class="infoWrap userinfo userOut">
    <button id="userBack"><img src="../images/back_on.png" alt="戻るボタン"></button>
    <div id="user">
      <p><?php echo $_SESSION["NAME"]; ?><br><span>さん</span></p>
    </div>
    <div id="logintime">
      <p>--- 日時 ---<br><span id="today"></span><br><span id="time"></span></p>
    </div>
    <div id="logout" class="lognone">
      <form action="./login.php" method="post">
        <input type="submit" name="logout" value="Landing">
      </form>
    </div>
  </div>

  <!-- ストップボタン -->
  <div id="stopWrap">
    <button class="infoBtn stopBtn"><img src="../images/stop_off.png" alt="画面切り替え"></button>
  </div>

  <!-- Web Speech API ボタン -->
  <div id="speechWrap">
    <button class="infoBtn speechBtn"><img src="../images/speech_off.png" alt="音声操作"></button>
  </div>

  <!-- マイク -->
  <div class="masc none"></div>
  <div class="micWrap micOut">
    <p>どの<span>惑星</span>を選びます?</p>
    <div class="micImg">
      <i class="fa fa-microphone mic" aria-hidden="true"></i>
      <div class="volume-viewer-volume"></div>
    </div>
  </div>

  <!-- 操作説明ボタン -->
  <div class="operationBtn"><button class="infoBtn opeBtn"><img src="../images/operation_off.png" alt="操作説明"></button></div>

  <!-- ページ遷移 -->
  <div class="inbg inbg1 none"></div>
  <div class="inbg inbg2 none"></div>
  <div class="inbg inbg3 none"></div>
  <div class="inbg inbg4 none"></div>

  <script src="../js/jquery-3.3.1.min.js"></script>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/preloadjs-min.js"></script>
  <script src="../js/audioManager.min.js"></script>
  <script>
    let backcnt = <?php echo $backcnt; ?>;
  </script>
  <script src="../js/all.js"></script>
</body>

</html>
