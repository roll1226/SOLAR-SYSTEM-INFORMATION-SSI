initLoadingAnimation();

window.addEventListener('load', function () {
  const mercuryPlanet = new planet('../images/mercury.jpg', 50, 20, 20);
  const { scene, camera, controls, renderer } = createPlanetScene();

  const mercuryMesh = new THREE.Mesh(mercuryPlanet.Geometry, mercuryPlanet.Material);
  scene.add(mercuryMesh);

  startRenderLoop(scene, camera, controls, renderer, function () {
    mercuryMesh.rotation.y += 0.005;
  });
});

new Vue({
  el: '#planetloadWrap',
  data: {
    mercury: [
      { text: '<p class="text text1">水</p>' },
      { text: '<p class="text text3">星</p>' }
    ]
  }
});

new Vue({
  el: '#maintitle',
  data: { maintitle: '<h1>水星/MERCURY</h1>' }
});

// 1ページ目
planetVue.page1 = `<div class="title">
                     <h2>
                       水星の特徴
                     </h2>
                   </div>
                   <div id="mercuryimg1">
                     <p>
                       <img src="../images/planet/mercury.jpg" alt="水星情報">水星は太陽系でもっとも太陽に近くにある。大気はほとんどないので、表面の温度は昼間は450℃、夜中は-180℃まで下がる。岩石と金属から水星は出来ている。
                     </p>
                   </div>
                   <div id="mercuryimg2">
                     <p>
                       <img src="../images/planet/mercury1.jpg" alt="カルロス盆地">水星には大きなクレーターで出来ているカロリス盆地がある。カロリス盆地とは、クレーターのまわりを丸くかこんでいるカロリス山脈という波模様がついている場所のこと。
                     </p>
                   </div>
                   <div class="clear"></div>

                   <div class="title">
                     <h2>
                       水星の発見
                     </h2>
                   </div>
                   <div>
                     <p>
                       水星はシュメール人の時代（紀元前3000年）から知られている。古い記録ではバビロニア人により観測されていて、古代ギリシャのヘラクレイトスは、水星と金星が地球ではなく、太陽のまわりをまわっていると考えていた。ギリシャで水星が5つの惑星の一つとわかったのはプラトンの時代からである。
                     </p>
                   </div>`

// 2ページ目
planetVue.page2 = `<div>
                     <p>
                       ギリシャでは、水星のことをヘルメスと言われている。ローマではメルクリウス、英語ではマーキュリーと呼ばれている。マーキュリーとは足が早いという意味で付けられた。
                       <br>
                       1639年にはイタリアのジョバンニ・ズッピが望遠鏡を使って水星を見て、水星にも金星や月と同じように、みちかけがあることを発見した。その結果、水星が太陽をまわっていることが証明された。
                     </p>
                   </div>

                   <div class="title">
                     <h2>
                       日本が水星調査
                     </h2>
                   </div>
                   <div id="mercuryimg3">
                     <p>
                       <img src="../images/planet/bepicolombo.jpg" alt="ロケット">2018年10月20日、JAXAは国際水星探査計画BepiColombo（べピコロンボ）ミッションの水星表面探査機（MPO）及び水星磁気圏探査機「みお」（MMO）を搭載したアリアン5型ロケットを平成30年10月20日（土）22時45分28秒（現地時間）（10月20日（土）10時45分28秒（日本標準時））に、フランス領ギアナのギアナ宇宙センターから打ち上げられた。
                     </p>
                   </div>
                   <div class="clear"></div>`

// QRコード
qr.planet   = 'mercury';
qr.planetQR = '水星QRコード';
