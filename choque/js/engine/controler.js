'use strict'
import { StartModel } from '/jsgame/choque/js/engine/model/startModel.js'
import { BattleModel } from '/jsgame/choque/js/engine/model/battleModel.js'
import { StartRenderer } from '/jsgame/choque/js/engine/render/startRenderer.js'
import { BattleRenderer } from '/jsgame/choque/js/engine/render/battleRenderer.js'

/**
 * シーンをコントロールするクラス
 */
export class Controler {

	/**
	 * コンストラクタ
	 */
	constructor() {
		this.model = StartModel;
		this.renderer = StartRenderer;
	}

	/**
	 * 画面更新処理
	 * モデルを実行し、結果に対応したレンダーを実行する
	 */
	update() {
		// モデルを実行する
		const outcome = this.model.execute();
		// レンダーを実行する
		this.renderer.render(this.model);
		// モデルの実行結果に値が入っていれば対応したモデル/レンダーを設定する
		switch (outcome) {
			case "":
				// 何もしない
				break;
			case "battle":
				// 何もしない
				this.model = BattleModel;
				this.renderer = BattleRenderer;
				break;
			case "start":
				this.model = StartModel;
				this.renderer = StartRenderer;
				break;
		}
	}
}
