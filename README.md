# PixelProcessing

[![npm version](https://badge.fury.io/js/pixelprocessing.svg)](https://badge.fury.io/js/pixelprocessing)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 概要

PixelProcessing は、高度な画像処理のための JavaScript ライブラリです。
ピクセル操作・ブレンド・減色・フィルタ・補間処理など、Canvas/Web向けに設計されています。

以下を確認ください。

- [Github Pages](https://natade-jp.github.io/js-pixelprocessing/)
- [ARCHITECTURE.md](https://natade-jp.github.io/js-pixelprocessing/tutorial-ARCHITECTURE.html)
- [使用例](https://natade-jp.github.io/js-pixelprocessing/tutorial-getting-started.html)

## 特長

- RGBA/グレースケール両対応の画像データ操作
- ブレンドモード（加算・減算・アルファ等）
- 豊富な補間方式（バイリニア・バイキュービックなど）
- 高度な画像フィルタ（ガウシアン・アンシャープ・バイラテラル他）
- 減色・ディザ・誤差拡散など
- ノーマルマップ生成
- Canvas API との連携

## 利用例

```js
import PixelProcessing from "pixelprocessing";
const data = new PixelProcessing.DataRGBA(canvas.getImageData());
data.filterGaussian(5);
canvas.putImageData(data.getImageData());
```
