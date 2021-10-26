'use strict'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { SceneObj } from '/jsgame/choque/js/engine/scene/obj/sceneObj.js'
import { Constants } from '/jsgame/choque/js/constants.js'

/**
 * テキストオブジェクトのクラス
 */
export class TextBox extends SceneObj {

	/**
	 * 引数
	 * text : 表示する文字列
	 */
	constructor(text, x, y, width, height) {
		super();
		// 表示する文字列を代入
		this.text = text;
		// 矩形左上のX座標
		this.x = x;
		// 矩形左上のY座標
		this.y = y;
		// 矩形の幅
		this.width = width;
		// 矩形の高さ
		this.height = height;
		// 枠線の色(デフォルト)
		this.borderColor = Color.CORAL;
		// 枠線の太さ(デフォルト)
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
		//テキストの太さ、サイズ、フォントを設定
		// TODO "xpt sans-serif";を試してリサイズでもフォントが小さくなることを確認する
		_ctx.font = `${this.weight} ${this.size}px ${this.font}`;
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
		//テキストを表示
		ctx.fillText(this.text, this.x, this.y);
		// 矩形の枠線の色を設定する
		ctx.strokeStyle = this.borderColor;
		// 矩形の輪郭を描く
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

}
