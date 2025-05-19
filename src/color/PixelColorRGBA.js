/**
 * RGBA色（Red, Green, Blue, Alpha）を扱う色クラス
 *
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixelColor from "./PixelColor.js";

export default class PixelColorRGBA extends PixelColor {
	/**
	 * RGBA色を生成
	 * @param {Array<number>} color [R, G, B, A]（0-255, 0-255, 0-255, 0-255）
	 */
	constructor(color) {
		super();
		// ディープコピー
		this.rgba = [color[0], color[1], color[2], color[3]];
	}

	/** @returns {number} 赤成分 */
	get r() {
		return this.rgba[0];
	}

	/** @returns {number} 緑成分 */
	get g() {
		return this.rgba[1];
	}

	/** @returns {number} 青成分 */
	get b() {
		return this.rgba[2];
	}

	/** @returns {number} アルファ成分 */
	get a() {
		return this.rgba[3];
	}

	/**
	 * RGBA配列を返す
	 * @returns {Array<number>}
	 */
	getColor() {
		return this.rgba;
	}

	/**
	 * この色のコピーを返す
	 * @returns {PixelColorRGBA}
	 */
	clone() {
		return new PixelColorRGBA(this.rgba);
	}

	/**
	 * すべての成分が0のRGBA色を返す
	 * @returns {PixelColorRGBA}
	 */
	zero() {
		return new PixelColorRGBA([0.0, 0.0, 0.0, 0.0]);
	}

	/**
	 * すべての成分が1のRGBA色を返す
	 * @returns {PixelColorRGBA}
	 */
	one() {
		return new PixelColorRGBA([1.0, 1.0, 1.0, 1.0]);
	}

	/**
	 * 全成分に値を加算
	 * @param {number} x
	 * @returns {PixelColorRGBA}
	 */
	add(x) {
		return new PixelColorRGBA([this.r + x, this.g + x, this.b + x, this.a + x]);
	}

	/**
	 * 全成分から値を減算
	 * @param {number} x
	 * @returns {PixelColorRGBA}
	 */
	sub(x) {
		return new PixelColorRGBA([this.r - x, this.g - x, this.b - x, this.a - x]);
	}

	/**
	 * 全成分に値を乗算
	 * @param {number} x
	 * @returns {PixelColorRGBA}
	 */
	mul(x) {
		return new PixelColorRGBA([this.r * x, this.g * x, this.b * x, this.a * x]);
	}

	/**
	 * 全成分を値で除算
	 * @param {number} x
	 * @returns {PixelColorRGBA}
	 */
	div(x) {
		return new PixelColorRGBA([this.r / x, this.g / x, this.b / x, this.a / x]);
	}

	/**
	 * 全成分に exp() を適用
	 * @returns {PixelColorRGBA}
	 */
	exp() {
		return new PixelColorRGBA([Math.exp(this.r), Math.exp(this.g), Math.exp(this.b), Math.exp(this.a)]);
	}

	/**
	 * 全成分に log() を適用
	 * @returns {PixelColorRGBA}
	 */
	log() {
		return new PixelColorRGBA([Math.log(this.r), Math.log(this.g), Math.log(this.b), Math.log(this.a)]);
	}

	/**
	 * 全成分を base のべき乗にする
	 * @param {number} base
	 * @returns {PixelColorRGBA}
	 */
	pow(base) {
		return new PixelColorRGBA([
			Math.pow(base, this.r),
			Math.pow(base, this.g),
			Math.pow(base, this.b),
			Math.pow(base, this.a)
		]);
	}

	/**
	 * 任意の底の対数
	 * @param {number} base
	 * @returns {PixelColorRGBA}
	 */
	baselog(base) {
		const x = 1.0 / Math.log(base);
		return new PixelColorRGBA([
			Math.log(this.r) * x,
			Math.log(this.g) * x,
			Math.log(this.b) * x,
			Math.log(this.a) * x
		]);
	}

	/**
	 * テーブル参照で変換
	 * @param {Array<number>} table
	 * @returns {PixelColorRGBA}
	 */
	table(table) {
		return new PixelColorRGBA([
			table[Math.round(this.r)],
			table[Math.round(this.g)],
			table[Math.round(this.b)],
			table[Math.round(this.a)]
		]);
	}

	/**
	 * ランダムなRGBA色を返す
	 * @returns {PixelColorRGBA}
	 */
	random() {
		return new PixelColorRGBA([
			Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256)
		]);
	}

	/**
	 * 輝度値を計算（NTSC比率）
	 * @returns {number}
	 */
	luminance() {
		return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
	}

	/**
	 * 色同士の加算
	 * @param {PixelColorRGBA} c
	 * @returns {PixelColorRGBA}
	 */
	addColor(c) {
		return new PixelColorRGBA([this.r + c.r, this.g + c.g, this.b + c.b, this.a + c.a]);
	}

	/**
	 * 色同士の減算
	 * @param {PixelColorRGBA} c
	 * @returns {PixelColorRGBA}
	 */
	subColor(c) {
		return new PixelColorRGBA([this.r - c.r, this.g - c.g, this.b - c.b, this.a - c.a]);
	}

	/**
	 * 色同士の乗算
	 * @param {PixelColorRGBA} c
	 * @returns {PixelColorRGBA}
	 */
	mulColor(c) {
		return new PixelColorRGBA([this.r * c.r, this.g * c.g, this.b * c.b, this.a * c.a]);
	}

	/**
	 * 色同士の除算
	 * @param {PixelColorRGBA} c
	 * @returns {PixelColorRGBA}
	 */
	divColor(c) {
		return new PixelColorRGBA([this.r / c.r, this.g / c.g, this.b / c.b, this.a / c.a]);
	}

	/**
	 * 各成分ごとに最大値を返す
	 * @param {PixelColorRGBA} c
	 * @returns {PixelColorRGBA}
	 */
	maxColor(c) {
		return new PixelColorRGBA([
			Math.max(c.r, this.r),
			Math.max(c.g, this.g),
			Math.max(c.b, this.b),
			Math.max(c.a, this.a)
		]);
	}

	/**
	 * 各成分ごとに最小値を返す
	 * @param {PixelColorRGBA} c
	 * @returns {PixelColorRGBA}
	 */
	minColor(c) {
		return new PixelColorRGBA([
			Math.min(c.r, this.r),
			Math.min(c.g, this.g),
			Math.min(c.b, this.b),
			Math.min(c.a, this.a)
		]);
	}
	/**
	 * 色差の距離を計算（マンハッタン／ユークリッド）
	 * @param {number} normType PixelColor.NORM_MODE
	 * @returns {number}
	 */
	norm(normType) {
		if (normType === PixelColor.NORM_MODE.MANHATTEN) {
			return (Math.abs(this.r) + Math.abs(this.g) + Math.abs(this.b)) / 3;
		} else if (normType === PixelColor.NORM_MODE.EUGRID) {
			return Math.sqrt(this.r * this.r + this.g * this.g + this.b * this.b) / 3;
		}
	}

	/**
	 * 色差の距離を高速計算
	 * @param {number} normType PixelColor.NORM_MODE
	 * @returns {number}
	 */
	normFast(normType) {
		if (normType === PixelColor.NORM_MODE.MANHATTEN) {
			return Math.abs(this.r) + Math.abs(this.g) + Math.abs(this.b);
		} else if (normType === PixelColor.NORM_MODE.EUGRID) {
			return this.r * this.r + this.g * this.g + this.b * this.b;
		}
	}

	/**
	 * アルファ値（0～1）を取得
	 * @returns {number}
	 */
	getBlendAlpha() {
		return this.a / 255.0;
	}

	/**
	 * 指定アルファ値（0～1）で新しい色を返す
	 * @param {number} x
	 * @returns {PixelColorRGBA}
	 */
	setBlendAlpha(x) {
		const color = this.clone();
		color.rgba[3] = x * 255.0;
		return color;
	}

	/**
	 * 指定色のアルファ値をコピーして返す
	 * @param {PixelColorRGBA} color
	 * @returns {PixelColorRGBA}
	 */
	exchangeColorAlpha(color) {
		return new PixelColorRGBA([this.r, this.g, this.b, color.a]);
	}

	/**
	 * RGB値を24bit整数で返す（0xRRGGBB形式）
	 * @returns {number}
	 */
	getRRGGBB() {
		return (this.r << 16) | (this.g << 8) | (this.b & 0xff);
	}

	/**
	 * 赤成分を返す
	 * @returns {number}
	 */
	getRed() {
		return this.r;
	}

	/**
	 * 緑成分を返す
	 * @returns {number}
	 */
	getGreen() {
		return this.g;
	}

	/**
	 * 青成分を返す
	 * @returns {number}
	 */
	getBlue() {
		return this.b;
	}

	/**
	 * 色が一致するか
	 * @param {PixelColorRGBA} c
	 * @returns {boolean}
	 */
	equals(c) {
		return this.r === c.r && this.g === c.g && this.b === c.b && this.a === c.a;
	}

	/**
	 * RGBA色を文字列で返す
	 * @returns {string}
	 */
	toString() {
		return "color(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	}

	/**
	 * 4x4行列を色に乗算して新しい色を返す
	 * @param {Array<Array<number>>} m 4x4行列
	 * @returns {PixelColorRGBA}
	 */
	mulMatrix(m) {
		return new PixelColorRGBA([
			this.r * m[0][0] + this.g * m[0][1] + this.b * m[0][2] + this.a * m[0][3],
			this.r * m[1][0] + this.g * m[1][1] + this.b * m[1][2] + this.a * m[1][3],
			this.r * m[2][0] + this.g * m[2][1] + this.b * m[2][2] + this.a * m[2][3],
			this.r * m[3][0] + this.g * m[3][1] + this.b * m[3][2] + this.a * m[3][3]
		]);
	}
}
