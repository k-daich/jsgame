'use strict'
import {DataObserver} from '/jsgame/js/debug/dataObserver.js'
import {Tile} from '/jsgame/js/engine/tile.js'
import {Text} from '/jsgame/js/engine/text.js'
import {Game} from '/jsgame/js/engine/game.js'
import {GameDto} from '/jsgame/js/engine/dto/gameDto.js'
import {InstanceHolder} from '/jsgame/js/util/instanceHolder.js'

/**
 * タイルマップに関するクラス
 */
export class Tilemap {
	//タイルのサイズ
	TILE_SIZE = 32;
	//歩く速さ
	WALKING_SPEED = 4;
	// シーンが切り替え済みかフラグ
	isSwitchedScene = false;

	/**
	 * 引数
	 * img : 画像ファイルまでのパス
	 * size : タイルひとつの大きさ（一辺の長さ）
	 *
	 * タイルひとつは正方形にする
	 */
	constructor( img, size ) {
		//Imageのインスタンスを作成
		this.img = new Image();
		//this.img.srcに画像ファイルまでのパスを代入
		this.img.src = img;
		//画像の初期位置
		this.x = this.y = 0;
		//数値によってタイルマップを移動させることができる（移動速度）
		this.vx = this.vy = 0;
		//引数sizeが指定されていない場合、this.sizeに32を代入
		this.size = size || 32;
		//二次元配列で数値を入力すると、マップをつくることができる
		this.data = [];
		//タイルマップに重ねるように置きたいタイルを追加できる
		this.tiles = {};
		//壁や天井など、移動できないタイルを指定できる
		this.obstacles = [0];
	}

    /**
	 * タイルマップの上にタイルを重ねるように追加できるメソッド
	 *
	 * 引数
	 * tile : 追加したいタイル
	 */
     add( tile ) {
		//引数がTileのとき
		if ( tile instanceof Tile ) {
			//タイルのマップ座標を計算
			DataObserver.observe('tile.y : ' + tile.y + ', this.y : ' + this.y + ', this.size : ' + this.size, false);
			tile.mapX = tile.x / this.size;
			tile.mapY = tile.y / this.size;
			//もし、タイルがタイルマップと同期していないときは、マップ座標を計算しなおす
			if ( !tile.isSynchronize ) {
				tile.mapX = ( tile.x - this.x ) / this.size;
				tile.mapY = ( tile.y - this.y ) / this.size;
			}
			//this.tilesの末尾にtileを追加
			this.tiles[tile.name] = tile;
		}
		//引数がTileでなければ、コンソールにエラーを表示
		else console.error( 'Tilemapに追加できるのはTileだけだよ！' );
	}

	/**
	 * 指定された場所のタイルが、移動できないかどうかを取得できるメソッド
	 *
	 * 引数
	 * mapX : タイルマップ上のX座標
	 * mapY : タイルマップ上のY座標
	 */
	 hasObstacle( mapX, mapY ) {
		//指定された場所のタイルが、壁や天井など、移動できないかどうか
		return this.obstacles.some( obstacle => obstacle === this.data[mapY][mapX] );
	}

