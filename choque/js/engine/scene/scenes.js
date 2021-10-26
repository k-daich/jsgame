'use strict'

/**
 * Scenesクラスを集約したクラス
 */
export class Scenes {
	static #scenes = {};
	static #curSceName;

	/**
	 * シーンを切り替える 
	 */
	static switch(name) {
		this.#curSceName = name;
	}

	/**
	 * シーンを追加する
	 */
	static add(name, scene) {
		this.#scenes[name] = scene;
	}

	/**
	 * 現在のシーンを返す
	 */
	static getCurrent() {
		return this.#scenes[this.#curSceName];
	}

}