/**
 * 画像座標のラッピング（はみ出し時は端にクランプする方式）
 * 画像の外側を参照した場合、座標を強制的に最も近い端にクランプして返す
 *
 * @module PixWrapClamp
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixWrapInside from "./PixWrapInside.js";

export default class PixWrapClamp extends PixWrapInside {
	/**
	 * サイズを指定して初期化
	 * @param {number} width 画像幅
	 * @param {number} height 画像高さ
	 */
	constructor(width, height) {
		super(width, height);
	}

	/**
	 * このラッピングの複製を作成
	 * @returns {PixWrapClamp}
	 */
	clone() {
		return new PixWrapClamp(this.width, this.height);
	}

	/**
	 * 指定座標が範囲内ならそのまま、範囲外なら端にクランプした[x, y]座標を返す
	 * @param {number} x
	 * @param {number} y
	 * @returns {number[]} クランプ済み座標 [x, y]
	 */
	getPixelPosition(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
			return [x, y];
		}
		// はみ出た場合は中にむりやり収める
		x = Math.floor(Math.min(Math.max(0, x), this.width - 1));
		y = Math.floor(Math.min(Math.max(0, y), this.height - 1));
		return [x, y];
	}
}
