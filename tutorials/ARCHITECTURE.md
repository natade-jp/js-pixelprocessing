# ARCHITECTURE.md

## 概要

**PixelProcessing** は JavaScript で実装された画像処理ライブラリです。
ピクセル単位の処理・フィルタ・補間・ブレンド・減色など、画像編集で必要な基本機能を柔軟に扱える構造になっています。
本ドキュメントは、内部構造やクラスの役割についてまとめたものです。

---

## 全体構成

```
PixelProcessing
│
├── data/
│   ├── PixelData.js（抽象基底クラス）
│   ├── PixelDataRGBA.js（RGBA画像データ）
│   └── PixelDataY.js（グレースケール画像データ）
│
├── color/
│   ├── PixelColor.js（色の基底クラス）
│   ├── PixelColorRGBA.js（RGBA色クラス）
│   ├── PixelColorY.js（輝度のみの色クラス）
│   ├── PixelBlend.js（ブレンドモード管理）
│   └── PixelVector.js（ノーマルマップ用ベクトル）
│
├── selecter/
│   ├── PixelWrap.js（範囲外アクセス制御）
│   ├── PixelWrapInside.js（画像内のみ許可）
│   ├── PixelWrapClamp.js（端にクランプ）
│   ├── PixelWrapRepeat.js（リピートラップ）
│   ├── PixelInterpolation.js（補間方式管理）
│
├── fir/
│   └── PixelFIRMatrix.js（畳み込みフィルタ行列）
│
└── PixelProcessing.js（メインモジュール）
```

---

## 各コンポーネント詳細

### 1. PixelProcessing.js

* ライブラリのエントリーポイント。主要クラスやモード定数をまとめて export している。

### 2. data/ ディレクトリ

#### PixelData.js

* 画像データ抽象基底クラス。
* 幅・高さ・ラップ/補間/ブレンドの各モード・ピクセルデータ本体を管理。
* ピクセル単位のアクセス、描画、フィルタ、forEach、drawPixelData など基盤メソッドを持つ。

#### PixelDataRGBA.js

* RGBA 画像データ（4チャンネル）を扱う PixelData の具象クラス。
* 各ピクセルに対する RGBA 値の取得・設定を提供。

#### PixelDataY.js

* グレースケール（輝度のみ）画像データ用クラス。
* ピクセル値は Y（1チャンネル）で管理。ノーマルマップ生成機能なども搭載。

### 3. color/ ディレクトリ

#### PixelColor.js

* 色を表す基底抽象クラス（加算/減算/乗算など各種色操作のインターフェース）。

#### PixelColorRGBA.js

* RGBA 色（\[R,G,B,A]）の実装。ピクセルカラー演算・距離計算・ランダム生成・パレット操作等。

#### PixelColorY.js

* 輝度（Y成分、グレースケール値）のみ扱う色クラス。

#### PixelBlend.js

* ブレンドモード（NONE, ALPHA, ADD, SUB, REVSUB, MUL）を管理。
* ブレンド関数群を内包し、各種合成処理を提供。

#### PixelVector.js

* 画像上の3次元ベクトル管理。ノーマルマップの計算などに利用。

### 4. selecter/ ディレクトリ

#### PixelWrap.js ＆ 関連クラス

* 画像範囲外アクセス時の挙動（INSIDE, CLAMP, REPEAT）を制御。
* 各モードで座標をラップ（内側のみ許可・端にクランプ・リピート）する仕組みを持つ。

#### PixelInterpolation.js

* ピクセル補間の方式管理（最近傍, バイリニア, コサイン, Hermite, バイキュービック他）。
* 任意座標の色を計算可能。

### 5. fir/ ディレクトリ

#### PixelFIRMatrix.js

* FIR（畳み込み）フィルタ行列の操作・生成クラス。
* シャープ/ブラー/ガウシアン/円形など各種行列を生成し、畳み込み演算に利用。

---

## データフロー・画像処理の流れ

1. **画像データの生成/取得**

   * 例: `new PixelDataRGBA(imageData)` などでラップ。
2. **各種設定**

   * ラッピング/補間/ブレンド等をメソッドで切り替え（setWrapMode, setInterpolationMode, setBlendType）。
3. **画像編集/フィルタ処理**

   * 例: filterSharp, filterBlur, convolution, drawPixelData などを呼び出し。
4. **結果の取得・Canvas反映**

   * `getImageData()` で ImageData へ変換し、Canvas に描画可能。

---

## モジュールの拡張性

* **PixelData** や **PixelColor** などは抽象クラス設計で、派生クラスの拡張が容易。
* 補間方式やブレンド、ラップ処理も新規追加が簡単な設計。

---

## サンプル利用例

```js
import PixelProcessing from "pixelprocessing";
const data = new PixelProcessing.DataRGBA(canvas.getImageData());
data.filterGaussian(5);
canvas.putImageData(data.getImageData());
```
