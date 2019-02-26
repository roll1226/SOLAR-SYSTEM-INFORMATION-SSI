<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>地球/EARTH</title>
  <link rel="stylesheet" href="../css/earth.css">
</head>

<body>
  <!-- ページ遷移 -->
  <div class="planetloadWrap">
    <div class="loadingWrap">
      <div class="loadingtext">
        <p class="text text1">地</p>
      </div>
      <div class="loadingtext">
        <p class="text text3">球</p>
      </div>
    </div>
  </div>
  <div class="loadingbg loadingbg1"></div>
  <div class="loadingbg loadingbg2"></div>
  <div class="loadingbg loadingbg3"></div>

  <!-- BACK -->
  <form action="./ssi.php" method="POST">
    <input type="submit" value="BACK" id="back" name="backcnt">
  </form>

  <!-- 描画 -->
  <canvas id="stage"></canvas>
  <!-- 説明 -->
  <div id="info">
    <header>
      <h1>地球/EARTH</h1>
    </header>
    <main class="main">
      <!-- 1ページ目 -->
      <div class="infotext1">
        <div class="title">
          <h2>地球の特徴</h2>
        </div>
        <p id="earthimg1"><img src="../images/earthinfo.gif" alt="地球情報"><?php echo $_SESSION["NAME"]; ?>さんが生活している惑星。地球は約46億年前に誕生いたと考えられている。最初は宇宙のガスやちりが集まっただけで、大気はなかった。徐々に水ができて生命が生まれ、今の地球のように酸素ができた。地球の表面の7割は水がしめている。太陽系の惑星の中で生命が存在しているのは地球だけである。</p>
        <div class="clear"></div>
        <div class="title">
          <h2>生命の誕生</h2>
        </div>
        <p id="earthimg2"><img src="../images/life.jpg" alt="生命">最初の生命が誕生したのは約38億年前。地上には強い紫外線が降り注ぎ、火山活動は活発で、陸上は生物が生存するには厳しい環境だったため生命誕生の場は海の中でした。生物の材料となったのはアミノ酸、核酸塩基、糖などの有機物で、これらは原始大気中の二酸化炭素や窒素、水などの無機物に雷の放電、紫外線などのエネルギーが加えられて誕生した。</p>
      </div>
      <!-- 2ページ目 -->
      <div class="infotext2 none">
        <div class="title">
          <h2>磁気圏</h2>
        </div>
        <p id="earthimg3"><img src="../images/magnetosphere.jpg" alt="磁気圏">地球の核は鉄やニッケルなどの合金でできており、内核が固体、外核が液体となっている。液体の外核のなかで内核が回転運動することによって電流が発生し、地球をひとつの大きな磁石にしていると考えられている。これはダイナモ作用と呼びますが、ダイナモの特徴として磁場の向きが時々反転している。地磁気の南北反転が少なくとも過去数億年にわたって続いてきたことが、地球の岩石に残された残留磁気の測定から分かっている。</p>
        <div class="clear"></div>
        <p id="earthimg4"><img src="../images/aurora.jpg" alt="オーロラ">この地磁気は地球を取り巻いて磁気圏を形成しており、地球の大気だけでは防ぎきれない、生物にとって有害な太陽風や宇宙線などをある程度防ぐバリアの役割を果たしている。また、磁気圏が強い太陽風を受けることで磁気嵐が発生し、地球の極地方でオーロラが見られる原因になっている。</p>
        <div class="clear"></div>
      </div>

      <!-- prev,nextボタン -->
      <div id="arrow">
        <button class="pnBtn prev none">
          <img src="../images/arrowprev.png" alt="戻る">
        </button>
        <button class="pnBtn next">
          <img src="../images/arrownext.png" alt="進む">
        </button>
      </div>
    </main>
  </div>
  <script src="../js/jquery-3.3.1.min.js"></script>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/planet.js"></script>
  <script src="../js/earth.js"></script>
</body>

</html>
