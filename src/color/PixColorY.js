/**
 * 輝度（Y成分・グレースケール）のみを扱う色クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixColor from "./PixColor.js";

export default class PixColorY extends PixColor {
	/**
	 * 輝度値（Y成分）で初期化
	 * @param {number} color 輝度（0.0～255.0）
	 */
	constructor(color) {
		super();
		// ディープコピー
		this.y = color;
	}

	/**
	 * 輝度値を返す
	 * @returns {number}
	 */
	getColor() {
		return this.y;
	}

	/**
	 * この色のコピーを返す
	 * @returns {PixColorY}
	 */
	clone() {
		return new PixColorY(this.y);
	}

	/**
	 * 輝度値0.0の色を返す
	 * @returns {PixColorY}
	 */
	zero() {
		return new PixColorY(0.0);
	}

	/**
	 * 輝度値1.0の色を返す
	 * @returns {PixColorY}
	 */
	one() {
		return new PixColorY(1.0);
	}

	/**
	 * 輝度値に加算
	 * @param {number} x
	 * @returns {PixColorY}
	 */
	add(x) {
		return new PixColorY(this.y + x);
	}

	/**
	 * 輝度値から減算
	 * @param {number} x
	 * @returns {PixColorY}
	 */
	sub(x) {
		return new PixColorY(this.y - x);
	}

	/**
	 * 輝度値に乗算
	 * @param {number} x
	 * @returns {PixColorY}
	 */
	mul(x) {
		return new PixColorY(this.y * x);
	}

	/**
	 * 輝度値を除算
	 * @param {number} x
	 * @returns {PixColorY}
	 */
	div(x) {
		return new PixColorY(this.y / x);
	}

	/**
	 * 輝度値にexp()を適用
	 * @returns {PixColorY}
	 */
	exp() {
		return new PixColorY(Math.exp(this.y));
	}

	/**
	 * 輝度値にlog()を適用
	 * @returns {PixColorY}
	 */
	log() {
		return new PixColorY(Math.log(this.y));
	}

	/**
	 * 輝度値をbaseのべき乗にする
	 * @param {number} base
	 * @returns {PixColorY}
	 */
	pow(base) {
		return new PixColorY(Math.pow(base, this.y));
	}

	/**
	 * 任意の底の対数
	 * @param {number} base
	 * @returns {PixColorY}
	 */
	baselog(base) {
		return new PixColorY(Math.log(this.y) / Math.log(base));
	}

	/**
	 * テーブル参照による変換
	 * @param {Array<number>} table
	 * @returns {PixColorY}
	 */
	table(table) {
		return new PixColorY(table[Math.floor(this.y)]);
	}

	/**
	 * ランダムな輝度値（0～255）
	 * @returns {PixColorY}
	 */
	random() {
		return new PixColorY(Math.random() * 256);
	}

	/**
	 * 輝度値（明るさ）を返す
	 * @returns {number}
	 */
	luminance() {
		return this.y;
	}

	/**
	 * 他の輝度色と加算
	 * @param {PixColorY} c
	 * @returns {PixColorY}
	 */
	addColor(c) {
		return new PixColorY(this.y + c.y);
	}

	/**
	 * 他の輝度色と減算
	 * @param {PixColorY} c
	 * @returns {PixColorY}
	 */
	subColor(c) {
		return new PixColorY(this.y - c.y);
	}

	/**
	 * 他の輝度色と乗算
	 * @param {PixColorY} c
	 * @returns {PixColorY}
	 */
	mulColor(c) {
		return new PixColorY(this.y * c.y);
	}

	/**
	 * 他の輝度色と除算
	 * @param {PixColorY} c
	 * @returns {PixColorY}
	 */
	divColor(c) {
		return new PixColorY(this.y / c.y);
	}

	/**
	 * 各成分ごとに最大値を返す
	 * @param {PixColorY} c
	 * @returns {PixColorY}
	 */
	maxColor(c) {
		return new PixColorY(Math.max(c.y, this.y));
	}

	/**
	 * 各成分ごとに最小値を返す
	 * @param {PixColorY} c
	 * @returns {PixColorY}
	 */
	minColor(c) {
		return new PixColorY(Math.min(c.y, this.y));
	}

	/**
	 * 輝度値のノルム（絶対値）を返す
	 * @returns {number}
	 */
	norm() {
		return Math.abs(this.y);
	}

	/**
	 * 輝度値のノルム（絶対値, 高速版）
	 * @returns {number}
	 */
	normFast() {
		return Math.abs(this.y);
	}

	/**
	 * アルファ値（常に1.0）を返す
	 * @returns {number}
	 */
	getBlendAlpha() {
		return 1.0;
	}

	/**
	 * アルファ値を変更した色を返す（輝度のみのためそのまま返す）
	 * @returns {PixColorY}
	 */
	setBlendAlpha() {
		return this;
	}

	/**
	 * 指定色のアルファを適用（輝度のみのためそのまま返す）
	 * @returns {PixColorY}
	 */
	exchangeColorAlpha() {
		return this;
	}

	/**
	 * 他のPixColorYと一致するか判定
	 * @param {PixColorY} c
	 * @returns {boolean}
	 */
	equals(c) {
		return this.y === c.y;
	}

	/**
	 * 輝度値の文字列表現
	 * @returns {string}
	 */
	toString() {
		return "color(" + this.y + ")";
	}
}
