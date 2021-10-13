'use strict'

/**
 * ゲームづくりの基本となるクラス
 */
class Game {

	/**
	 * コンストラクタ
	 * width : ゲームの横幅
	 * height : ゲームの縦幅
	 */
	constructor(width, height) {
		this.setup();

		// canvas要素を作成
		GameDto.setCanvas(document.createElement('canvas'));
		// 作成したcanvas要素をbodyタグに追加
		document.body.appendChild(GameDto.getCanvas());
		// canvasの横幅（ゲームの横幅）を設定。もし横幅が指定されていなければ320を代入
		GameDto.getCanvas().width = width || 320;
		// canvasの縦幅（ゲームの縦幅）を設定。もし縦幅が指定されていなければ320を代入
		GameDto.getCanvas().height = height || 320;

		// シーンを入れておくための配列
		GameDto.setScenes({});

		//音声を入れておくためのもの
		const sounds = [];
		//画面がすでにタッチされたかどうか
		sounds._isAlreadyTouched = false;
		//設定が終わったかどうか
		sounds._hasFinishedSetting = false;
		GameDto.setSounds(sounds);

		// プリロードしたいオブジェクトを格納する配列
		GameDto.setPreloadPromises([]);
	}

	/**
	 * ゲームに関する初期設定処理を行う（主にstaticオブジェクトの生成）
	 */
	setup() {
		// GameDtoのインスタンスを作成
		GameDto.createInstance();
		// キー入力の初期設定を行う
		KeyInput.setup();
	}

