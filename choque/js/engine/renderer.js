'use strict'
import { KeyInput } from '/jsgame/choque/js/engine/keyInput.js'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { Xysize } from '/jsgame/choque/js/engine/constants/xysize.js'
import { Scenes } from '/jsgame/choque/js/engine/scene/scenes.js'
import { Scene } from '/jsgame/choque/js/engine/scene/scene.js'
import { Text } from '/jsgame/choque/js/engine/scene/obj/text.js'
import { Box } from '/jsgame/choque/js/engine/scene/obj/box.js'
import { TextBox } from '/jsgame/choque/js/engine/scene/obj/textbox.js'

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

	static #initRender() {
		// コンテキストを取得する
		const ctx = this.canvas.getContext('2d');
		// 塗りつぶしの色に、黒を指定する
		ctx.fillStyle = Color.BLACK;
		// 左上から、画面のサイズまでを、塗りつぶす
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Canvasの初期化処理
	 */
	static setup(width, height) {
		// canvas要素を作成
		this.canvas = document.createElement('canvas');
		// 作成したcanvas要素をbodyタグに追加
		document.body.appendChild(this.canvas);
		// canvasの横幅（ゲームの横幅）を設定。もし横幅が指定されていなければ320を代入
		this.canvas.width = width || 320;
		// canvasの縦幅（ゲームの縦幅）を設定。もし縦幅が指定されていなければ320を代入
		this.canvas.height = height || 320;
		// 画面の初期レンダリング
		this.#initRender();
		// 初期シーンの設定
		this.#initScene();
		// 画面リサイズ時の動的サイズ変更処理を追加する
		this.#addResizeEvent();
	}

	/**
	 * 初期シーンをレンダリングする
	 */
	static #initScene() {
		// シーンの生成
		const scene = new Scene();
		// テキスト表示の設定
		const text = new Text('press any keys.').center().middle().color(Color.WHITE);
		// 1フレームごとの処理を定義する
		scene.onenterframe = () => {
			// 画面の初期レンダリング
			this.#initRender();
			// スペースキーが押されたとき、メインシーンに切り替える
			if (KeyInput.isKeydown('space')) {
				this.#battleScene();
			}
		}
		// テキストをシーンに追加する
		scene.add(text);
		// シーン追加
		Scenes.add('init', scene);
		// シーン切替
		Scenes.switch('init');
	}

	/**
	 * 対戦シーンをレンダリングする
	 */
	static #battleScene() {
		// シーンの生成
		const scene = new Scene();
		// テキスト表示の設定
		const text = new Text('start any battle.').center().middle().color(Color.WHITE);
		// 1フレームごとの処理を定義する
		scene.onenterframe = () => {
			// 画面の初期レンダリング
			this.#initRender();
		}
		// テキストをシーンに追加する
		scene.add(text);
		// 上部選択ボックスの設定
		scene.add(
			new TextBox(
				'test choice 1',
				Xysize.UPPER_CHOICE_X,
				Xysize.UPPER_CHOICE_Y,
				Xysize.CHOICE_WIDTH,
				Xysize.CHOICE_HEIGHT)
			.color(Color.WHITE));
		// 左部選択ボックスの設定
		scene.add(
			new Box(
				Xysize.LEFT_CHOICE_X,
				Xysize.LEFT_CHOICE_Y,
				Xysize.CHOICE_WIDTH,
				Xysize.CHOICE_HEIGHT)
			.color(Color.WHITE));
		// 右部選択ボックスの設定
		scene.add(
			new Box(
				Xysize.RIGHT_CHOICE_X,
				Xysize.RIGHT_CHOICE_Y,
				Xysize.CHOICE_WIDTH,
				Xysize.CHOICE_HEIGHT)
			.color(Color.WHITE));
		// シーン追加
		Scenes.add('battle', scene);
		// シーン切替
		Scenes.switch('battle');
	}

	/**
	 * 画面をUpdateする
	 */
	static update() {
		Scenes.getCurrent().update();
		// 現在のシーンの、ゲームに登場する全てのもの（オブジェクト）の数だけ繰り返す
		for (let _obj of Scenes.getCurrent().objs) {
			// 現在のシーンの、すべてのオブジェクトのupdateメソッドを呼び出す
			_obj.update(this.canvas);
		}
	}
}
