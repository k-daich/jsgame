'use strict'

//ブラウザがページを完全に読みこむまで待つ
addEventListener('load', () => {

	//変数gameに、あなたはゲームですよ、と教える
	const game = new Game();
	// 画像データのプリロードを実施する
	game.preload('/jsgame/img/yamada.png', '/jsgame/img/rico.png', '/jsgame/img/aru.png', '/jsgame/img/start.png', '/jsgame/img/goal.png', '/jsgame/img/tile.png', '/jsgame/img/dpad.png', '/jsgame/sound/bgm.mp3', '/jsgame/sound/start.mp3', '/jsgame/sound/clear.mp3');

	//ゲームを開始する準備ができたあとに実行する
	game.main(() => {
		//タイトルシーン
		const titleScene = () => {

			//変数sceneに、あなたはシーンですよ、と教える
			const scene = new Scene();
			//変数titleTextに、あなたは「title scene」というテキストだよ、と教える
			const titleText = new Text('title scene');
			//テキストを上下左右中央の位置にする
			titleText.center().middle();
			//シーンにテキストを追加
			scene.add(titleText);

			//ループから常に呼び出される
			scene.onenterframe = () => {
				DataObserver.observeObject(KeyInput.getInput(), false);
				//スペースキーが押されたとき、メインシーンに切り替える
				if (KeyInput.getInput().space) {
					Game.add('main', mainScene());
					Game.switchScene('main');
				}
			}

			scene.onchangescene = () => {
				KeyInput.initInputFlg();
				//clear.mp3をストップ
				GameDto.getSounds()[ '/jsgame/sound/clear.mp3' ].stop();
				//start.mp3を再生
				GameDto.getSounds()[ '/jsgame/sound/start.mp3' ].start();
				alert('Titleシーン');
			}

			//作ったシーンを返す
			return scene;
		}

		//メインシーン
		const mainScene = () => {
			// Sceneオブジェクトの生成
			const scene = new Scene();

			//変数tilemapに、あなたはタイルマップですよ、と教える
			const tilemap = new Tilemap('/jsgame/img/tile.png');
			//tilemap.dataに、どんなマップなのか教える
			tilemap.data = map;
			//マップ全体の位置をずらす
			tilemap.x = tilemap.TILE_SIZE * 4 - tilemap.TILE_SIZE / 2;
			tilemap.y = tilemap.TILE_SIZE * 3 - tilemap.TILE_SIZE / 2;
			//移動できないタイルを指定する
			tilemap.obstacles = [0, 3, 6, 7, 8, 9, 10, 11];
			//マップを登録する
			scene.add(tilemap);

			//変数startに、あなたはスタートのタイルですよ、と教える
			const start = new Tile('start', '/jsgame/img/start.png');
			//マップ左上からの座標を指定する
			start.x = tilemap.TILE_SIZE * 1;
			start.y = tilemap.TILE_SIZE * 2;
			//スタートのタイルを、tilemapに追加して、とお願いする
			tilemap.add(start);

			//変数goalに、あなたはゴールのタイルですよ、と教える
			const goal = new Tile('goal', '/jsgame/img/goal.png');
			//マップ左上からの座標を指定する
			goal.x = tilemap.TILE_SIZE*98;
			goal.y = tilemap.TILE_SIZE*98;
			//ゴールのタイルを、tilemapに追加して、とお願いする
			tilemap.add(goal);

			//変数yamadaに、あなたは山田先生のキャラクタータイルですよ、と教える
			const yamada = new CharacterTile('player', '/jsgame/img/yamada.png');
			//山田先生を画面の中央に配置
			yamada.x = yamada.y = tilemap.TILE_SIZE * 5 - tilemap.TILE_SIZE / 2;
			//タイルマップの動きと同期させない
			yamada.isSynchronize = false;
			//tilemapに、山田先生のタイルを追加して、とお願いする
			tilemap.add(yamada);

			//変数ricoに、あなたはりこちゃんのキャラクタータイルですよ、と教える
			const rico = new CharacterTile('rico', '/jsgame/img/rico.png');
			//りこちゃんの位置を決める
			rico.x = tilemap.TILE_SIZE * 6 - tilemap.TILE_SIZE / 2;
			rico.y = tilemap.TILE_SIZE * 5 - tilemap.TILE_SIZE / 2;
			//タイルマップの動きと同期させない
			rico.isSynchronize = false;
			//tilemapに、りこちゃんのキャラクタータイルを追加して、とお願いする
			tilemap.add(rico);

			// 変数aruに、あなたはアルくんのキャラクタータイルですよ、と教える
			const aru = new CharacterTile('aru', '/jsgame/img/aru.png');
			// アルくんの位置を決める
			aru.x = tilemap.TILE_SIZE * 7 - tilemap.TILE_SIZE / 2;
			aru.y = tilemap.TILE_SIZE * 5 - tilemap.TILE_SIZE / 2;
			// タイルマップの動きと同期させない
			aru.isSynchronize = false;
			//tilemapに、アルくんのキャラクタータイルを追加して、とお願いする
			tilemap.add(aru);

			//変数partyに、あなたは山田先生とりこちゃんとアルくんのパーティですよ、と教える
			const party = InstanceHolder.createParty(new Array(yamada, rico, aru));
			//パーティの歩く速さに、WALKING_SPEEDの値を代入する
			party.speed = tilemap.WALKING_SPEED;

			// タイルマップのデバッグ用観察設定
			DataObserver.setup(tilemap);

			//ループから常に呼び出される
			scene.onenterframe = () => {
				DataObserver.observeObject(KeyInput.getInput(), false);
			}

			scene.onchangescene = () => {
				KeyInput.initInputFlg();
				//start.mp3をストップ
				GameDto.getSounds()[ '/jsgame/sound/start.mp3' ].stop();
				//bgm.mp3をループ再生
				GameDto.getSounds()[ '/jsgame/sound/bgm.mp3' ].loop();
				alert('Mainシーン');
			}

			//作ったシーンを返す
			return scene;
		}

		//gameに、シーンを追加して、とお願いする
		Game.add('title', titleScene());
		Game.add('main', mainScene());

		//gameに、ゲームをスタートして、とお願いする
		game.start();
	}); // main() EoS

});

