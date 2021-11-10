'use strict'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { SceneObj } from '/jsgame/choque/js/engine/scene/obj/sceneObj.js'
import { Constants } from '/jsgame/choque/js/constants.js'

/**
 * テキストオブジェクトのクラス
 */
export class Text extends SceneObj {

	/**
	 * 引数
	 * text : 表示する文字列
	 */
	constructor(text, x, y) {
		super();
		//this.textに表示する文字列を代入
		this.text = text;
		//デフォルトのフォントを指定
		this.font = Constants.MAIN_FONT;
		//テキストを表示する位置
		this.x = x;
		this.y = y;
		// テキストの揃えラインの位置を変更
		this.textAlign = 'center';
		// テキストのベースラインの位置を変更
		this.baseline = 'middle';
		//テキストのサイズ
		this.size = 20;
		//テキストの色
		this.fontColor = Color.CORAL;
		//テキストの太さ
		this.weight = 'normal';
		//テキストの幅
		this._width = 0;
		//テキストの高さ
		this._height = 0;
		//テキストを左右中央の位置にするかどうか
		this._isCenter = false;
		//テキストを上下中央の位置にするかどうか
		this._isMiddle = false;
	}

	/**
	 * 枠線の色を設定する
	 */
	color(fontColor) {
		// 枠線の色を設定する
		this.fontColor = fontColor;
		return this;
	}

	/**
	 * 呼び出すと、テキストを左右中央の位置に配置できるメソッド
	 */
	center() {
		//テキストを左右中央の位置に配置するかどうかのプロパティにtrueを代入
		this._isCenter = true;
		//thisを返すことで、メソッドをチェーンにすることができる
		return this;
	}

	/**
	 * 呼び出すと、テキストを上下中央の位置に配置できるメソッド
	 */
	middle() {
		//テキストのベースラインの位置を変更
		this.baseline = 'middle'
		//テキストを上下中央の位置に配置するかどうかのプロパティにtrueを代入
		this._isMiddle = true;
		//thisを返すことで、メソッドをチェーンにすることができる
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
		// テキストの太さ、サイズ、フォントを設定
		ctx.font = `${this.weight} ${this.size}px ${this.font}`;
		// テキストの色を設定
		ctx.fillStyle = this.fontColor;
		// テキストの揃えラインの位置を変更
		ctx.textAlign = this.textAlign;
		// テキストのベースラインの位置を設定
		ctx.textBaseline = this.baseline;

		// テキストの幅を計算
		this._width = ctx.measureText(this.text).width;
		// テキストの高さを計算
		this._height = Math.abs(ctx.measureText(this.text).actualBoundingBoxAscent)
			+ Math.abs(ctx.measureText(this.text).actualBoundingBoxDescent);

		// テキストを左右中央に配置したいときの、X座標の計算
		if (this._isCenter) this.x = (canvas.width) / 2;
		//テキストを上下中央に配置したいときの、Y座標の計算
		if (this._isMiddle) this.y = canvas.height / 2;

		//画像などを画面に表示するためのメソッドを呼び出す
		this.render(canvas, ctx);
		//テキストを動かしたりするために使うメソッドを呼び出す
		this.onenterframe();

	}

	/**
	 * テキストを画面に表示するためのメソッド
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	render(canvas, ctx) {
		//画面の外にテキストがあるとき、表示しないようにする
		if (this.x < -1 * this._width || this.x > canvas.width) return;
		if (this.y < -1 * this._height || this.y > canvas.height + this._height) return;
		//テキストを表示
		ctx.fillText(this.text, this.x, this.y);
	}

	/**
	 * 常に呼び出されるメソッド。空なのはオーバーライド（上書き）して使うため
	 */
	onenterframe() { }

}
