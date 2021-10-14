'use strict'

/**
 * データの保持を行うクラス
 */
export class GameDto {

    // 当クラスのインスタンスフィールド
    static me;

    /**
     * 当Dtoは必ずインスタンス2つ以上作らせない
     * @returns 
     */
    static createInstance() {
        // meフィールドが未設定の場合
        if (!this.me) {
            // meフィールドに設定する
            this.me = new GameDto();
        }
        return this.me;
    }

    static getCanvas() {
        return this.me.canvas;
    }

    static setCanvas(canvas) {
        this.me.canvas = canvas;
    }
    static getCurrentscene() {
        return this.me.currentScene;
    }

    static setCurrentscene(currentScene) {
        this.me.currentScene = currentScene;
    }

    static getScenes() {
        return this.me.scenes;
    }

    static setScenes(scenes) {
        this.me.scenes = scenes;
    }

    static getTemporarycurrentscene() {
        return this.me.temporaryCurrentScene;
    }

    static setTemporarycurrentscene(temporaryCurrentScene) {
        this.me.temporaryCurrentScene = temporaryCurrentScene;
    }

    static getPreloadPromises() {
        return this.me.preloadPromises;
    }

    static setPreloadPromises(preloadPromises) {
        this.me.preloadPromises = preloadPromises;
    }

    static getSounds() {
        return this.me.sounds;
    }

    static setSounds(sounds) {
        this.me.sounds = sounds;
    }

}