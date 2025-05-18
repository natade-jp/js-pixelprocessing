/**
 * 画像座標のラッピング（境界判定）用のクラス（範囲内のみ許可）
 * 画像の端から外にはみ出した場合に「範囲内ならそのまま／範囲外ならnull」を返す
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

export default class PixWrapInside {
	/**
	 * サイズを指定して初期化
	 * @param {number} [width=0] 画像幅
	 * @param {number} [height=0] 画像高さ
	 */
	constructor(width, height) {
		if (arguments.length === 2) {
			this.setSize(width, height);
		} else {
			this.setSize(0, 0);
		}
	}

	/**
	 * このラッピングの複製を作成
	 * @returns {PixWrapInside}
	 */
	clone() {
		return new PixWrapInside(this.width, this.height);
	}

	/**
	 * ラップ範囲（画像サイズ）を設定
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	/**
	 * 指定座標が範囲内か判定し、[x, y]座標配列またはnullを返す
	 * @param {number} x
	 * @param {number} y
	 * @returns {number[]|null} 範囲内：[x, y]／範囲外：null
	 */
	getPixelPosition(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
			return [x, y];
		} else {
			return null;
		}
	}
}
