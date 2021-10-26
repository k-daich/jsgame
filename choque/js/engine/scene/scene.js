'use strict'
import { SceneObj } from '/jsgame/choque/js/engine/scene/obj/sceneObj.js'

/**
 * シーンに関してのクラス
 */
export class Scene {

	/**
	 * コンストラクタ
	 */
	constructor() {
		this.objs = [];
	}

	/**
	 * シーンにオブジェクトを追加するときに呼び出されるメソッド
	 *
	 * 引数
	 * obj : スプライトやテキストなど（オブジェクト）
	 */
	add(obj) {
		//引数がSceneObjのとき、this.objsの末尾にobjを追加
		if (obj instanceof SceneObj) this.objs.push(obj);
		//引数がSprite、Text、Tilemapでなければ、コンソールにエラーを表示
		else console.error('Sceneに追加できるのはSceneObjだけだよ！');
	}

	/**
	 * Gameクラスのメインループからずっと呼び出され続ける
	 */
	update() {
		// スプライトを動かしたり、なにかのきっかけでイベントを発生させたりするために使うメソッドを呼び出す
		this.onenterframe();
	}

	/**
	 * 常に呼び出され、スプライトの移動やイベントの発生などに使うメソッド。空なのはオーバーライド（上書き）して使うため
	 */
	onenterframe() { }

	/**
	 * シーンが切り替わったときに呼び出される
	 */
	onchangescene() { }

}
