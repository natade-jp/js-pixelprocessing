export { PixfX as default };
/**
 * パターン定義
 */
export type PixDataRGBAQuantization = {
    /**
     * パターンの幅
     */
    width: number;
    /**
     * パターンの高さ
     */
    height: number;
    /**
     * パターンの中心位置
     */
    center?: number;
    /**
     * 組織的ディザ法用の最大値
     */
    maxnumber?: number;
    /**
     * パターンの配列
     */
    pattern: number[][];
};
declare namespace PixfX {
    export { PixDataRGBA };
    export { PixColorRGBA };
    export { PixDataY };
    export { PixColorY };
    import MODE_WRAP = PixData.MODE_WRAP;
    export { MODE_WRAP };
    import MODE_IP = PixData.MODE_IP;
    export { MODE_IP };
    import MODE_BLEND = PixData.MODE_BLEND;
    export { MODE_BLEND };
}
/**
 * RGBAカラー画像データクラス（4チャンネル画像データ）
 * 32bit整数(0xRRGGBBAA)の画素配列で管理。各種チャンネル処理や減色などもサポート
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixDataRGBA extends PixData {
    /**
     * 初期化
     * @constructor
     * @param {ImageData|PixDataRGBA|PixDataY|number} [arg1] 画像データまたは幅
     * @param {number} [arg2] 高さ
     */
    constructor(arg1?: ImageData | PixDataRGBA | PixDataY | number, arg2?: number, ...args: any[]);
    /**
     * この画像データのクローンを作成
     * @returns {PixDataRGBA}
     */
    clone(): PixDataRGBA;
    /**
     * 範囲内座標のRGBA値を取得
     * @param {number} x
     * @param {number} y
     * @returns {PixColorRGBA}
     */
    getPixelInside(x: number, y: number): PixColorRGBA;
    /**
     * 範囲内座標のRGBA値を設定
     * @param {number} x
     * @param {number} y
     * @param {PixColorRGBA} color
     */
    setPixelInside(x: number, y: number, color: PixColorRGBA): void;
    /**
     * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixColorRGBA} color
     */
    setPixel(x: number, y: number, color: PixColorRGBA): void;
    /**
     * 実数座標(x, y)の補間色を返す
     * @param {number} x
     * @param {number} y
     * @returns {PixColorRGBA}
     */
    getColor(x: number, y: number): PixColorRGBA;
    /**
     * UV座標（0～1）でテクスチャとして色取得
     * @param {number} u
     * @param {number} v
     * @returns {PixColorRGBA}
     */
    getColorUV(u: number, v: number): PixColorRGBA;
    /**
     * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixColorRGBA} color
     */
    setColor(x: number, y: number, color: PixColorRGBA): void;
    /**
     * 全画素に対してコールバック関数を適用
     * @param {function(PixColorRGBA, number, number, PixData):void} callback (color, x, y, this)
     */
    forEach(callback: (arg0: PixColorRGBA, arg1: number, arg2: number, arg3: PixData) => void): void;
    /**
     * グレースケール画像データを任意のチャンネルに反映
     * @param {PixDataY} imagedata
     * @param {number} [n=0] 0:R, 1:G, 2:B, 3:A
     */
    putDataY(imagedata: PixDataY, n?: number): void;
    /** @param {PixDataY} imagedata */
    putDataYToR(imagedata: PixDataY): void;
    /** @param {PixDataY} imagedata */
    putDataYToG(imagedata: PixDataY): void;
    /** @param {PixDataY} imagedata */
    putDataYToB(imagedata: PixDataY): void;
    /** @param {PixDataY} imagedata */
    putDataYToA(imagedata: PixDataY): void;
    /**
     * 各種画像データからRGBA配列として格納
     * @param {ImageData|PixDataRGBA|PixDataY} imagedata
     */
    putImageData(imagedata: ImageData | PixDataRGBA | PixDataY): void;
    /**
     * ImageData（Canvas API）として出力
     * @returns {ImageData}
     */
    getImageData(): ImageData;
    /**
     * グレースケール化（自身を書き換え）
     */
    grayscale(): void;
    /**
     * 使用されている色数を取得（透明はカウントしない）
     * @returns {number}
     */
    getColorCount(): number;
    /**
     * メディアンカットによる減色用パレットを取得
     * @param {number} colors 色数
     * @returns {Array<PixColorRGBA>|null}
     */
    getPalletMedianCut(colors: number): Array<PixColorRGBA> | null;
    /**
     * 使用されている色のパレット（最大256色まで）
     * @returns {Array<PixColorRGBA>}
     */
    getPallet(): Array<PixColorRGBA>;
    /**
     * グレースケール階調パレットを取得
     * @param {number} colors 階調数(2~256)
     * @returns {Array<PixColorRGBA>}
     */
    getPalletGrayscale(colors: number): Array<PixColorRGBA>;
    /**
     * パレットを使った単純減色
     * @param {Array<PixColorRGBA>} palettes
     */
    quantizationSimple(palettes: Array<PixColorRGBA>): void;
    /**
     * パレット＋組織的ディザ法による減色
     * @param {Array<PixColorRGBA>} palettes
     * @param {PixDataRGBAQuantization} orderPattern
     * @param {number} normType PixColor.NORM_MOD
     */
    quantizationOrdered(palettes: Array<PixColorRGBA>, orderPattern: PixDataRGBAQuantization, normType: number): void;
    /**
     * パレット＋誤差拡散法による減色
     * @param {Array<PixColorRGBA>} palettes
     * @param {PixDataRGBAQuantization} diffusionPattern
     */
    quantizationDiffusion(palettes: Array<PixColorRGBA>, diffusionPattern: PixDataRGBAQuantization): void;
    /**
     * 色数指定の単純減色
     * @param {number} colorcount
     */
    filterQuantizationSimple(colorcount: number): void;
    /**
     * 組織的ディザ法による減色
     * @param {number} colorcount
     * @param {number} [normType] デフォルトはPixColor.NORM_MODE.EUGRID
     */
    filterQuantizationOrdered(colorcount: number, normType?: number): void;
    /**
     * 誤差拡散法による減色
     * @param {number} colorcount
     * @param {PixDataRGBAQuantization} [diffusionPattern]
     */
    filterQuantizationDiffusion(colorcount: number, diffusionPattern?: PixDataRGBAQuantization): void;
}
declare namespace PixDataRGBA {
    namespace quantization {
        namespace diffusionPattern {
            namespace patternFloydSteinberg {
                let width: number;
                let height: number;
                let center: number;
                let pattern: number[][];
            }
            namespace patternJarvisJudiceNinke {
                let width_1: number;
                export { width_1 as width };
                let height_1: number;
                export { height_1 as height };
                let center_1: number;
                export { center_1 as center };
                let pattern_1: number[][];
                export { pattern_1 as pattern };
            }
        }
        namespace orderPattern {
            namespace patternBayer {
                let width_2: number;
                export { width_2 as width };
                let height_2: number;
                export { height_2 as height };
                export let maxnumber: number;
                let pattern_2: number[][];
                export { pattern_2 as pattern };
            }
        }
    }
}
/**
 * RGBA色（Red, Green, Blue, Alpha）を扱う色クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixColorRGBA extends PixColor {
    /**
     * RGBA色を生成
     * @param {Array<number>} color [R, G, B, A]（0-255, 0-255, 0-255, 0-255）
     */
    constructor(color: Array<number>);
    rgba: number[];
    /** @returns {number} 赤成分 */
    get r(): number;
    /** @returns {number} 緑成分 */
    get g(): number;
    /** @returns {number} 青成分 */
    get b(): number;
    /** @returns {number} アルファ成分 */
    get a(): number;
    /**
     * RGBA配列を返す
     * @returns {Array<number>}
     */
    getColor(): Array<number>;
    /**
     * この色のコピーを返す
     * @returns {PixColorRGBA}
     */
    clone(): PixColorRGBA;
    /**
     * すべての成分が0のRGBA色を返す
     * @returns {PixColorRGBA}
     */
    zero(): PixColorRGBA;
    /**
     * すべての成分が1のRGBA色を返す
     * @returns {PixColorRGBA}
     */
    one(): PixColorRGBA;
    /**
     * 全成分に値を加算
     * @param {number} x
     * @returns {PixColorRGBA}
     */
    add(x: number): PixColorRGBA;
    /**
     * 全成分から値を減算
     * @param {number} x
     * @returns {PixColorRGBA}
     */
    sub(x: number): PixColorRGBA;
    /**
     * 全成分に値を乗算
     * @param {number} x
     * @returns {PixColorRGBA}
     */
    mul(x: number): PixColorRGBA;
    /**
     * 全成分を値で除算
     * @param {number} x
     * @returns {PixColorRGBA}
     */
    div(x: number): PixColorRGBA;
    /**
     * 全成分に exp() を適用
     * @returns {PixColorRGBA}
     */
    exp(): PixColorRGBA;
    /**
     * 全成分に log() を適用
     * @returns {PixColorRGBA}
     */
    log(): PixColorRGBA;
    /**
     * 全成分を base のべき乗にする
     * @param {number} base
     * @returns {PixColorRGBA}
     */
    pow(base: number): PixColorRGBA;
    /**
     * 任意の底の対数
     * @param {number} base
     * @returns {PixColorRGBA}
     */
    baselog(base: number): PixColorRGBA;
    /**
     * テーブル参照で変換
     * @param {Array<number>} table
     * @returns {PixColorRGBA}
     */
    table(table: Array<number>): PixColorRGBA;
    /**
     * ランダムなRGBA色を返す
     * @returns {PixColorRGBA}
     */
    random(): PixColorRGBA;
    /**
     * 色同士の加算
     * @param {PixColorRGBA} c
     * @returns {PixColorRGBA}
     */
    addColor(c: PixColorRGBA): PixColorRGBA;
    /**
     * 色同士の減算
     * @param {PixColorRGBA} c
     * @returns {PixColorRGBA}
     */
    subColor(c: PixColorRGBA): PixColorRGBA;
    /**
     * 色同士の乗算
     * @param {PixColorRGBA} c
     * @returns {PixColorRGBA}
     */
    mulColor(c: PixColorRGBA): PixColorRGBA;
    /**
     * 色同士の除算
     * @param {PixColorRGBA} c
     * @returns {PixColorRGBA}
     */
    divColor(c: PixColorRGBA): PixColorRGBA;
    /**
     * 各成分ごとに最大値を返す
     * @param {PixColorRGBA} c
     * @returns {PixColorRGBA}
     */
    maxColor(c: PixColorRGBA): PixColorRGBA;
    /**
     * 各成分ごとに最小値を返す
     * @param {PixColorRGBA} c
     * @returns {PixColorRGBA}
     */
    minColor(c: PixColorRGBA): PixColorRGBA;
    /**
     * 指定アルファ値（0～1）で新しい色を返す
     * @param {number} x
     * @returns {PixColorRGBA}
     */
    setBlendAlpha(x: number): PixColorRGBA;
    /**
     * 指定色のアルファ値をコピーして返す
     * @param {PixColorRGBA} color
     * @returns {PixColorRGBA}
     */
    exchangeColorAlpha(color: PixColorRGBA): PixColorRGBA;
    /**
     * RGB値を24bit整数で返す（0xRRGGBB形式）
     * @returns {number}
     */
    getRRGGBB(): number;
    /**
     * 赤成分を返す
     * @returns {number}
     */
    getRed(): number;
    /**
     * 緑成分を返す
     * @returns {number}
     */
    getGreen(): number;
    /**
     * 青成分を返す
     * @returns {number}
     */
    getBlue(): number;
    /**
     * 色が一致するか
     * @param {PixColorRGBA} c
     * @returns {boolean}
     */
    equals(c: PixColorRGBA): boolean;
    /**
     * 4x4行列を色に乗算して新しい色を返す
     * @param {Array<Array<number>>} m 4x4行列
     * @returns {PixColorRGBA}
     */
    mulMatrix(m: Array<Array<number>>): PixColorRGBA;
}
/**
 * グレースケール画像データクラス（輝度Yのみで管理）
 * 1チャンネル（Y）の画像データ処理を提供
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixDataY extends PixData {
    /**
     * 初期化
     * @constructor
     * @param {ImageData|PixDataRGBA|PixDataY|number} [arg1] 元画像または幅
     * @param {number} [arg2] 高さ
     */
    constructor(arg1?: ImageData | PixDataRGBA | PixDataY | number, arg2?: number, ...args: any[]);
    /**
     * この画像データのクローンを作成
     * @returns {PixDataY}
     */
    clone(): PixDataY;
    /**
     * 範囲内座標のY値を取得
     * @param {number} x
     * @param {number} y
     * @returns {PixColorY}
     */
    getPixelInside(x: number, y: number): PixColorY;
    /**
     * 範囲内座標のY値を設定
     * @param {number} x
     * @param {number} y
     * @param {PixColorY} color
     */
    setPixelInside(x: number, y: number, color: PixColorY): void;
    /**
     * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixColorY} color
     */
    setPixel(x: number, y: number, color: PixColorY): void;
    /**
     * 実数座標(x, y)の補間色を返す
     * @param {number} x
     * @param {number} y
     * @returns {PixColorY}
     */
    getColor(x: number, y: number): PixColorY;
    /**
     * UV座標（0～1）でテクスチャとして色取得
     * @param {number} u
     * @param {number} v
     * @returns {PixColorY}
     */
    getColorUV(u: number, v: number): PixColorY;
    /**
     * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixColorY} color
     */
    setColor(x: number, y: number, color: PixColorY): void;
    /**
     * 全画素に対してコールバック関数を適用
     * @param {function(PixColorY, number, number, PixData):void} callback (color, x, y, this)
     */
    forEach(callback: (arg0: PixColorY, arg1: number, arg2: number, arg3: PixData) => void): void;
    /**
     * 各種画像データから本クラスへ変換して格納
     * @param {ImageData|PixDataRGBA|PixDataY} imagedata
     * @param {number} [n=0] RGBAのどのチャンネルか（0:R, 1:G, 2:B, 3:A）
     */
    putImageData(imagedata: ImageData | PixDataRGBA | PixDataY, n?: number): void;
    /**
     * RGBA画像からR成分のみ取り込む
     * @param {ImageData|PixDataRGBA} imagedata
     */
    putImageDataR(imagedata: ImageData | PixDataRGBA): void;
    /**
     * RGBA画像からG成分のみ取り込む
     * @param {ImageData|PixDataRGBA} imagedata
     */
    putImageDataG(imagedata: ImageData | PixDataRGBA): void;
    /**
     * RGBA画像からB成分のみ取り込む
     * @param {ImageData|PixDataRGBA} imagedata
     */
    putImageDataB(imagedata: ImageData | PixDataRGBA): void;
    /**
     * RGBA画像からA成分のみ取り込む
     * @param {ImageData|PixDataRGBA} imagedata
     */
    putImageDataA(imagedata: ImageData | PixDataRGBA): void;
    /**
     * ImageData（RGBA, Canvas API）形式で出力
     * @returns {ImageData}
     */
    getImageData(): ImageData;
    /**
     * このグレースケール画像からノーマルマップを生成
     * @returns {PixDataRGBA}
     * @throws {Error} ラッピングモードがINSIDEの場合は例外
     */
    getNormalMap(): PixDataRGBA;
    /**
     * ノーマルマップを環境マッピングする（未実装）
     * @param {PixDataRGBA} texture
     * @returns {PixDataRGBA}
     */
    filterEnvironmentMapping(texture: PixDataRGBA): PixDataRGBA;
}
/**
 * 輝度（Y成分・グレースケール）のみを扱う色クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixColorY extends PixColor {
    /**
     * 輝度値（Y成分）で初期化
     * @param {number} color 輝度（0.0～255.0）
     */
    constructor(color: number);
    y: number;
    /**
     * 輝度値を返す
     * @returns {number}
     */
    getColor(): number;
    /**
     * この色のコピーを返す
     * @returns {PixColorY}
     */
    clone(): PixColorY;
    /**
     * 輝度値0.0の色を返す
     * @returns {PixColorY}
     */
    zero(): PixColorY;
    /**
     * 輝度値1.0の色を返す
     * @returns {PixColorY}
     */
    one(): PixColorY;
    /**
     * 輝度値に加算
     * @param {number} x
     * @returns {PixColorY}
     */
    add(x: number): PixColorY;
    /**
     * 輝度値から減算
     * @param {number} x
     * @returns {PixColorY}
     */
    sub(x: number): PixColorY;
    /**
     * 輝度値に乗算
     * @param {number} x
     * @returns {PixColorY}
     */
    mul(x: number): PixColorY;
    /**
     * 輝度値を除算
     * @param {number} x
     * @returns {PixColorY}
     */
    div(x: number): PixColorY;
    /**
     * 輝度値にexp()を適用
     * @returns {PixColorY}
     */
    exp(): PixColorY;
    /**
     * 輝度値にlog()を適用
     * @returns {PixColorY}
     */
    log(): PixColorY;
    /**
     * 輝度値をbaseのべき乗にする
     * @param {number} base
     * @returns {PixColorY}
     */
    pow(base: number): PixColorY;
    /**
     * 任意の底の対数
     * @param {number} base
     * @returns {PixColorY}
     */
    baselog(base: number): PixColorY;
    /**
     * テーブル参照による変換
     * @param {Array<number>} table
     * @returns {PixColorY}
     */
    table(table: Array<number>): PixColorY;
    /**
     * ランダムな輝度値（0～255）
     * @returns {PixColorY}
     */
    random(): PixColorY;
    /**
     * 他の輝度色と加算
     * @param {PixColorY} c
     * @returns {PixColorY}
     */
    addColor(c: PixColorY): PixColorY;
    /**
     * 他の輝度色と減算
     * @param {PixColorY} c
     * @returns {PixColorY}
     */
    subColor(c: PixColorY): PixColorY;
    /**
     * 他の輝度色と乗算
     * @param {PixColorY} c
     * @returns {PixColorY}
     */
    mulColor(c: PixColorY): PixColorY;
    /**
     * 他の輝度色と除算
     * @param {PixColorY} c
     * @returns {PixColorY}
     */
    divColor(c: PixColorY): PixColorY;
    /**
     * 各成分ごとに最大値を返す
     * @param {PixColorY} c
     * @returns {PixColorY}
     */
    maxColor(c: PixColorY): PixColorY;
    /**
     * 各成分ごとに最小値を返す
     * @param {PixColorY} c
     * @returns {PixColorY}
     */
    minColor(c: PixColorY): PixColorY;
    /**
     * 輝度値のノルム（絶対値）を返す
     * @returns {number}
     */
    norm(): number;
    /**
     * 輝度値のノルム（絶対値, 高速版）
     * @returns {number}
     */
    normFast(): number;
    /**
     * アルファ値を変更した色を返す（輝度のみのためそのまま返す）
     * @returns {PixColorY}
     */
    setBlendAlpha(): PixColorY;
    /**
     * 指定色のアルファを適用（輝度のみのためそのまま返す）
     * @returns {PixColorY}
     */
    exchangeColorAlpha(): PixColorY;
    /**
     * 他のPixColorYと一致するか判定
     * @param {PixColorY} c
     * @returns {boolean}
     */
    equals(c: PixColorY): boolean;
}
/**
 * 画像データ基底クラス（ラスタ画像データ抽象基盤）
 * RGBAやY（グレースケール）画像データを扱う基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixData {
    /**
     * 画像データクラス
     * @constructor
     * @param {ImageData|PixData|number} [arg1] 画像データまたは幅
     * @param {number} [arg2] 高さ
     */
    constructor(arg1?: ImageData | PixData | number, arg2?: number, ...args: any[]);
    /**
     * 画像幅
     * @type {number}
     */
    width: number;
    /**
     * 画像高さ
     * @type {number}
     */
    height: number;
    /**
     * 書き込み時グローバルアルファ（0.0～1.0）
     * @type {number}
     */
    globalAlpha: number;
    /**
     * 画素データ
     * @type {Uint8ClampedArray|Float32Array}
     */
    data: Uint8ClampedArray | Float32Array;
    /**
     * ブレンドモード
     * @type {PixBlend}
     */
    blend: PixBlend;
    /**
     * 範囲外アクセスの処理ラッパー
     * @type {PixWrap}
     */
    wrap: PixWrap;
    /**
     * 補間方式
     * @type {PixInterpolation}
     */
    ip: PixInterpolation;
    /**
     * 画像データをセット
     * @param {ImageData|PixData} imagedata
     */
    putImageData(imagedata: ImageData | PixData): void;
    /**
     * 画像サイズを変更（内容は再初期化。既存と同サイズなら何もしない）
     * @param {number} width
     * @param {number} height
     */
    setSize(width: number, height: number): void;
    /**
     * 内部データを指定インスタンスxにコピー
     * @param {PixData} x
     * @protected
     */
    protected _copyData(x: PixData): void;
    /**
     * この画像データのクローンを生成
     * @returns {PixData}
     */
    clone(): PixData;
    /**
     * 範囲外アクセス時のラッピング方式を設定
     * @param {string} wrapmode PixData.MODE_WRAP
     */
    setWrapMode(wrapmode: string): void;
    /**
     * 範囲外アクセス時のラッピング方式を取得
     * @returns {string} PixData.MODE_WRAP
     */
    getWrapMode(): string;
    /**
     * 補間モードを設定
     * @param {string} ipmode PixData.MODE_IP
     */
    setInterpolationMode(ipmode: string): void;
    /**
     * 補間モードを取得
     * @returns {string} PixData.MODE_IP
     */
    getInterpolationMode(): string;
    /**
     * 書き込み時のブレンドモードを設定
     * @param {string} blendmode PixData.MODE_BLEND
     */
    setBlendType(blendmode: string): void;
    /**
     * 書き込み時のブレンドモードを取得
     * @returns {string} PixData.MODE_BLEND
     */
    getBlendType(): string;
    /**
     * 全データをクリア（0で初期化）
     */
    clear(): void;
    /**
     * 範囲内座標(x, y)の画素値を返す
     * x, y が整数かつ画像の範囲内を保証している場合に使用可能
     * @abstract
     * @param {number} x
     * @param {number} y
     * @returns {PixColor}
     */
    getPixelInside(x: number, y: number): PixColor;
    /**
     * 範囲内座標(x, y)に画素値をセット
     * x, y が整数かつ画像の範囲内を保証している場合に使用可能
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {PixColor} color
     */
    setPixelInside(x: number, y: number, color: PixColor): void;
    /**
     * 任意座標(x, y)の画素値を返す（範囲外もラッピングモードに応じて取得）
     * @abstract
     * @param {number} x
     * @param {number} y
     * @returns {PixColor}
     */
    getPixel(x: number, y: number): PixColor;
    /**
     * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {PixColor} color
     */
    setPixel(x: number, y: number, color: PixColor): void;
    /**
     * 実数座標(x, y)の補間色を返す
     * @abstract
     * @param {number} x
     * @param {number} y
     * @returns {PixColor}
     */
    getColor(x: number, y: number): PixColor;
    /**
     * UV座標（0～1）でテクスチャとして色取得
     * @abstract
     * @param {number} u
     * @param {number} v
     * @returns {PixColor}
     */
    getColorUV(u: number, v: number): PixColor;
    /**
     * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {PixColor} color
     */
    setColor(x: number, y: number, color: PixColor): void;
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
    drawPixData(image: PixData, sx: number, sy: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number, ...args: any[]): void;
    /**
     * 全画素に対してコールバック関数を適用
     * @abstract
     * @param {function(PixColor, number, number, PixData):void} callback (color, x, y, this)
     */
    forEach(callback: (arg0: PixColor, arg1: number, arg2: number, arg3: PixData) => void): void;
    /**
     * 畳み込みフィルタ（PixFIRMatrix）を適用
     * @param {PixFIRMatrix} matrix
     */
    convolution(matrix: PixFIRMatrix): void;
    /**
     * バイラテラルフィルタ的な畳み込み
     * 対象の色に近いほど、フィルタをかける処理となる
     * @param {PixFIRMatrix} matrix
     * @param {number} [p=0.8] 強度 0.0～1.0
     */
    convolutionBilateral(matrix: PixFIRMatrix, p?: number): void;
    /**
     * 指数空間での畳み込み
     * @param {PixFIRMatrix} matrix
     * @param {number} [e=1.2] 底(1.01-1.2)
     */
    convolutionExp(matrix: PixFIRMatrix, e?: number): void;
    /**
     * アンシャープ畳み込み
     * @param {PixFIRMatrix} matrix
     * @param {number} rate
     */
    convolutionUnSharp(matrix: PixFIRMatrix, rate: number): void;
    /**
     * シャープフィルタを適用
     * @param {number} power 強度
     */
    filterSharp(power: number): void;
    /**
     * ブラーフィルタ（ぼかし）を適用
     * @param {number} n カーネルサイズ
     */
    filterBlur(n: number): void;
    /**
     * ガウシアンフィルタを適用
     * @param {number} n カーネルサイズ
     */
    filterGaussian(n: number): void;
    /**
     * アンシャープマスク
     * @param {number} n カーネルサイズ
     * @param {number} rate
     */
    filterUnSharp(n: number, rate: number): void;
    /**
     * バイラテラルフィルタ
     * @param {number} n カーネルサイズ
     * @param {number} p 強度（0.0～1.0）
     */
    filterBilateral(n: number, p: number): void;
    /**
     * ソフトレンズフィルタ
     * @param {number} n カーネルサイズ
     * @param {number} e 底(1.01-1.2)
     */
    filterSoftLens(n: number, e: number): void;
}
declare namespace PixData {
    namespace MODE_WRAP {
        let INSIDE: string;
        let CLAMP: string;
        let REPEAT: string;
    }
    /**
     * 範囲外アクセスラップ方式の定数
     */
    type MODE_WRAP = string;
    namespace MODE_IP {
        let NEAREST_NEIGHBOR: string;
        let BILINEAR: string;
        let COSINE: string;
        let HERMITE4_3: string;
        let HERMITE4_5: string;
        let HERMITE16: string;
        let BICUBIC: string;
        let BICUBIC_SOFT: string;
        let BICUBIC_NORMAL: string;
        let BICUBIC_SHARP: string;
    }
    /**
     * 補間モードの定数
     */
    type MODE_IP = string;
    namespace MODE_BLEND {
        let NONE: string;
        let ALPHA: string;
        let ADD: string;
        let SUB: string;
        let REVSUB: string;
        let MUL: string;
    }
    /**
     * ブレンドモードの定数
     */
    type MODE_BLEND = string;
}
/**
 * 画像処理用の色を表す基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixColor {
    /**
     * 色データを返す
     * @returns {*} 色データ
     */
    getColor(): any;
    /**
     * この色のコピーを返す
     * @returns {PixColor}
     */
    clone(): PixColor;
    /**
     * すべての成分が0の色を返す
     * @returns {PixColor}
     */
    zero(): PixColor;
    /**
     * すべての成分が1の色を返す
     * @returns {PixColor}
     */
    one(): PixColor;
    /**
     * 全成分に値を加算
     * @param {*} x
     * @returns {PixColor}
     */
    add(x: any): PixColor;
    /**
     * 全成分から値を減算
     * @param {*} x
     * @returns {PixColor}
     */
    sub(x: any): PixColor;
    /**
     * 全成分に値を乗算
     * @param {*} x
     * @returns {PixColor}
     */
    mul(x: any): PixColor;
    /**
     * 全成分を値で除算
     * @param {*} x
     * @returns {PixColor}
     */
    div(x: any): PixColor;
    /**
     * 全成分の指数関数exp
     * @returns {PixColor}
     */
    exp(): PixColor;
    /**
     * 全成分の対数関数log
     * @returns {PixColor}
     */
    log(): PixColor;
    /**
     * 全成分のべき乗
     * @param {*} base
     * @returns {PixColor}
     */
    pow(base: any): PixColor;
    /**
     * 任意の底の対数
     * @param {number} base
     * @returns {PixColor}
     */
    baselog(base: number): PixColor;
    /**
     * 値をテーブル参照で変換
     * @param {Array<number>} table
     * @returns {PixColor}
     */
    table(table: Array<number>): PixColor;
    /**
     * 全成分をランダムな値に設定
     * @returns {PixColor}
     */
    random(): PixColor;
    /**
     * 輝度値（明るさ）を計算して返す
     * @returns {number}
     */
    luminance(): number;
    /**
     * 色同士の加算
     * @param {PixColor} c
     * @returns {PixColor}
     */
    addColor(c: PixColor): PixColor;
    /**
     * 色同士の減算
     * @param {PixColor} c
     * @returns {PixColor}
     */
    subColor(c: PixColor): PixColor;
    /**
     * 色同士の乗算
     * @param {PixColor} c
     * @returns {PixColor}
     */
    mulColor(c: PixColor): PixColor;
    /**
     * 色同士の除算
     * @param {PixColor} c
     * @returns {PixColor}
     */
    divColor(c: PixColor): PixColor;
    /**
     * 各成分ごとに最大値を返す
     * @param {PixColor} c
     * @returns {PixColor}
     */
    maxColor(c: PixColor): PixColor;
    /**
     * 各成分ごとに最小値を返す
     * @param {PixColor} c
     * @returns {PixColor}
     */
    minColor(c: PixColor): PixColor;
    /**
     * 色のノルム（色差の距離）を返す
     * @param {number} normType PixColor.NORM_MODE
     * @returns {number}
     */
    norm(normType: number): number;
    /**
     * 色のノルムの高速計算
     * @param {number} normType PixColor.NORM_MODE
     * @returns {number}
     */
    normFast(normType: number): number;
    /**
     * 指定色との差分ノルム
     * @param {PixColor} c
     * @param {number} normType PixColor.NORM_MODE
     * @returns {number}
     */
    normColor(c: PixColor, normType: number): number;
    /**
     * 指定色との差分ノルム（高速版）
     * @param {PixColor} c
     * @param {number} normType PixColor.NORM_MODE
     * @returns {number}
     */
    normColorFast(c: PixColor, normType: number): number;
    /**
     * アルファ値を取得
     * @returns {number}
     */
    getBlendAlpha(): number;
    /**
     * アルファ値を設定した新しい色を返す
     * @param {number} alpha
     * @returns {PixColor}
     */
    setBlendAlpha(alpha: number): PixColor;
    /**
     * 指定色のアルファを移植した色を返す
     * @param {PixColor} color
     * @returns {PixColor}
     */
    exchangeColorAlpha(color: PixColor): PixColor;
    /**
     * 色が一致するか
     * @param {PixColor} c
     * @returns {boolean}
     */
    equals(c: PixColor): boolean;
    /**
     * パレットから最も近い2色を探す
     * @param {Array<PixColor>} palettes
     * @param {number} normType 距離計算方法（PixColor.NORM_MODE）
     * @returns {{c1:{color:PixColor,norm:number}, c2:{color:PixColor,norm:number}}}
     */
    searchColor(palettes: Array<PixColor>, normType: number): {
        c1: {
            color: PixColor;
            norm: number;
        };
        c2: {
            color: PixColor;
            norm: number;
        };
    };
}
declare namespace PixColor {
    namespace NORM_MODE {
        let MANHATTEN: number;
        let EUGRID: number;
    }
    /**
     * 色空間での距離計算モード（ノルムの種類）
     */
    type NORM_MODE = number;
}
/**
 * 画像処理用ブレンドモードを提供するクラス
 */
