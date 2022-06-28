$(function () {
    $(window).scroll(function () {
        const wHeight = $(window).height();
        const scrollAmount = $(window).scrollTop();
        $('.scrollanime').each(function () {
            const targetPosition = $(this).offset().top;
            if(scrollAmount > targetPosition - wHeight + 60) {
                $(this).addClass("fadeInDown");
            }
        });
    });
});


//アニメーション(header)
$(window).on('load scroll', function(){
        var el = $('.animated');
        el.each(function () {
            //data属性からアニメーション名を取得
            var isAnim = $(this).data('animate');
            //animated要素に位置を取得
            var elOffset = $(this).offset().top;
            //現在のスクロールポジションを取得
            var scrollPos = $(window).scrollTop();
            //ウィンドウの高さを取得
            var wh = $(window).height();
       
            //要素がウィンドウ内に入るとアクティブ
            if(scrollPos > elOffset - wh){
                $(this).addClass(isAnim);
            }
        });
      });

//ワークスアイテム 時間差フェードイン 
$(function(){

var effect_btm = 300; // 画面下からどの位置でフェードさせるか(px)
var effect_move = 50; // どのぐらい要素を動かすか(px)
var effect_time = 800; // エフェクトの時間(ms) 1秒なら1000

//親要素と子要素のcssを定義
$('.scroll-fade-row').css({
    opacity: 0
});
$('.scroll-fade-row').children().each(function(){
    $(this).css({
        opacity: 0,
        transform: 'translateY('+ effect_move +'px)',
        transition: effect_time + 'ms'
    });
});

// スクロールまたはロードするたびに実行
$(window).on('scroll load', function(){
    var scroll_top = $(this).scrollTop();
    var scroll_btm = scroll_top + $(this).height();
    var effect_pos = scroll_btm - effect_btm;

    //エフェクトが発動したとき、子要素をずらしてフェードさせる
    $('.scroll-fade-row').each( function() {
        var this_pos = $(this).offset().top;
        if ( effect_pos > this_pos ) {
            $(this).css({
                opacity: 1,
                transform: 'translateY(0)'
            });
            $(this).children().each(function(i){
                $(this).delay(100 + i*350).queue(function(){
                    $(this).css({
                        opacity: 1,
                        transform: 'translateY(0)'
                    }).dequeue();
                });
            });
        }
    });
});
});

/* サイドからのフェードイン */
$(function() {
  //画面をスクロールするとイベントが発動する
  $(window).scroll(function() {
    
    //フェードインさせたい要素の位置をずらす
    $('.fadein').css({
      'opacity': '0',
      'transform': 'translateX(30px)'
    });
    
    //スクロールバーの位置を取得
    var scroll = $(window).scrollTop();

    //ウィンドウの高さを取得
    var windowHeight = $(window).height();

    $('.fadein').each(function() {
      //フェードインさせたい要素の縦位置を取得
      var elemPos = $(this).offset().top;

      //要素がウィンドウの中に入ってからさらに100pxスクロールしたら要素をフェードインする
      if (scroll > elemPos - windowHeight + 100) {
        $(this).css({
          'opacity': '1',
          'transform': 'translateX(0)'
        });
      }
    });
  });
});

/*     $(document).snowfall({
    　flakeCount: 25, //降らせる数
    　minSize : 30, // 最小サイズ（数値）
    　maxSize :   40, // 最大サイズ（数値）
    　minSpeed : 1, // 最低速度（数値）
    　maxSpeed : 2, //最大速度
    　image : "img/3068.png", //ここで画像を指定
    }); */

  //Loadeing画面制御処置

  $(function(){
	var loader = $('.loader-wrap');

	//ページの読み込みが完了したらアニメーションを非表示
	$(window).on('load',function(){
		  loader.fadeOut();
	});

	//ページの読み込みが完了してなくても3秒後にアニメーションを非表示にする
	setTimeout(function(){
		loader.fadeOut();
	},3000);
});
function imgwin(img){
    window.open("img/"+"works/"+img, "imgwindow", "width=866,height=580");
}

//ローディング
$(function () {
    //ローディング画面の表示
    $(window).on('load',function(){
        $("#loading").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
        $("#loading_box").delay(1200).fadeOut('slow');//ローディングテキストを1.2秒（1200ms）待機してからフェードアウト
        $('body').css('background-image', 'url(./img/white0004.png)');//背景画面のCSSを追加
        $('.change').css('opacity',1);//非表示要素を表示する
        
    });
});

