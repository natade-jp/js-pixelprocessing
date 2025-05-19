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
import PixelColorRGBA from "./color/PixelColorRGBA.js";
import PixelColorY from "./color/PixelColorY.js";

const PixelProcessing = {
	PixelDataRGBA: PixelDataRGBA,
	PixelColorRGBA: PixelColorRGBA,
	PixelDataY: PixelDataY,
	PixelColorY: PixelColorY,
	MODE_WRAP: PixelData.MODE_WRAP,
	MODE_IP: PixelData.MODE_IP,
	MODE_BLEND: PixelData.MODE_BLEND
};

export default PixelProcessing;