declare class PixBlend {
    /**
     * ブレンドモードを指定してインスタンスを生成
     * @param {string} mode ブレンドモード（PixBlend.MODE のいずれか）
     */
    constructor(mode: string, ...args: any[]);
    blendfunc: (x: PixColor, y: PixColor, alpha: number) => PixColor;
    /**
     * 現在のブレンドモードを複製したインスタンスを返す
     * @returns {PixBlend}
     */
    clone(): PixBlend;
    /**
     * ブレンドモードを設定する
     * @param {string} mode ブレンドモード（PixBlend.MODE のいずれか）
     */
    setBlendMode(mode: string): void;
    blendmode: string;
    /**
     * 2つの色を指定したブレンドモードで合成する
     * @param {PixColor} color1 元の色
     * @param {PixColor} color2 書き込む色
     * @param {number} alpha グローバルアルファ（0～1）
     * @returns {PixColor} 合成結果の色
     */
    blend(color1: PixColor, color2: PixColor, alpha: number): PixColor;
}
declare namespace PixBlend {
    namespace MODE { }
    /**
     * ブレンドモード定数
     */
    type MODE = string;
}
/**
 * 画像座標ラッピングの切り替え管理クラス
 * 指定モードごとに、範囲外座標の振る舞い（inside, clamp, repeat）を動的に切り替える基底クラス
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixWrap {
    /**
     * ラッピングモード・画像サイズを指定して初期化
     * @param {string} [mode=PixWrap.MODE.INSIDE] ラッピングモード
     * @param {number} [width=1] 画像幅
     * @param {number} [height=1] 画像高さ
     */
    constructor(mode?: string, width?: number, height?: number, ...args: any[]);
    width: number;
    height: number;
    /**
     * このラッピングの複製を作成
     * @returns {PixWrap}
     */
    clone(): PixWrap;
    /**
     * ラッピングモードを設定（INSIDE, CLAMP, REPEAT）
     * @param {string} mode PixWrap.MODEのいずれか
     */
    setPixWrapMode(mode: string): void;
    wrapmode: string;
    wrap: PixWrapInside | PixWrapClamp | PixWrapRepeat;
    /**
     * 画像サイズを設定
     * @param {number} width
     * @param {number} height
     */
    setSize(width: number, height: number): void;
    /**
     * 指定座標のラップ後の[x, y]配列を返す
     * モードに応じて範囲外判定・クランプ・リピートなどで返る値が変わる
     * @param {number} x
     * @param {number} y
     * @returns {number[]|null} INSIDE: 範囲内なら[x,y]／範囲外はnull、CLAMP/REPEAT: 常に[x, y]
     */
    getPixelPosition(x: number, y: number): number[] | null;
}
declare namespace PixWrap {
    namespace MODE { }
    /**
     * *
     */
    type MODE = string;
}
/**
 * 画像の補間方式を管理・利用するクラス
 */