	/**Gameクラスのメインループからずっと呼び出され続ける
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	update( canvas , input ) {
		DataObserver.observe('update()@tilemap.js', false);
		//画像などを画面に表示するためのメソッドを呼び出す
		this.render( canvas );
		//常に呼び出される、オーバーライド用のメソッドを呼び出す
		this.onenterframe();

		//キャラクターのアニメーションのための変数
		let toggleForAnimation = 0;
		//ゴールのテキストが表示されているかどうかの変数
		let hasDisplayedGoalText = false;

		// タイルマップの位置がタイルのサイズで割り切れる位置に来た場合
		if ( ( this.y - this.TILE_SIZE/2 ) % this.TILE_SIZE === 0 && ( this.x - this.TILE_SIZE/2 ) % this.TILE_SIZE === 0 ) {
			// タイルマップの移動速度に0を代入する
			this.vx = this.vy = 0;
			// パーティ全員の移動速度に0を代入する
			const party = InstanceHolder.getParty();
			for ( const mem of party.members ) {
				//パーティ全員の移動速度を0にする
				mem.vx = mem.vy = 0;
				//パーティ全員の画像を切り替える
				mem.animation = 1;
			}

			// 山田先生のタイルがゴールのタイルと重なっているとき、イベントを発生させる
			if ( this.tiles['player'].isOverlapped( this.tiles['goal'] ) ) {
				//ゴールのテキストが表示されていないとき
				if ( !hasDisplayedGoalText ) {
					//変数goalTextに、あなたは「ゴール！」というテキストだよ、と教える
					const goalText = new Text( 'ゴール！' );
					//テキストサイズを変更
					goalText.size = 50;
					//テキストを上下左右中央の位置にする
					goalText.center().middle();
					//シーンにテキストを追加
					Game.addObjToScene( goalText );
					//ゴールのテキストが表示されているかどうかの変数にtrueを代入
					hasDisplayedGoalText = true;
					//移動ができないようにする
					this.tiles['player'].isMovable = false;
					//bgm.mp3をストップ
					GameDto.getSounds()[ '/jsgame/sound/bgm.mp3' ].stop();
					//clear.mp3を再生
					GameDto.getSounds()[ '/jsgame/sound/clear.mp3' ].start();
					// 5秒たったら、タイトルシーンに切り替える
					setTimeout( () => {
						DataObserver.observe(`update() => setTimeout()@tilemap.js , flg : ${this.isSwitchedScene}` , true);
						if( !this.isSwitchedScene ) {
							this.isSwitchedScene = true;
							Game.switchScene( 'title' );
						}
					}, 5000 );
				}
			}

			//移動可能なとき
			if ( this.tiles['player'].isMovable ) {
				//方向キーが押されているときは、タイルマップの移動速度と、山田先生の向きに、それぞれの値を代入する
				if ( input.left ) {
					party.setMembersVelocity( 'left' );
					this.vx = this.WALKING_SPEED;
					this.tiles['player'].direction = 1;
				}
				else if ( input.right ) {
					party.setMembersVelocity( 'right' );
					this.vx = -1 * this.WALKING_SPEED;
					this.tiles['player'].direction = 2;
				}
				else if ( input.up ) {
					party.setMembersVelocity( 'up' );
					this.vy = this.WALKING_SPEED;
					this.tiles['player'].direction = 3;
				}
				else if ( input.down ) {
					party.setMembersVelocity( 'down' );
					this.vy = -1 * this.WALKING_SPEED;
					this.tiles['player'].direction = 0;
				}

				//移動後のマップ座標を求める
				const playerCoordinateAfterMoveX = this.tiles['player'].mapX - this.vx/this.WALKING_SPEED;
				const playerCoordinateAfterMoveY = this.tiles['player'].mapY - this.vy/this.WALKING_SPEED;
				//コンソールにマップ座標を表示
				DataObserver.observe( `this.tiles['player'].mapX : ${this.tiles['player'].mapX}, this.tiles['player'].mapY : ${this.tiles['player'].mapY}`, false);

				//もし移動後のマップ座標に障害物があるとき
				if ( this.hasObstacle( playerCoordinateAfterMoveX, playerCoordinateAfterMoveY ) ) {
					//移動量に0を代入する
					this.vx = this.vy = 0;
					//パーティ全員の移動速度に0を代入する
					for ( const mem of party.members ) {
						mem.vx = mem.vy = 0;
					}
				}
				//タイルマップが動いているとき、パーティメンバーの向きを変える
				if ( this.vx !== 0 || this.vy !== 0 ) party.setMembersDirection();
			}
		}
		//タイルマップのXとY座標両方がタイルのサイズで割り切れるとき以外で、タイルの半分のサイズで割り切れるとき
		else if ( ( this.x + this.TILthis/2 ) % ( this.TILE_SIZE/2 ) === 0 && ( this.y + this.TILE_SIZE/2 ) % ( this.TILE_SIZE/2 ) === 0 ) {
			//0と1を交互に取得できる
			toggleForAnimation ^= 1;
			//パーティメンバーの数だけ繰り返す
			for ( let i in party.members ) {
				//toggleForAnimationの数値によって、パーティ全員の画像を切り替える
				if ( toggleForAnimation === 0 ) party.members[i].animation = 2;
				else party.members[i].animation = 0;
			}
		}

		//タイルマップを移動する
		this.x += this.vx;
		this.y += this.vy;

		//タイルの数だけ繰り返す
		for ( let _key in this.tiles) {
			//タイルとタイルマップの位置を同期させるとき
			if ( this.tiles[_key].isSynchronize ) {
				//タイルマップの位置の分、それぞれのタイルの位置をずらす
				this.tiles[_key].shiftX = this.x;
				this.tiles[_key].shiftY = this.y;
			}
			//それぞれのタイルのupdateメソッドを呼び出す
			this.tiles[_key].update( canvas );

			// タイルがタイルマップと同期している場合
			if ( this.tiles[_key].isSynchronize ) {
				//タイルのマップ座標を計算
				this.tiles[_key].mapX = this.tiles[_key].x / this.size;
				this.tiles[_key].mapY = this.tiles[_key].y / this.size;
			}
			// タイルがタイルマップと同期している場合
			else {
				this.tiles[_key].mapX = ( this.tiles[_key].x - this.x ) / this.size;
				this.tiles[_key].mapY = ( this.tiles[_key].y - this.y ) / this.size;
			}
		}
    }

	/**
	 * Gameクラスのメインループからずっと呼び出され続ける。画像を表示したりするためのメソッド
	 *
	 * 引数
	 * canvas : 紙（キャンバス）
	 */
	render( canvas ) {
		//マップの縦方向の数だけ繰り返す
		for (let y=0; y<this.data.length; y++) {
			//タイルの縦の位置
			const _tileY = this.size * y + this.y;
			//タイルが、画面から縦にはみ出しているとき、この下をスキップして、次から繰り返し
			if ( _tileY < -1 * this.size || _tileY > canvas.height ) continue;

			//マップの横方向の数だけ繰り返す
			for (let x=0; x<this.data[y].length; x++) {
				//タイルの横の位置
				const _tileX = this.size * x + this.x
				//タイルが、画面から横にはみ出しているとき、この下をスキップして、次から繰り返し
				if ( _tileX < -1 * this.size || _tileX > canvas.width ) continue;

				//X方向に、何番目の画像か
				const _frameX = this.data[y][x] % ( this.img.width / this.size );
				//Y方向に、何番目の画像か
				const _frameY = ~~( this.data[y][x] / ( this.img.width / this.size ) );

				//画家さん（コンテキスト）を呼ぶ
				const _ctx = canvas.getContext( '2d' );

				//タイルを表示
				_ctx.drawImage(
					this.img,
					this.size * _frameX,
					this.size * _frameY,
					this.size,
					this.size,
					_tileX,
					_tileY,
					this.size,
					this.size
				);
			}
		}
	}

	/**
	 * 常に呼び出されるメソッド。空なのはオーバーライド（上書き）して使うため
	 */
	onenterframe() {}

}