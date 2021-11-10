'use strict'
import { Renderer } from '/jsgame/choque/js/engine/render/renderer.js'
import { Color } from '/jsgame/choque/js/engine/constants/color.js'
import { Text } from '/jsgame/choque/js/engine/scene/obj/text.js'
import { Scene } from '/jsgame/choque/js/engine/scene/scene.js'

/**
 * 最初の画面の描画クラス
 */
export let StartRenderer = {
	__proto__: Renderer
}

/**
 * 各レンダリング機能ごとで実装するメインレンダリング処理
 */
StartRenderer.mainRender = function(model) {
	this.scene = new Scene();
	// テキスト表示の設定
	this.scene.push(new Text('press any keys.')
		.center()
		.middle()
		.color(Color.WHITE));
}
