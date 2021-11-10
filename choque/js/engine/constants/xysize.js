'use strict'

/**
 * 位置・サイズの定数クラス
 */
export class Xysize {

	// キャンバスの幅、高さ
	static CANVAS_WIDTH = 240;
	static CANVAS_HEIGHT = 160;

	// キャンバスの中央位置
	static CENTER_X = this.CANVAS_WIDTH / 2;
	static CENTER_Y = this.CANVAS_HEIGHT / 2;

	// 24分割した中でのY座標を求めるための比率
	static X_RATIO_1 = 1 / 24;
	static X_RATIO_2 = 1 / 12;
	static X_RATIO_3 = 1 / 8;
	static X_RATIO_4 = 1 / 6;
	static X_RATIO_5 = 5 / 24;
	static X_RATIO_6 = 1 / 4;
	static X_RATIO_7 = 7 / 24;
	static X_RATIO_8 = 1 / 3;
	static X_RATIO_9 = 3 / 8;
	static X_RATIO_10 = 5 / 12;
	static X_RATIO_11 = 11 / 24;
	static X_RATIO_12 = 1 / 2;
	static X_RATIO_13 = 13 / 24;
	static X_RATIO_14 = 7 / 12;
	static X_RATIO_15 = 5 / 8;
	static X_RATIO_16 = 2 / 3;
	static X_RATIO_17 = 17 / 24;
	static X_RATIO_18 = 3 / 4;
	static X_RATIO_19 = 19 / 24;
	static X_RATIO_20 = 5 / 6;
	static X_RATIO_21 = 7 / 8;
	static X_RATIO_22 = 11 / 12;
	static X_RATIO_23 = 23 / 24;
	static X_RATIO_24 = 1;

	// 16分割した中でのY座標を求めるための比率
	static Y_RATIO_1 = 1 / 16;
	static Y_RATIO_2 = 1 / 8;
	static Y_RATIO_3 = 3 / 16;
	static Y_RATIO_4 = 1 / 4;
	static Y_RATIO_5 = 5 / 16;
	static Y_RATIO_6 = 3 / 8;
	static Y_RATIO_7 = 7 / 16;
	static Y_RATIO_8 = 1 / 2;
	static Y_RATIO_9 = 9 / 16;
	static Y_RATIO_10 = 5 / 8;
	static Y_RATIO_11 = 11 / 16;
	static Y_RATIO_12 = 3 / 4;
	static Y_RATIO_13 = 13 / 16;
	static Y_RATIO_14 = 7 / 8;
	static Y_RATIO_15 = 15 / 16;
	static Y_RATIO_16 = 1;

	// 選択ボックスの幅、高さ
	static CHOICE_WIDTH = this.CANVAS_WIDTH * this.X_RATIO_8;
	static CHOICE_HEIGHT = this.CANVAS_HEIGHT * this.Y_RATIO_2;
	// 上、左、右選択ボックスのXY位置
	static UPPER_CHOICE_X = this.CANVAS_WIDTH * this.X_RATIO_8;
	static UPPER_CHOICE_Y = this.CANVAS_HEIGHT * this.Y_RATIO_2;
	static LEFT_CHOICE_X = this.CANVAS_WIDTH * this.X_RATIO_1;
	static LEFT_CHOICE_Y = this.CANVAS_HEIGHT * this.Y_RATIO_5;
	static RIGHT_CHOICE_X = this.CANVAS_WIDTH * this.X_RATIO_15;
	static RIGHT_CHOICE_Y = this.CANVAS_HEIGHT * this.Y_RATIO_5;

	// 選択ボックスの幅、高さ
	static UNDER_BOX_WIDTH = this.CANVAS_WIDTH * this.X_RATIO_16;
	static UNDER_BOX_HEIGHT = this.CANVAS_HEIGHT * this.Y_RATIO_3;
	// 下意味ボックスのXY位置
	static UNDER_BOX_X = this.CANVAS_WIDTH * this.X_RATIO_4;
	static UNDER_BOX_Y = this.CANVAS_HEIGHT * this.Y_RATIO_12;
	// ライフのXY位置
	static LIFE_X = this.CANVAS_WIDTH * this.X_RATIO_21;
	static LIFE_Y = this.CANVAS_HEIGHT * this.Y_RATIO_2;

	// コマンド選択ボックスの幅、高さ
	static COMMAND_WIDTH = this.UNDER_BOX_WIDTH / 3;
	static COMMAND_HEIGHT = this.UNDER_BOX_HEIGHT / 3;

	// コマンド選択ボックスのXY位置
	static COMMAND_LEFT_X = this.UNDER_BOX_X;
	static COMMAND_CENTER_X = this.UNDER_BOX_X + this.COMMAND_WIDTH;
	static COMMAND_RIGHT_X = this.UNDER_BOX_X + this.COMMAND_WIDTH * 2;
	static COMMAND_UPPER_Y = this.UNDER_BOX_Y;
	static COMMAND_MIDDLE_Y = this.UNDER_BOX_Y + this.COMMAND_HEIGHT;
	static COMMAND_UNDER_Y = this.UNDER_BOX_Y + this.COMMAND_HEIGHT * 2;
}
