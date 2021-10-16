'use strict'
import {Tilemap} from '/jsgame/sample/js/engine/tilemap.js'

/**
 * データ観察のためのクラス
 */
export class DataObserver {

    static isOutput;
    static tilemap;

    /**
     * コンストラクタ
     * @param {*} tilemap 観察対象のタイルマップ
     */
    static setup ( tilemap ) {
        this.tilemap = tilemap;
        this.count = 0;
    }

    static countup () {
        this.count++;
    }

    static observe ( locateName , isOutput ){
        if(isOutput) console.log(`【${this.count}/${locateName}】tilemap.y : ${this.tilemap.y} , tilemap.vy : ${this.tilemap.vy}`);
    }

    static observeObject ( input , isOutput ){
        if(isOutput) {
            console.log(`【${this.count}】`);
            console.log(input);
        }
    }

}
