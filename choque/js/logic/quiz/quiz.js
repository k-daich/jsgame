'use strict'
import { Grade1 } from '/jsgame/choque/js/logic/quiz/data/grade1.js'

/**
 * 問題に関するロジック
 */
export class Quiz {

	/**
	 * コンストラクタの無効化
	 */
	constructor() {
	}

	/**
	 * 選択肢３つを返す
	 */
	static getQ3() {
		// 選択肢１つ目のインデックス取得
		const qIndex1 = this.#getRandomQIndex(Grade1.Q);

		// 選択肢２つ目のインデックス取得
		let qIndex2;
		do {
			qIndex2 = this.#getRandomQIndex(Grade1.Q);
		} while (qIndex1 === qIndex2);

		// 選択肢３つ目のインデックス取得
		let qIndex3;
		do {
			qIndex3 = this.#getRandomQIndex(Grade1.Q);
		} while (qIndex1 === qIndex3 || qIndex2 === qIndex3);

		// 取得したインデックスを元にクイズ配列を返す
		return new Array(Grade1.Q[qIndex1], Grade1.Q[qIndex2], Grade1.Q[qIndex3]);
	}

	/**
	 * クイズ配列長の中からランダムのインデックスを返す
	 */
	static #getRandomQIndex(q) {
		return Math.floor(Math.random() * Object.keys(q).length);
	}
}
