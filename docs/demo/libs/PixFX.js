/**
 * 画像処理用の色を表す基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

class PixColor {
	/**
	 * PixColor 抽象クラスのコンストラクタ
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
	 * @returns {PixColor}
	 */
	clone() {
		return null;
	}

	/**
	 * すべての成分が0の色を返す
	 * @returns {PixColor}
	 */
	zero() {
		return null;
	}

	/**
	 * すべての成分が1の色を返す
	 * @returns {PixColor}
	 */
	one() {
		return null;
	}

	/**
	 * 全成分に値を加算
	 * @param {*} x
	 * @returns {PixColor}
	 */
	add(x) {
		return null;
	}

	/**
	 * 全成分から値を減算
	 * @param {*} x
	 * @returns {PixColor}
	 */
	sub(x) {
		return null;
	}

	/**
	 * 全成分に値を乗算
	 * @param {*} x
	 * @returns {PixColor}
	 */
	mul(x) {
		return null;
	}

	/**
	 * 全成分を値で除算
	 * @param {*} x
	 * @returns {PixColor}
	 */
	div(x) {
		return null;
	}

	/**
	 * 全成分の指数関数exp
	 * @returns {PixColor}
	 */
	exp() {
		return null;
	}

	/**
	 * 全成分の対数関数log
	 * @returns {PixColor}
	 */
	log() {
		return null;
	}

	/**
	 * 全成分のべき乗
	 * @param {*} base
	 * @returns {PixColor}
	 */
	pow(base) {
		return null;
	}

	/**
	 * 任意の底の対数
	 * @param {number} base
	 * @returns {PixColor}
	 */
	baselog(base) {
		return null;
	}

	/**
	 * 値をテーブル参照で変換
	 * @param {Array<number>} table
	 * @returns {PixColor}
	 */
	table(table) {
		return null;
	}

	/**
	 * 全成分をランダムな値に設定
	 * @returns {PixColor}
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
	 * @param {PixColor} c
	 * @returns {PixColor}
	 */
	addColor(c) {
		return null;
	}

	/**
	 * 色同士の減算
	 * @param {PixColor} c
	 * @returns {PixColor}
	 */
	subColor(c) {
		return null;
	}

	/**
	 * 色同士の乗算
	 * @param {PixColor} c
	 * @returns {PixColor}
	 */
	mulColor(c) {
		return null;
	}

	/**
	 * 色同士の除算
	 * @param {PixColor} c
	 * @returns {PixColor}
	 */
	divColor(c) {
		return null;
	}

	/**
	 * 各成分ごとに最大値を返す
	 * @param {PixColor} c
	 * @returns {PixColor}
	 */
	maxColor(c) {
		return null;
	}

	/**
	 * 各成分ごとに最小値を返す
	 * @param {PixColor} c
	 * @returns {PixColor}
	 */
	minColor(c) {
		return null;
	}

	/**
	 * 色のノルム（色差の距離）を返す
	 * @param {number} normType PixColor.NORM_MODE
	 * @returns {number}
	 */
	norm(normType) {
		return null;
	}

	/**
	 * 色のノルムの高速計算
	 * @param {number} normType PixColor.NORM_MODE
	 * @returns {number}
	 */
	normFast(normType) {
		return null;
	}

	/**
	 * 指定色との差分ノルム
	 * @param {PixColor} c
	 * @param {number} normType PixColor.NORM_MODE
	 * @returns {number}
	 */
	normColor(c, normType) {
		return this.subColor(c).norm(normType);
	}

	/**
	 * 指定色との差分ノルム（高速版）
	 * @param {PixColor} c
	 * @param {number} normType PixColor.NORM_MODE
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
	 * @returns {PixColor}
	 */
	setBlendAlpha(alpha) {
		return null;
	}

	/**
	 * 指定色のアルファを移植した色を返す
	 * @param {PixColor} color
	 * @returns {PixColor}
	 */
	exchangeColorAlpha(color) {
		return null;
	}

	/**
	 * 色が一致するか
	 * @param {PixColor} c
	 * @returns {boolean}
	 */
	equals(c) {
		return false;
	}

	/**
	 * パレットから最も近い2色を探す
	 * @param {Array<PixColor>} palettes
	 * @param {number} normType 距離計算方法（PixColor.NORM_MODE）
	 * @returns {{c1:{color:PixColor,norm:number}, c2:{color:PixColor,norm:number}}}
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
PixColor.NORM_MODE = {
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

/**
 * 画像処理用のブレンドモードを管理するクラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


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
class PixBlend {
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

/**
 * 画像座標のラッピング（境界判定）用のクラス（範囲内のみ許可）
 * 画像の端から外にはみ出した場合に「範囲内ならそのまま／範囲外ならnull」を返す
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

class PixWrapInside {
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

/**
 * 画像座標のラッピング（はみ出し時は端にクランプする方式）
 * 画像の外側を参照した場合、座標を強制的に最も近い端にクランプして返す
 *
 * @module PixWrapClamp
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixWrapClamp extends PixWrapInside {
	/**
	 * サイズを指定して初期化
	 * @param {number} width 画像幅
	 * @param {number} height 画像高さ
	 */
	constructor(width, height) {
		super(width, height);
	}

	/**
	 * このラッピングの複製を作成
	 * @returns {PixWrapClamp}
	 */
	clone() {
		return new PixWrapClamp(this.width, this.height);
	}

	/**
	 * 指定座標が範囲内ならそのまま、範囲外なら端にクランプした[x, y]座標を返す
	 * @param {number} x
	 * @param {number} y
	 * @returns {number[]} クランプ済み座標 [x, y]
	 */
	getPixelPosition(x, y) {
		x = Math.floor(x);
		y = Math.floor(y);
		if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
			return [x, y];
		}
		// はみ出た場合は中にむりやり収める
		x = Math.floor(Math.min(Math.max(0, x), this.width - 1));
		y = Math.floor(Math.min(Math.max(0, y), this.height - 1));
		return [x, y];
	}
}

/**
 * 画像座標のラッピング（範囲外は繰り返しリピートする方式）
 * 範囲外座標は画像サイズでラップ（繰り返し）されます。
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixWrapRepeat extends PixWrapInside {
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
	 * @returns {PixWrapRepeat}
	 */
	clone() {
		return new PixWrapRepeat(this.width, this.height);
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

/**
 * 画像座標ラッピングの切り替え管理クラス
 * 指定モードごとに、範囲外座標の振る舞い（inside, clamp, repeat）を動的に切り替える基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixWrap {
	/**
	 * ラッピングモード・画像サイズを指定して初期化
	 * @param {string} [mode=PixWrap.MODE.INSIDE] ラッピングモード
	 * @param {number} [width=1] 画像幅
	 * @param {number} [height=1] 画像高さ
	 */
	constructor(mode, width, height) {
		this.width = 1;
		this.height = 1;
		if (arguments.length >= 2) {
			this.width = width;
			this.height = height;
		}
		if (arguments.length == 3) {
			this.setPixWrapMode(mode);
		} else {
			this.setPixWrapMode(PixWrap.MODE.INSIDE);
		}
	}

	/**
	 * このラッピングの複製を作成
	 * @returns {PixWrap}
	 */
	clone() {
		return new PixWrap(this.wrapmode, this.width, this.height);
	}

	/**
	 * ラッピングモードを設定（INSIDE, CLAMP, REPEAT）
	 * @param {string} mode PixWrap.MODEのいずれか
	 */
	setPixWrapMode(mode) {
		this.wrapmode = mode;
		if (mode === PixWrap.MODE.INSIDE) {
			this.wrap = new PixWrapInside(this.width, this.height);
		} else if (mode === PixWrap.MODE.CLAMP) {
			this.wrap = new PixWrapClamp(this.width, this.height);
		} else if (mode === PixWrap.MODE.REPEAT) {
			this.wrap = new PixWrapRepeat(this.width, this.height);
		}
	}

	/**
	 * 画像サイズを設定
	 * @param {number} width
	 * @param {number} height
	 */
	setSize(width, height) {
		this.width = width;
		this.height = height;
		if (this.wrap) {
			this.wrap.setSize(width, height);
		}
	}

	/**
	 * 指定座標のラップ後の[x, y]配列を返す
	 * モードに応じて範囲外判定・クランプ・リピートなどで返る値が変わる
	 * @param {number} x
	 * @param {number} y
	 * @returns {number[]|null} INSIDE: 範囲内なら[x,y]／範囲外はnull、CLAMP/REPEAT: 常に[x, y]
	 */
	getPixelPosition(x, y) {
		return this.wrap.getPixelPosition(x, y);
	}
}

