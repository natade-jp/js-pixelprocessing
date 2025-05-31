export { PixelProcessing as default };
/**
 * パターン定義
 */
export type PixelDataRGBAQuantization = {
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
declare namespace PixelProcessing {
    export { PixelDataRGBA as DataRGBA };
    export { PixelColorRGBA as ColorRGBA };
    export { PixelDataY as DataY };
    export { PixelColorY as ColorY };
    export { PixelFIRMatrix as FIRMatrix };
    import MODE_WRAP = PixelData.MODE_WRAP;
    export { MODE_WRAP };
    import MODE_IP = PixelData.MODE_IP;
    export { MODE_IP };
    import MODE_BLEND = PixelData.MODE_BLEND;
    export { MODE_BLEND };
}
/**
 * RGBAカラー画像データクラス（4チャンネル画像データ）
 * 32bit整数(0xRRGGBBAA)または配列で画素情報を管理し、各種チャンネル処理や減色、画像変換をサポートします。
 *
 * @class
 * @extends PixelData
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * const img = new PixelDataRGBA(320, 240);
 * img.setPixel(0, 0, new PixelColorRGBA([255, 0, 0, 255]));
 */
declare class PixelDataRGBA extends PixelData {
    /**
     * 初期化
     * @constructor
     * @param {ImageData|PixelDataRGBA|PixelDataY|number} [arg1] 画像データまたは幅
     * @param {number} [arg2] 高さ
     */
    constructor(arg1?: ImageData | PixelDataRGBA | PixelDataY | number, arg2?: number, ...args: any[]);
    /**
     * この画像データのクローンを作成
     * @returns {PixelDataRGBA}
     */
    clone(): PixelDataRGBA;
    /**
     * 範囲内座標のRGBA値を取得
     * @param {number} x
     * @param {number} y
     * @returns {PixelColorRGBA}
     */
    getPixelInside(x: number, y: number): PixelColorRGBA;
    /**
     * 範囲内座標のRGBA値を設定
     * @param {number} x
     * @param {number} y
     * @param {PixelColorRGBA} color
     */
    setPixelInside(x: number, y: number, color: PixelColorRGBA): void;
    /**
     * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixelColorRGBA} color
     */
    setPixel(x: number, y: number, color: PixelColorRGBA): void;
    /**
     * 実数座標(x, y)の補間色を返す
     * @param {number} x
     * @param {number} y
     * @returns {PixelColorRGBA}
     */
    getColor(x: number, y: number): PixelColorRGBA;
    /**
     * UV座標（0～1）でテクスチャとして色取得
     * @param {number} u
     * @param {number} v
     * @returns {PixelColorRGBA}
     */
    getColorUV(u: number, v: number): PixelColorRGBA;
    /**
     * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixelColorRGBA} color
     */
    setColor(x: number, y: number, color: PixelColorRGBA): void;
    /**
     * 全画素に対してコールバック関数を適用
     * @param {function(PixelColorRGBA, number, number, PixelData):void} callback (color, x, y, this)
     */
    forEach(callback: (arg0: PixelColorRGBA, arg1: number, arg2: number, arg3: PixelData) => void): void;
    /**
     * グレースケール画像データを任意のチャンネルに反映
     * @param {PixelDataY} imagedata
     * @param {number} [n=0] 0:R, 1:G, 2:B, 3:A
     */
    putDataY(imagedata: PixelDataY, n?: number): void;
    /** @param {PixelDataY} imagedata */
    putDataYToR(imagedata: PixelDataY): void;
    /** @param {PixelDataY} imagedata */
    putDataYToG(imagedata: PixelDataY): void;
    /** @param {PixelDataY} imagedata */
    putDataYToB(imagedata: PixelDataY): void;
    /** @param {PixelDataY} imagedata */
    putDataYToA(imagedata: PixelDataY): void;
    /**
     * 各種画像データからRGBA配列として格納
     * @param {ImageData|PixelDataRGBA|PixelDataY} imagedata
     */
    putImageData(imagedata: ImageData | PixelDataRGBA | PixelDataY): void;
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
     * @returns {Array<PixelColorRGBA>|null}
     */
    getPalletMedianCut(colors: number): Array<PixelColorRGBA> | null;
    /**
     * 使用されている色のパレット（最大256色まで）
     * @returns {Array<PixelColorRGBA>}
     */
    getPallet(): Array<PixelColorRGBA>;
    /**
     * グレースケール階調パレットを取得
     * @param {number} colors 階調数(2~256)
     * @returns {Array<PixelColorRGBA>}
     */
    getPalletGrayscale(colors: number): Array<PixelColorRGBA>;
    /**
     * パレットを使った単純減色
     * @param {Array<PixelColorRGBA>} palettes
     */
    quantizationSimple(palettes: Array<PixelColorRGBA>): void;
    /**
     * パレット＋組織的ディザ法による減色
     * @param {Array<PixelColorRGBA>} palettes
     * @param {PixelDataRGBAQuantization} orderPattern
     * @param {number} normType PixelColor.NORM_MOD
     */
    quantizationOrdered(palettes: Array<PixelColorRGBA>, orderPattern: PixelDataRGBAQuantization, normType: number): void;
    /**
     * パレット＋誤差拡散法による減色
     * @param {Array<PixelColorRGBA>} palettes
     * @param {PixelDataRGBAQuantization} diffusionPattern
     */
    quantizationDiffusion(palettes: Array<PixelColorRGBA>, diffusionPattern: PixelDataRGBAQuantization): void;
    /**
     * 色数指定の単純減色
     * @param {number} colorcount
     */
    filterQuantizationSimple(colorcount: number): void;
    /**
     * 組織的ディザ法による減色
     * @param {number} colorcount
     * @param {number} [normType] デフォルトはPixelColor.NORM_MODE.EUGRID
     */
    filterQuantizationOrdered(colorcount: number, normType?: number): void;
    /**
     * 誤差拡散法による減色
     * @param {number} colorcount
     * @param {PixelDataRGBAQuantization} [diffusionPattern]
     */
    filterQuantizationDiffusion(colorcount: number, diffusionPattern?: PixelDataRGBAQuantization): void;
}
declare namespace PixelDataRGBA {
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
 * 各成分を0～255の配列として保持し、色演算やアルファ合成などの画像処理をサポートします。
 *
 * @class
 * @extends PixelColor
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * const color = new PixelColorRGBA([255, 128, 64, 200]);
 * const brighter = color.add(10); // 全成分に+10
 */
declare class PixelColorRGBA extends PixelColor {
    /**
     * RGBA色を生成
     * @param {Array<number>} color [R, G, B, A]（0-255, 0-255, 0-255, 0-255）
     */
    constructor(color: Array<number>);
    /**
     * RGBA各成分を格納する配列
     * 形式: [R, G, B, A]（各0～255, floatも許容）
     * @type {number[]}
     * @private
     */
    private rgba;
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
     * @returns {PixelColorRGBA}
     */
    clone(): PixelColorRGBA;
    /**
     * すべての成分が0のRGBA色を返す
     * @returns {PixelColorRGBA}
     */
    zero(): PixelColorRGBA;
    /**
     * すべての成分が1のRGBA色を返す
     * @returns {PixelColorRGBA}
     */
    one(): PixelColorRGBA;
    /**
     * 全成分に値を加算
     * @param {number} x
     * @returns {PixelColorRGBA}
     */
    add(x: number): PixelColorRGBA;
    /**
     * 全成分から値を減算
     * @param {number} x
     * @returns {PixelColorRGBA}
     */
    sub(x: number): PixelColorRGBA;
    /**
     * 全成分に値を乗算
     * @param {number} x
     * @returns {PixelColorRGBA}
     */
    mul(x: number): PixelColorRGBA;
    /**
     * 全成分を値で除算
     * @param {number} x
     * @returns {PixelColorRGBA}
     */
    div(x: number): PixelColorRGBA;
    /**
     * 全成分に exp() を適用
     * @returns {PixelColorRGBA}
     */
    exp(): PixelColorRGBA;
    /**
     * 全成分に log() を適用
     * @returns {PixelColorRGBA}
     */
    log(): PixelColorRGBA;
    /**
     * 全成分を base のべき乗にする
     * @param {number} base
     * @returns {PixelColorRGBA}
     */
    pow(base: number): PixelColorRGBA;
    /**
     * 任意の底の対数
     * @param {number} base
     * @returns {PixelColorRGBA}
     */
    baselog(base: number): PixelColorRGBA;
    /**
     * テーブル参照で変換
     * @param {Array<number>} table
     * @returns {PixelColorRGBA}
     */
    table(table: Array<number>): PixelColorRGBA;
    /**
     * ランダムなRGBA色を返す
     * @returns {PixelColorRGBA}
     */
    random(): PixelColorRGBA;
    /**
     * 色同士の加算
     * @param {PixelColorRGBA} c
     * @returns {PixelColorRGBA}
     */
    addColor(c: PixelColorRGBA): PixelColorRGBA;
    /**
     * 色同士の減算
     * @param {PixelColorRGBA} c
     * @returns {PixelColorRGBA}
     */
    subColor(c: PixelColorRGBA): PixelColorRGBA;
    /**
     * 色同士の乗算
     * @param {PixelColorRGBA} c
     * @returns {PixelColorRGBA}
     */
    mulColor(c: PixelColorRGBA): PixelColorRGBA;
    /**
     * 色同士の除算
     * @param {PixelColorRGBA} c
     * @returns {PixelColorRGBA}
     */
    divColor(c: PixelColorRGBA): PixelColorRGBA;
    /**
     * 各成分ごとに最大値を返す
     * @param {PixelColorRGBA} c
     * @returns {PixelColorRGBA}
     */
    maxColor(c: PixelColorRGBA): PixelColorRGBA;
    /**
     * 各成分ごとに最小値を返す
     * @param {PixelColorRGBA} c
     * @returns {PixelColorRGBA}
     */
    minColor(c: PixelColorRGBA): PixelColorRGBA;
    /**
     * 指定アルファ値（0～1）で新しい色を返す
     * @param {number} x
     * @returns {PixelColorRGBA}
     */
    setBlendAlpha(x: number): PixelColorRGBA;
    /**
     * 指定色のアルファ値をコピーして返す
     * @param {PixelColorRGBA} color
     * @returns {PixelColorRGBA}
     */
    exchangeColorAlpha(color: PixelColorRGBA): PixelColorRGBA;
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
     * @param {PixelColorRGBA} c
     * @returns {boolean}
     */
    equals(c: PixelColorRGBA): boolean;
    /**
     * 4x4行列を色に乗算して新しい色を返す
     * @param {Array<Array<number>>} m 4x4行列
     * @returns {PixelColorRGBA}
     */
    mulMatrix(m: Array<Array<number>>): PixelColorRGBA;
}
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
declare class PixelDataY extends PixelData {
    /**
     * 初期化
     * @constructor
     * @param {ImageData|PixelDataRGBA|PixelDataY|number} [arg1] 元画像または幅
     * @param {number} [arg2] 高さ
     */
    constructor(arg1?: ImageData | PixelDataRGBA | PixelDataY | number, arg2?: number, ...args: any[]);
    /**
     * この画像データのクローンを作成
     * @returns {PixelDataY}
     */
    clone(): PixelDataY;
    /**
     * 範囲内座標のY値を取得
     * @param {number} x
     * @param {number} y
     * @returns {PixelColorY}
     */
    getPixelInside(x: number, y: number): PixelColorY;
    /**
     * 範囲内座標のY値を設定
     * @param {number} x
     * @param {number} y
     * @param {PixelColorY} color
     */
    setPixelInside(x: number, y: number, color: PixelColorY): void;
    /**
     * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixelColorY} color
     */
    setPixel(x: number, y: number, color: PixelColorY): void;
    /**
     * 実数座標(x, y)の補間色を返す
     * @param {number} x
     * @param {number} y
     * @returns {PixelColorY}
     */
    getColor(x: number, y: number): PixelColorY;
    /**
     * UV座標（0～1）でテクスチャとして色取得
     * @param {number} u
     * @param {number} v
     * @returns {PixelColorY}
     */
    getColorUV(u: number, v: number): PixelColorY;
    /**
     * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
     * @param {number} x
     * @param {number} y
     * @param {PixelColorY} color
     */
    setColor(x: number, y: number, color: PixelColorY): void;
    /**
     * 全画素に対してコールバック関数を適用
     * @param {function(PixelColorY, number, number, PixelData):void} callback (color, x, y, this)
     */
    forEach(callback: (arg0: PixelColorY, arg1: number, arg2: number, arg3: PixelData) => void): void;
    /**
     * 各種画像データから本クラスへ変換して格納
     * @param {ImageData|PixelDataRGBA|PixelDataY} imagedata
     * @param {number} [n=0] RGBAのどのチャンネルか（0:R, 1:G, 2:B, 3:A）
     */
    putImageData(imagedata: ImageData | PixelDataRGBA | PixelDataY, n?: number): void;
    /**
     * RGBA画像からR成分のみ取り込む
     * @param {ImageData|PixelDataRGBA} imagedata
     */
    putImageDataR(imagedata: ImageData | PixelDataRGBA): void;
    /**
     * RGBA画像からG成分のみ取り込む
     * @param {ImageData|PixelDataRGBA} imagedata
     */
    putImageDataG(imagedata: ImageData | PixelDataRGBA): void;
    /**
     * RGBA画像からB成分のみ取り込む
     * @param {ImageData|PixelDataRGBA} imagedata
     */
    putImageDataB(imagedata: ImageData | PixelDataRGBA): void;
    /**
     * RGBA画像からA成分のみ取り込む
     * @param {ImageData|PixelDataRGBA} imagedata
     */
    putImageDataA(imagedata: ImageData | PixelDataRGBA): void;
    /**
     * ImageData（RGBA, Canvas API）形式で出力
     * @returns {ImageData}
     */
    getImageData(): ImageData;
    /**
     * このグレースケール画像からノーマルマップを生成
     * @returns {PixelDataRGBA}
     * @throws {Error} ラッピングモードがINSIDEの場合は例外
     */
    getNormalMap(): PixelDataRGBA;
    /**
     * ノーマルマップを環境マッピングする（未実装）
     * @param {PixelDataRGBA} texture
     * @returns {PixelDataRGBA}
     */
    filterEnvironmentMapping(texture: PixelDataRGBA): PixelDataRGBA;
}
/**
 * 輝度（Y成分・グレースケール）のみを扱う色クラス
 * グレースケール画像の画素色表現や、単成分での画像処理に利用します。
 *
 * @class
 * @extends PixelColor
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * const gray = new PixelColorY(128);
 * const lighter = gray.add(32); // 輝度値を加算
 */
declare class PixelColorY extends PixelColor {
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
     * @returns {PixelColorY}
     */
    clone(): PixelColorY;
    /**
     * 輝度値0.0の色を返す
     * @returns {PixelColorY}
     */
    zero(): PixelColorY;
    /**
     * 輝度値1.0の色を返す
     * @returns {PixelColorY}
     */
    one(): PixelColorY;
    /**
     * 輝度値に加算
     * @param {number} x
     * @returns {PixelColorY}
     */
    add(x: number): PixelColorY;
    /**
     * 輝度値から減算
     * @param {number} x
     * @returns {PixelColorY}
     */
    sub(x: number): PixelColorY;
    /**
     * 輝度値に乗算
     * @param {number} x
     * @returns {PixelColorY}
     */
    mul(x: number): PixelColorY;
    /**
     * 輝度値を除算
     * @param {number} x
     * @returns {PixelColorY}
     */
    div(x: number): PixelColorY;
    /**
     * 輝度値にexp()を適用
     * @returns {PixelColorY}
     */
    exp(): PixelColorY;
    /**
     * 輝度値にlog()を適用
     * @returns {PixelColorY}
     */
    log(): PixelColorY;
    /**
     * 輝度値をbaseのべき乗にする
     * @param {number} base
     * @returns {PixelColorY}
     */
    pow(base: number): PixelColorY;
    /**
     * 任意の底の対数
     * @param {number} base
     * @returns {PixelColorY}
     */
    baselog(base: number): PixelColorY;
    /**
     * テーブル参照による変換
     * @param {Array<number>} table
     * @returns {PixelColorY}
     */
    table(table: Array<number>): PixelColorY;
    /**
     * ランダムな輝度値（0～255）
     * @returns {PixelColorY}
     */
    random(): PixelColorY;
    /**
     * 他の輝度色と加算
     * @param {PixelColorY} c
     * @returns {PixelColorY}
     */
    addColor(c: PixelColorY): PixelColorY;
    /**
     * 他の輝度色と減算
     * @param {PixelColorY} c
     * @returns {PixelColorY}
     */
    subColor(c: PixelColorY): PixelColorY;
    /**
     * 他の輝度色と乗算
     * @param {PixelColorY} c
     * @returns {PixelColorY}
     */
    mulColor(c: PixelColorY): PixelColorY;
    /**
     * 他の輝度色と除算
     * @param {PixelColorY} c
     * @returns {PixelColorY}
     */
    divColor(c: PixelColorY): PixelColorY;
    /**
     * 各成分ごとに最大値を返す
     * @param {PixelColorY} c
     * @returns {PixelColorY}
     */
    maxColor(c: PixelColorY): PixelColorY;
    /**
     * 各成分ごとに最小値を返す
     * @param {PixelColorY} c
     * @returns {PixelColorY}
     */
    minColor(c: PixelColorY): PixelColorY;
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
     * @returns {PixelColorY}
     */
    setBlendAlpha(): PixelColorY;
    /**
     * 指定色のアルファを適用（輝度のみのためそのまま返す）
     * @returns {PixelColorY}
     */
    exchangeColorAlpha(): PixelColorY;
    /**
     * 他のPixelColorYと一致するか判定
     * @param {PixelColorY} c
     * @returns {boolean}
     */
    equals(c: PixelColorY): boolean;
}
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
declare class PixelFIRMatrix {
    /**
     * Laplacianフィルタ行列を生成
     * @static
     * @returns {PixelFIRMatrix}
     */
    static makeLaplacianFilter(): PixelFIRMatrix;
    /**
     * シャープフィルタ行列を生成
     * @static
     * @param {number} power シャープ強度
     * @returns {PixelFIRMatrix}
     */
    static makeSharpenFilter(power: number): PixelFIRMatrix;
    /**
     * ボックス（平均化）ブラー行列を生成
     * @static
     * @param {number} width 行列幅
     * @param {number} height 行列高さ
     * @returns {PixelFIRMatrix}
     */
    static makeBlur(width: number, height: number): PixelFIRMatrix;
    /**
     * ガウシアンフィルタ行列を生成
     * @static
     * @param {number} width 行列幅
     * @param {number} height 行列高さ
     * @param {number} [sd=1.0] 標準偏差
     * @returns {PixelFIRMatrix}
     */
    static makeGaussianFilter(width: number, height: number, sd?: number): PixelFIRMatrix;
    /**
     * 円形の畳み込み行列を生成
     * @static
     * @param {number} r 直径（行列の一辺）
     * @returns {PixelFIRMatrix}
     */
    static makeCircle(r: number): PixelFIRMatrix;
    /**
     * 2次元配列で初期化
     * @param {Array<Array<number>>} matrix フィルタ行列（[y][x]の2次元配列）
     */
    constructor(matrix: Array<Array<number>>);
    /**
     * 行列の高さ（行数）
     * @type {number}
     * @public
     */
    public height: number;
    /**
     * 行列の幅（列数）
     * @type {number}
     * @public
     */
    public width: number;
    /**
     * フィルタ行列本体（[y][x] の2次元配列）
     * @type {Array<Array<number>>}
     * @public
     */
    public matrix: Array<Array<number>>;
    /**
     * このフィルタ行列の複製を作成
     * @returns {PixelFIRMatrix}
     */
    clone(): PixelFIRMatrix;
    /**
     * フィルタ行列の周囲（エッジ）を時計回りに回転
     * @param {number} val 回転量（正の整数で右回り）
     * @returns {PixelFIRMatrix} 回転後の新しい行列
     */
    rotateEdge(val: number): PixelFIRMatrix;
    /**
     * 全要素を指定値で乗算
     * @param {number} val 乗算値
     * @returns {PixelFIRMatrix}
     */
    mul(val: number): PixelFIRMatrix;
    /**
     * 全要素の合計値を返す
     * @returns {number}
     */
    sum(): number;
    /**
     * 合計値で正規化（全体の合計が1になるようスケーリング）
     * @returns {PixelFIRMatrix}
     */
    normalize(): PixelFIRMatrix;
    /**
     * フィルタの中心に指定値を加算
     * @param {number} val
     * @returns {PixelFIRMatrix}
     */
    addCenter(val: number): PixelFIRMatrix;
}
/**
 * 画像データ基底クラス（ラスタ画像データ抽象基盤）
 * RGBAやY（グレースケール）画像データを扱う抽象基底クラスです。
 * 派生クラスで具体的なデータ管理・画像処理を実装します。
 *
 * @class
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 * @example
 * // 派生クラスを利用
 * const img = new PixelDataRGBA(320, 240);
 * img.setPixel(0, 0, new PixelColorRGBA([255, 0, 0, 255]));
 */
declare class PixelData {
    /**
     * 画像データクラス
     * @constructor
     * @param {ImageData|PixelData|number} [arg1] 画像データまたは幅
     * @param {number} [arg2] 高さ
     */
    constructor(arg1?: ImageData | PixelData | number, arg2?: number, ...args: any[]);
    /**
     * 画像幅（ピクセル数）
     * @type {number}
     * @public
     */
    public width: number;
    /**
     * 画像高さ（ピクセル数）
     * @type {number}
     * @public
     */
    public height: number;
    /**
     * 書き込み時グローバルアルファ（0.0～1.0）
     * @type {number}
     * @public
     */
    public globalAlpha: number;
    /**
     * 画素データ本体
     * 派生クラスで具体的型が決まる
     *
     * - RGBA Uint8ClampedArray 各画素4チャンネル（R,G,B,A）ずつ格納。長さは width * height * 4
     * - Y Float32Array グレースケール（Y成分）画素データ本体 各画素1チャンネルずつ格納。長さは width * height
     *
     * @type {Uint8ClampedArray|Float32Array}
     * @public
     */
    public data: Uint8ClampedArray | Float32Array;
    /**
     * 書き込み時のブレンドモード管理オブジェクト
     * @type {PixelBlend}
     * @public
     */
    public blend: PixelBlend;
    /**
     * 範囲外アクセスのラッピング方式管理
     * @type {PixelWrap}
     * @public
     */
    public wrap: PixelWrap;
    /**
     * 補間方式管理
     * @type {PixelInterpolation}
     * @public
     */
    public ip: PixelInterpolation;
    /**
     * 画像データをセット
     * @param {ImageData|PixelData} imagedata
     */
    putImageData(imagedata: ImageData | PixelData): void;
    /**
     * 画像サイズを変更（内容は再初期化。既存と同サイズなら何もしない）
     * @param {number} width
     * @param {number} height
     */
    setSize(width: number, height: number): void;
    /**
     * 内部データを指定インスタンスxにコピー
     * @param {PixelData} x
     * @protected
     */
    protected _copyData(x: PixelData): void;
    /**
     * この画像データのクローンを生成
     * @returns {PixelData}
     */
    clone(): PixelData;
    /**
     * 範囲外アクセス時のラッピング方式を設定
     * @param {string} wrapmode PixelData.MODE_WRAP
     */
    setWrapMode(wrapmode: string): void;
    /**
     * 範囲外アクセス時のラッピング方式を取得
     * @returns {string} PixelData.MODE_WRAP
     */
    getWrapMode(): string;
    /**
     * 補間モードを設定
     * @param {string} ipmode PixelData.MODE_IP
     */
    setInterpolationMode(ipmode: string): void;
    /**
     * 補間モードを取得
     * @returns {string} PixelData.MODE_IP
     */
    getInterpolationMode(): string;
    /**
     * 書き込み時のブレンドモードを設定
     * @param {string} blendmode PixelData.MODE_BLEND
     */
    setBlendType(blendmode: string): void;
    /**
     * 書き込み時のブレンドモードを取得
     * @returns {string} PixelData.MODE_BLEND
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
     * @returns {PixelColor}
     */
    getPixelInside(x: number, y: number): PixelColor;
    /**
     * 範囲内座標(x, y)に画素値をセット
     * x, y が整数かつ画像の範囲内を保証している場合に使用可能
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {PixelColor} color
     */
    setPixelInside(x: number, y: number, color: PixelColor): void;
    /**
     * 任意座標(x, y)の画素値を返す（範囲外もラッピングモードに応じて取得）
     * @abstract
     * @param {number} x
     * @param {number} y
     * @returns {PixelColor}
     */
    getPixel(x: number, y: number): PixelColor;
    /**
     * 任意座標(x, y)に画素値をセット（範囲外もラッピングモードに応じて書き込み）
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {PixelColor} color
     */
    setPixel(x: number, y: number, color: PixelColor): void;
    /**
     * 実数座標(x, y)の補間色を返す
     * @abstract
     * @param {number} x
     * @param {number} y
     * @returns {PixelColor}
     */
    getColor(x: number, y: number): PixelColor;
    /**
     * UV座標（0～1）でテクスチャとして色取得
     * @abstract
     * @param {number} u
     * @param {number} v
     * @returns {PixelColor}
     */
    getColorUV(u: number, v: number): PixelColor;
    /**
     * 実数座標(x, y)に画素値をセット（切り捨て座標に書き込み）
     * @abstract
     * @param {number} x
     * @param {number} y
     * @param {PixelColor} color
     */
    setColor(x: number, y: number, color: PixelColor): void;
    /**
     * Canvas型の drawImage と同じ使用方法で PixelData をドローする
     * PixelDataRGBA データの上には、PixelDataRGBA のみ書き込み可能
     * PixelDataY    データの上には、PixelDataY    のみ書き込み可能
     * @param {PixelData} image 描画元画像
     * @param {number} sx 元画像の描画開始X
     * @param {number} sy 元画像の描画開始Y
     * @param {number} [sw] 元画像の幅
     * @param {number} [sh] 元画像の高さ
     * @param {number} [dx] 描画先X
     * @param {number} [dy] 描画先Y
     * @param {number} [dw] 描画幅
     * @param {number} [dh] 描画高さ
     */
    drawPixelData(image: PixelData, sx: number, sy: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number, ...args: any[]): void;
    /**
     * 全画素に対してコールバック関数を適用
     * @abstract
     * @param {function(PixelColor, number, number, PixelData):void} callback (color, x, y, this)
     */
    forEach(callback: (arg0: PixelColor, arg1: number, arg2: number, arg3: PixelData) => void): void;
    /**
     * 畳み込みフィルタ（PixelFIRMatrix）を適用
     * @param {PixelFIRMatrix} matrix
     */
    convolution(matrix: PixelFIRMatrix): void;
    /**
     * バイラテラルフィルタ的な畳み込み
     * 対象の色に近いほど、フィルタをかける処理となる
     * @param {PixelFIRMatrix} matrix
     * @param {number} [p=0.8] 強度 0.0～1.0
     */
    convolutionBilateral(matrix: PixelFIRMatrix, p?: number): void;
    /**
     * 指数空間での畳み込み
     * @param {PixelFIRMatrix} matrix
     * @param {number} [e=1.2] 底(1.01-1.2)
     */
    convolutionExp(matrix: PixelFIRMatrix, e?: number): void;
    /**
     * アンシャープ畳み込み
     * @param {PixelFIRMatrix} matrix
     * @param {number} rate
     */
    convolutionUnSharp(matrix: PixelFIRMatrix, rate: number): void;
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
declare namespace PixelData {
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
declare class PixelColor {
    /**
     * 色データを返す
     * @returns {*} 色データ
     */
    getColor(): any;
    /**
     * この色のコピーを返す
     * @returns {PixelColor}
     */
    clone(): PixelColor;
    /**
     * すべての成分が0の色を返す
     * @returns {PixelColor}
     */
    zero(): PixelColor;
    /**
     * すべての成分が1の色を返す
     * @returns {PixelColor}
     */
    one(): PixelColor;
    /**
     * 全成分に値を加算
     * @param {*} x
     * @returns {PixelColor}
     */
    add(x: any): PixelColor;
    /**
     * 全成分から値を減算
     * @param {*} x
     * @returns {PixelColor}
     */
    sub(x: any): PixelColor;
    /**
     * 全成分に値を乗算
     * @param {*} x
     * @returns {PixelColor}
     */
    mul(x: any): PixelColor;
    /**
     * 全成分を値で除算
     * @param {*} x
     * @returns {PixelColor}
     */
    div(x: any): PixelColor;
    /**
     * 全成分の指数関数exp
     * @returns {PixelColor}
     */
    exp(): PixelColor;
    /**
     * 全成分の対数関数log
     * @returns {PixelColor}
     */
    log(): PixelColor;
    /**
     * 全成分のべき乗
     * @param {*} base
     * @returns {PixelColor}
     */
    pow(base: any): PixelColor;
    /**
     * 任意の底の対数
     * @param {number} base
     * @returns {PixelColor}
     */
    baselog(base: number): PixelColor;
    /**
     * 値をテーブル参照で変換
     * @param {Array<number>} table
     * @returns {PixelColor}
     */
    table(table: Array<number>): PixelColor;
    /**
     * 全成分をランダムな値に設定
     * @returns {PixelColor}
     */
    random(): PixelColor;
    /**
     * 輝度値（明るさ）を計算して返す
     * @returns {number}
     */
    luminance(): number;
    /**
     * 色同士の加算
     * @param {PixelColor} c
     * @returns {PixelColor}
     */
    addColor(c: PixelColor): PixelColor;
    /**
     * 色同士の減算
     * @param {PixelColor} c
     * @returns {PixelColor}
     */
    subColor(c: PixelColor): PixelColor;
    /**
     * 色同士の乗算
     * @param {PixelColor} c
     * @returns {PixelColor}
     */
    mulColor(c: PixelColor): PixelColor;
    /**
     * 色同士の除算
     * @param {PixelColor} c
     * @returns {PixelColor}
     */
    divColor(c: PixelColor): PixelColor;
    /**
     * 各成分ごとに最大値を返す
     * @param {PixelColor} c
     * @returns {PixelColor}
     */
    maxColor(c: PixelColor): PixelColor;
    /**
     * 各成分ごとに最小値を返す
     * @param {PixelColor} c
     * @returns {PixelColor}
     */
    minColor(c: PixelColor): PixelColor;
    /**
     * 色のノルム（色差の距離）を返す
     * @param {number} normType PixelColor.NORM_MODE
     * @returns {number}
     */
    norm(normType: number): number;
    /**
     * 色のノルムの高速計算
     * @param {number} normType PixelColor.NORM_MODE
     * @returns {number}
     */
    normFast(normType: number): number;
    /**
     * 指定色との差分ノルム
     * @param {PixelColor} c
     * @param {number} normType PixelColor.NORM_MODE
     * @returns {number}
     */
    normColor(c: PixelColor, normType: number): number;
    /**
     * 指定色との差分ノルム（高速版）
     * @param {PixelColor} c
     * @param {number} normType PixelColor.NORM_MODE
     * @returns {number}
     */
    normColorFast(c: PixelColor, normType: number): number;
    /**
     * アルファ値を取得
     * @returns {number}
     */
    getBlendAlpha(): number;
    /**
     * アルファ値を設定した新しい色を返す
     * @param {number} alpha
     * @returns {PixelColor}
     */
    setBlendAlpha(alpha: number): PixelColor;
    /**
     * 指定色のアルファを移植した色を返す
     * @param {PixelColor} color
     * @returns {PixelColor}
     */
    exchangeColorAlpha(color: PixelColor): PixelColor;
    /**
     * 色が一致するか
     * @param {PixelColor} c
     * @returns {boolean}
     */
    equals(c: PixelColor): boolean;
    /**
     * パレットから最も近い2色を探す
     * @param {Array<PixelColor>} palettes
     * @param {number} normType 距離計算方法（PixelColor.NORM_MODE）
     * @returns {{c1:{color:PixelColor,norm:number}, c2:{color:PixelColor,norm:number}}}
     */
    searchColor(palettes: Array<PixelColor>, normType: number): {
        c1: {
            color: PixelColor;
            norm: number;
        };
        c2: {
            color: PixelColor;
            norm: number;
        };
    };
}
declare namespace PixelColor {
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
 * 各種合成方法（上書き・アルファ・加算・減算・乗算等）を管理し、指定モードで色合成を行うユーティリティです。
 *
 * @class
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 *
 * @example
 * const blend = new PixelBlend(PixelBlend.MODE.ALPHA);
 * const result = blend.blend(color1, color2, 0.5);
 */
declare class PixelBlend {
    /**
     * ブレンドモードを指定してインスタンスを生成
     * @param {string} mode ブレンドモード（PixelBlend.MODE のいずれか）
     */
    constructor(mode: string, ...args: any[]);
    /**
     * 現在設定されているブレンド関数
     * PixelBlend.MODEに応じた合成処理（引数: (PixelColor, PixelColor, number): PixelColor）
     * @type {function(PixelColor, PixelColor, number): PixelColor}
     * @private
     */
    private blendfunc;
    /**
     * 現在のブレンドモードを複製したインスタンスを返す
     * @returns {PixelBlend}
     */
    clone(): PixelBlend;
    /**
     * ブレンドモードを設定する
     * @param {string} mode ブレンドモード（PixelBlend.MODE のいずれか）
     */
    setBlendMode(mode: string): void;
    /**
     * 現在のブレンドモード
     * PixelBlend.MODE で定義されるモード（"NONE", "ALPHA", "ADD"など）
     * @type {string}
     * @public
     */
    public blendmode: string;
    /**
     * 2つの色を指定したブレンドモードで合成する
     * @param {PixelColor} color1 元の色
     * @param {PixelColor} color2 書き込む色
     * @param {number} alpha グローバルアルファ（0～1）
     * @returns {PixelColor} 合成結果の色
     */
    blend(color1: PixelColor, color2: PixelColor, alpha: number): PixelColor;
}
declare namespace PixelBlend {
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
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixelWrap {
    /**
     * ラッピングモード・画像サイズを指定して初期化
     * @param {string} [mode=PixelWrap.MODE.INSIDE] ラッピングモード
     * @param {number} [width=1] 画像幅
     * @param {number} [height=1] 画像高さ
     */
    constructor(mode?: string, width?: number, height?: number, ...args: any[]);
    width: number;
    height: number;
    /**
     * このラッピングの複製を作成
     * @returns {PixelWrap}
     */
    clone(): PixelWrap;
    /**
     * ラッピングモードを設定（INSIDE, CLAMP, REPEAT）
     * @param {string} mode PixelWrap.MODEのいずれか
     */
    setPixelWrapMode(mode: string): void;
    wrapmode: string;
    wrap: PixelWrapInside | PixelWrapClamp | PixelWrapRepeat;
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
declare namespace PixelWrap {
    namespace MODE { }
    /**
     * *
     */
    type MODE = string;
}
/**
 * 画像の補間方式を管理・利用するクラス
 */
declare class PixelInterpolation {
    /**
     * 補間モードを指定して初期化
     * @param {string} [mode=PixelInterpolation.MODE.NEAREST_NEIGHBOR] 補間モード
     */
    constructor(mode?: string, ...args: any[]);
    /**
     * 補間モード（PixelInterpolation.MODE のいずれか）
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
     * @type {function(...*): PixelColor}
     */
    ipfunc: (...args: any[]) => PixelColor;
    /**
     * この補間設定のクローンを作成
     * @returns {PixelInterpolation}
     */
    clone(): PixelInterpolation;
    /**
     * 補間モードを設定
     * @param {string} ipmode 補間モード（PixelInterpolation.MODE のいずれか）
     */
    setInterpolationMode(ipmode: string): void;
    /**
     * 指定座標の色を補間で取得
     * 範囲外や実数座標でも安全に色取得可能
     * @param {PixelData} imgdata 元画像データ
     * @param {number} x X座標（整数・実数可）
     * @param {number} y Y座標（整数・実数可）
     * @returns {PixelColor} 補間結果の色
     */
    getColor(imgdata: PixelData, x: number, y: number): PixelColor;
}
declare namespace PixelInterpolation {
    namespace MODE { }
    /**
     * *
     */
    type MODE = string;
}
/**
 * 画像座標のラッピング（境界判定）用のクラス（範囲内のみ許可）
 * 画像の端から外にはみ出した場合に「範囲内ならそのまま／範囲外ならnull」を返す
 *
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixelWrapInside {
    /**
     * サイズを指定して初期化
     * @param {number} [width=0] 画像幅
     * @param {number} [height=0] 画像高さ
     */
    constructor(width?: number, height?: number, ...args: any[]);
    /**
     * このラッピングの複製を作成
     * @returns {PixelWrapInside}
     */
    clone(): PixelWrapInside;
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
 * @module PixelWrapClamp
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixelWrapClamp extends PixelWrapInside {
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
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */
declare class PixelWrapRepeat extends PixelWrapInside {
    /**
     * 画像サイズを指定して初期化
     * @param {number} width 画像幅
     * @param {number} height 画像高さ
     */
    constructor(width: number, height: number);
}
