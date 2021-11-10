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
		this.frontObjs = [];
	}

	/**
	 * シーンの先頭にオブジェクトを追加する
	 *
	 * 引数
	 * obj : スプライトやテキストなど（オブジェクト）
	 */
	unshift(obj) {
		//引数がSceneObjのとき、this.objsの末尾にobjを追加
		if (obj instanceof SceneObj) this.objs.unshift(obj);
		//引数がSprite、Text、Tilemapでなければ、コンソールにエラーを表示
		else console.error('Sceneに追加できるのはSceneObjだけだよ！');
	}

	/**
	 * シーンの末尾にオブジェクトを追加する
	 *
	 * 引数
	 * obj : スプライトやテキストなど（オブジェクト）
	 */
	push(obj) {
		//引数がSceneObjのとき、this.objsの末尾にobjを追加
		if (obj instanceof SceneObj) this.objs.push(obj);
		//引数がSprite、Text、Tilemapでなければ、コンソールにエラーを表示
		else console.error('Sceneに追加できるのはSceneObjだけだよ！');
	}

	/**
	 * シーンの末尾にオブジェクトを追加する
	 *
	 * 引数
	 * frontObj : スプライトやテキストなど（オブジェクト）
	 */
	pushFrontObj(obj) {
		//引数がSceneObjのとき、this.objsの末尾にobjを追加
		if (obj instanceof SceneObj) this.frontObjs.push(obj);
		//引数がSprite、Text、Tilemapでなければ、コンソールにエラーを表示
		else console.error('Sceneに追加できるのはSceneObjだけだよ！');
	}

	/**
	 * すべてのオブジェクトを結合した配列を返す
	 */
	getAllObjs() {
		return this.frontObjs.concat(this.objs);
	}
}
