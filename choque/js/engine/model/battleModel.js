'use strict'
import { KeyInput } from '/jsgame/choque/js/engine/keyInput.js'
import { Quiz } from '/jsgame/choque/js/logic/quiz/quiz.js'
import { Model } from '/jsgame/choque/js/engine/model/model.js'
import { Timer } from '/jsgame/choque/js/engine/util/timer.js'
import { Constants } from '/jsgame/choque/js/constants.js'
import { BattleState } from '/jsgame/choque/js/logic/model/battleState.js'
import { MainChara } from '/jsgame/choque/js/logic/chara/mainChara.js'

/**
 * 戦闘画面シーンのモデルクラス
 */
export let BattleModel = {
	__proto__: Model,
	q3: null,
	comIndex: 4,
	ansIndex: null,
	choIndex: null,
	result: null,
	ansTimeLim: null,
	life: 5,
	state: BattleState.INIT,
	countDownTimer: null,
	mainChara: new MainChara(5, 5),
	thinkText: null,
}

/**
 * モデルの実行
 */
BattleModel.execute = function() {
	console.log('state : ' + BattleModel.state);
	//開発用　Pキーで処理停止
	if (KeyInput.isKeydown('p')) {
		KeyInput.setKeyFalse('p');
		alert('press key : p');
	}
	switch (BattleModel.state) {
		case BattleState.INIT:
			// 状態を回答待ちに変更する
			BattleModel.state = BattleState.WHICH_FIRST;
			// 3択情報を設定する
			BattleModel.q3 = Quiz.getQ3();
			// 答えインデックスを設定する
			BattleModel.ansIndex = Math.floor(Math.random() * BattleModel.q3.length);
			// ユーザの選択インデックスを設定する
			BattleModel.choIndex = null;
			// 回答結果文言を設定する
			BattleModel.result = null;
			// 回答時間制限を設定する
			BattleModel.ansTimeLim = 3;
			//1秒間隔で３回カウントダウンするタイマーを生成する
			BattleModel.countDownTimer = new Timer(1000, 3);
			// 思考テキストを設定する
			BattleModel.thinkText = 'which first';
			// クイズ未設定時はクイズ描画のため後続実行せずに返す
			return '';
		case BattleState.WHICH_FIRST:
			// 先攻を決定する（一旦、自分が先攻に固定）
			if (KeyInput.isKeydown('space')) {
				KeyInput.setKeyFalse('space');
				BattleModel.thinkText = null;
				BattleModel.state = BattleState.OWN_COMMAND_WAIT;
			}
			return ''
		case BattleState.OWN_COMMAND_WAIT:
			// コマンドインデックスのデフォルト値（中央コマンドの値）
			this.comIndex = 4;
			// 上下左右キーによるコマンドインデックス値の変更
			if (KeyInput.isKeydown('up')) {
				this.comIndex = this.comIndex - 3;
			}
			if (KeyInput.isKeydown('down')) {
				this.comIndex = this.comIndex + 3;
			}
			if (KeyInput.isKeydown('left')) {
				this.comIndex = this.comIndex - 1;
			}
			if (KeyInput.isKeydown('right')) {
				this.comIndex = this.comIndex + 1;
			}

			if (KeyInput.isKeydown('space')) {
				KeyInput.setKeyFalse('space');
				// 選択待ち状態へ
				BattleModel.state = BattleState.OWN_CHOICE_WAIT;
				// 選択のカウントダウン開始
				BattleModel.countDownTimer.repeat(BattleModel.countDownTimer, () => {
					// カウントダウンする
					BattleModel.result = BattleModel.ansTimeLim--;
				});
			}
			return ''
		case BattleState.OWN_CHOICE_WAIT:
			// WADキーが押されている場合、押下キーに対応して選択インデックスを設定する
			if (KeyInput.isKeydown('w')) {
				KeyInput.setKeyFalse('w');
				this.choIndex = Constants.CHOICE_INDEX.UPPER;
				BattleModel.state = BattleState.OWN_CHOICED;
			}
			else if (KeyInput.isKeydown('a')) {
				KeyInput.setKeyFalse('a');
				this.choIndex = Constants.CHOICE_INDEX.LEFT;
				BattleModel.state = BattleState.OWN_CHOICED;
			}
			else if (KeyInput.isKeydown('d')) {
				KeyInput.setKeyFalse('d');
				this.choIndex = Constants.CHOICE_INDEX.RIGHT;
				BattleModel.state = BattleState.OWN_CHOICED;
			}
			// 回答時間が0の場合
			else if (BattleModel.ansTimeLim === 0) {
				BattleModel.state = BattleState.OWN_CHOICED;
				BattleModel.countDownTimer.stop();
				BattleModel.result = 'time up';
				//		failAction();
				return;
			}
			// 結果表示箇所に時間制限を表示する
			this.result = this.ansTimeLim;
			return '';
		case BattleState.OWN_CHOICED:
			BattleModel.countDownTimer.stop();
			// 選択インデックスと答えインデックスが一致する場合
			if (this.choIndex === this.ansIndex) {
				this.result = '正解';
				// 選択のカウントダウン開始
				BattleModel.countDownTimer.repeat(BattleModel.countDownTimer, () => {
					// カウントダウンする
					BattleModel.state = BattleState.FIN;
				});
			}
			// 一致していない場合
			else {
				this.result = '不正解';
				//			failAction();
			}
			return '';
		case BattleState.FIN:
			// コマンド待機時の処理（コマンド選択未実装）
			if (KeyInput.isKeydown('space')) {
				KeyInput.setKeyFalse('space');
				BattleModel.state = BattleState.OWN_COMMAND_WAIT;
			}
			return '';
	}
}
