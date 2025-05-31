/**
 * 画像処理用のFIR（畳み込み）フィルタ行列クラス
 * ブラーやシャープ、ガウシアンなど各種フィルタの行列生成・操作に使用します。
 *
 * @class
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * const matrix = new PixelFIRMatrix([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]);
 * const sharpen = matrix.clone().normalize();
 */
export default class PixelFIRMatrix {
	/**
	 * 2次元配列で初期化
	 * @param {Array<Array<number>>} matrix フィルタ行列（[y][x]の2次元配列）
	 */
	constructor(matrix) {
		/**
		 * 行列の高さ（行数）
		 * @type {number}
		 * @public
		 */
		this.height = matrix.length;

		/**
		 * 行列の幅（列数）
		 * @type {number}
		 * @public
		 */
		this.width = matrix[0].length;

		/**
		 * フィルタ行列本体（[y][x] の2次元配列）
		 * @type {Array<Array<number>>}
		 * @public
		 */
		this.matrix = [];
		let i;
		for (i = 0; i < matrix.length; i++) {
			this.matrix[i] = matrix[i].slice();
		}
	}

	/**
	 * このフィルタ行列の複製を作成
	 * @returns {PixelFIRMatrix}
	 */
	clone() {
		return new PixelFIRMatrix(this.matrix);
	}

	/**
	 * フィルタ行列の周囲（エッジ）を時計回りに回転
	 * @param {number} val 回転量（正の整数で右回り）
	 * @returns {PixelFIRMatrix} 回転後の新しい行列
	 */
	rotateEdge(val) {
		// 周囲の値を時計回りに回転させます。
		const m = this.clone();

		const x = [],
			y = [];
		let i, j;
		{
			// 上側
			for (i = 0; i < this.width - 1; i++) {
				x.push(m.matrix[0][i]);
			}
			// 右側
			for (i = 0; i < this.height - 1; i++) {
				x.push(m.matrix[i][this.width - 1]);
			}
			// 下側
			for (i = this.width - 1; i > 0; i--) {
				x.push(m.matrix[this.height - 1][i]);
			}
			// 左側
			for (i = this.height - 1; i > 0; i--) {
				x.push(m.matrix[i][0]);
			}
		}
		for (i = 0; i < x.length; i++) {
			// かならず正とする
			y[i] = x[(((i + val) % x.length) + x.length) % x.length];
		}
		{
			// 上側
			m.matrix[0] = y.slice(0, this.width);
			// 右側
			for (i = 0; i < this.height; i++) {
				m.matrix[i][this.width - 1] = y[this.width + i];
			}
			// 下側
			m.matrix[this.height - 1] = y
				.slice(this.width + this.height - 2, this.width + this.height - 2 + this.width)
				.reverse();
			// 左側
			for (i = this.height - 1, j = 0; i > 0; i--, j++) {
				m.matrix[i][0] = y[this.width + this.height + this.width - 3 + j];
			}
		}
		return m;
	}

	/**
	 * 全要素を指定値で乗算
	 * @param {number} val 乗算値
	 * @returns {PixelFIRMatrix}
	 */
	mul(val) {
		const m = this.clone();
		let x, y;
		for (y = 0; y < m.height; y++) {
			for (x = 0; x < m.width; x++) {
				m.matrix[y][x] *= val;
			}
		}
		return m;
	}

	/**
	 * 全要素の合計値を返す
	 * @returns {number}
	 */
	sum() {
		let sum = 0;
		let x, y;
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				sum += this.matrix[y][x];
			}
		}
		return sum;
	}

	/**
	 * 合計値で正規化（全体の合計が1になるようスケーリング）
	 * @returns {PixelFIRMatrix}
	 */
	normalize() {
		return this.clone().mul(1.0 / this.sum());
	}

	/**
	 * フィルタの中心に指定値を加算
	 * @param {number} val
	 * @returns {PixelFIRMatrix}
	 */
	addCenter(val) {
		const m = this.clone();
		m.matrix[m.height >> 1][m.width >> 1] += val;
		return m;
	}

	/**
	 * Laplacianフィルタ行列を生成
	 * @static
	 * @returns {PixelFIRMatrix}
	 */
	static makeLaplacianFilter() {
		return new PixelFIRMatrix([
			[0.0, -1.0, 0.0],
			[-1.0, 4.0, -1.0],
			[0.0, -1.0, 0.0]
		]);
	}

	/**
	 * シャープフィルタ行列を生成
	 * @static
	 * @param {number} power シャープ強度
	 * @returns {PixelFIRMatrix}
	 */
	static makeSharpenFilter(power) {
		const m = PixelFIRMatrix.makeLaplacianFilter();
		return m.mul(power).addCenter(1.0);
	}

	/**
	 * ボックス（平均化）ブラー行列を生成
	 * @static
	 * @param {number} width 行列幅
	 * @param {number} height 行列高さ
	 * @returns {PixelFIRMatrix}
	 */
	static makeBlur(width, height) {
		const m = [];
		const value = 1.0 / (width * height);
		let x, y;
		for (y = 0; y < height; y++) {
			m[y] = [];
			for (x = 0; x < width; x++) {
				m[y][x] = value;
			}
		}
		return new PixelFIRMatrix(m);
	}

	/**
	 * ガウシアンフィルタ行列を生成
	 * @static
	 * @param {number} width 行列幅
	 * @param {number} height 行列高さ
	 * @param {number} [sd=1.0] 標準偏差
	 * @returns {PixelFIRMatrix}
	 */
	static makeGaussianFilter(width, height, sd) {
		if (sd === undefined) {
			sd = 1.0;
		}
		const m = [];
		let i, x, y;
		const v = [];
		const n = Math.max(width, height);
		let s = -Math.floor(n / 2);
		for (i = 0; i < n; i++, s++) {
			v[i] = Math.exp(-(s * s) / (sd * sd * 2.0));
		}
		for (y = 0; y < height; y++) {
			m[y] = [];
			for (x = 0; x < width; x++) {
				m[y][x] = v[x] * v[y];
			}
		}
		return new PixelFIRMatrix(m).normalize();
	}

	/**
	 * 円形の畳み込み行列を生成
	 * @static
	 * @param {number} r 直径（行列の一辺）
	 * @returns {PixelFIRMatrix}
	 */
	static makeCircle(r) {
		const m = [];
		const radius = r * 0.5;
		const center = r >> 1;
		let x, y;
		for (y = 0; y < r; y++) {
			m[y] = [];
			for (x = 0; x < r; x++) {
				if (Math.sqrt((center - x) * (center - x) + (center - y) * (center - y)) < radius) {
					m[y][x] = 1.0;
				} else {
					m[y][x] = 0.0;
				}
			}
		}
		return new PixelFIRMatrix(m).normalize();
	}
}