/**
 * ラッピング方式のモード定数
 * @enum {string}
 * @property {string} INSIDE 範囲外は無効(null)
 * @property {string} CLAMP 範囲外は端にクランプ
 * @property {string} REPEAT 範囲外は繰り返し
 */
PixWrap.MODE = {
	INSIDE: "INSIDE",
	CLAMP: "CLAMP",
	REPEAT: "REPEAT"
};

/**
 * 補間モード・関数群をまとめたクラス
 * 画像内の任意座標の色を求めるための補間手法を実装
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


const InterpolationFunctions = {
	/**
	 * 線形補間 (Lerp)
	 * @param {PixColor} v0 開始色
	 * @param {PixColor} v1 終了色
	 * @param {number} x 補間係数 (0～1)
	 * @returns {PixColor}
	 */
	ipLerp: function (v0, v1, x) {
		const delta = v1.subColor(v0);
		return v0.addColor(delta.mul(x));
	},

	/**
	 * コサイン補間
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipCosine: function (v0, v1, x) {
		return InterpolationFunctions.ipLerp(v0, v1, (1.0 - Math.cos(Math.PI * x)) * 0.5);
	},

	/**
	 * Hermite補間（2点, 3次式）
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipHermite2p3: function (v0, v1, x) {
		return InterpolationFunctions.ipLerp(v0, v1, x * x * (3.0 - 2.0 * x));
	},

	/**
	 * Hermite補間（2点, 5次式）
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipHermite2p5: function (v0, v1, x) {
		return InterpolationFunctions.ipLerp(v0, v1, x * x * x * (6.0 * x * x - 15.0 * x + 10.0));
	},

	/**
	 * Hermite補間（4点）
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {PixColor} v2
	 * @param {PixColor} v3
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipHermite4p: function (v0, v1, v2, v3, x) {
		const P = v3.subColor(v2).subColor(v0.subColor(v1));
		const Q = v0.subColor(v1).subColor(P);
		const R = v2.subColor(v0);
		const S = v1;
		return P.mul(x * x * x)
			.addColor(Q.mul(x * x))
			.addColor(R.mul(x))
			.addColor(S);
	},

	/**
	 * バイキュービック補間の重み計算
	 * @param {number} d
	 * @param {number} a
	 * @returns {number}
	 */
	funcInBicubic: function (d, a) {
		if (d <= 1.0) {
			return 1.0 - (a + 3.0) * d * d + (a + 2.0) * d * d * d;
		} else {
			return -4 * a + 8.0 * a * d - 5.0 * a * d * d + a * d * d * d;
		}
	},

	/**
	 * 1次元バイキュービック補間
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {PixColor} v2
	 * @param {PixColor} v3
	 * @param {number} x
	 * @param {number} a
	 * @returns {PixColor}
	 */
	ipBicubic: function (v0, v1, v2, v3, x, a) {
		const w0 = InterpolationFunctions.funcInBicubic(x + 1, a);
		const w1 = InterpolationFunctions.funcInBicubic(x, a);
		const w2 = InterpolationFunctions.funcInBicubic(1 - x, a);
		const w3 = InterpolationFunctions.funcInBicubic(2 - x, a);
		const c = v0.mul(w0).addColor(v1.mul(w1)).addColor(v2.mul(w2)).addColor(v3.mul(w3));
		return c.mul(1.0 / (w0 + w1 + w2 + w3));
	},

	/**
	 * バイキュービック補間（ソフト）
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {PixColor} v2
	 * @param {PixColor} v3
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipBicubicSoft: function (v0, v1, v2, v3, x) {
		return InterpolationFunctions.ipBicubic(v0, v1, v2, v3, x, -0.5);
	},

	/**
	 * バイキュービック補間（標準）
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {PixColor} v2
	 * @param {PixColor} v3
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipBicubicNormal: function (v0, v1, v2, v3, x) {
		return InterpolationFunctions.ipBicubic(v0, v1, v2, v3, x, -1);
	},

	/**
	 * バイキュービック補間（シャープ）
	 * @param {PixColor} v0
	 * @param {PixColor} v1
	 * @param {PixColor} v2
	 * @param {PixColor} v3
	 * @param {number} x
	 * @returns {PixColor}
	 */
	ipBicubicSharp: function (v0, v1, v2, v3, x) {
		return InterpolationFunctions.ipBicubic(v0, v1, v2, v3, x, -1.2);
	},

	/**
	 * 2次元バイキュービック補間
	 * @param {Array<Array<PixColor>>} va 4x4色配列
	 * @param {number} nx
	 * @param {number} ny
	 * @param {number} a
	 * @returns {PixColor}
	 */
	ipBicubic2D: function (va, nx, ny, a) {
		let output = va[0][0].zero();
		let x,
			y,
			y_weight,
			weight,
			sum = 0.0;
		for (y = 0; y < 4; y++) {
			y_weight = InterpolationFunctions.funcInBicubic(Math.abs(-ny + y - 1), a);
			for (x = 0; x < 4; x++) {
				weight = InterpolationFunctions.funcInBicubic(Math.abs(-nx + x - 1), a);
				weight *= y_weight;
				sum += weight;
				output = output.addColor(va[y][x].mul(weight));
			}
		}
		output = output.mul(1.0 / sum);
		return output;
	},

	/**
	 * 2次元バイキュービック補間（ソフト）
	 * @param {Array<Array<PixColor>>} va
	 * @param {number} nx
	 * @param {number} ny
	 * @returns {PixColor}
	 */
	ipBicubic2DSoft: function (va, nx, ny) {
		return InterpolationFunctions.ipBicubic2D(va, nx, ny, -0.5);
	},

	/**
	 * 2次元バイキュービック補間（標準）
	 * @param {Array<Array<PixColor>>} va
	 * @param {number} nx
	 * @param {number} ny
	 * @returns {PixColor}
	 */
	ipBicubic2DNormal: function (va, nx, ny) {
		return InterpolationFunctions.ipBicubic2D(va, nx, ny, -1);
	},

	/**
	 * 2次元バイキュービック補間（シャープ）
	 * @param {Array<Array<PixColor>>} va
	 * @param {number} nx
	 * @param {number} ny
	 * @returns {PixColor}
	 */
	ipBicubic2DSharp: function (va, nx, ny) {
		return InterpolationFunctions.ipBicubic2D(va, nx, ny, -1.2);
	}
};

/**
 * 画像の補間方式を管理・利用するクラス
 */
class PixInterpolation {
	/**
	 * 補間モードを指定して初期化
	 * @param {string} [mode=PixInterpolation.MODE.NEAREST_NEIGHBOR] 補間モード
	 */
	constructor(mode) {
		if (arguments.length === 0) {
			mode = PixInterpolation.MODE.NEAREST_NEIGHBOR;
		}

		/**
		 * 補間モード（PixInterpolation.MODE のいずれか）
		 * @type {string}
		 */
		this.ipmode = null;

		/**
		 * 補間関数が必要とする近傍ピクセル数
		 * @type {number}
		 */
		this.ipn = 0;

		/**
		 * 補間関数
		 * @type {function(...*): PixColor}
		 */
		this.ipfunc = null;

		this.setInterpolationMode(mode);
	}

