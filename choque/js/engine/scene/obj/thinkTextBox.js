'use strict'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { SceneObj } from '/jsgame/choque/js/engine/scene/obj/sceneObj.js'

/**
 * 思考表現用テキストボックスのオブジェクトクラス
 */
export class ThinkTextBox extends SceneObj {

	/**
	 * 光の吹き出しを作成する
	 * @param {number} radiusX: 横半径
	 * @param {number} radiusY: 縦半径
	 * @param {number} num    : 角数
	 * @param {number} cx     : 円の中心座標X
	 * @param {number} cy     : 円の中心座標Y
	 * @param {number} innerRadiusX : 中の円横半径
	 * @param {number} innerRadiusY : 中の円縦半径
	 * @param {number} addOuterLine : 外側の線のはみ出す上限
	 * @param {number} addInnerLine : 内側の線のはみ出す上限
	 */
	constructor(text, radiusX, radiusY, num, cx, cy, innerRadiusX, innerRadiusY, addOuterLine, addInnerLine) {
		super();
		// 表示する文字列を代入
		this.text = text;
		// 横半径
		this.radiusX = radiusX;
		// 縦半径
		this.radiusY = radiusY;
		// 角数
		this.num = num;
		// 円の中心座標X
		this.cx = cx;
		// 円の中心座標Y
		this.cy = cy;
		// 中の円横半径
		this.innerRadiusX = innerRadiusX;
		// 中の円縦半径
		this.innerRadiusY = innerRadiusY;
		// 外側の線のはみ出す上限
		this.addOuterLine = addOuterLine;
		// 内側の線のはみ出す上限
		this.addInnerLine = addInnerLine;
		//テキストの色
		this.ftColor = Color.CORAL;
		// 枠線の色(デフォルト)
		this.bdrColor = Color.CORAL;
		// 背景の色
		this.bgColor = null;
		// テキストサイズ
		this.size = 8;
		// 枠線の太さ(デフォルト)
		this.weight = 'normal';
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
		//テキストの色を設定
		ctx.fillStyle = this.ftColor;
		// 矩形の枠線の色を設定する
		ctx.strokeStyle = this.bdrColor;
		//テキストの太さ、サイズ、フォントを設定
		ctx.font = `${this.weight} ${this.size}px ${this.font}`;

		let deg = 0;
		let outerRandom;
		let innerRandom;
		// 塗りつぶしの円を描く
		// 楕円の計算が面倒なので普通に円を書いてscaleで曲げる
		// xを基準とする
		let ratio = this.innerRadiusY / this.innerRadiusX;

		ctx.scale(1, ratio);
		ctx.beginPath();
		ctx.arc(this.cx, this.cy / ratio, this.innerRadiusX, 0, Math.PI * 180, true);
		ctx.fill();
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		// メインの線を描く
		ctx.beginPath();

		for (var i = 0; i < this.num; i++) {
			deg += 360 / this.num;
			outerRandom = this.#getRandomInt(this.addOuterLine, 0);
			innerRandom = this.#getRandomInt(this.addInnerLine, 0);

			ctx.moveTo(
				this.#getCircumPos.x(deg, this.radiusX + outerRandom, this.cx),
				this.#getCircumPos.y(deg, this.radiusY + outerRandom, this.cy)
			);
			ctx.lineTo(
				this.#getCircumPos.x(deg, this.innerRadiusX - innerRandom, this.cx),
				this.#getCircumPos.y(deg, this.innerRadiusY - innerRandom, this.cy)
			);
		}
		ctx.strokeStyle = this.strokeStyle;
		ctx.stroke();

		// 背景色の指定がある場合
		if (this.bgColor) {
			//テキストの色を設定
			ctx.fillStyle = this.bgColor;
		}

	}
	/*
	 * ランダムな整数を返す
	 * @param max 最大値
	 * @param min 最小値
	 * @return min ~ max
	 */
	#getRandomInt(max, min) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	/**
	 * 円周上の座標を返す
	 * @param d 角度
	 * @param r 半径
	 * @param cx, cy 中心座標
	 */
	#getCircumPos = {
		// x座標
		x: function(d, r, cx) {
			return Math.cos(Math.PI / 180 * d) * r + cx;
		},
		// y座標
		y: function(d, r, cy) {
			return Math.sin(Math.PI / 180 * d) * r + cy;
		}
	};
}