	/**
	 * プリロードのためのメソッド
	 *
	 * 引数には、使いたい素材を制限なく入れることができる
	 */
	preload() {
		// 引数の素材を_assetsに追加
		const _assets = arguments;
		// 素材の数だけ繰り返す
		for (let i = 0; i < _assets.length; i++) {
			// preloadPromises[i]に、あなたはプリロードのプロミス（非同期処理をやりやすくする）だよ、と教える
			GameDto.getPreloadPromises()[i] = new Promise((resolve, reject) => {
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
					//this.soundsに、読み込んだ音声を入れておく
					GameDto.getSounds()[_assets[i]] = _sound;
					//音声を再生する準備をする
					GameDto.getSounds()[_assets[i]].load();

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
	main(callback) {
		//ゲームが始まる前に実行しておきたいもの（今回はプリロード）が、すべて成功したあとに、実行したかったゲームのメイン部分「callback()」を実行
		//失敗したときはコンソールにエラーを表示
		Promise.all(GameDto.getPreloadPromises()).then(result => {
			callback();
		}).catch(reject => {
			console.error(reject);
		});
	}

	/**
	 * startメソッドを呼び出すことで、メインループが開始される
	 */
	start() {
		// ゲームがはじまったときと、ブラウザのサイズが変わったときに呼ばれる。縦横の比を変えずに、canvasを拡大縮小できる
		const _resizeEvent = () => {
			// ブラウザとcanvasの比率の、縦と横を計算し、小さいほうを_ratioに代入する
			const _ratio = Math.min(innerWidth / GameDto.getCanvas().width, innerHeight / GameDto.getCanvas().height);
			// canvasのサイズを、ブラウザに合わせて変更する
			GameDto.getCanvas().style.width = GameDto.getCanvas().width * _ratio * 0.9 + 'px';
			GameDto.getCanvas().style.height = GameDto.getCanvas().height * _ratio * 0.9 + 'px';
		}

		// ブラウザのサイズが変更されたとき、_resizeを呼び出す
		addEventListener('resize', _resizeEvent, { passive: true });
		// _resizeを呼び出す
		_resizeEvent();

		// メインループを呼び出す
		this._mainLoop();

		//ユーザーの操作を待つためのメソッドを呼び出す
		this._waitUserManipulation();
		//イベントリスナーをセットする（削除）
		//this._setEventListener();（削除）
	} // start() EoS

	/**
	 * ユーザーからの操作を待つためのメソッド
	 */
	 _waitUserManipulation() {
		//すべての音声を再生する
		const _playAllSounds = e => {
			//デフォルトのイベントを発生させない
			e.preventDefault();
			//画面にタッチされたかどうかの変数をtrueにする
			this._isAlreadyTouched = true;

			//音声を再生するためのプロミスを入れておく配列
			const _playPromises = [];

			//this.soundsの数だけ繰り返す
			//この繰り返しは、読み込まれた音声を、最初に全て同時に再生してしまおうというもの
			//こうすることで、スマホのブラウザなどの、音声を自動で流せないという制限を解決できる
			for ( let sound in this.sounds ) {
				//音声を再生する準備をする
				this.sounds[ sound ].load();
				//音声をミュートにする
				this.sounds[ sound ].muted = true;
				//音声を再生するメソッドはPromiseを返してくれるので、soundPromiseに追加
				_playPromises.push( this.sounds[ sound ].play() );
			}

			//Promiseが成功か失敗かのチェーン
			Promise.all( _playPromises ).then( () => {
				//成功した場合は全ての音をストップする
				for ( let sound in this.sounds ) {
					this.sounds[ sound ].stop();
				}
			} ).catch( err => {
				//失敗した場合はエラーを表示
				console.log( err );
			} );

			//音声を再生するときのエラーを防ぐために、すこしだけ待つ
			setTimeout( () => {
				//イベントリスナーをセットする
				KeyInput.setEventListener();
				this._hasFinishedSetting = true;
			}, 2000 );
		} //_playAllSounds() 終了

		// なにかキーが押されたとき、_playAllSoundsを呼び出す
		addEventListener( 'keydown', _playAllSounds, { passive: false, once: true } );
	} // _waitUserManipulation() 終了

	/**
	 * メインループ
	 */
	_mainLoop() {
		//画家さん（コンテキスト）を呼ぶ
		const ctx = GameDto.getCanvas().getContext('2d');
		//塗りつぶしの色に、黒を指定する
		ctx.fillStyle = '#000000';
		//左上から、画面のサイズまでを、塗りつぶす
		ctx.fillRect(0, 0, GameDto.getCanvas().width, GameDto.getCanvas().height);

		//もし、ユーザーがまだ画面を操作していないとき、スタートパネルを表示
		if ( !this._isAlreadyTouched ) this.startPanel();
		// 設定がすでに終了しているとき
		else if ( this._hasFinishedSetting ) {
			// 現在のシーンのupdateメソッドを呼び出す
			GameDto.getCurrentscene().update();

			// 一時的に入れておいたシーンが現在のシーンではないとき（シーンが切り替わったとき）、現在のシーンのonchangesceneメソッドを呼び出す
			if (GameDto.getTemporarycurrentscene() !== GameDto.getCurrentscene()) GameDto.getCurrentscene().onchangescene();

			// 現在のシーンの、ゲームに登場する全てのもの（オブジェクト）の数だけ繰り返す
			for (let _obj of GameDto.getCurrentscene().objs) {
				// 現在のシーンの、すべてのオブジェクトのupdateメソッドを呼び出す
				_obj.update(GameDto.getCanvas(), KeyInput.getInput());
			}

			// 現在のシーンを覚えておいてもらう
			GameDto.setTemporarycurrentscene(GameDto.getCurrentscene());
		}

		// 自分自身（_mainLoop）を呼び出して、ループさせる
		requestAnimationFrame(this._mainLoop.bind(this));
	}

	/**
	 * ゲームを開始して一番最初に表示される画面をつくるメソッド。ここでユーザーに操作してもらい、音声を出せるようにする
	 */
	startPanel() {
		//表示したいテキストを_textに代入
		const _text = 'press any keys.'
		//表示したいテキストのフォントを_fontに代入
		const _font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";
		//フォントサイズは、ゲーム画面の横幅を20で割ったもの。（今回は表示したい文字が18文字なので、左右の余白も考え、20で割る）
		const _fontSize = GameDto.getCanvas().width/20;
		//画家さん（コンテキスト）を呼ぶ
		const _ctx = GameDto.getCanvas().getContext( '2d' );
		//テキストの横幅を取得
		const _textWidth = _ctx.measureText( _text ).width;
		//フォントの設定
		_ctx.font = `normal ${_fontSize}px ${_font}`;
		//ベースラインを文字の中央にする
		_ctx.textBaseline = 'middle';
		//テキストの色をグレーに設定
		_ctx.fillStyle = '#aaaaaa';
		//テキストを上下左右中央の位置に表示
		_ctx.fillText( _text, ( GameDto.getCanvas().width - _textWidth )/2, GameDto.getCanvas().height/2 );
	} //startPanel() EoS

	/**
	 * ゲームにシーンに追加できるようになる、addメソッドを作成
	 *
	 * 引数
	 * scene : 追加したいシーン
	 */
	static add(name, scene) {
		// 現在のシーン（currentScene）になにも入っていないときは、scenes[0]を代入
		GameDto.setCurrentscene(GameDto.getCurrentscene() || scene);

		// 引数がSceneのとき、GameDto.getScenes()の末尾にsceneを追加
		if (scene instanceof Scene) GameDto.getScenes()[name] = scene;
		// 引数がSceneでなければ、コンソールにエラーを表示
		else console.error('Gameに追加できるのはSceneだけだよ！');
	}

	/**
	 * 現在のシーンにオブジェクトを追加する
	 * @param {*} obj 
	 */
	static addObjToScene(obj) {
		// 現在のシーンにオブジェクトを追加する
		GameDto.getCurrentscene().add(obj);
	}

	/**
	 * 指定した名前のシーンに切り替える
	 * @param {*} name 
	 */
	static switchScene(name) {
		if (GameDto.getScenes()[name]) {
			GameDto.setCurrentscene(GameDto.getScenes()[name]);
		}
		else console.error(`存在しないシーン名称が指定された。名称 :  ${name}`);
	}

	/**
	 * 常に呼び出され、スプライトの移動やイベントの発生などに使うメソッド。空なのはオーバーライド（上書き）して使うため
	 */
	onenterframe() { }

}
