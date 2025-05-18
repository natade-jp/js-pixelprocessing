/**
 * PixFX
 *
 * @module PixFX
 * @author natade (https://github.com/natade-jp)
 * @license MIT
 */

import PixData from "./data/PixData.js";
import PixDataRGBA from "./data/PixDataRGBA.js";
import PixDataY from "./data/PixDataY.js";
import PixColorRGBA from "./color/PixColorRGBA.js";
import PixColorY from "./color/PixColorY.js";

const PixfX = {
	PixDataRGBA: PixDataRGBA,
	PixColorRGBA: PixColorRGBA,
	PixDataY: PixDataY,
	PixColorY: PixColorY,
	MODE_WRAP: PixData.MODE_WRAP,
	MODE_IP: PixData.MODE_IP,
	MODE_BLEND: PixData.MODE_BLEND
};

export default PixfX;
