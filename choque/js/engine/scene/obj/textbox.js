'use strict'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { SceneObj } from '/jsgame/choque/js/engine/scene/obj/sceneObj.js'

/**
 * テキストボックスのオブジェクトクラス
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
		//テキストの色
		this.ftColor = Color.CORAL;
		// 枠線の色(デフォルト)
		this.bdrColor = Color.CORAL;
		// 背景の色
		this.bgColor = null;
		// テキストサイズ
		this.size;
		// 枠線の太さ(デフォルト)
		this.weight = 'normal';
		// テキストの揃えラインの位置を変更
		this.textAlign = 'center';
		// テキストのベースラインの位置を変更
		this.baseline = 'middle';
	}

	/**
	 * 枠線の色を設定する
	 */
	borderColor(borderColor) {
		// 枠線の色を設定する
		this.bdrColor = borderColor;
		return this;
	}

	/**
	 * テキストの色を設定する
	 */
	fontColor(fontColor) {
		// テキストの色を設定する
		this.ftColor = fontColor;
		return this;
	}

	/**
	 * 背景の色を設定する
	 */
	backColor(bgColor) {
		// 背景の色を設定する
		this.bgColor = bgColor;
		return this;
	}

	/**
	 * 枠線の色を設定する
	 */
	fontSize(size) {
		// 枠線の色を設定する
		this.size = size;
		return this;
	}

	/**Gameクラスのメインループからずっと呼び出され続ける
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	update(canvas, ctx) {
		// 画像などを画面に表示するためのメソッドを呼び出す
		this.render(ctx);
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
		// 背景色の指定がある場合
		if (this.bgColor) {
			//テキストの色を設定
			ctx.fillStyle = this.bgColor;
			// 背景の色を設定
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}

		//テキストの色を設定
		ctx.fillStyle = this.ftColor;
		// 矩形の枠線の色を設定する
		ctx.strokeStyle = this.bdrColor;
		//テキストの太さ、サイズ、フォントを設定
		ctx.font = `${this.weight} ${this.size}px ${this.font}`;
		// テキストの揃えラインの位置を変更
		ctx.textAlign = this.textAlign;
		// テキストのベースラインを設定する
		ctx.textBaseline = this.baseline;
		//テキストを表示
		//ctx.fillText(this.text, this.x + (this.width - this.textWidth) / 2, this.y + this.height / 2);
		ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
		// 矩形の輪郭を描く
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

}
