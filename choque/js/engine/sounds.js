'use strict'

/**
 * Soundクラスを集約したクラス
 */
export class Sounds {
	// filePath, Soundの連想配列
	static #sounds = {};

	/**
	 * Soundを登録する
	 */
	static add(filePath, sound) {
		this.#sounds[filePath] = sound;
	}

	/**
	 * filePathに対応したSoundを返す
	 */
	static get(filePath) {
		return this.#sounds[filePath];
	}
}
