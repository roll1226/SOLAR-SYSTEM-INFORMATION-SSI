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
  <link rel="stylesheet" href="./css/index.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>

<body>
  <div id="keyup">
    <input type="text" id="keyupText" autofocus @keyup.su="su" @keyup.me="me" @keyup.v="v" @keyup.e="e" @keyup.mo="mo" @keyup.ma="ma" @keyup.j="j" @keyup.sa="sa" @keyup.u="u" @keyup.n="n">
  </div>
  <!-- ローディング処理 -->
  <div id="loading" class="loading loadingIn" tabindex="-1" v-html="loading"></div>

  <div id="operationwrap" class="operationWrap operationin" tabindex="-1">
    <!-- bg -->
    <div id="bgstar" tabindex="-1" v-for="item in items" v-html="item.bg"></div>

    <!-- operationmain -->
    <button id="opeBack" tabindex="-1" onclick="bbtn();" v-html="opeback"></button>
    <div class="opetitle" tabindex="-1">
      <h1 tabindex="-1">操作説明</h1>
    </div>
    <div class="operationposi" tabindex="-1">
      <!-- 1ページ目 -->
      <div class="page1" tabindex="-1" v-html="page1" v-show="p1"></div>
      <!-- 2ページ目 -->
      <div class="page2" tabindex="-1" v-html="page2" v-show="p2"></div>
      <!-- 3ページ目 -->
      <div class="page3" tabindex="-1" v-html="page3" v-show="p3"></div>
    </div>

    <!-- prev -->
    <button class="btn prev" tabindex="-1" @click="prev" v-show="pbtn">&lsaquo;</button>
    <!-- next -->
    <button class="btn next" tabindex="-1" @click="next" v-show="nbtn">&rsaquo;</button>
  </div>

  <!-- キャンバス処理 -->
  <canvas id="stage" class="move" tabindex="-1"></canvas>

  <!-- ユーザ詳細など -->
  <div class="infoWrap userinfo userOut" tabindex="-1">
    <button id="userBack" tabindex="-1" onclick="uback();"><img src="./images/back_on.png" alt="戻るボタン"></button>
    <div id="user" tabindex="-1">
      <p tabindex="-1">ゲスト<br><span tabindex="-1">さん</span></p>
    </div>
    <div id="logintime" tabindex="-1">
      <p tabindex="-1">--- 日時 ---<br><span id="today" tabindex="-1"></span><br><span id="time" tabindex="-1"></span></p>
    </div>
    <div id="logout" class="lognone" tabindex="-1">
      <!-- <form action="./logoutlib.php" method="post" tabindex="-1">
        <input type="submit" name="logout" value="Sign Out" tabindex="-1">
      </form> -->
      <img src="./images/rogo.png"alt="ロゴ">
    </div>
  </div>

  <div id="btnWrap">
    <!-- ユーザボタン -->
    <div id="userWrap" tabindex="-1">
      <button class="infoBtn userBtn" tabindex="-1" onclick="ubtn();">
        <img src="./images/user_off.png" alt="ユーザー情報" tabindex="-1" v-on:mouseover="mouseover" v-if="imgChange">
        <img src="./images/user_on.png" alt="ユーザー情報" tabindex="-1" v-on:mouseleave="mouseleave" v-else>
      </button>
    </div>

    <!-- ストップボタン -->
    <div id="stopWrap" tabindex="-1">
      <button class="infoBtn stopBtn" tabindex="-1" onclick="sbtn();">
        <img src="./images/stop_off.png" alt="画面切り替え" tabindex="-1" v-on:mouseover="mouseover" v-if="imgChange">
        <img src="./images/stop_on.png" alt="画面切り替え" tabindex="-1" v-on:mouseleave="mouseleave" v-else>
      </button>
    </div>

    <!-- Web Speech API ボタン -->
    <div id="speechWrap" tabindex="-1" onclick="abtn();">
      <button class="infoBtn speechBtn" tabindex="-1">
        <img src="./images/speech_off.png" alt="音声操作" tabindex="-1" v-on:mouseover="mouseover" v-if="imgChange">
        <img src="./images/speech_on.png" alt="音声操作" tabindex="-1" v-on:mouseleave="mouseleave" v-else>
      </button>
    </div>

    <!-- 操作説明ボタン -->
    <div id="opewrapbtn" class="operationBtn" tabindex="-1" onclick="obtn();">
      <button class="infoBtn opeBtn" tabindex="-1">
        <img src="./images/operation_off.png" alt="操作説明" tabindex="-1" v-on:mouseover="mouseover" v-if="imgChange">
        <img src="./images/operation_on.png" alt="操作説明" tabindex="-1" v-on:mouseleave="mouseleave" v-else>
      </button>
    </div>
  </div>

  <!-- マイク -->
  <div id="mic" tabindex="-1" v-html="mic"></div>

  <!-- ページ遷移 -->
  <div id="bggo" tabindex="-1">
    <div tabindex="-1" v-for="item in items" v-html="item.bg"></div>
  </div>

  <script src="./js/three.min.js"></script>
  <script src="./js/orbitcontrols.js"></script>
  <script src="./js/preloadjs-min.js"></script>
  <script src="./js/vue.min.js"></script>
  <script src="./js/audioManager.min.js"></script>
  <script>
    let backcnt = <?php echo $backcnt; ?>;
  </script>
  <script src="./js/all.js"></script>
</body>

</html>
