/**
 * 画像データ基底クラス（ラスタ画像データ抽象基盤）
 * RGBAやY（グレースケール）画像データを扱う基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixBlend from "../color/PixBlend.js";
import PixColor from "../color/PixColor.js";
import PixWrap from "../selecter/PixWrap.js";
import PixInterpolation from "../selecter/PixInterpolation.js";
import PixFIRMatrix from "../fir/PixFIRMatrix.js";

export default class PixData {
	/**
	 * 画像データクラス
	 * @constructor
	 * @param {ImageData|PixData|number} [arg1] 画像データまたは幅
	 * @param {number} [arg2] 高さ
	 */
	constructor(arg1, arg2) {
		/**
		 * 画像幅
		 * @type {number}
		 */
		this.width = 1;

		/**
		 * 画像高さ
		 * @type {number}
		 */
		this.height = 1;

		/**
		 * 書き込み時グローバルアルファ（0.0～1.0）
		 * @type {number}
		 */
		this.globalAlpha = 1.0;

		/**
		 * 画素データ
		 * @type {Uint8ClampedArray|Float32Array}
		 */
		this.data = null;

		/**
		 * ブレンドモード
		 * @type {PixBlend}
		 */
		this.blend = new PixBlend(PixBlend.MODE.NONE);

		/**
		 * 範囲外アクセスの処理ラッパー
		 * @type {PixWrap}
		 */
		this.wrap = new PixWrap(PixWrap.MODE.INSIDE, this.width, this.height);

		/**
		 * 補間方式
		 * @type {PixInterpolation}
		 */
		this.ip = new PixInterpolation(PixInterpolation.MODE.NEAREST_NEIGHBOR);

		if (arguments.length === 1) {
			const image = arg1;
			if (image instanceof ImageData || image instanceof PixData) {
				this.putImageData(image);
			} else {
				throw "IllegalArgumentException";
			}
		} else if (arguments.length === 2) {
			if (typeof arg1 === "number" && typeof arg2 === "number") {
				const width = arg1;
				const height = arg2;
				this.setSize(width, height);
			} else {
				throw "IllegalArgumentException";
			}
		}
	}

	/**
	 * 画像データをセット
	 * @param {ImageData|PixData} imagedata
	 */
	putImageData(imagedata) {
		// サブクラスで実装
	}

	/**
	 * 画像サイズを変更（内容は再初期化。既存と同サイズなら何もしない）
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width, height) {
		if (this.width === width && this.height === height) {
			return;
		}
		this.width = width;
		this.height = height;
		this.wrap.setSize(width, height);
	}

	/**
	 * 内部データを指定インスタンスxにコピー
	 * @param {PixData} x
	 * @protected
	 */
	_copyData(x) {
		x.blend = this.blend.clone();
		x.wrap = this.wrap.clone();
		x.ip = this.ip.clone();
		x.setSize(this.width, this.height);
		x.data.set(this.data);
		x.globalAlpha = this.globalAlpha;
	}

	/**
	 * この画像データのクローンを生成
	 * @returns {PixData}
	 */
	clone() {
		const x = new PixData();
		this._copyData(x);
		return x;
	}

	/**
	 * 範囲外アクセス時のラッピング方式を設定
	 * @param {string} wrapmode PixData.MODE_WRAP
	 */
	setWrapMode(wrapmode) {
		this.wrap.setPixWrapMode(wrapmode);
	}

	/**
	 * 範囲外アクセス時のラッピング方式を取得
	 * @returns {string} PixData.MODE_WRAP
	 */
	getWrapMode() {
		return this.wrap.wrapmode;
	}

	/**
	 * 補間モードを設定
	 * @param {string} ipmode PixData.MODE_IP
	 */
	setInterpolationMode(ipmode) {
		this.ip.setInterpolationMode(ipmode);
	}

	/**
	 * 補間モードを取得
	 * @returns {string} PixData.MODE_IP
	 */
	getInterpolationMode() {
		return this.ip.ipmode;
	}

	/**
	 * 書き込み時のブレンドモードを設定
	 * @param {string} blendmode PixData.MODE_BLEND
	 */
	setBlendType(blendmode) {
		this.blend.setBlendMode(blendmode);
	}

	/**
	 * 書き込み時のブレンドモードを取得
	 * @returns {string} PixData.MODE_BLEND
	 */
	getBlendType() {
		return this.blend.blendmode;
	}

	/**
	 * 全データをクリア（0で初期化）
	 */
	clear() {
		if (this.data) {
			this.data.fill(0);
		}
	}

	/**
	 * 範囲内座標(x, y)の画素値を返す
	 * x, y が整数かつ画像の範囲内を保証している場合に使用可能
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixColor}
	 */
	getPixelInside(x, y) {
		return null;
	}

	/**
	 * 範囲内座標(x, y)に画素値をセット
	 * x, y が整数かつ画像の範囲内を保証している場合に使用可能
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColor} color
	 */
	setPixelInside(x, y, color) {}

	/**
	 * 任意座標(x, y)の画素値を返す（範囲外もラッピングモードに応じて取得）
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixColor}
	 */
	getPixel(x, y) {
		const p = this.wrap.getPixelPosition(x, y);
		if (p) {
			return this.getPixelInside(p[0], p[1]);
		}
		return this.getPixelInside(0, 0).zero();
	}

	/**
	 * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColor} color
	 */
	setPixel(x, y, color) {
		const p = this.wrap.getPixelPosition(x, y);
		if (p) {
			if (this.blend.blendmode === PixData.MODE_BLEND.NONE) {
				this.setPixelInside(p[0], p[1], color);
			} else {
				const mycolor = this.getPixelInside(p[0], p[1]);
				const newcolor = this.blend.blend(mycolor, color, this.globalAlpha);
				this.setPixelInside(p[0], p[1], newcolor);
			}
		}
	}

	/**
	 * 実数座標(x, y)の補間色を返す
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixColor}
	 */
	getColor(x, y) {
		return this.ip.getColor(this, x, y);
	}

	/**
	 * UV座標（0～1）でテクスチャとして色取得
	 * @abstract
	 * @param {number} u
	 * @param {number} v
	 * @returns {PixColor}
	 */
	getColorUV(u, v) {
		return this.getColor(u * this.width, v * this.height);
	}

	/**
	 * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
	 * @abstract
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColor} color
	 */
	setColor(x, y, color) {
		this.setPixel(Math.floor(x), Math.floor(y), color);
	}

	/**
	 * Canvas型の drawImage と同じ使用方法で PixData をドローする
	 * PixDataRGBA データの上には、PixDataRGBA のみ書き込み可能
	 * PixDataY    データの上には、PixDataY    のみ書き込み可能
	 * @param {PixData} image 描画元画像
	 * @param {number} sx 元画像の描画開始X
	 * @param {number} sy 元画像の描画開始Y
	 * @param {number} [sw] 元画像の幅
	 * @param {number} [sh] 元画像の高さ
	 * @param {number} [dx] 描画先X
	 * @param {number} [dy] 描画先Y
	 * @param {number} [dw] 描画幅
	 * @param {number} [dh] 描画高さ
	 */
	drawPixData(image, sx, sy, sw, sh, dx, dy, dw, dh) {
		if (!(image instanceof PixData)) {
			throw "IllegalArgumentException";
		}
		if (arguments.length === 3) {
			dx = sx;
			dy = sy;
			dw = image.width;
			dh = image.height;
			sx = 0;
			sy = 0;
			sw = image.width;
			sh = image.height;
		} else if (arguments.length === 5) {
			dx = sx;
			dy = sy;
			dw = sw;
			dh = sh;
			sx = 0;
			sy = 0;
			sw = image.width;
			sh = image.height;
		}
		// else if (arguments.length === 9) {
		// 	// falls through
		// }
		else {
			throw "IllegalArgumentException";
		}
		const delta_w = sw / dw;
		const delta_h = sh / dh;
		let src_x, src_y;
		let dst_x, dst_y;

		src_y = sy;
		for (dst_y = dy; dst_y < dy + dh; dst_y++) {
			src_x = sx;
			for (dst_x = dx; dst_x < dx + dw; dst_x++) {
				const color = image.getColor(src_x, src_y);
				if (color) {
					this.setColor(dst_x, dst_y, color);
				}
				src_x += delta_w;
			}
			src_y += delta_h;
		}
	}

	/**
	 * 全画素に対してコールバック関数を適用
	 * @abstract
	 * @param {function(PixColor, number, number, PixData):void} callback (color, x, y, this)
	 */
	forEach(callback) {
		let x = 0,
			y = 0;
		for (; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				callback(this.getPixelInside(x, y), x, y, this);
			}
		}
	}

	/**
	 * 畳み込みフィルタ（PixFIRMatrix）を適用
	 * @param {PixFIRMatrix} matrix
	 */
	convolution(matrix) {
		if (!(matrix instanceof PixFIRMatrix)) {
			throw "IllegalArgumentException";
		}
		let x, y, fx, fy, mx, my;
		const fx_offset = -(matrix.width >> 1);
		const fy_offset = -(matrix.height >> 1);
		const m = matrix.matrix;
		const zero_color = this.getPixelInside(0, 0).zero();
		const bufferimage = this.clone();
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				let newcolor = zero_color;
				fy = y + fy_offset;
				for (my = 0; my < matrix.height; my++, fy++) {
					fx = x + fx_offset;
					for (mx = 0; mx < matrix.width; mx++, fx++) {
						const color = bufferimage.getPixel(fx, fy);
						if (color) {
							newcolor = newcolor.addColor(color.mul(m[my][mx]));
						}
					}
				}
				this.setPixelInside(x, y, newcolor);
			}
		}
	}

	/**
	 * バイラテラルフィルタ的な畳み込み
	 * 対象の色に近いほど、フィルタをかける処理となる
	 * @param {PixFIRMatrix} matrix
	 * @param {number} [p=0.8] 強度 0.0～1.0
	 */
	convolutionBilateral(matrix, p) {
		if (!(matrix instanceof PixFIRMatrix)) {
			throw "IllegalArgumentException";
		}
		if (p === undefined) {
			p = 0.8;
		}
		let x, y, fx, fy, mx, my;
		const fx_offset = -(matrix.width >> 1);
		const fy_offset = -(matrix.height >> 1);
		const m = matrix.matrix;
		const zero_color = this.getPixelInside(0, 0).zero();
		const bufferimage = this.clone();
		// -0.010 - -0.001
		const rate = -(1.0 - p) * 0.01 - 0.001;
		const exptable = [];
		for (x = 0; x < 256 * 3; x++) {
			exptable[x] = Math.exp(x * x * rate);
		}
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				const thiscolor = bufferimage.getPixel(x, y);
				const thisalpha = thiscolor.getBlendAlpha();
				let sumfilter = 0;
				let newcolor = zero_color;
				const m2 = [];
				fy = y + fy_offset;
				for (my = 0; my < matrix.height; my++, fy++) {
					fx = x + fx_offset;
					m2[my] = [];
					for (mx = 0; mx < matrix.width; mx++, fx++) {
						const tgtcolor = bufferimage.getPixel(fx, fy);
						if (!tgtcolor) {
							continue;
						}
						const newfilter =
							exptable[Math.floor(tgtcolor.normColor(thiscolor, PixColor.NORM_MODE.EUGRID))] * m[my][mx];
						newcolor = newcolor.addColor(tgtcolor.mul(newfilter));
						sumfilter += newfilter;
					}
				}
				newcolor = newcolor.div(sumfilter).setBlendAlpha(thisalpha);
				this.setPixelInside(x, y, newcolor);
			}
		}
	}

	/**
	 * 指数空間での畳み込み
	 * @param {PixFIRMatrix} matrix
	 * @param {number} [e=1.2] 底(1.01-1.2)
	 */
	convolutionExp(matrix, e) {
		if (!(matrix instanceof PixFIRMatrix)) {
			throw "IllegalArgumentException";
		}
		if (e === undefined) {
			e = 1.2;
		}
		let x, y, fx, fy, mx, my;
		const fx_offset = -(matrix.width >> 1);
		const fy_offset = -(matrix.height >> 1);
		const m = matrix.matrix;
		const zero_color = this.getPixelInside(0, 0).zero();
		const bufferimage = this.clone();
		const exptable = [];
		for (x = 0; x < 256; x++) {
			exptable[x] = Math.pow(e, x);
		}
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				let newcolor = zero_color;
				fy = y + fy_offset;
				for (my = 0; my < matrix.height; my++, fy++) {
					fx = x + fx_offset;
					for (mx = 0; mx < matrix.width; mx++, fx++) {
						const color = bufferimage.getPixel(fx, fy);
						if (color) {
							newcolor = newcolor.addColor(color.table(exptable).mul(m[my][mx]));
						}
					}
				}
				this.setPixelInside(x, y, newcolor.baselog(e));
			}
		}
	}

	/**
	 * アンシャープ畳み込み
	 * @param {PixFIRMatrix} matrix
	 * @param {number} rate
	 */
	convolutionUnSharp(matrix, rate) {
		if (!(matrix instanceof PixFIRMatrix)) {
			throw "IllegalArgumentException";
		}
		let x, y, fx, fy, mx, my;
		const fx_offset = -(matrix.width >> 1);
		const fy_offset = -(matrix.height >> 1);
		const m = matrix.matrix;
		const zero_color = this.getPixelInside(0, 0).zero();
		const bufferimage = this.clone();
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				let newcolor = zero_color;
				fy = y + fy_offset;
				for (my = 0; my < matrix.height; my++, fy++) {
					fx = x + fx_offset;
					for (mx = 0; mx < matrix.width; mx++, fx++) {
						const color = bufferimage.getPixel(fx, fy);
						if (color) {
							newcolor = newcolor.addColor(color.mul(m[my][mx]));
						}
					}
				}
				const thiscolor = bufferimage.getPixel(x, y);
				const deltaColor = thiscolor.subColor(newcolor).mul(rate);
				this.setPixelInside(x, y, thiscolor.addColor(deltaColor));
			}
		}
	}

	/**
	 * シャープフィルタを適用
	 * @param {number} power 強度
	 */
	filterSharp(power) {
		const m = PixFIRMatrix.makeSharpenFilter(power);
		this.convolution(m);
	}

	/**
	 * ブラーフィルタ（ぼかし）を適用
	 * @param {number} n カーネルサイズ
	 */
	filterBlur(n) {
		let m;
		m = PixFIRMatrix.makeBlur(n, 1);
		this.convolution(m);
		m = PixFIRMatrix.makeBlur(1, n);
		this.convolution(m);
	}

	/**
	 * ガウシアンフィルタを適用
	 * @param {number} n カーネルサイズ
	 */
	filterGaussian(n) {
		let m;
		m = PixFIRMatrix.makeGaussianFilter(n, 1);
		this.convolution(m);
		m = PixFIRMatrix.makeGaussianFilter(1, n);
		this.convolution(m);
	}

	/**
	 * アンシャープマスク
	 * @param {number} n カーネルサイズ
	 * @param {number} rate
	 */
	filterUnSharp(n, rate) {
		const m = PixFIRMatrix.makeGaussianFilter(n, n);
		this.convolutionUnSharp(m, rate);
	}

	/**
	 * バイラテラルフィルタ
	 * @param {number} n カーネルサイズ
	 * @param {number} p 強度（0.0～1.0）
	 */
	filterBilateral(n, p) {
		const m = PixFIRMatrix.makeGaussianFilter(n, n);
		this.convolutionBilateral(m, p);
	}

	/**
	 * ソフトレンズフィルタ
	 * @param {number} n カーネルサイズ
	 * @param {number} e 底(1.01-1.2)
	 */
	filterSoftLens(n, e) {
		const m = PixFIRMatrix.makeCircle(n);
		this.convolutionExp(m, e);
	}
}

/**
 * 範囲外アクセスラップ方式の定数
 * @enum {string}
 */
PixData.MODE_WRAP = PixWrap.MODE;

/**
 * 補間モードの定数
 * @enum {string}
 */
PixData.MODE_IP = PixInterpolation.MODE;

/**
 * ブレンドモードの定数
 * @enum {string}
 */
PixData.MODE_BLEND = PixBlend.MODE;
