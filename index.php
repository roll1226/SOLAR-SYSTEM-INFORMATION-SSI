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
      <h1 tabindex="-1">
        {{ opetitle }}
      </h1>
    </div>
    <div class="operationposi" tabindex="-1">
      <!-- 1ページ目 -->
      <div class="page1" tabindex="-1" v-html="page1" v-show="p1"></div>
      <!-- 2ページ目 -->
      <div class="page2" tabindex="-1" v-html="page2" v-show="p2"></div>
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
    <div v-for="item in items" v-html="item.div"></div>
  </div>

  <!-- ボタン類 -->
  <div id="btnWrap">
    <!-- ユーザボタン -->
    <div id="userWrap" tabindex="-1">
      <button class="infoBtn userBtn" tabindex="-1" onclick="ubtn();">
        <img :src="'./images/user' + imgChange + '.png'" alt="ユーザー情報" tabindex="-1" v-on:mouseover="mouseover"  v-on:mouseleave="mouseleave">
      </button>
    </div>

    <!-- ストップボタン -->
    <div id="stopWrap" tabindex="-1">
      <button class="infoBtn stopBtn" tabindex="-1" onclick="sbtn();">
        <img :src="'./images/stop' + imgChange + '.png'" alt="画面切り替え" tabindex="-1" v-on:mouseover="mouseover"  v-on:mouseleave="mouseleave">
      </button>
    </div>

    <!-- Web Speech API ボタン -->
    <div id="speechWrap" tabindex="-1" onclick="abtn();">
      <button class="infoBtn speechBtn" tabindex="-1">
        <img :src="'./images/speech' + imgChange + '.png'" alt="音声操作" tabindex="-1" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave">
      </button>
    </div>

    <!-- 操作説明ボタン -->
    <div id="opewrapbtn" class="operationBtn" tabindex="-1" onclick="obtn();">
      <button class="infoBtn opeBtn" tabindex="-1">
        <img :src="'./images/operation' + imgChange + '.png'" alt="操作説明" tabindex="-1" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave">
      </button>
    </div>
  </div>

  <!-- マイク -->
  <div id="mic" tabindex="-1" v-html="mic"></div>

  <!-- ページ遷移 -->
  <div id="bggo" tabindex="-1">
    <div tabindex="-1" v-for="item in items" v-html="item.bg"></div>
  </div>

 <!-- VR -->
  <div id="vr">
    <button v-bind:class="vr" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave" v-on:click="vrIn" v-html="vr_i"></button>
  </div>

  <!-- QRcode -->
  <div id="qr" :class="qrdisplay">
    <div id="msc" :class="qrAni" @click="qrClick">
      <div id="code" :class="qrImg" v-html="img"></div>
    </div>
  </div>

  <!-- js -->
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