$(function () {
    //アニメーション属性を持つ要素を非表示、animated属性を追加
    $('*[animation]').addClass('invisible animated');

    $(window).on('load scroll', function(){
        $('*[animation]').each(function () {

            //animation属性に記載されたアニメーション名を取得
            if (this.hasAttribute('animation')) {
                var animation = this.getAttribute('animation');
            }
            $(this).removeClass('invisible').addClass(animation);
        });
    });
});

//Three.jsアニメーション
$(function () {
    // ページの読み込みを待つ
    window.addEventListener('load', init);

    // canvasのサイズを指定
    const width = window.innerWidth; //ウインドウの横の長さ
    const height = 400; //エリアの縦の長さ

    function init() {
    // シーンを作る
    const scene = new THREE.Scene();

    // カメラを作る
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000); // x,y,z座標でカメラの場所を指定

    // レンダラーを作る
    const canvasElement = document.querySelector('#canvas') //HTMLのcanvasのid
    const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    alpha: true, //背景を透明にする
    antialias: true, //アンチエイリアス
    });
    // renderer.setSize(width, height); //サイズ

    // ライトを作る
    const light = new THREE.AmbientLight(0xFFFFFF, 1); //環境光源（色、光の強さ）
    scene.add(light);

    // 画像(キューブ)
    const loader = new THREE.TextureLoader();
    const texture01 = loader.load('./img/1725522_m.jpg');
    const texture02 = loader.load('./img/1725522_m.jpg');
    const texture03 = loader.load('./img/1725522_m.jpg');
    const texture04 = loader.load('./img/1725522_m.jpg');
    const texture05 = loader.load('./img/1725522_m.jpg');

    const textures = [
    texture01,
    texture02,
    texture03,
    texture04,
    texture05,
    ]

    // 3Dオブジェクトを作る
    const geometry = new THREE.DodecahedronGeometry(300, 0); // DodecahedronGeometry 正十二面体（半径、詳細）

    // 枠線を作成
    const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry), // 線
    new THREE.LineBasicMaterial({
        color: 0x000000, // 線の色
    }),
    );

    const material = new THREE.MeshPhongMaterial({
    map: texture01,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.add(line);
    scene.add(mesh);

    // マウス
    let mouseX = 0, mouseY = 0; // マウス座標

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = 200;

    function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
    }
    document.addEventListener('mousemove', onDocumentMouseMove);

    // アニメ―ション
    function start() {
    requestAnimationFrame(start);

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;
    // 原点方向を見つめる
    camera.lookAt(scene.position);

    //球体が回転する
    mesh.rotation.y += 0.005;
    mesh.rotation.x += 0.005;

    // レンダリング
    renderer.render(scene, camera);
    }
    start();

    // ウインドウのリサイズ対応
    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
    // ウインドウ幅を取得
    const width = window.innerWidth;
    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, 400);

    windowHalfX = window.innerWidth / 2;
    windowHalfY = 200;

    // カメラのアスペクト比を正す
    camera.aspect = width / 400;
    camera.updateProjectionMatrix();
    }

    // 多面体の画像切り替え
    let count = -1;
    imgChange();
    function imgChange() {
    count++;
    // カウントが画像の枚数と同じになると0に戻る
    if (count == textures.length) count = 0;
    material.map = textures[count];
    setTimeout(imgChange, 4000);
    setTimeout(function () {
        setTimeout(function () {
        kvElement.classList.remove("fadeInObj");
        }, 2000),
        kvElement.classList.add("fadeInObj")
    }, 4000);
    }

    // KV背景の画像切り替え
    const backgrounds = [
    "./assets/main.png",
    "./img/img_01.jpg",
    "./img/img_02.jpg",
    "./img/img_03.jpg",
    "./img/img_04.jpg",
    ]
    const kvElement = document.querySelector('#kv') //HTMLののid
    bgChange();
    function bgChange() {
    count++;
    // カウントが画像の枚数と同じになると0に戻る
    if (count == backgrounds.length) count = 0;
    kvElement.style.backgroundImage = 'url(' + backgrounds[count] + ')';
    setTimeout(bgChange, 4000);
    setTimeout(function () {
        setTimeout(function () {
        kvElement.classList.remove("fadeInBg");
        }, 2000),
        kvElement.classList.add("fadeInBg")
    }, 4000);
    }
    }
});