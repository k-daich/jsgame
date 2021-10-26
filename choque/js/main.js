'use strict'
import { Renderer } from '/jsgame/choque/js/engine/renderer.js'
import { Preloader } from '/jsgame/choque/js/engine/preloader.js'
import { KeyInput } from '/jsgame/choque/js/engine/keyInput.js'

/**
 * 処理の開始点
 */
// ブラウザがページを完全に読み込み後に実施する
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
	Renderer.setup(240, 160);

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
	console.log('main loop');
	// 画面をupdateする
	Renderer.update();
	// 均一なフレーム単位で処理を実施させる
	requestAnimationFrame(mainLoop.bind(mainLoop));
}