	/**
	 * この補間設定のクローンを作成
	 * @returns {PixInterpolation}
	 */
	clone() {
		return new PixInterpolation(this.ipmode);
	}

	/**
	 * 補間モードを設定
	 * @param {string} ipmode 補間モード（PixInterpolation.MODE のいずれか）
	 */
	setInterpolationMode(ipmode) {
		this.ipmode = ipmode;
		if (ipmode === PixInterpolation.MODE.NEAREST_NEIGHBOR) {
			this.ipfunc = InterpolationFunctions.ipLerp;
			this.ipn = 1;
		} else if (ipmode === PixInterpolation.MODE.BILINEAR) {
			this.ipfunc = InterpolationFunctions.ipLerp;
			this.ipn = 2;
		} else if (ipmode === PixInterpolation.MODE.COSINE) {
			this.ipfunc = InterpolationFunctions.ipCosine;
			this.ipn = 2;
		} else if (ipmode === PixInterpolation.MODE.HERMITE4_3) {
			this.ipfunc = InterpolationFunctions.ipHermite2p3;
			this.ipn = 2;
		} else if (ipmode === PixInterpolation.MODE.HERMITE4_5) {
			this.ipfunc = InterpolationFunctions.ipHermite2p5;
			this.ipn = 2;
		} else if (ipmode === PixInterpolation.MODE.HERMITE16) {
			this.ipfunc = InterpolationFunctions.ipHermite4p;
			this.ipn = 4;
		} else if (ipmode === PixInterpolation.MODE.BICUBIC) {
			this.ipfunc = InterpolationFunctions.ipBicubic2DNormal;
			this.ipn = 16;
		} else if (ipmode === PixInterpolation.MODE.BICUBIC_SOFT) {
			this.ipfunc = InterpolationFunctions.ipBicubicSoft;
			this.ipn = 4;
		} else if (ipmode === PixInterpolation.MODE.BICUBIC_NORMAL) {
			this.ipfunc = InterpolationFunctions.ipBicubicNormal;
			this.ipn = 4;
		} else if (ipmode === PixInterpolation.MODE.BICUBIC_SHARP) {
			this.ipfunc = InterpolationFunctions.ipBicubicSharp;
			this.ipn = 4;
		}
	}

	/**
	 * 指定座標の色を補間で取得
	 * 範囲外や実数座標でも安全に色取得可能
	 * @param {PixData} imgdata 元画像データ
	 * @param {number} x X座標（整数・実数可）
	 * @param {number} y Y座標（整数・実数可）
	 * @returns {PixColor} 補間結果の色
	 */
	getColor(imgdata, x, y) {
		const rx = Math.floor(x);
		const ry = Math.floor(y);
		if (this.ipn === 1 || (rx === x && ry === y)) {
			return imgdata.getPixel(rx, ry);
		} else if (this.ipn === 2) {
			const nx = x - rx;
			const ny = y - ry;
			let c0, c1;
			c0 = imgdata.getPixel(rx, ry);
			c1 = imgdata.getPixel(rx + 1, ry);
			const n0 = this.ipfunc(c0, c1, nx);
			c0 = imgdata.getPixel(rx, ry + 1);
			c1 = imgdata.getPixel(rx + 1, ry + 1);
			const n1 = this.ipfunc(c0, c1, nx);
			return this.ipfunc(n0, n1, ny);
		} else if (this.ipn === 4) {
			const nx = x - rx;
			const ny = y - ry;
			let c0, c1, c2, c3;
			c0 = imgdata.getPixel(rx - 1, ry - 1);
			c1 = imgdata.getPixel(rx, ry - 1);
			c2 = imgdata.getPixel(rx + 1, ry - 1);
			c3 = imgdata.getPixel(rx + 2, ry - 1);
			const n0 = this.ipfunc(c0, c1, c2, c3, nx);
			c0 = imgdata.getPixel(rx - 1, ry);
			c1 = imgdata.getPixel(rx, ry);
			c2 = imgdata.getPixel(rx + 1, ry);
			c3 = imgdata.getPixel(rx + 2, ry);
			const n1 = this.ipfunc(c0, c1, c2, c3, nx);
			c0 = imgdata.getPixel(rx - 1, ry + 1);
			c1 = imgdata.getPixel(rx, ry + 1);
			c2 = imgdata.getPixel(rx + 1, ry + 1);
			c3 = imgdata.getPixel(rx + 2, ry + 1);
			const n2 = this.ipfunc(c0, c1, c2, c3, nx);
			c0 = imgdata.getPixel(rx - 1, ry + 2);
			c1 = imgdata.getPixel(rx, ry + 2);
			c2 = imgdata.getPixel(rx + 1, ry + 2);
			c3 = imgdata.getPixel(rx + 2, ry + 2);
			const n3 = this.ipfunc(c0, c1, c2, c3, nx);
			return this.ipfunc(n0, n1, n2, n3, ny);
		} else if (this.ipn === 16) {
			const nx = x - rx;
			const ny = y - ry;
			let ix, iy;
			const cdata = [];
			for (iy = -1; iy < 3; iy++) {
				const cx = [];
				for (ix = -1; ix < 3; ix++) {
					cx[cx.length] = imgdata.getPixel(rx + ix, ry + iy);
				}
				cdata[cdata.length] = cx;
			}
			return this.ipfunc(cdata, nx, ny);
		}
		return null;
	}
}

/**
 * 補間モード定数
 * @enum {string}
 * @property {string} NEAREST_NEIGHBOR 最近傍補間
 * @property {string} BILINEAR バイリニア補間
 * @property {string} COSINE コサイン補間
 * @property {string} HERMITE4_3 Hermite補間(3次)
 * @property {string} HERMITE4_5 Hermite補間(5次)
 * @property {string} HERMITE16 Hermite補間(4点)
 * @property {string} BICUBIC バイキュービック補間(標準)
 * @property {string} BICUBIC_SOFT バイキュービック補間(ソフト)
 * @property {string} BICUBIC_NORMAL バイキュービック補間(標準)
 * @property {string} BICUBIC_SHARP バイキュービック補間(シャープ)
 */
PixInterpolation.MODE = {
	NEAREST_NEIGHBOR: "NEAREST_NEIGHBOR",
	BILINEAR: "BILINEAR",
	COSINE: "COSINE",
	HERMITE4_3: "HERMITE4_3",
	HERMITE4_5: "HERMITE4_5",
	HERMITE16: "HERMITE16",
	BICUBIC: "BICUBIC",
	BICUBIC_SOFT: "BICUBIC_SOFT",
	BICUBIC_NORMAL: "BICUBIC_NORMAL",
	BICUBIC_SHARP: "BICUBIC_SHARP"
};

