'use strict'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { SceneObj } from '/jsgame/choque/js/engine/scene/obj/sceneObj.js'

/**
 * 矩形オブジェクトのクラス
 */
export class Box extends SceneObj {

	/**
	 * 引数
	 * x : 矩形左上のX座標
	 * y : 矩形左上のY座標
	 * width : 矩形の幅
	 * height : 矩形の高さ
	 */
	constructor(x, y, width, height) {
		super();
		// 矩形左上のX座標
		this.x = x;
		// 矩形左上のY座標
		this.y = y;
		// 矩形の幅
		this.width = width;
		// 矩形の高さ
		this.height = height;
		//枠線の色
		this.borderColor = Color.CORAL;
		//枠線の太さ
		this.weight = 'normal';
	}

	/**
	 * 枠線の色を設定する
	 */
	color(borderColor) {
		// 枠線の色を設定する
		this.borderColor = borderColor;
		return this;
	}

	/**Gameクラスのメインループからずっと呼び出され続ける
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	update(canvas) {
		//画家さん（コンテキスト）を呼ぶ
		const _ctx = canvas.getContext('2d');
		// 画像などを画面に表示するためのメソッドを呼び出す
		this.render(_ctx);
		// テキストを動かしたりするために使うメソッドを呼び出す
		this.onenterframe();
	}

	/**
	 * テキストを画面に表示するためのメソッド
	 *
	 * 引数
	 * ctx : 画家（コンテキスト）
	 */
	render(ctx) {
		// 矩形の枠線の色を設定する
		ctx.strokeStyle = this.borderColor;
		// 矩形の輪郭を描く
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

}
