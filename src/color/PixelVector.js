import PixelColorRGBA from "./PixelColorRGBA.js";

/**
 * 3次元ベクトルクラス
 * 画像処理やノーマルマップでの方向ベクトル表現等に利用します。
 *
 * @class
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * const v = new PixelVector(1, 2, 3);
 * const cross = v.cross(new PixelVector(0, 0, 1));
 */
export default class PixelVector {
	/**
	 * 3次元ベクトルを生成
	 * @param {number} x X成分
	 * @param {number} y Y成分
	 * @param {number} z Z成分
	 */
	constructor(x, y, z) {
		/**
		 * X成分
		 * @type {number}
		 * @public
		 */
		this.x = x;

		/**
		 * Y成分
		 * @type {number}
		 * @public
		 */
		this.y = y;

		/**
		 * Z成分
		 * @type {number}
		 * @public
		 */
		this.z = z;
	}

	/**
	 * クロス積（外積）を計算
	 * @param {PixelVector} tgt 相手ベクトル
	 * @returns {PixelVector} クロス積（this × tgt）
	 */
	cross(tgt) {
		return new PixelVector(
			this.y * tgt.z - this.z * tgt.y,
			this.z * tgt.x - this.x * tgt.z,
			this.x * tgt.y - this.y * tgt.x
		);
	}

	/**
	 * 指定ターゲットへの方向ベクトルを計算
	 * @param {PixelVector} tgt ターゲットベクトル
	 * @returns {PixelVector} tgt - this
	 */
	getDirection(tgt) {
		return new PixelVector(tgt.x - this.x, tgt.y - this.y, tgt.z - this.z);
	}

	/**
	 * 正規化（単位ベクトル化）したベクトルを返す
	 * @returns {PixelVector}
	 */
	normalize() {
		let b = this.x * this.x + this.y * this.y + this.z * this.z;
		b = Math.sqrt(1.0 / b);
		return new PixelVector(this.x * b, this.y * b, this.z * b);
	}

	/**
	 * 方向ベクトルからノーマルマップ用のRGBA色に変換
	 * 右がX+,U+、下がY+,V+としたとき、RGB＝（+X, -Y, +Z）系とします。
	 * @returns {PixelColorRGBA}
	 */
	getNormalMapColor() {
		return new PixelColorRGBA([
			Math.round((1.0 + this.x) * 127.5),
			Math.round((1.0 - this.y) * 127.5),
			Math.round((1.0 + this.z) * 127.5),
			255
		]);
	}

	/**
	 * ノーマルマップRGBA色から方向ベクトルを生成
	 * 右がX+,U+、下がY+,V+としたとき、RGB＝（+X, -Y, +Z）系とします。
	 * @param {PixelColorRGBA} rgbcolor ノーマルマップ用RGBA色
	 * @returns {PixelVector}
	 * @throws {Error} 引数がPixelColorRGBAでない場合
	 */
	static createNormalVector(rgbcolor) {
		if (!(rgbcolor instanceof PixelColorRGBA)) {
			throw "not PixelColorRGBA";
		}
		return new PixelVector(rgbcolor.r / 128.0 - 1.0, -(rgbcolor.g / 128.0) + 1.0, rgbcolor.b / 128.0 - 1.0);
	}
}
