'use strict'
import { Renderer } from '/jsgame/choque/js/engine/render/renderer.js'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { Xysize } from '/jsgame/choque/js/engine/constants/xysize.js'
import { TextBox } from '/jsgame/choque/js/engine/scene/obj/textbox.js'
import { ThinkTextBox } from '/jsgame/choque/js/engine/scene/obj/thinkTextBox.js'
import { Text } from '/jsgame/choque/js/engine/scene/obj/text.js'
import { Scene } from '/jsgame/choque/js/engine/scene/scene.js'
import { Constants } from '/jsgame/choque/js/constants.js'
import { BattleState } from '/jsgame/choque/js/logic/model/battleState.js'

/**
 * 戦闘画面の描画クラス
 */
export let BattleRenderer = {
	__proto__: Renderer,
	scene: null,
}

/**
 * 各レンダリング機能ごとで実装するメインレンダリング処理
 */
BattleRenderer.mainRender = function(model) {
	//console.log('BattleRenderer.mainRender');
	BattleRenderer.scene = new Scene();
	let underBoxText = '';

	// モデル状態ごとに描画を分ける
	switch (model.state) {
		// コマンド待ち時
		case BattleState.OWN_COMMAND_WAIT:
			BattleRenderer.renderOwnCommandWait(model);
			break;
		// 選択待ち時
		case BattleState.OWN_CHOICE_WAIT:
			BattleRenderer.renderOwnChoiceWait(model);
			underBoxText = model.q3[model.ansIndex].mean;
			break;
	}

	BattleRenderer.scene.push(
	new ThinkTextBox(
			underBoxText,
			30,
			40,
			10,
			20,
			30,
			10,
			10,
			10,
			15,
			5,5)
			.borderColor(Color.WHITE)
			.fontColor(Color.WHITE)
			.fontSize(10)
	);

	// 以降、状態関係なく描画するもの
	// 下部ボックスの設定
	BattleRenderer.scene.push(
		new TextBox(
			underBoxText,
			Xysize.UNDER_BOX_X,
			Xysize.UNDER_BOX_Y,
			Xysize.UNDER_BOX_WIDTH,
			Xysize.UNDER_BOX_HEIGHT)
			.borderColor(Color.WHITE)
			.fontColor(Color.WHITE)
			.fontSize(10)
	);
	// ライフの設定
	BattleRenderer.scene.push(
		new Text(
			model.life,
			Xysize.LIFE_X,
			Xysize.LIFE_Y)
			.color(Color.WHITE)
			.fontSize(16)
	);
}

BattleRenderer.renderOwnCommandWait = function(model) {
	let comIdx = 0;
	// コマンドボックス左上の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[comIdx],
			Xysize.COMMAND_LEFT_X,
			Xysize.COMMAND_UPPER_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス上の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_CENTER_X,
			Xysize.COMMAND_UPPER_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス右上の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_RIGHT_X,
			Xysize.COMMAND_UPPER_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス左の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_LEFT_X,
			Xysize.COMMAND_MIDDLE_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス中央の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_CENTER_X,
			Xysize.COMMAND_MIDDLE_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス右の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_RIGHT_X,
			Xysize.COMMAND_MIDDLE_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス左下の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_LEFT_X,
			Xysize.COMMAND_UNDER_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス下の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_CENTER_X,
			Xysize.COMMAND_UNDER_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
	// コマンドボックス右下の設定
	BattleRenderer.scene.pushFrontObj(
		new TextBox(
			model.mainChara.command[++comIdx],
			Xysize.COMMAND_RIGHT_X,
			Xysize.COMMAND_UNDER_Y,
			Xysize.COMMAND_WIDTH,
			Xysize.COMMAND_HEIGHT)
			.borderColor(Color.GREY)
			.fontColor(Color.WHITE)
			.fontSize(8)
			.backColor(comIdx === model.comIndex ? Color.GOLD : null)
	);
}

BattleRenderer.renderOwnChoiceWait = function(model) {
	// 上部選択ボックスの設定
	BattleRenderer.scene.push(
		new TextBox(
			model.q3[Constants.CHOICE_INDEX.UPPER].word,
			Xysize.UPPER_CHOICE_X,
			Xysize.UPPER_CHOICE_Y,
			Xysize.CHOICE_WIDTH,
			Xysize.CHOICE_HEIGHT)
			.borderColor(Color.WHITE)
			.fontColor(Color.WHITE)
			.fontSize(12)
	);
	// 左部選択ボックスの設定
	BattleRenderer.scene.push(
		new TextBox(
			model.q3[Constants.CHOICE_INDEX.LEFT].word,
			Xysize.LEFT_CHOICE_X,
			Xysize.LEFT_CHOICE_Y,
			Xysize.CHOICE_WIDTH,
			Xysize.CHOICE_HEIGHT)
			.borderColor(Color.WHITE)
			.fontColor(Color.WHITE)
			.fontSize(12)
	);
	// 右部選択ボックスの設定
	BattleRenderer.scene.push(
		new TextBox(
			model.q3[Constants.CHOICE_INDEX.RIGHT].word,
			Xysize.RIGHT_CHOICE_X,
			Xysize.RIGHT_CHOICE_Y,
			Xysize.CHOICE_WIDTH,
			Xysize.CHOICE_HEIGHT)
			.borderColor(Color.WHITE)
			.fontColor(Color.WHITE)
			.fontSize(12)
	);
	if (model.result) {
		// 回答成否テキストの設定
		BattleRenderer.scene.push(
			new Text(
				model.result,
				Xysize.CENTER_X,
				Xysize.CENTER_Y)
				.color(Color.WHITE)
		);
	}

}
