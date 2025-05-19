/**
 * 画像座標ラッピングの切り替え管理クラス
 * 指定モードごとに、範囲外座標の振る舞い（inside, clamp, repeat）を動的に切り替える基底クラス
 *
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixelWrapInside from "./PixelWrapInside.js";
import PixelWrapClamp from "./PixelWrapClamp.js";
import PixelWrapRepeat from "./PixelWrapRepeat.js";

export default class PixelWrap {
	/**
	 * ラッピングモード・画像サイズを指定して初期化
	 * @param {string} [mode=PixelWrap.MODE.INSIDE] ラッピングモード
	 * @param {number} [width=1] 画像幅
	 * @param {number} [height=1] 画像高さ
	 */
	constructor(mode, width, height) {
		this.width = 1;
		this.height = 1;
		if (arguments.length >= 2) {
			this.width = width;
			this.height = height;
		}
		if (arguments.length == 3) {
			this.setPixelWrapMode(mode);
		} else {
			this.setPixelWrapMode(PixelWrap.MODE.INSIDE);
		}
	}

	/**
	 * このラッピングの複製を作成
	 * @returns {PixelWrap}
	 */
	clone() {
		return new PixelWrap(this.wrapmode, this.width, this.height);
	}

	/**
	 * ラッピングモードを設定（INSIDE, CLAMP, REPEAT）
	 * @param {string} mode PixelWrap.MODEのいずれか
	 */
	setPixelWrapMode(mode) {
		this.wrapmode = mode;
		if (mode === PixelWrap.MODE.INSIDE) {
			this.wrap = new PixelWrapInside(this.width, this.height);
		} else if (mode === PixelWrap.MODE.CLAMP) {
			this.wrap = new PixelWrapClamp(this.width, this.height);
		} else if (mode === PixelWrap.MODE.REPEAT) {
			this.wrap = new PixelWrapRepeat(this.width, this.height);
		}
	}

	/**
	 * 画像サイズを設定
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width, height) {
		this.width = width;
		this.height = height;
		if (this.wrap) {
			this.wrap.setSize(width, height);
		}
	}

	/**
	 * 指定座標のラップ後の[x, y]配列を返す
	 * モードに応じて範囲外判定・クランプ・リピートなどで返る値が変わる
	 * @param {number} x
	 * @param {number} y
	 * @returns {number[]|null} INSIDE: 範囲内なら[x,y]／範囲外はnull、CLAMP/REPEAT: 常に[x, y]
	 */
	getPixelPosition(x, y) {
		return this.wrap.getPixelPosition(x, y);
	}
}

/**
 * ラッピング方式のモード定数
 * @enum {string}
 * @property {string} INSIDE 範囲外は無効(null)
 * @property {string} CLAMP 範囲外は端にクランプ
 * @property {string} REPEAT 範囲外は繰り返し
 */
PixelWrap.MODE = {
	INSIDE: "INSIDE",
	CLAMP: "CLAMP",
	REPEAT: "REPEAT"
};
