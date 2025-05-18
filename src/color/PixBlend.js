/**
 * 画像処理用のブレンドモードを管理するクラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixColor from "./PixColor.js";

/**
 * 内部で使用されるブレンド関数群
 * @private
 */
const BlendFunctions = {
	/**
	 * 線形補間
	 * @param {PixColor} v0 開始色
	 * @param {PixColor} v1 終了色
	 * @param {number} x 補間係数(0～1)
	 * @returns {PixColor} 補間された色
	 */
	ipLerp: function (v0, v1, x) {
		const delta = v1.subColor(v0);
		return v0.addColor(delta.mul(x));
	},

	/**
	 * ブレンドなし（上書き）
	 * @param {PixColor} x 元の色
	 * @param {PixColor} y 書き込む色
	 * @param {number} alpha グローバルアルファ
	 * @returns {PixColor} 結果色
	 */
	brendNone: function (x, y, alpha) {
		return y;
	},

	/**
	 * アルファブレンド
	 * @param {PixColor} x 元の色
	 * @param {PixColor} y 書き込む色
	 * @param {number} alpha グローバルアルファ（0～1）
	 * @returns {PixColor} 結果色
	 */
	brendAlpha: function (x, y, alpha) {
		const x_alpha = x.getBlendAlpha();
		const y_alpha = y.getBlendAlpha() * alpha;
		x = BlendFunctions.ipLerp(x, y, y_alpha);
		return x.setBlendAlpha(Math.max(x_alpha, y_alpha));
	},

	/**
	 * 加算合成
	 * @param {PixColor} x 元の色
	 * @param {PixColor} y 書き込む色
	 * @param {number} alpha グローバルアルファ（0～1）
	 * @returns {PixColor} 結果色
	 */
	brendAdd: function (x, y, alpha) {
		const x_alpha = x.getBlendAlpha();
		const y_alpha = y.getBlendAlpha() * alpha;
		x = x.addColor(y.mul(y_alpha));
		return x.setBlendAlpha(Math.max(x_alpha, y_alpha));
	},

	/**
	 * 減算合成
	 * @param {PixColor} x 元の色
	 * @param {PixColor} y 書き込む色
	 * @param {number} alpha グローバルアルファ（0～1）
	 * @returns {PixColor} 結果色
	 */
	brendSub: function (x, y, alpha) {
		const new_alpha = x.getBlendAlpha();
		const y_alpha = y.getBlendAlpha() * alpha;
		x = x.subColor(y.mul(y_alpha));
		return x.setBlendAlpha(new_alpha);
	},

	/**
	 * 逆減算合成
	 * @param {PixColor} x 元の色
	 * @param {PixColor} y 書き込む色
	 * @param {number} alpha グローバルアルファ（0～1）
	 * @returns {PixColor} 結果色
	 */
	brendRevSub: function (x, y, alpha) {
		const new_alpha = y.getBlendAlpha();
		const x_alpha = x.getBlendAlpha() * alpha;
		y = y.subColor(x.mul(x_alpha));
		return y.setBlendAlpha(new_alpha);
	},

	/**
	 * 乗算合成
	 * @param {PixColor} x 元の色
	 * @param {PixColor} y 書き込む色
	 * @param {number} alpha グローバルアルファ（0～1）
	 * @returns {PixColor} 結果色
	 */
	brendMul: function (x, y, alpha) {
		const new_alpha = x.getBlendAlpha();
		const y_alpha = y.getBlendAlpha() * alpha;
		x = x.mulColor(y.mul(y_alpha).div(255.0));
		return x.setBlendAlpha(new_alpha);
	}
};

/**
 * 画像処理用ブレンドモードを提供するクラス
 */
export default class PixBlend {
	/**
	 * ブレンドモードを指定してインスタンスを生成
	 * @param {string} mode ブレンドモード（PixBlend.MODE のいずれか）
	 */
	constructor(mode) {
		this.blendfunc = BlendFunctions.brendNone;
		if (arguments.length === 1) {
			this.setBlendMode(mode);
		}
	}

	/**
	 * 現在のブレンドモードを複製したインスタンスを返す
	 * @returns {PixBlend}
	 */
	clone() {
		return new PixBlend(this.blendmode);
	}

	/**
	 * ブレンドモードを設定する
	 * @param {string} mode ブレンドモード（PixBlend.MODE のいずれか）
	 */
	setBlendMode(mode) {
		this.blendmode = mode;
		if (mode === PixBlend.MODE.NONE) {
			this.blendfunc = BlendFunctions.brendNone;
		} else if (mode === PixBlend.MODE.ALPHA) {
			this.blendfunc = BlendFunctions.brendAlpha;
		} else if (mode === PixBlend.MODE.ADD) {
			this.blendfunc = BlendFunctions.brendAdd;
		} else if (mode === PixBlend.MODE.SUB) {
			this.blendfunc = BlendFunctions.brendSub;
		} else if (mode === PixBlend.MODE.REVSUB) {
			this.blendfunc = BlendFunctions.brendRevSub;
		} else if (mode === PixBlend.MODE.MUL) {
			this.blendfunc = BlendFunctions.brendMul;
		}
	}

	/**
	 * 2つの色を指定したブレンドモードで合成する
	 * @param {PixColor} color1 元の色
	 * @param {PixColor} color2 書き込む色
	 * @param {number} alpha グローバルアルファ（0～1）
	 * @returns {PixColor} 合成結果の色
	 */
	blend(color1, color2, alpha) {
		return this.blendfunc(color1, color2, alpha);
	}
}

/**
 * ブレンドモード定数
 * @enum {string}
 */
PixBlend.MODE = {
	NONE: "NONE", // 上書き
	ALPHA: "ALPHA", // アルファブレンド
	ADD: "ADD", // 加算
	SUB: "SUB", // 減算
	REVSUB: "REVSUB", // 逆減算
	MUL: "MUL" // 乗算
};