/**
 * 画像処理用のFIR（畳み込み）フィルタ行列クラス
 * ブラーやシャープ、ガウシアンなど各種フィルタの行列生成・操作に使用
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

class PixFIRMatrix {
	/**
	 * 2次元配列で初期化
	 * @param {Array<Array<number>>} matrix フィルタ行列（[y][x]の2次元配列）
	 */
	constructor(matrix) {
		this.height = matrix.length;
		this.width = matrix[0].length;
		this.matrix = [];
		let i;
		for (i = 0; i < matrix.length; i++) {
			this.matrix[i] = matrix[i].slice();
		}
	}

	/**
	 * このフィルタ行列の複製を作成
	 * @returns {PixFIRMatrix}
	 */
	clone() {
		return new PixFIRMatrix(this.matrix);
	}

	/**
	 * フィルタ行列の周囲（エッジ）を時計回りに回転
	 * @param {number} val 回転量（正の整数で右回り）
	 * @returns {PixFIRMatrix} 回転後の新しい行列
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
	 * @returns {PixFIRMatrix}
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
	 * @returns {PixFIRMatrix}
	 */
	normalize() {
		return this.clone().mul(1.0 / this.sum());
	}

	/**
	 * フィルタの中心に指定値を加算
	 * @param {number} val
	 * @returns {PixFIRMatrix}
	 */
	addCenter(val) {
		const m = this.clone();
		m.matrix[m.height >> 1][m.width >> 1] += val;
		return m;
	}

	/**
	 * Laplacianフィルタ行列を生成
	 * @static
	 * @returns {PixFIRMatrix}
	 */
	static makeLaplacianFilter() {
		return new PixFIRMatrix([
			[0.0, -1, 0.0],
			[-1, 4.0, -1],
			[0.0, -1, 0.0]
		]);
	}

	/**
	 * シャープフィルタ行列を生成
	 * @static
	 * @param {number} power シャープ強度
	 * @returns {PixFIRMatrix}
	 */
	static makeSharpenFilter(power) {
		const m = PixFIRMatrix.makeLaplacianFilter();
		return m.mul(power).addCenter(1.0);
	}

	/**
	 * ボックス（平均化）ブラー行列を生成
	 * @static
	 * @param {number} width 行列幅
	 * @param {number} height 行列高さ
	 * @returns {PixFIRMatrix}
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
		return new PixFIRMatrix(m);
	}

	/**
	 * ガウシアンフィルタ行列を生成
	 * @static
	 * @param {number} width 行列幅
	 * @param {number} height 行列高さ
	 * @param {number} [sd=1.0] 標準偏差
	 * @returns {PixFIRMatrix}
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
		return new PixFIRMatrix(m).normalize();
	}

	/**
	 * 円形の畳み込み行列を生成
	 * @static
	 * @param {number} r 直径（行列の一辺）
	 * @returns {PixFIRMatrix}
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
		return new PixFIRMatrix(m).normalize();
	}
}

/**
 * 画像データ基底クラス（ラスタ画像データ抽象基盤）
 * RGBAやY（グレースケール）画像データを扱う基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixData {
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
				fy = y + fy_offset;
				for (my = 0; my < matrix.height; my++, fy++) {
					fx = x + fx_offset;
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

/**
 * RGBA色（Red, Green, Blue, Alpha）を扱う色クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixColorRGBA extends PixColor {
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
	 * @returns {PixColorRGBA}
	 */
	clone() {
		return new PixColorRGBA(this.rgba);
	}

	/**
	 * すべての成分が0のRGBA色を返す
	 * @returns {PixColorRGBA}
	 */
	zero() {
		return new PixColorRGBA([0.0, 0.0, 0.0, 0.0]);
	}

	/**
	 * すべての成分が1のRGBA色を返す
	 * @returns {PixColorRGBA}
	 */
	one() {
		return new PixColorRGBA([1.0, 1.0, 1.0, 1.0]);
	}

	/**
	 * 全成分に値を加算
	 * @param {number} x
	 * @returns {PixColorRGBA}
	 */
	add(x) {
		return new PixColorRGBA([this.r + x, this.g + x, this.b + x, this.a + x]);
	}

	/**
	 * 全成分から値を減算
	 * @param {number} x
	 * @returns {PixColorRGBA}
	 */
	sub(x) {
		return new PixColorRGBA([this.r - x, this.g - x, this.b - x, this.a - x]);
	}

	/**
	 * 全成分に値を乗算
	 * @param {number} x
	 * @returns {PixColorRGBA}
	 */
	mul(x) {
		return new PixColorRGBA([this.r * x, this.g * x, this.b * x, this.a * x]);
	}

	/**
	 * 全成分を値で除算
	 * @param {number} x
	 * @returns {PixColorRGBA}
	 */
	div(x) {
		return new PixColorRGBA([this.r / x, this.g / x, this.b / x, this.a / x]);
	}

	/**
	 * 全成分に exp() を適用
	 * @returns {PixColorRGBA}
	 */
	exp() {
		return new PixColorRGBA([Math.exp(this.r), Math.exp(this.g), Math.exp(this.b), Math.exp(this.a)]);
	}

	/**
	 * 全成分に log() を適用
	 * @returns {PixColorRGBA}
	 */
	log() {
		return new PixColorRGBA([Math.log(this.r), Math.log(this.g), Math.log(this.b), Math.log(this.a)]);
	}

	/**
	 * 全成分を base のべき乗にする
	 * @param {number} base
	 * @returns {PixColorRGBA}
	 */
	pow(base) {
		return new PixColorRGBA([
			Math.pow(base, this.r),
			Math.pow(base, this.g),
			Math.pow(base, this.b),
			Math.pow(base, this.a)
		]);
	}

	/**
	 * 任意の底の対数
	 * @param {number} base
	 * @returns {PixColorRGBA}
	 */
	baselog(base) {
		const x = 1.0 / Math.log(base);
		return new PixColorRGBA([
			Math.log(this.r) * x,
			Math.log(this.g) * x,
			Math.log(this.b) * x,
			Math.log(this.a) * x
		]);
	}

	/**
	 * テーブル参照で変換
	 * @param {Array<number>} table
	 * @returns {PixColorRGBA}
	 */
	table(table) {
		return new PixColorRGBA([
			table[Math.round(this.r)],
			table[Math.round(this.g)],
			table[Math.round(this.b)],
			table[Math.round(this.a)]
		]);
	}

	/**
	 * ランダムなRGBA色を返す
	 * @returns {PixColorRGBA}
	 */
	random() {
		return new PixColorRGBA([
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
	 * @param {PixColorRGBA} c
	 * @returns {PixColorRGBA}
	 */
	addColor(c) {
		return new PixColorRGBA([this.r + c.r, this.g + c.g, this.b + c.b, this.a + c.a]);
	}

	/**
	 * 色同士の減算
	 * @param {PixColorRGBA} c
	 * @returns {PixColorRGBA}
	 */
	subColor(c) {
		return new PixColorRGBA([this.r - c.r, this.g - c.g, this.b - c.b, this.a - c.a]);
	}

	/**
	 * 色同士の乗算
	 * @param {PixColorRGBA} c
	 * @returns {PixColorRGBA}
	 */
	mulColor(c) {
		return new PixColorRGBA([this.r * c.r, this.g * c.g, this.b * c.b, this.a * c.a]);
	}

	/**
	 * 色同士の除算
	 * @param {PixColorRGBA} c
	 * @returns {PixColorRGBA}
	 */
	divColor(c) {
		return new PixColorRGBA([this.r / c.r, this.g / c.g, this.b / c.b, this.a / c.a]);
	}

	/**
	 * 各成分ごとに最大値を返す
	 * @param {PixColorRGBA} c
	 * @returns {PixColorRGBA}
	 */
	maxColor(c) {
		return new PixColorRGBA([
			Math.max(c.r, this.r),
			Math.max(c.g, this.g),
			Math.max(c.b, this.b),
			Math.max(c.a, this.a)
		]);
	}

	/**
	 * 各成分ごとに最小値を返す
	 * @param {PixColorRGBA} c
	 * @returns {PixColorRGBA}
	 */
	minColor(c) {
		return new PixColorRGBA([
			Math.min(c.r, this.r),
			Math.min(c.g, this.g),
			Math.min(c.b, this.b),
			Math.min(c.a, this.a)
		]);
	}
	/**
	 * 色差の距離を計算（マンハッタン／ユークリッド）
	 * @param {number} normType PixColor.NORM_MODE
	 * @returns {number}
	 */
	norm(normType) {
		if (normType === PixColor.NORM_MODE.MANHATTEN) {
			return (Math.abs(this.r) + Math.abs(this.g) + Math.abs(this.b)) / 3;
		} else if (normType === PixColor.NORM_MODE.EUGRID) {
			return Math.sqrt(this.r * this.r + this.g * this.g + this.b * this.b) / 3;
		}
	}

	/**
	 * 色差の距離を高速計算
	 * @param {number} normType PixColor.NORM_MODE
	 * @returns {number}
	 */
	normFast(normType) {
		if (normType === PixColor.NORM_MODE.MANHATTEN) {
			return Math.abs(this.r) + Math.abs(this.g) + Math.abs(this.b);
		} else if (normType === PixColor.NORM_MODE.EUGRID) {
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
	 * @returns {PixColorRGBA}
	 */
	setBlendAlpha(x) {
		const color = this.clone();
		color.rgba[3] = x * 255.0;
		return color;
	}

	/**
	 * 指定色のアルファ値をコピーして返す
	 * @param {PixColorRGBA} color
	 * @returns {PixColorRGBA}
	 */
	exchangeColorAlpha(color) {
		return new PixColorRGBA([this.r, this.g, this.b, color.a]);
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
	 * @param {PixColorRGBA} c
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
	 * @returns {PixColorRGBA}
	 */
	mulMatrix(m) {
		return new PixColorRGBA([
			this.r * m[0][0] + this.g * m[0][1] + this.b * m[0][2] + this.a * m[0][3],
			this.r * m[1][0] + this.g * m[1][1] + this.b * m[1][2] + this.a * m[1][3],
			this.r * m[2][0] + this.g * m[2][1] + this.b * m[2][2] + this.a * m[2][3],
			this.r * m[3][0] + this.g * m[3][1] + this.b * m[3][2] + this.a * m[3][3]
		]);
	}
}

/**
 * 輝度（Y成分・グレースケール）のみを扱う色クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixColorY extends PixColor {
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

/**
 * 3次元ベクトルクラス
 * 画像処理やノーマルマップでの方向ベクトル表現等に利用します
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixVector {
	/**
	 * 3次元ベクトルを生成
	 * @param {number} x X成分
	 * @param {number} y Y成分
	 * @param {number} z Z成分
	 */
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * クロス積（外積）を計算
	 * @param {PixVector} tgt 相手ベクトル
	 * @returns {PixVector} クロス積（this × tgt）
	 */
	cross(tgt) {
		return new PixVector(
			this.y * tgt.z - this.z * tgt.y,
			this.z * tgt.x - this.x * tgt.z,
			this.x * tgt.y - this.y * tgt.x
		);
	}

	/**
	 * 指定ターゲットへの方向ベクトルを計算
	 * @param {PixVector} tgt ターゲットベクトル
	 * @returns {PixVector} tgt - this
	 */
	getDirection(tgt) {
		return new PixVector(tgt.x - this.x, tgt.y - this.y, tgt.z - this.z);
	}

	/**
	 * 正規化（単位ベクトル化）したベクトルを返す
	 * @returns {PixVector}
	 */
	normalize() {
		let b = this.x * this.x + this.y * this.y + this.z * this.z;
		b = Math.sqrt(1.0 / b);
		return new PixVector(this.x * b, this.y * b, this.z * b);
	}

	/**
	 * 方向ベクトルからノーマルマップ用のRGBA色に変換
	 * 右がX+,U+、下がY+,V+としたとき、RGB＝（+X, -Y, +Z）系とします。
	 * @returns {PixColorRGBA}
	 */
	getNormalMapColor() {
		return new PixColorRGBA([
			Math.round((1.0 + this.x) * 127.5),
			Math.round((1.0 - this.y) * 127.5),
			Math.round((1.0 + this.z) * 127.5),
			255
		]);
	}

	/**
	 * ノーマルマップRGBA色から方向ベクトルを生成
	 * 右がX+,U+、下がY+,V+としたとき、RGB＝（+X, -Y, +Z）系とします。
	 * @param {PixColorRGBA} rgbcolor ノーマルマップ用RGBA色
	 * @returns {PixVector}
	 * @throws {Error} 引数がPixColorRGBAでない場合
	 */
	static createNormalVector(rgbcolor) {
		if (!(rgbcolor instanceof PixColorRGBA)) {
			throw "not PixColorRGBA";
		}
		return new PixVector(rgbcolor.r / 128.0 - 1.0, -(rgbcolor.g / 128.0) + 1.0, rgbcolor.b / 128.0 - 1.0);
	}
}

/**
 * グレースケール画像データクラス（輝度Yのみで管理）
 * 1チャンネル（Y）の画像データ処理を提供
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixDataY extends PixData {
	/**
	 * 初期化
	 * @constructor
	 * @param {ImageData|PixDataRGBA|PixDataY|number} [arg1] 元画像または幅
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
	 * @returns {PixDataY}
	 */
	clone() {
		const x = new PixDataY(this.width, this.height);
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
	 * @returns {PixColorY}
	 */
	getPixelInside(x, y) {
		const p = y * this.width + x;
		return new PixColorY(this.data[p]);
	}

	/**
	 * 範囲内座標のY値を設定
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColorY} color
	 */
	setPixelInside(x, y, color) {
		const p = y * this.width + x;
		this.data[p] = color.getColor();
	}

	/**
	 * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColorY} color
	 */
	setPixel(x, y, color) {
		super.setPixel(x, y, color);
	}

	/**
	 * 実数座標(x, y)の補間色を返す
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixColorY}
	 */
	getColor(x, y) {
		// @ts-ignore
		return super.getColor(x, y);
	}

	/**
	 * UV座標（0～1）でテクスチャとして色取得
	 * @param {number} u
	 * @param {number} v
	 * @returns {PixColorY}
	 */
	getColorUV(u, v) {
		// @ts-ignore
		return super.getColorUV(u, v);
	}

	/**
	 * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColorY} color
	 */
	setColor(x, y, color) {
		super.setPixel(x, y, color);
	}

	/**
	 * 全画素に対してコールバック関数を適用
	 * @param {function(PixColorY, number, number, PixData):void} callback (color, x, y, this)
	 */
	forEach(callback) {
		super.forEach(callback);
	}

	/**
	 * 各種画像データから本クラスへ変換して格納
	 * @param {ImageData|PixDataRGBA|PixDataY} imagedata
	 * @param {number} [n=0] RGBAのどのチャンネルか（0:R, 1:G, 2:B, 3:A）
	 */
	putImageData(imagedata, n) {
		if (imagedata instanceof ImageData || imagedata instanceof PixDataRGBA) {
			this.setSize(imagedata.width, imagedata.height);
			if (n === undefined) {
				n = 0;
			}
			let p = 0;
			for (let i = 0; i < this.data.length; i++) {
				this.data[i] = imagedata.data[p + n];
				p += 4;
			}
		} else if (imagedata instanceof PixDataY) {
			this.setSize(imagedata.width, imagedata.height);
			this.data.set(imagedata.data);
		} else {
			throw "IllegalArgumentException";
		}
	}

	/**
	 * RGBA画像からR成分のみ取り込む
	 * @param {ImageData|PixDataRGBA} imagedata
	 */
	putImageDataR(imagedata) {
		this.putImageData(imagedata, 0);
	}

	/**
	 * RGBA画像からG成分のみ取り込む
	 * @param {ImageData|PixDataRGBA} imagedata
	 */
	putImageDataG(imagedata) {
		this.putImageData(imagedata, 1);
	}

	/**
	 * RGBA画像からB成分のみ取り込む
	 * @param {ImageData|PixDataRGBA} imagedata
	 */
	putImageDataB(imagedata) {
		this.putImageData(imagedata, 2);
	}

	/**
	 * RGBA画像からA成分のみ取り込む
	 * @param {ImageData|PixDataRGBA} imagedata
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
	 * @returns {PixDataRGBA}
	 * @throws {Error} ラッピングモードがINSIDEの場合は例外
	 */
	getNormalMap() {
		if (this.getWrapMode() === PixData.MODE_WRAP.INSIDE) {
			// 端の値を取得できないのでエラー
			throw "not inside";
		}

		const output = new PixDataRGBA(this.width, this.height);
		let x, y;
		for (y = 0; y < this.height; y++) {
			for (x = 0; x < this.width; x++) {
				const x1 = new PixVector(x - 1, y, this.getPixel(x - 1, y).getColor());
				const x2 = new PixVector(x + 1, y, this.getPixel(x + 1, y).getColor());
				const x3 = x1.getDirection(x2);
				const y1 = new PixVector(x, y - 1, this.getPixel(x, y - 1).getColor());
				const y2 = new PixVector(x, y + 1, this.getPixel(x, y + 1).getColor());
				const y3 = y1.getDirection(y2);
				const n = x3.cross(y3).normalize();
				output.setPixelInside(x, y, n.getNormalMapColor());
			}
		}
		return output;
	}

	/**
	 * ノーマルマップを環境マッピングする（未実装）
	 * @param {PixDataRGBA} texture
	 * @returns {PixDataRGBA}
	 */
	filterEnvironmentMapping(texture) {
		return null;
	}
}

/**
 * RGBAカラー画像データクラス（4チャンネル画像データ）
 * 32bit整数(0xRRGGBBAA)の画素配列で管理。各種チャンネル処理や減色などもサポート
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


class PixDataRGBA extends PixData {
	/**
	 * 初期化
	 * @constructor
	 * @param {ImageData|PixDataRGBA|PixDataY|number} [arg1] 画像データまたは幅
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
	 * @returns {PixDataRGBA}
	 */
	clone() {
		const x = new PixDataRGBA(this.width, this.height);
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
		this.data = new Uint8ClampedArray(this.width * this.height * 4);
	}

	/**
	 * 範囲内座標のRGBA値を取得
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixColorRGBA}
	 */
	getPixelInside(x, y) {
		const p = (y * this.width + x) * 4;
		const c = new PixColorRGBA([this.data[p], this.data[p + 1], this.data[p + 2], this.data[p + 3]]);
		return c;
	}

	/**
	 * 範囲内座標のRGBA値を設定
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColorRGBA} color
	 */
	setPixelInside(x, y, color) {
		const p = (y * this.width + x) * 4;
		this.data[p] = color.getColor()[0];
		this.data[p + 1] = color.getColor()[1];
		this.data[p + 2] = color.getColor()[2];
		this.data[p + 3] = color.getColor()[3];
	}

	/**
	 * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColorRGBA} color
	 */
	setPixel(x, y, color) {
		super.setPixel(x, y, color);
	}

	/**
	 * 実数座標(x, y)の補間色を返す
	 * @param {number} x
	 * @param {number} y
	 * @returns {PixColorRGBA}
	 */
	getColor(x, y) {
		// @ts-ignore
		return super.getColor(x, y);
	}

	/**
	 * UV座標（0～1）でテクスチャとして色取得
	 * @param {number} u
	 * @param {number} v
	 * @returns {PixColorRGBA}
	 */
	getColorUV(u, v) {
		// @ts-ignore
		return super.getColorUV(u, v);
	}

	/**
	 * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
	 * @param {number} x
	 * @param {number} y
	 * @param {PixColorRGBA} color
	 */
	setColor(x, y, color) {
		super.setPixel(x, y, color);
	}

	/**
	 * 全画素に対してコールバック関数を適用
	 * @param {function(PixColorRGBA, number, number, PixData):void} callback (color, x, y, this)
	 */
	forEach(callback) {
		super.forEach(callback);
	}

	/**
	 * グレースケール画像データを任意のチャンネルに反映
	 * @param {PixDataY} imagedata
	 * @param {number} [n=0] 0:R, 1:G, 2:B, 3:A
	 */
	putDataY(imagedata, n) {
		if (!(imagedata instanceof PixDataY)) {
			throw "IllegalArgumentException";
		}
		this.setSize(imagedata.width, imagedata.height);
		if (n === undefined) {
			n = 0;
		}
		let p = 0,
			i = 0;
		for (; i < imagedata.data.length; i++) {
			this.data[p + n] = Math.floor(imagedata.data[i]);
			p += 4;
		}
	}

	/** @param {PixDataY} imagedata */
	putDataYToR(imagedata) {
		this.putDataY(imagedata, 0);
	}

	/** @param {PixDataY} imagedata */
	putDataYToG(imagedata) {
		this.putDataY(imagedata, 1);
	}

	/** @param {PixDataY} imagedata */
	putDataYToB(imagedata) {
		this.putDataY(imagedata, 2);
	}

	/** @param {PixDataY} imagedata */
	putDataYToA(imagedata) {
		this.putDataY(imagedata, 3);
	}

	/**
	 * 各種画像データからRGBA配列として格納
	 * @param {ImageData|PixDataRGBA|PixDataY} imagedata
	 */
	putImageData(imagedata) {
		if (imagedata instanceof ImageData || imagedata instanceof PixDataRGBA) {
			this.setSize(imagedata.width, imagedata.height);
			this.data.set(imagedata.data);
		} else if (imagedata instanceof PixDataY) {
			this.putImageData(imagedata.getImageData());
		} else {
			throw "IllegalArgumentException";
		}
	}

	/**
	 * ImageData（Canvas API）として出力
	 * @returns {ImageData}
	 */
	getImageData() {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		const context = canvas.getContext("2d");
		const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
		imagedata.data.set(this.data);
		return imagedata;
	}

	/**
	 * グレースケール化（自身を書き換え）
	 */
	grayscale() {
		this.forEach(function (color, x, y, data) {
			const luminance = ~~color.luminance();
			const newcolor = new PixColorRGBA([luminance, luminance, luminance, color.rgba[3]]);
			data.setPixelInside(x, y, newcolor);
		});
	}

	/**
	 * 使用されている色数を取得（透明はカウントしない）
	 * @returns {number}
	 */
	getColorCount() {
		// 色を記録する領域
		// 0x200000 = 256 * 256 * 256 / 8 = 2097152
		const sw = new Uint8ClampedArray(0x200000);
		let count = 0;
		this.forEach(function (color) {
			const rrggbb = color.getRRGGBB();
			const p1 = rrggbb >> 3; // x / 8
			const p2 = rrggbb % 7; // x & 8
			if (((sw[p1] >> p2) & 1) === 0) {
				count++;
				sw[p1] = (sw[p1] ^ (1 << p2)) & 0xff;
			}
		});
		return count;
	}

	/**
	 * メディアンカットによる減色用パレットを取得
	 * @param {number} colors 色数
	 * @returns {Array<PixColorRGBA>|null}
	 */
	getPalletMedianCut(colors) {
		if (this.getColorCount() <= colors) {
			return null;
		}
		let i;
		let r, g, b;

		// 減色に用いる解像度
		const bit = 7;

		// 含まれる色数
		const color = new Uint32Array((1 << bit) * (1 << bit) * (1 << bit));

		// 現在の色数
		let colorcnt = 0;

		// 色から指定した解像度のrrggbb値を返す

		/**
		 * @param {PixColorRGBA} color
		 * @returns {number}
		 * @private
		 */
		const RGBtoPositionForColor = function (color) {
			const r = color.getRed();
			const g = color.getGreen();
			const b = color.getBlue();
			return ((r >> (8 - bit)) << (bit * 2)) | ((g >> (8 - bit)) << bit) | (b >> (8 - bit));
		};

		// 0区切り目の初期値を計算する
		// それぞれの区切り幅に含まれた色数、及び区切り幅の最大値と最小値
		// R = 0, G = 1, B = 2 の位置とする

		/**
		 * 各区切りごとの色数を保持する配列
		 * @type {number[]}
		 */
		const color_cnt = [];

		/**
		 * color_max: 各色成分ごとの最大値を保持する3次元配列
		 * @type {number[][]}
		 */
		const color_max = [[], [], []];

		/**
		 * color_min: 各色成分ごとの最小値を保持する3次元配列
		 * @type {number[][]}
		 */
		const color_min = [[], [], []];

		// 色数は全画素
		color_cnt[0] = this.width * this.height;
		// 色の幅も最小から最大までとる
		for (i = 0; i < 3; i++) {
			color_min[i][colorcnt] = 0; //bit最小値
			color_max[i][colorcnt] = (1 << bit) - 1; //bit最大値
		}

		// あらかじめ各色が何画素含まれているかを調査する
		this.forEach(function (targetcolor) {
			color[RGBtoPositionForColor(targetcolor)]++;
		});

		// 色の幅
		let r_delta, g_delta, b_delta;
		// 色の最大幅
		let max_r_delta, max_g_delta, max_b_delta;
		// 区切った回数
		let kugiri;

		// ここからアルゴリズム頑張った……！

		colorcnt++;
		for (kugiri = 1; colorcnt < colors; ) {
			//区切る場所(R・G・Bのどれを区切るか)を大雑把に決める
			//基準は体積
			let max_volume = 0,
				tgt = 0;
			for (i = 0; i < kugiri; i++) {
				r_delta = color_max[0][i] - color_min[0][i];
				g_delta = color_max[1][i] - color_min[1][i];
				b_delta = color_max[2][i] - color_min[2][i];
				const this_volume = r_delta * g_delta * b_delta;
				if (max_volume < this_volume) {
					max_volume = this_volume;
					max_r_delta = r_delta;
					max_g_delta = g_delta;
					max_b_delta = b_delta;
					tgt = i;
				}
			}

			//その立方体のうちどの次元を区切るか大雑把に決める
			//基準は幅
			let max_delta = max_g_delta; // 緑を優先して区切る
			let tgt_col = 1;
			if (max_delta < max_r_delta) {
				max_delta = max_r_delta;
				tgt_col = 0;
			}
			if (max_delta < max_b_delta) {
				max_delta = max_b_delta;
				tgt_col = 2;
			}

			// それ以上区切れなかった場合は終了
			if (max_delta === 0) {
				break;
			}

			// tgt の範囲を
			// tgt_col  の次元の中央で区切る
			{
				//区切る位置を調べる(色数の中心)
				const point = color_min[tgt_col][tgt] + (max_delta >> 1); //実際の中心
				//
				//新しく区切った範囲を作成
				if (point === color_max[tgt_col][tgt]) {
					color_min[tgt_col][kugiri] = point;
					color_max[tgt_col][kugiri] = color_max[tgt_col][tgt];
					color_max[tgt_col][tgt] = point - 1;
				} else {
					color_min[tgt_col][kugiri] = point + 1;
					color_max[tgt_col][kugiri] = color_max[tgt_col][tgt];
					color_max[tgt_col][tgt] = point;
				}

				//その他の範囲は受け継ぐ
				for (i = 0; i < 3; i++) {
					if (i === tgt_col) {
						continue;
					}
					color_min[i][kugiri] = color_min[i][tgt];
					color_max[i][kugiri] = color_max[i][tgt];
				}
			}

			// 新しく区切った範囲に対して、含まれる色の画素数を計算しなおす
			color_cnt[kugiri] = 0;
			for (r = color_min[0][kugiri]; r <= color_max[0][kugiri]; r++) {
				for (g = color_min[1][kugiri]; g <= color_max[1][kugiri]; g++) {
					for (b = color_min[2][kugiri]; b <= color_max[2][kugiri]; b++) {
						color_cnt[kugiri] += color[(r << (bit << 1)) | (g << bit) | b];
					}
				}
			}
			color_cnt[tgt] -= color_cnt[kugiri];

			// 新しく区切った先に画素が入って、区切り元の画素数がなくなった場合
			if (color_cnt[tgt] === 0) {
				// 区切った先のデータを、区切り元にコピーして、
				// 区切ったことをなかったことにする
				color_cnt[tgt] = color_cnt[kugiri];
				for (i = 0; i < 3; i++) {
					color_min[i][tgt] = color_min[i][kugiri];
					color_max[i][tgt] = color_max[i][kugiri];
				}
			}
			// せっかく区切ったが、区切った先の画素数が0だった
			// else if (color_cnt[kugiri] === 0) {
			// 	falls through
			// }
			//色が両方とも分別できた場合
			else {
				kugiri++;
				colorcnt++;
			}
		}

		// 作成するパレット
		const pallet = [];

		//パレットを作る
		for (i = 0; i < colorcnt; i++) {
			//色数 × 色
			let avr_r = 0;
			let avr_g = 0;
			let avr_b = 0;
			for (r = color_min[0][i]; r <= color_max[0][i]; r++) {
				for (g = color_min[1][i]; g <= color_max[1][i]; g++) {
					for (b = color_min[2][i]; b <= color_max[2][i]; b++) {
						const color_sum = color[(r << (bit << 1)) | (g << bit) | b];
						avr_r += color_sum * (r << (8 - bit));
						avr_g += color_sum * (g << (8 - bit));
						avr_b += color_sum * (b << (8 - bit));
					}
				}
			}
			//平均を取る
			r = Math.round(avr_r / color_cnt[i]);
			g = Math.round(avr_g / color_cnt[i]);
			b = Math.round(avr_b / color_cnt[i]);
			r = r < 0 ? 0 : r > 255 ? 255 : r;
			g = g < 0 ? 0 : g > 255 ? 255 : g;
			b = b < 0 ? 0 : b > 255 ? 255 : b;

			//COLORREF 型で代入
			pallet[i] = new PixColorRGBA([r, g, b, 255]);
		}

		return pallet;
	}

	/**
	 * 使用されている色のパレット（最大256色まで）
	 * @returns {Array<PixColorRGBA>}
	 */
	getPallet() {
		/**
		 * @type {Array<PixColorRGBA>}
		 */
		const pallet = [];
		const rrggbb_array = new Uint32Array(256);
		let count = 0;
		let i = 0;
		this.forEach(function (color) {
			if (count > 255) {
				return;
			}
			const rrggbb = color.getRRGGBB();
			for (i = 0; i < count; i++) {
				if (rrggbb_array[i] === rrggbb) {
					return;
				}
			}
			rrggbb_array[count] = rrggbb;
			pallet[count] = color;
			count++;
		});
		return pallet;
	}

	/**
	 * グレースケール階調パレットを取得
	 * @param {number} colors 階調数(2~256)
	 * @returns {Array<PixColorRGBA>}
	 */
	getPalletGrayscale(colors) {
		const n = colors < 2 ? 2 : colors > 256 ? 256 : colors;
		const pallet = [];
		const diff = 255.0 / (n - 1);
		let col = 0.0;
		let i;
		for (i = 0; i < n; i++) {
			let y = Math.round(col);
			y = y < 0 ? 0 : y > 255 ? 255 : y;
			pallet[i] = new PixColorRGBA([y, y, y, 255]);
			col += diff;
		}
		return pallet;
	}

	/**
	 * パレットを使った単純減色
	 * @param {Array<PixColorRGBA>} palettes
	 */
	quantizationSimple(palettes) {
		this.forEach(function (thiscolor, x, y, data) {
			const palletcolor = thiscolor.searchColor(palettes, PixColor.NORM_MODE.EUGRID);
			data.setPixelInside(x, y, palletcolor.c1.color.exchangeColorAlpha(thiscolor));
		});
	}

	/**
	 * パレット＋組織的ディザ法による減色
	 * @param {Array<PixColorRGBA>} palettes
	 * @param {PixDataRGBAQuantization} orderPattern
	 * @param {number} normType PixColor.NORM_MOD
	 */
	quantizationOrdered(palettes, orderPattern, normType) {
		this.forEach(function (thiscolor, x, y, data) {
			const palletcolor = thiscolor.searchColor(palettes, normType);
			const color1 = palletcolor.c1.color;
			const norm1 = palletcolor.c1.norm;
			const color2 = palletcolor.c2.color;
			const norm2 = palletcolor.c2.norm;
			let normsum = norm1 + norm2;
			let sumdiff = 0;
			normsum = normsum === 0 ? 1 : normsum;
			const pattern = orderPattern.pattern[y % orderPattern.height][x % orderPattern.width];
			let newcolor = null;
			if (color1.luminance > color2.luminance) {
				sumdiff = Math.floor((norm2 * orderPattern.maxnumber) / normsum);
				if (pattern <= sumdiff) {
					newcolor = color1.exchangeColorAlpha(thiscolor); // 1番目に似ている色
				} else {
					newcolor = color2.exchangeColorAlpha(thiscolor); // 2番目に似ている色
				}
			} else {
				sumdiff = Math.floor((norm1 * orderPattern.maxnumber) / normsum);
				if (pattern >= sumdiff) {
					newcolor = color1.exchangeColorAlpha(thiscolor); // 1番目に似ている色
				} else {
					newcolor = color2.exchangeColorAlpha(thiscolor); // 2番目に似ている色
				}
			}
			data.setPixelInside(x, y, newcolor);
		});
	}

	/**
	 * パレット＋誤差拡散法による減色
	 * @param {Array<PixColorRGBA>} palettes
	 * @param {PixDataRGBAQuantization} diffusionPattern
	 */
	quantizationDiffusion(palettes, diffusionPattern) {
		// 誤差拡散するにあたって、0未満や255より大きな値を使用するため
		// 一旦、下記のバッファにうつす
		const pixelcount = this.width * this.height;
		const color_r = new Int16Array(pixelcount);
		const color_g = new Int16Array(pixelcount);
		const color_b = new Int16Array(pixelcount);

		// 現在の位置
		let point = 0;
		this.forEach(function (thiscolor, x, y, data) {
			point = y * data.width + x;
			color_r[point] = thiscolor.getRed();
			color_g[point] = thiscolor.getGreen();
			color_b[point] = thiscolor.getBlue();
		});

		// 誤差拡散できない右端
		const width_max = this.width - diffusionPattern.width + diffusionPattern.center;

		// パターンを正規化して合計を1にする
		let px, py;
		let pattern_sum = 0;
		for (py = 0; py < diffusionPattern.height; py++) {
			for (px = 0; px < diffusionPattern.width; px++) {
				pattern_sum += diffusionPattern.pattern[py][px];
			}
		}
		/**
		 * @type {number[][]}
		 * @private
		 */
		const pattern_normalize = [];
		for (py = 0; py < diffusionPattern.height; py++) {
			pattern_normalize[py] = [];
			for (px = 0; px < diffusionPattern.width; px++) {
				pattern_normalize[py][px] = diffusionPattern.pattern[py][px] / pattern_sum;
			}
		}

		// 選択処理
		this.forEach(function (thiscolor, x, y, data) {
			point = y * data.width + x;
			const diffcolor = new PixColorRGBA([color_r[point], color_g[point], color_b[point], 255]);
			// 最も近い色を探して
			const palletcolor = diffcolor.searchColor(palettes, PixColor.NORM_MODE.EUGRID);
			/**
			 * @type {PixColorRGBA}
			 */
			// @ts-ignore
			const c1color = /** @type {PixColorRGBA} */ palletcolor.c1.color;
			// 値を設定する
			data.setPixelInside(x, y, c1color.exchangeColorAlpha(thiscolor));
			// 右端の近くは誤差分散させられないので拡散しない
			if (x > width_max) {
				return;
			}
			// ここから誤差を求める
			const deltacolor = diffcolor.subColor(c1color);
			for (py = 0; py < diffusionPattern.height; py++) {
				px = py === 0 ? diffusionPattern.center : 0;
				for (; px < diffusionPattern.width; px++) {
					const dx = x + px - diffusionPattern.center;
					const dy = y + py;
					// 画面外への拡散を防止する
					if (dx < 0 || dy >= data.height) {
						continue;
					}
					const dp = dy * data.width + dx;
					color_r[dp] += deltacolor.getRed() * pattern_normalize[py][px];
					color_g[dp] += deltacolor.getGreen() * pattern_normalize[py][px];
					color_b[dp] += deltacolor.getBlue() * pattern_normalize[py][px];
				}
			}
		});
	}

	/**
	 * 色数指定の単純減色
	 * @param {number} colorcount
	 */
	filterQuantizationSimple(colorcount) {
		const count = this.getColorCount();
		if (count > colorcount) {
			const pallet = this.getPalletMedianCut(colorcount);
			this.quantizationSimple(pallet);
		}
	}

	/**
	 * 組織的ディザ法による減色
	 * @param {number} colorcount
	 * @param {number} [normType] デフォルトはPixColor.NORM_MODE.EUGRID
	 */
	filterQuantizationOrdered(colorcount, normType) {
		if (normType === undefined) {
			normType = PixColor.NORM_MODE.EUGRID;
		}
		const count = this.getColorCount();
		if (count > colorcount) {
			const pallet = this.getPalletMedianCut(colorcount);
			this.quantizationOrdered(pallet, PixDataRGBA.quantization.orderPattern.patternBayer, normType);
		}
	}

	/**
	 * 誤差拡散法による減色
	 * @param {number} colorcount
	 * @param {PixDataRGBAQuantization} [diffusionPattern]
	 */
	filterQuantizationDiffusion(colorcount, diffusionPattern) {
		if (diffusionPattern === undefined) {
			diffusionPattern = PixDataRGBA.quantization.diffusionPattern.patternFloydSteinberg;
		}
		const count = this.getColorCount();
		if (count > colorcount) {
			const pallet = this.getPalletMedianCut(colorcount);
			this.quantizationDiffusion(pallet, diffusionPattern);
		}
	}
}

/**
 * パターン定義
 * @typedef {Object} PixDataRGBAQuantization
 * @property {number} width パターンの幅
 * @property {number} height パターンの高さ
 * @property {number} [center] パターンの中心位置
 * @property {number} [maxnumber] 組織的ディザ法用の最大値
 * @property {number[][]} pattern パターンの配列
 */

/**
 * パターン定義用の静的定数
 */
PixDataRGBA.quantization = {
	/**
	 * 誤差拡散法用パターン
	 */
	diffusionPattern: {
		/**
		 * 誤差拡散法に用いるFloyd & Steinbergのパターン
		 */
		patternFloydSteinberg: {
			width: 3,
			height: 2,
			center: 1,
			pattern: [
				[0, 0, 7],
				[3, 5, 1]
			]
		},

		/**
		 * 誤差拡散法に用いるJarvis,Judice & Ninkeのパターン
		 */
		patternJarvisJudiceNinke: {
			width: 5,
			height: 3,
			center: 2,
			pattern: [
				[0, 0, 0, 7, 5],
				[3, 5, 7, 5, 3],
				[1, 3, 5, 3, 1]
			]
		}
	},

	orderPattern: {
		/**
		 * 組織的ディザ法に用いるBayerのパターン
		 */
		patternBayer: {
			width: 4,
			height: 4,
			maxnumber: 16,
			pattern: [
				[0, 8, 2, 10],
				[12, 4, 14, 6],
				[3, 11, 1, 9],
				[15, 7, 13, 5]
			]
		}
	}
};

/**
 * PixFX
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */


const PixfX = {
	PixDataRGBA: PixDataRGBA,
	PixColorRGBA: PixColorRGBA,
	PixDataY: PixDataY,
	PixColorY: PixColorY,
	MODE_WRAP: PixData.MODE_WRAP,
	MODE_IP: PixData.MODE_IP,
	MODE_BLEND: PixData.MODE_BLEND
};

export { PixfX as default };
