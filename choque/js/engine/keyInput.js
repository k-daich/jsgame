'use strict'

/**
 * キー入力のクラス
 */
export class KeyInput {

	// キー入力マップ（キー名：キー押下フラグ）
	static #input = {};
	// キー定義（キー名：キー物理名）
	static keys = {
		up: 'ArrowUp',
		down: 'ArrowDown',
		right: 'ArrowRight',
		left: 'ArrowLeft',
		space: ' ',
		w: 'w',
		a: 'a',
		s: 's',
		d: 'd',
	};

	/**
	 * キー入力の初期設定を行う
	 */
	static isKeydown(name) {
		return this.#input[name];
	}

	/**
	 * キー入力の初期設定を行う
	 */
	static setKeyEvents () {
		// ゲームに使用するキーと、そのキーが押されているかどうかを入れるための連想配列
		// 例 { up: false, down: false }
		for (let key in this.keys ) {
			this.#input[key] = false;
		}
		// イベントリスナーを設定する
		this.setEventListener();
	}

	/**
	 * イベントリスナーを設定するためのメソッド
	 */
	static setEventListener() {
		//なにかキーが押されたときと、はなされたときに呼ばれる
		const _keyEvent = e => {
			// F5,F12はそのまま実施する
			if(e.key === 'F5'
				|| e.key === 'F12') return;
			// デフォルトのイベントを発生させない
			e.preventDefault();
			// keysに登録された数だけ繰り返す
			for ( let key in this.keys ) {
				//イベントのタイプによって呼び出すメソッドを変える
				switch ( e.type ) {
					case 'keydown' :
						// 押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをtrueにする
						if ( e.key === this.keys[key] ) {
							this.#input[key] = true;
							console.log(`keydown ${e.key}`);
						}
						break;
					case 'keyup' :
						// 押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをfalseにする
						if ( e.key === this.keys[key] ) {
							this.#input[key] = false;
							console.log(`keyup ${e.key}`);	
						}
						break;
					default : break;
				}
			}
		}
		//なにかキーが押されたとき
		addEventListener( 'keydown', _keyEvent, { passive: false } );
		//キーがはなされたとき
		addEventListener( 'keyup', _keyEvent, { passive: false } );
	}

}
