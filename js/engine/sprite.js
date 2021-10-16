'use strict'
import {DataObserver} from '/jsgame/js/debug/dataObserver.js'

/**
 * スプライトに関してのクラス
 */
export class Sprite {

	/**
	 * 引数
	 * img : 画像ファイルまでのパス
	 * width : 画像の表示する範囲（横幅）
	 * height : 画像の表示する範囲（縦幅）
	 */
	constructor( name, img, width, height ) {
		// 名前を設定する
		this.name = name;
		//this.imgに、あなたは画像ですよ、と教える
		this.img = new Image();
		//this.img.srcに画像ファイルまでのパスを代入
		this.img.src = img;
		//画像の初期位置
		this.x = this.y = 0;
		//画像を表示する範囲の横幅。引数widthが指定されていない場合、this.widthに32を代入
		this.width = width || 32;
		//画像を表示する範囲の縦幅。引数heightが指定されていない場合、this.heightに32を代入
		this.height = height || 32;
		//何番目の画像を表示するか
		this.frame = 0;
		//数値によってスプライトを移動させることができる（移動速度）
		this.vx = this.vy = 0;
		//スプライトの位置を、数値の分、ずらすことができる
		this.shiftX = this.shiftY = 0;
		//スプライトの角度
		this.rotate = 0;
	}

	/**
	 * 画像などを画面に表示するためのメソッド
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	render( canvas ) {
		//キャンバスの外にスプライトがあるとき、ここでこのメソッドを終了する
		if ( this.x + this.shiftX < -1 * this.width || this.x + this.shiftX > canvas.width ) return;
		if ( this.y + this.shiftY < -1 * this.height || this.y + this.shiftY > canvas.height ) return;

		//X,Y方向に、何番目の画像か
		const _frameX = this.frame % ( this.img.width / this.width );
		const _frameY = ~~( this.frame / ( this.img.width / this.width ) );

		//画家さん（コンテキスト）を呼ぶ
		const _ctx = canvas.getContext( '2d' );
		//スプライトを回転させるときの中心位置を変更するための、canvasの原点の移動量
		const _translateX = this.x + this.width/2 + this.shiftX;
		const _translateY = this.y + this.height/2 + this.shiftY;
		//描画状態を保存する
		_ctx.save();
		//canvasの原点の移動
		_ctx.translate( _translateX, _translateY );
		//canvasを回転
		_ctx.rotate( this.rotate * Math.PI / 180 );
		//移動したcanvasの原点を戻す
		_ctx.translate( -1*_translateX, -1*_translateY );
		//画家さんに、絵を描いてとお願いする
		_ctx.drawImage(
			this.img,
			this.width * _frameX,
			this.height * _frameY,
			this.width,
			this.height,
			this.x + this.shiftX,
			this.y + this.shiftY,
			this.width,
			this.height
		);
		// 保存しておいた描画状態に戻す
		_ctx.restore();
	}

	/**Gameクラスのメインループからずっと呼び出され続ける
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	update( canvas ) {
		DataObserver.observe('update()@sprite.js', false);
		//画像などを画面に表示するためのメソッドを呼び出す
		this.render( canvas );
		//スプライトを動かしたり、なにかのきっかけでイベントを発生させたりするために使うメソッドを呼び出す
		this.onenterframe();
		//スプライトを移動する
		this.x += this.vx;
		this.y += this.vy;
	}

	/**
	 * 常に呼び出され、スプライトの移動やイベントの発生などに使うメソッド。空なのはオーバーライド（上書き）して使うため
	 */
	onenterframe() {}

}
