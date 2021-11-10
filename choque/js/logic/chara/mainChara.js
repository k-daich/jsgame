'use strict'
import { Chara } from '/jsgame/choque/js/logic/chara/chara.js'

/**
 * メインキャラのクラス
 */
export class MainChara extends Chara {

	/**
	 * 引数
	 * text : 表示する文字列
	 */
	constructor(life, maxlife) {
		super(life, maxlife, ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']);
	}

}
