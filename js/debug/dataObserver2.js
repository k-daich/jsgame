'use strict'
import {Tilemap} from '/jsgame/js/engine/tilemap.js'

/**
 * データ観察のためのクラス
 */
export var dataObserver = {
    tilemap : '',
    count : 0,

    /**
     * コンストラクタ
     * @param {*} tilemap 観察対象のタイルマップ
     */
    setup : function ( tilemap ) {
        this.tilemap = tilemap;
    },

    /**
     * カウントアップ
     */
     countup : function () {
        this.count++;
    },

    observe : function ( locateName , isOutput ){
        if(isOutput) console.log(`【${this.count}/${locateName}】tilemap.y : ${this.tilemap.y} , tilemap.vy : ${this.tilemap.vy}`);
    },

    observeObject : function ( input , isOutput ){
        if(isOutput) {
            console.log(`【${this.count}】`);
            console.log(input);
        }
    }

}
