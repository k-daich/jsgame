'use strict'

/**
 * キャラの基底クラス
 */
export class Chara {

	/**
	 * 引数
	 * text : 表示する文字列
	 */
	constructor(life, maxlife, command) {
		this.maxlife = maxlife;
		this.life = life;
		this.command = command;
	}

}

