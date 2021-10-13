'use strict'

/**
 * インスタンスを保持しておくクラス
 */
class InstanceHolder {

    static party;

    /**
     * インスタンスの生成/保持を行う
     */
    static createParty() {
    	// インスタンスを生成し、staticフィールドに保持させる
		this.party = new Party( arguments );
        return this.party;
    }

    /**
     * パーティインスタンスを取得する（未生成の場合は生成する）
     * @returns インスタンス
     */
    static getParty() {
		return this.party;
    }

}