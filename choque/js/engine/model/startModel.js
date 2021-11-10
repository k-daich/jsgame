'use strict'
import { KeyInput } from '/jsgame/choque/js/engine/keyInput.js'
import { Model } from '/jsgame/choque/js/engine/model/model.js'

/**
 * 最初の画面シーンのモデルクラス
 */
export let StartModel = {
	__proto__: Model
}

/**
 * モデルの実行
 */
StartModel.execute = function() {
	// スペースキーが押されたとき、戦闘シーンに切り替える
	if (KeyInput.isKeydown('space')) {
		KeyInput.setKeyFalse('space');
		return 'battle';
	}
	// 押されていなければ画面維持
	return '';

}
