import PixelColorY from "../color/PixelColorY.js";
import PixelData from "./PixelData.js";
import PixelDataRGBA from "./PixelDataRGBA.js";
import PixelVector from "../color/PixelVector.js";

/**
 * グレースケール画像データクラス（輝度Yのみで管理）
 * 1チャンネル（Y）の画像データ処理・変換・ノーマルマップ生成などを提供します。
 *
 * @class
 * @extends PixelData
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * const img = new PixelDataY(256, 256);
 * img.setPixel(0, 0, new PixelColorY(128));
 */
export default class PixelDataY extends PixelData {
	/**
	 * 初期化
	 * @constructor
	 * @param {ImageData|PixelDataRGBA|PixelDataY|number} [arg1] 元画像または幅
	 * @param {number} [arg2] 高さ
	 */
	constructor(arg1, arg2) {
		if (arguments.length === 1) {
			super(arg1);
		} else if (arguments.length === 2) {
			super(arg1, arg2);
		} else {
			super();
		}
	}

	/**
	 * この画像データのクローンを作成
	 * @returns {PixelDataY}
	 */
	clone() {
		const x = new PixelDataY(this.width, this.height);
		this._copyData(x);
		return x;
	}

	/**
	 * サイズを変更（内容は初期化）
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width, height) {
		super.setSize(width, height);
		this.data = new Float32Array(this.width * this.height);
	}

	/**
	 * 範囲内座標のY値を取得
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixelColorY}
	 */
	getPixelInside(x, y) {
		const p = y * this.width + x;
		return new PixelColorY(this.data[p]);
	}

	/**
	 * 範囲内座標のY値を設定
	 * @param {number} x
	 * @param {number} y
	 * @param {PixelColorY} color
	 */
	setPixelInside(x, y, color) {
		const p = y * this.width + x;
		this.data[p] = color.getColor();
	}

	/**
	 * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
	 * @param {number} x
	 * @param {number} y
	 * @param {PixelColorY} color
	 */
	setPixel(x, y, color) {
		super.setPixel(x, y, color);
	}

	/**
	 * 実数座標(x, y)の補間色を返す
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixelColorY}
	 */
	getColor(x, y) {
		// @ts-ignore
		return super.getColor(x, y);
	}

	/**
	 * UV座標（0～1）でテクスチャとして色取得
	 * @param {number} u
	 * @param {number} v
	 * @returns {PixelColorY}
	 */
	getColorUV(u, v) {
		// @ts-ignore
		return super.getColorUV(u, v);
	}

	/**
	 * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
	 * @param {number} x
	 * @param {number} y
	 * @param {PixelColorY} color
	 */
	setColor(x, y, color) {
		super.setPixel(x, y, color);
	}

	/**
	 * 全画素に対してコールバック関数を適用
	 * @param {function(PixelColorY, number, number, PixelData):void} callback (color, x, y, this)
	 */
	forEach(callback) {
		super.forEach(callback);
	}

	/**
	 * 各種画像データから本クラスへ変換して格納
	 * @param {ImageData|PixelDataRGBA|PixelDataY} imagedata
	 * @param {number} [n=0] RGBAのどのチャンネルか（0:R, 1:G, 2:B, 3:A）
	 */
	putImageData(imagedata, n) {
		if (imagedata instanceof ImageData || imagedata instanceof PixelDataRGBA) {
			this.setSize(imagedata.width, imagedata.height);
			if (n === undefined) {
				n = 0;
			}
			let p = 0;
			for (let i = 0; i < this.data.length; i++) {
				this.data[i] = imagedata.data[p + n];
				p += 4;
			}
		} else if (imagedata instanceof PixelDataY) {
			this.setSize(imagedata.width, imagedata.height);
			this.data.set(imagedata.data);
		} else {
			throw "IllegalArgumentException";
		}
	}

	/**
	 * RGBA画像からR成分のみ取り込む
	 * @param {ImageData|PixelDataRGBA} imagedata
	 */
	putImageDataR(imagedata) {
		this.putImageData(imagedata, 0);
	}

	/**
	 * RGBA画像からG成分のみ取り込む
	 * @param {ImageData|PixelDataRGBA} imagedata
	 */
	putImageDataG(imagedata) {
		this.putImageData(imagedata, 1);
	}

	/**
	 * RGBA画像からB成分のみ取り込む
	 * @param {ImageData|PixelDataRGBA} imagedata
	 */
	putImageDataB(imagedata) {
		this.putImageData(imagedata, 2);
	}

	/**
	 * RGBA画像からA成分のみ取り込む
	 * @param {ImageData|PixelDataRGBA} imagedata
	 */
	putImageDataA(imagedata) {
		this.putImageData(imagedata, 3);
	}

	/**
	 * ImageData（RGBA, Canvas API）形式で出力
	 * @returns {ImageData}
	 */
	getImageData() {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		const context = canvas.getContext("2d");
		const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
		let p = 0,
			i = 0;
		for (; i < this.data.length; i++) {
			const x = Math.floor(this.data[i]);
			imagedata.data[p + 0] = x;
			imagedata.data[p + 1] = x;
			imagedata.data[p + 2] = x;
			imagedata.data[p + 3] = 255;
			p += 4;
		}
		return imagedata;
	}

	/**
	 * このグレースケール画像からノーマルマップを生成
	 * @returns {PixelDataRGBA}
	 * @throws {Error} ラッピングモードがINSIDEの場合は例外
	 */
	getNormalMap() {
		if (this.getWrapMode() === PixelData.MODE_WRAP.INSIDE) {
			// 端の値を取得できないのでエラー
			throw "not inside";
		}

		const output = new PixelDataRGBA(this.width, this.height);
		let x, y;
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				const x1 = new PixelVector(x - 1, y, this.getPixel(x - 1, y).getColor());
				const x2 = new PixelVector(x + 1, y, this.getPixel(x + 1, y).getColor());
				const x3 = x1.getDirection(x2);
				const y1 = new PixelVector(x, y - 1, this.getPixel(x, y - 1).getColor());
				const y2 = new PixelVector(x, y + 1, this.getPixel(x, y + 1).getColor());
				const y3 = y1.getDirection(y2);
				const n = x3.cross(y3).normalize();
				output.setPixelInside(x, y, n.getNormalMapColor());
			}
		}
		return output;
	}

	/**
	 * ノーマルマップを環境マッピングする（未実装）
	 * @param {PixelDataRGBA} texture
	 * @returns {PixelDataRGBA}
	 */
	filterEnvironmentMapping(texture) {
		return null;
	}
}
