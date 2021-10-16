'use strict'
import {Sprite} from '/jsgame/js/engine/sprite.js'
import {Tilemap} from '/jsgame/js/engine/tilemap.js'
import {Text} from '/jsgame/js/engine/text.js'

/**
 * シーンに関してのクラス
 */
export class Scene {

	constructor() {
		this.objs = [];
	}

	/**
	 * シーンにオブジェクトを追加するときに呼び出されるメソッド
	 *
	 * 引数
	 * obj : スプライトやテキストなど（オブジェクト）
	 */
	add( obj ) {
		//引数がSprite、Text、Tilemapのとき、this.objsの末尾にobjを追加
		if ( obj instanceof Sprite || obj instanceof Text || obj instanceof Tilemap ) this.objs.push( obj );
		//引数がSprite、Text、Tilemapでなければ、コンソールにエラーを表示
		else console.error( 'Sceneに追加できるのはSprite、Text、Tilemapだけだよ！' );
	}

	/**Gameクラスのメインループからずっと呼び出され続ける
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	update( canvas ) {
		//スプライトを動かしたり、なにかのきっかけでイベントを発生させたりするために使うメソッドを呼び出す
		this.onenterframe();
	}

	/**
	 * 常に呼び出され、スプライトの移動やイベントの発生などに使うメソッド。空なのはオーバーライド（上書き）して使うため
	 */
	onenterframe() {}

	/**
	 * シーンが切り替わったときに呼び出される
	 */
	onchangescene() {}

}
