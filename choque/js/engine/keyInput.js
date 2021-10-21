'use strict'
/**
 * 
 */
export class KeyInput {

	// 当クラスのインスタンスフィールド
	static #input = {};
	static keys = {
		up: 'ArrowUp',
		down: 'ArrowDown',
		right: 'ArrowRight',
		left: 'ArrowLeft',
		space: ' ',
	};

	/**
	 * キー入力の初期設定を行う
	 */
	static setup () {
		// ゲームに使用するキーと、そのキーが押されているかどうかを入れるための連想配列
		// 例 { up: false, down: false }
		for (let key in this._keys ) {
			this.input[key] = false;
		}

	}

	/**
	 * イベントリスナーをセットするためのメソッド
	 */
	static setEventListener() {
		//なにかキーが押されたときと、はなされたときに呼ばれる
		const _keyEvent = e => {
			// F5,F12はそのまま実施する
			if(e.key === 'F5'
				|| e.key === 'F12') return;
			//デフォルトのイベントを発生させない
			e.preventDefault();
			//_keysに登録された数だけ繰り返す
			for ( let key in this._keys ) {
				//イベントのタイプによって呼び出すメソッドを変える
				switch ( e.type ) {
					case 'keydown' :
						//押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをtrueにする
						if ( e.key === this._keys[key] ) this.input[key] = true;
						break;
					case 'keyup' :
						//押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをfalseにする
						if ( e.key === this._keys[key] ) this.input[key] = false;
						break;
				}
			}
		}
		//なにかキーが押されたとき
		addEventListener( 'keydown', _keyEvent, { passive: false } );
		//キーがはなされたとき
		addEventListener( 'keyup', _keyEvent, { passive: false } );
	}

}
