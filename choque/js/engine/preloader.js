'use strict'
import {Sound} from '/jsgame/choque/js/engine/sound.js'
import {Sounds} from '/jsgame/choque/js/engine/sounds.js'

/**
 * プリロードを実行するクラス
 */
export class Preloader {
	#preloadPromises = [];

	/**
	 * プリロードのためのメソッド
	 * 引数には、使いたい素材を制限なく入れることができる
	 */
	constructor() {
		// 引数の素材を_assetsに追加
		const _assets = arguments;
		// 素材の数だけ繰り返す
		for (let i = 0; i < _assets.length; i++) {
			// preloadPromises[i]に、あなたはプリロードのプロミス（非同期処理をやりやすくする）だよ、と教える
			this.#preloadPromises[i] = new Promise((resolve, reject) => {
				//もしそのファイルの拡張子が、jpg、jpeg、png、gifのどれかのとき
				if (_assets[i].match(/\.(jpg|jpeg|png|gif)$/i)) {
					//_imgに、あなたは画像ですよ、と教える
					let _img = new Image();
					//img.srcに、引数で指定した画像ファイルを代入
					_img.src = _assets[i];

					//画像が読み込み終わったら、成功ということで、resolve()を呼び出す
					_img.addEventListener('load', () => {
						resolve();
					}, { passive: true, once: true });

					//画像が読み込めなければ、エラーということで、reject()を呼び出す
					_img.addEventListener('error', () => {
						reject(`「${_assets[i]}」は読み込めないよ！`);
					}, { passive: true, once: true });
				}
				//もしそのファイルの拡張子が、wav、wave、mp3、oggのどれかのとき
				else if (_assets[i].match(/\.(wav|wave|mp3|ogg)$/i)) {
					//_soundに、あなたはサウンドですよ、と教える
					let _sound = new Sound();
					//_sound.srcに、引数で指定した音声ファイルを代入
					_sound.src = _assets[i];
					// 読み込んだ音声を登録しておく
					Sounds.add(_assets[i], _sound);
					// 音声を再生する準備をする
					_sound.load();

					//サウンドが読み込み終わったら、成功ということで、resolve()を呼び出す
					_sound.addEventListener('canplaythrough', () => {
						resolve();
					}, { passive: true, once: true });

					//サウンドが読み込めなければ、エラーということで、reject()を呼び出す
					_sound.addEventListener('error', () => {
						reject(`「${_assets[i]}」は読み込めないよ！`);
					}, { passive: true, once: true });
				}
				//ファイルの拡張子がどれでもないとき
				else {
					//エラーということで、reject()を呼び出す
					reject(`「${_assets[i]}」の形式は、プリロードに対応していないよ！`);
				}
			});
		}
	}

	/**
	 * プリロードなどの設定が終わったあとに実行する
	 *
	 * 引数
	 * callback : プリロードなどの設定が終わったあとに実行したいプログラム。今回はゲームのメイン部分
	 */
	executeWhenComp(callback) {
		//ゲームが始まる前に実行しておきたいもの（今回はプリロード）が、すべて成功したあとに、実行したかったゲームのメイン部分「callback()」を実行
		//失敗したときはコンソールにエラーを表示
		Promise.all(this.#preloadPromises).then(result => {
			callback();
		}).catch(reject => {
			console.error(reject);
		});
	}

}
