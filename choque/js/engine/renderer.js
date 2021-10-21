'use strict'
/**
 * 画面描画処理に関するクラス
 */
export class Renderer {
	static canvas;

	/**
	 * コンストラクタの無効化
	 */
	constructor() {
	}

	/**
	 * 画面サイズ変更時のイベント処理を追加する
	 */
	static #addResizeEvent() {
		// ゲームがはじまったときと、ブラウザのサイズが変わったときに呼ばれる。縦横の比を変えずに、canvasを拡大縮小できる
		const _resizeEvent = () => {
			// ブラウザとcanvasの比率の、縦と横を計算し、小さいほうを_ratioに代入する
			const _ratio = Math.min(innerWidth / this.canvas.width, innerHeight / this.canvas.height);
			// canvasのサイズを、ブラウザに合わせて変更する
			this.canvas.style.width = this.canvas.width * _ratio + 'px';
			this.canvas.style.height = this.canvas.height * _ratio + 'px';
		}
		// ブラウザのサイズが変更されたとき、_resizeを呼び出す
		addEventListener('resize', _resizeEvent, { passive: true });
		// _resizeを呼び出す
		_resizeEvent();
	}

	/**
	 * Canvasの初期化処理
	 */
	static setup(width , height) {
		// canvas要素を作成
		this.canvas = document.createElement('canvas');
		// 作成したcanvas要素をbodyタグに追加
		document.body.appendChild(this.canvas);
		// canvasの横幅（ゲームの横幅）を設定。もし横幅が指定されていなければ320を代入
		this.canvas.width = width || 320;
		// canvasの縦幅（ゲームの縦幅）を設定。もし縦幅が指定されていなければ320を代入
		this.canvas.height = height || 320;
		// コンテキストを取得する
		const ctx = this.canvas.getContext('2d');
		// 塗りつぶしの色に、黒を指定する
		ctx.fillStyle = '#000000';
		// 左上から、画面のサイズまでを、塗りつぶす
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		// 画面リサイズ時の動的サイズ変更処理を追加する
		this.#addResizeEvent();
	}

}
