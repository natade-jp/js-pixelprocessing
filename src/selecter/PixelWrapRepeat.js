/**
 * 画像座標のラッピング（範囲外は繰り返しリピートする方式）
 * 範囲外座標は画像サイズでラップ（繰り返し）されます。
 *
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixelWrapInside from "./PixelWrapInside.js";

export default class PixelWrapRepeat extends PixelWrapInside {
	/**
	 * 画像サイズを指定して初期化
	 * @param {number} width 画像幅
	 * @param {number} height 画像高さ
	 */
	constructor(width, height) {
		super(width, height);
	}

	/**
	 * このラップ（繰り返し）の複製を作成
	 * @returns {PixelWrapRepeat}
	 */
	clone() {
		return new PixelWrapRepeat(this.width, this.height);
	}

	/**
	 * 指定座標が範囲内ならそのまま、範囲外ならリピートした[x, y]座標を返す
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @returns {number[]} ラップ済み座標 [x, y]
	 */
	getPixelPosition(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
			return [x, y];
		}
		const x_times = Math.floor(x / this.width);
		const y_times = Math.floor(y / this.height);
		// リピート
		x -= Math.floor(this.width * x_times);
		y -= Math.floor(this.height * y_times);
		if (x < 0) {
			x += this.width;
		}
		if (y < 0) {
			y += this.height;
		}
		return [x, y];
	}
}
