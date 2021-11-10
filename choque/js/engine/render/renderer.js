'use strict'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { Scene } from '/jsgame/choque/js/engine/scene/scene.js'
import { MyCanvas } from '/jsgame/choque/js/engine/myCanvas.js'
/**
 * 画面描画処理に関するクラス
 */
export let Renderer = {
	scene: new Scene(),

	initRender: function() {
		// 塗りつぶしの色に、黒を指定する
		MyCanvas.ctx.fillStyle = Color.BLACK;
		// 左上から、画面のサイズまでを、塗りつぶす
		MyCanvas.ctx.fillRect(0, 0, MyCanvas.canvas.width, MyCanvas.canvas.height);
		// 開発用に網目背景にする
		this.drawMeshBack();
	},

	/**
	 * （開発用）ピクセル数を見るための網目の線を引く
	 */
	drawMeshBack() {
		// 10ピクセルごとに縦線を引く
		for (let x = 10; x < MyCanvas.canvas.width; x = x + 10) {
			// パスをリセット
			MyCanvas.ctx.beginPath();
			// 線を引くスタート地点に移動
			MyCanvas.ctx.moveTo(x, 0);
			// スタート地点から(200,200)まで線を引く
			MyCanvas.ctx.lineTo(x, MyCanvas.canvas.height);
			// 線の色
			MyCanvas.ctx.strokeStyle = Color.CORAL;
			// 線の太さ
			if(x % 50 === 0) {
				MyCanvas.ctx.lineWidth = 2;
			}
			else {
				MyCanvas.ctx.lineWidth = 1;
			}
			// 線を描画する
			MyCanvas.ctx.stroke();
		}
		// 10ピクセルごとに横線を引く
		for (let y = 10; y < MyCanvas.canvas.height; y = y + 10) {
			// パスをリセット
			MyCanvas.ctx.beginPath();
			// 線を引くスタート地点に移動
			MyCanvas.ctx.moveTo(0, y);
			// スタート地点から(200,200)まで線を引く
			MyCanvas.ctx.lineTo(MyCanvas.canvas.width, y);
			// 線の色
			MyCanvas.ctx.strokeStyle = Color.CORAL;
			// 線の太さ
			if(y % 50 === 0) {
				MyCanvas.ctx.lineWidth = 2;
			}
			else {
				MyCanvas.ctx.lineWidth = 1;
			}
			// 線を描画する
			MyCanvas.ctx.stroke();
		}
	},

	/**
	 * 各レンダリング機能ごとで実装するメインレンダリング処理
	 */
	mainRender: function(model) {
		console.log('Error : mainRender() must implements');
	},

	/**
	 * 画面をUpdateする
	 */
	update: function() {
		console.log(this.scene.getAllObjs());

		// 全てのオブジェクトの数だけ繰り返す
		for (let _obj of this.scene.getAllObjs()) {
			// 各オブジェクトのupdateメソッドを呼び出す
			_obj.update(MyCanvas.canvas, MyCanvas.ctx);
		}
	},
	render: function(model) {
		// 画面の共通初期レンダリング
		this.initRender();
		// 画面のレンダリング
		this.mainRender(model);
		// 画面の更新
		this.update();
	},

}