declare class PixInterpolation {
    /**
     * 補間モードを指定して初期化
     * @param {string} [mode=PixInterpolation.MODE.NEAREST_NEIGHBOR] 補間モード
     */
    constructor(mode?: string, ...args: any[]);
    /**
     * 補間モード（PixInterpolation.MODE のいずれか）
     * @type {string}
     */
    ipmode: string;
    /**
     * 補間関数が必要とする近傍ピクセル数
     * @type {number}
     */
    ipn: number;
    /**
     * 補間関数
     * @type {function(...*): PixColor}
     */
    ipfunc: (...args: any[]) => PixColor;
    /**
     * この補間設定のクローンを作成
     * @returns {PixInterpolation}
     */
    clone(): PixInterpolation;
    /**
     * 補間モードを設定
     * @param {string} ipmode 補間モード（PixInterpolation.MODE のいずれか）
     */
    setInterpolationMode(ipmode: string): void;
    /**
     * 指定座標の色を補間で取得
     * 範囲外や実数座標でも安全に色取得可能
     * @param {PixData} imgdata 元画像データ
     * @param {number} x X座標（整数・実数可）
     * @param {number} y Y座標（整数・実数可）
     * @returns {PixColor} 補間結果の色
     */
    getColor(imgdata: PixData, x: number, y: number): PixColor;
}
declare namespace PixInterpolation {
    namespace MODE { }
    /**
     * *
     */
    type MODE = string;
}
/**
 * 画像処理用のFIR（畳み込み）フィルタ行列クラス
 * ブラーやシャープ、ガウシアンなど各種フィルタの行列生成・操作に使用
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixFIRMatrix {
    /**
     * Laplacianフィルタ行列を生成
     * @static
     * @returns {PixFIRMatrix}
     */
    static makeLaplacianFilter(): PixFIRMatrix;
    /**
     * シャープフィルタ行列を生成
     * @static
     * @param {number} power シャープ強度
     * @returns {PixFIRMatrix}
     */
    static makeSharpenFilter(power: number): PixFIRMatrix;
    /**
     * ボックス（平均化）ブラー行列を生成
     * @static
     * @param {number} width 行列幅
     * @param {number} height 行列高さ
     * @returns {PixFIRMatrix}
     */
    static makeBlur(width: number, height: number): PixFIRMatrix;
    /**
     * ガウシアンフィルタ行列を生成
     * @static
     * @param {number} width 行列幅
     * @param {number} height 行列高さ
     * @param {number} [sd=1.0] 標準偏差
     * @returns {PixFIRMatrix}
     */
    static makeGaussianFilter(width: number, height: number, sd?: number): PixFIRMatrix;
    /**
     * 円形の畳み込み行列を生成
     * @static
     * @param {number} r 直径（行列の一辺）
     * @returns {PixFIRMatrix}
     */
    static makeCircle(r: number): PixFIRMatrix;
    /**
     * 2次元配列で初期化
     * @param {Array<Array<number>>} matrix フィルタ行列（[y][x]の2次元配列）
     */
    constructor(matrix: Array<Array<number>>);
    height: number;
    width: number;
    matrix: number[][];
    /**
     * このフィルタ行列の複製を作成
     * @returns {PixFIRMatrix}
     */
    clone(): PixFIRMatrix;
    /**
     * フィルタ行列の周囲（エッジ）を時計回りに回転
     * @param {number} val 回転量（正の整数で右回り）
     * @returns {PixFIRMatrix} 回転後の新しい行列
     */
    rotateEdge(val: number): PixFIRMatrix;
    /**
     * 全要素を指定値で乗算
     * @param {number} val 乗算値
     * @returns {PixFIRMatrix}
     */
    mul(val: number): PixFIRMatrix;
    /**
     * 全要素の合計値を返す
     * @returns {number}
     */
    sum(): number;
    /**
     * 合計値で正規化（全体の合計が1になるようスケーリング）
     * @returns {PixFIRMatrix}
     */
    normalize(): PixFIRMatrix;
    /**
     * フィルタの中心に指定値を加算
     * @param {number} val
     * @returns {PixFIRMatrix}
     */
    addCenter(val: number): PixFIRMatrix;
}
/**
 * 画像座標のラッピング（境界判定）用のクラス（範囲内のみ許可）
 * 画像の端から外にはみ出した場合に「範囲内ならそのまま／範囲外ならnull」を返す
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixWrapInside {
    /**
     * サイズを指定して初期化
     * @param {number} [width=0] 画像幅
     * @param {number} [height=0] 画像高さ
     */
    constructor(width?: number, height?: number, ...args: any[]);
    /**
     * このラッピングの複製を作成
     * @returns {PixWrapInside}
     */
    clone(): PixWrapInside;
    /**
     * ラップ範囲（画像サイズ）を設定
     * @param {number} width
     * @param {number} height
     */
    setSize(width: number, height: number): void;
    width: number;
    height: number;
    /**
     * 指定座標が範囲内か判定し、[x, y]座標配列またはnullを返す
     * @param {number} x
     * @param {number} y
     * @returns {number[]|null} 範囲内：[x, y]／範囲外：null
     */
    getPixelPosition(x: number, y: number): number[] | null;
}
/**
 * 画像座標のラッピング（はみ出し時は端にクランプする方式）
 * 画像の外側を参照した場合、座標を強制的に最も近い端にクランプして返す
 *
 * @module PixWrapClamp
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixWrapClamp extends PixWrapInside {
    /**
     * サイズを指定して初期化
     * @param {number} width 画像幅
     * @param {number} height 画像高さ
     */
    constructor(width: number, height: number);
}
/**
 * 画像座標のラッピング（範囲外は繰り返しリピートする方式）
 * 範囲外座標は画像サイズでラップ（繰り返し）されます。
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixWrapRepeat extends PixWrapInside {
    /**
     * 画像サイズを指定して初期化
     * @param {number} width 画像幅
     * @param {number} height 画像高さ
     */
    constructor(width: number, height: number);
}
