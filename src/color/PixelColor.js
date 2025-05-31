/**
 * 画像処理用の色を表す抽象基底クラス
 * サブクラス（PixelColorRGBA, PixelColorYなど）で各成分を定義し、色演算・変換処理のインターフェースを提供します。
 *
 * @class
 * @abstract
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 *
 * @example
 * // 継承して実装
 * class MyColor extends PixelColor { ... }
 */
export default class PixelColor {
	/**
	 * PixelColor 抽象クラスのコンストラクタ
	 * サブクラスで色成分を定義してください
	 */
	constructor() {}

	/**
	 * 色データを返す
	 * @returns {*} 色データ
	 */
	getColor() {
		return null;
	}

	/**
	 * この色のコピーを返す
	 * @returns {PixelColor}
	 */
	clone() {
		return null;
	}

	/**
	 * すべての成分が0の色を返す
	 * @returns {PixelColor}
	 */
	zero() {
		return null;
	}

	/**
	 * すべての成分が1の色を返す
	 * @returns {PixelColor}
	 */
	one() {
		return null;
	}

	/**
	 * 全成分に値を加算
	 * @param {*} x
	 * @returns {PixelColor}
	 */
	add(x) {
		return null;
	}

	/**
	 * 全成分から値を減算
	 * @param {*} x
	 * @returns {PixelColor}
	 */
	sub(x) {
		return null;
	}

	/**
	 * 全成分に値を乗算
	 * @param {*} x
	 * @returns {PixelColor}
	 */
	mul(x) {
		return null;
	}

	/**
	 * 全成分を値で除算
	 * @param {*} x
	 * @returns {PixelColor}
	 */
	div(x) {
		return null;
	}

	/**
	 * 全成分の指数関数exp
	 * @returns {PixelColor}
	 */
	exp() {
		return null;
	}

	/**
	 * 全成分の対数関数log
	 * @returns {PixelColor}
	 */
	log() {
		return null;
	}

	/**
	 * 全成分のべき乗
	 * @param {*} base
	 * @returns {PixelColor}
	 */
	pow(base) {
		return null;
	}

	/**
	 * 任意の底の対数
	 * @param {number} base
	 * @returns {PixelColor}
	 */
	baselog(base) {
		return null;
	}

	/**
	 * 値をテーブル参照で変換
	 * @param {Array<number>} table
	 * @returns {PixelColor}
	 */
	table(table) {
		return null;
	}

	/**
	 * 全成分をランダムな値に設定
	 * @returns {PixelColor}
	 */
	random() {
		return null;
	}

	/**
	 * 輝度値（明るさ）を計算して返す
	 * @returns {number}
	 */
	luminance() {
		return null;
	}

	/**
	 * 色同士の加算
	 * @param {PixelColor} c
	 * @returns {PixelColor}
	 */
	addColor(c) {
		return null;
	}

	/**
	 * 色同士の減算
	 * @param {PixelColor} c
	 * @returns {PixelColor}
	 */
	subColor(c) {
		return null;
	}

	/**
	 * 色同士の乗算
	 * @param {PixelColor} c
	 * @returns {PixelColor}
	 */
	mulColor(c) {
		return null;
	}

	/**
	 * 色同士の除算
	 * @param {PixelColor} c
	 * @returns {PixelColor}
	 */
	divColor(c) {
		return null;
	}

	/**
	 * 各成分ごとに最大値を返す
	 * @param {PixelColor} c
	 * @returns {PixelColor}
	 */
	maxColor(c) {
		return null;
	}

	/**
	 * 各成分ごとに最小値を返す
	 * @param {PixelColor} c
	 * @returns {PixelColor}
	 */
	minColor(c) {
		return null;
	}

	/**
	 * 色のノルム（色差の距離）を返す
	 * @param {number} normType PixelColor.NORM_MODE
	 * @returns {number}
	 */
	norm(normType) {
		return null;
	}

	/**
	 * 色のノルムの高速計算
	 * @param {number} normType PixelColor.NORM_MODE
	 * @returns {number}
	 */
	normFast(normType) {
		return null;
	}

	/**
	 * 指定色との差分ノルム
	 * @param {PixelColor} c
	 * @param {number} normType PixelColor.NORM_MODE
	 * @returns {number}
	 */
	normColor(c, normType) {
		return this.subColor(c).norm(normType);
	}

	/**
	 * 指定色との差分ノルム（高速版）
	 * @param {PixelColor} c
	 * @param {number} normType PixelColor.NORM_MODE
	 * @returns {number}
	 */
	normColorFast(c, normType) {
		return this.subColor(c).normFast(normType);
	}

	/**
	 * アルファ値を取得
	 * @returns {number}
	 */
	getBlendAlpha() {
		return null;
	}

	/**
	 * アルファ値を設定した新しい色を返す
	 * @param {number} alpha
	 * @returns {PixelColor}
	 */
	setBlendAlpha(alpha) {
		return null;
	}

	/**
	 * 指定色のアルファを移植した色を返す
	 * @param {PixelColor} color
	 * @returns {PixelColor}
	 */
	exchangeColorAlpha(color) {
		return null;
	}

	/**
	 * 色が一致するか
	 * @param {PixelColor} c
	 * @returns {boolean}
	 */
	equals(c) {
		return false;
	}

	/**
	 * パレットから最も近い2色を探す
	 * @param {Array<PixelColor>} palettes
	 * @param {number} normType 距離計算方法（PixelColor.NORM_MODE）
	 * @returns {{c1:{color:PixelColor,norm:number}, c2:{color:PixelColor,norm:number}}}
	 */
	searchColor(palettes, normType) {
		let norm = 0;
		let c1_norm_max = 0x7fffffff;
		let c1_color = null;
		let c2_norm_max = 0x7ffffffe;
		let c2_color = null;
		for (let i = 0; i < palettes.length; i++) {
			norm = this.normColorFast(palettes[i], normType);
			if (norm < c2_norm_max) {
				if (norm < c1_norm_max) {
					c2_norm_max = c1_norm_max;
					c2_color = c1_color;
					c1_norm_max = norm;
					c1_color = palettes[i];
				} else {
					c2_norm_max = norm;
					c2_color = palettes[i];
				}
			}
		}
		return {
			c1: {
				color: c1_color,
				norm: c1_norm_max
			},
			c2: {
				color: c2_color,
				norm: c2_norm_max
			}
		};
	}
}

/**
 * 色空間での距離計算モード（ノルムの種類）
 * @enum {number}
 */
PixelColor.NORM_MODE = {
	/**
	 * マンハッタン距離
	 * @type {number}
	 */
	MANHATTEN: 0,

	/**
	 * ユークリッド距離
	 * @type {number}
	 */
	EUGRID: 1
};
