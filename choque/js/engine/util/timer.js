'use strict'

/**
 * 時間差で実行するクラス
 */
export class Timer {

	/**
	 * 引数
	 * rug : 実行までの間隔
	 * repeatNum : 繰り返し回数
	 */
	constructor(rug, repeatNum) {
		this.rug = rug;
		this.repeatNum = repeatNum;
		this.timerId = null;
	}

	/**
	 * 繰り返し実行する
	 */
	repeat(timer, callback) {
		// リピート回数が0なら終了する
		if(timer.repeatNum-- === 0) return;

		// rugミリ秒だけ遅らせてコールバックを実行。その後当メソッド呼び出し
		timer.timerId = setTimeout(function() {
			callback();
			timer.repeat(timer, callback);
		}, timer.rug);
	}

	/**
	 * 当タイマーのリピート処理を停止する
	 */	
	stop() {
		clearTimeout(this.timerId);
	}
}
