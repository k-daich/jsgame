'use strict'

/**
 * 定数定義
 */
export class BattleState {

	static INIT = 'init';
	static WHICH_FIRST = 'whichFirst';
	static OWN_COMMAND_WAIT = 'ownCommandWait';
	static OWN_CHOICE_WAIT = 'ownChoiceWait';
	static OWN_CHOICED = 'ownChoiced';
	static ENEMY_COMMAND_WAIT = 'enemyCommandWait';
	static ENEMY_CHOICE_WAIT = 'enemyChoiceWait';
	static ENEMY_CHOICED = 'enemyChoiced';
	static FIN = 'fin';

}