'use strict'
import { MyCanvas } from '/jsgame/choque/js/engine/myCanvas.js'
import { Controler } from '/jsgame/choque/js/engine/controler.js'
import { Preloader } from '/jsgame/choque/js/engine/preloader.js'
import { KeyInput } from '/jsgame/choque/js/engine/keyInput.js'
import { Xysize } from '/jsgame/choque/js/engine/constants/xysize.js'

// コントローラの処理を実施する
const controler = new Controler();
let count = 0;
/**
 * 処理の開始点
 * ブラウザがページを完全に読み込み後に実施する
 */
addEventListener('load', () => {
	// 画面Canvasの初期化設定を行う
	let preloader = new Preloader(
		'/jsgame/sample/img/yamada.png'
		, '/jsgame/sample/img/rico.png'
		, '/jsgame/sample/img/aru.png'
		, '/jsgame/sample/img/start.png'
		, '/jsgame/sample/img/goal.png'
		, '/jsgame/sample/img/tile.png'
		, '/jsgame/sample/img/dpad.png'
		, '/jsgame/sample/sound/bgm.mp3'
		, '/jsgame/sample/sound/start.mp3'
		, '/jsgame/sample/sound/clear.mp3'
	);
	// 画面Canvasの初期化設定を行う
	MyCanvas.setup(Xysize.CANVAS_WIDTH, Xysize.CANVAS_HEIGHT);

	// プリロード完了後にメインループ処理を開始する
	preloader.executeWhenComp(() => {
		// キー入力の定義を来ぬ
		KeyInput.setKeyEvents();
		console.log('start');
		mainLoop();
	});

	// 初期画面を表示する
	// プリロードを実施する
	// メニュー項目を表示する
});

// メインループ処理
const mainLoop = () => {
	//console.log('main loop : ' + count++);
	// コントローラの処理を実施する
	controler.update();
	// 均一なフレーム単位で処理を実施させる
	requestAnimationFrame(mainLoop.bind(mainLoop));
}
