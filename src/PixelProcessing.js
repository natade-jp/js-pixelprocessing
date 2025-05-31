/**
 * PixelProcessing
 *
 * @module PixelProcessing
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixelData from "./data/PixelData.js";
import PixelDataRGBA from "./data/PixelDataRGBA.js";
import PixelDataY from "./data/PixelDataY.js";
import PixelFIRMatrix from "./fir/PixelFIRMatrix.js";
import PixelColorRGBA from "./color/PixelColorRGBA.js";
import PixelColorY from "./color/PixelColorY.js";

/**
 * PixelProcessing モジュールのメイン名前空間
 * 各種画像データクラスや色クラス、フィルタ行列クラス、および定数群をまとめた静的ユーティリティオブジェクト。
 *
 * @namespace PixelProcessing
 *
 * @example
 * // 例: 新規画像生成
 * const img = new PixelProcessing.DataRGBA(256, 256);
 * const gray = new PixelProcessing.DataY(128, 128);
 *
 * // 例: 色クラス利用
 * const color = new PixelProcessing.ColorRGBA([255, 0, 0, 255]);
 * const y = new PixelProcessing.ColorY(200);
 */
const PixelProcessing = {
	DataRGBA: PixelDataRGBA,
	ColorRGBA: PixelColorRGBA,
	DataY: PixelDataY,
	ColorY: PixelColorY,
	FIRMatrix: PixelFIRMatrix,
	MODE_WRAP: PixelData.MODE_WRAP,
	MODE_IP: PixelData.MODE_IP,
	MODE_BLEND: PixelData.MODE_BLEND
};

export default PixelProcessing;
