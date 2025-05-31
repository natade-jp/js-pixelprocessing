import GuiBlocks from "./libs/GuiBlocks.min.js";
import PixelProcessing from "./libs/PixelProcessing.min.js";

/**
 * 画像ファイルの読み込みと、画像データのCanvasやIMG要素への変換サンプル
 * （PixelProcessingは直接使っていませんが、画像データ取得は他サンプルで利用）
 * @param {GuiBlocks.Panel} panel 
 */
const testFileLoad = function(panel) {
	
	panel.clear();
	
	// 描画領域（Canvas）作成
	const canvas = new GuiBlocks.Canvas();
	canvas.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas.setPixelSize(256, 256);
	canvas.setSize(256, 256);
	panel.put(canvas, GuiBlocks.PUT_TYPE.IN);
	
	// ファイル読込ボタン
	const loadbutton = new GuiBlocks.FileLoadButton("読み込み");
	loadbutton.setFileAccept(GuiBlocks.FILE_ACCEPT.IMAGE);
	canvas.put(loadbutton, GuiBlocks.PUT_TYPE.NEWLINE);
	loadbutton.addListener(function(file) {
		// ファイル読込 → Canvasに画像表示
		canvas.putImage(
			file[0],
			true,
			undefined,
			function() {
				console.log("ロード完了");
			}
		);
	});
	
	// Canvasの画像を IMGタグ表示（imagepanel へ）
	const savebutton = new GuiBlocks.Button("IMG要素化");
	loadbutton.put(savebutton, GuiBlocks.PUT_TYPE.RIGHT);
	savebutton.addListener(function() {
		imagepanel.putImage(
			canvas,
			function() {
				console.log("描写完了");
			}
		);
	});
	
	// 画像を表示するパネル
	const imagepanel = new GuiBlocks.ImagePanel();
	savebutton.put(imagepanel, GuiBlocks.PUT_TYPE.NEWLINE);
	
};

/**
 * PixelProcessingによるピクセルアクセス・書き込みのサンプル
 * RGBA画像・グレースケール画像どちらも試せます
 * @param {GuiBlocks.Panel} panel 
 */
const testWritePixel = function(panel) {
	
	panel.clear();
	
	// 256x256のCanvasを黒で初期化
	const canvas = new GuiBlocks.Canvas();
	canvas.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas.setPixelSize(256, 256);
	canvas.setSize(256, 256);
	const size = canvas.getPixelSize();
	canvas.getContext().fillStyle = "rgb(0, 0, 0)";
	canvas.getContext().fillRect(0, 0, size.width, size.height);
	
	panel.put(canvas, GuiBlocks.PUT_TYPE.IN);
	
	// RGBA画像としてピクセル操作するボタン
	const button1 = new GuiBlocks.Button("RGBA でピクセルに書き込み");
	canvas.put(button1, GuiBlocks.PUT_TYPE.NEWLINE);
	button1.addListener(function() {
		// PixelProcessingのPixDataRGBAでCanvasから画像データを作成
		const data = new PixelProcessing.DataRGBA(canvas.getImageData());
		// 100ピクセルをランダムで白色を書き込む
		let i = 0;
		for(i = 0; i < 100; i++) {
			const x = Math.floor(Math.random() * data.width);
			const y = Math.floor(Math.random() * data.height);

			// PixelProcessingのPixColorRGBAで色情報を作成
			const color = new PixelProcessing.ColorRGBA([255, 255, 255, 255]);

			// ピクセルの色を変更
			data.setPixelInside(x, y, color);
		}
		// PixelProcessingで操作した画像をCanvasへ描画
		canvas.putImageData(data.getImageData());
	});
	
	// グレースケール画像としてピクセル操作するボタン
	const button2 = new GuiBlocks.Button("輝度値 でピクセルに書き込み");
	button1.put(button2, GuiBlocks.PUT_TYPE.RIGHT);
	button2.addListener(function() {
		// PixelProcessingのPixDataYでCanvasから画像データを作成
		const data = new PixelProcessing.DataY(canvas.getImageData());
		let i = 0;
		for(i = 0; i < 100; i++) {
			const x = Math.floor(Math.random() * data.width);
			const y = Math.floor(Math.random() * data.height);

			// PixColorYで最大輝度(255)を書き込み
			const color = new PixelProcessing.ColorY(255);

			// ピクセルの色を変更
			data.setPixelInside(x, y, color);
		}
		// PixelProcessingで操作した画像をCanvasへ描画
		canvas.putImageData(data.getImageData());
	});
	
};

/**
 * PixelProcessingの画像補間（リサイズ/拡大・補間モード変更）のサンプル
 * ラッピング/補間方法をGUIで切り替えられます
 * @param {GuiBlocks.Panel} panel 
 */
const testInterpolation = function(panel) {
	
	panel.clear();
	
	const srcWidth  = 16;
	const srcHeight = 16;
	const dstWidth  = 256;
	const dstHeight = 256;
	
	// 小さい画像を16x16サイズで生成（ランダム輝度）
	const gene = new GuiBlocks.Button("画像作成");
	const genefunc = function() {
    	// 現在のCanvas内容からPixelProcessing用の画像データを作成
		const data = new PixelProcessing.DataY();
		data.putImageData(inputcanvas.getImageData());

		// 画像の全ピクセルをループ（forEachでx, y座標ごとに）
		data.forEach(function(color, x, y) {

			// 各ピクセルにランダムな輝度値をセット
			// color.random() は 0〜255のランダム値を返すPixColorY
			data.setPixelInside(x, y, color.random());
		});

    	// 画像データをCanvasへ反映
		inputcanvas.putImageData(data.getImageData());
	};
	gene.addListener(genefunc);
	panel.put(gene, GuiBlocks.PUT_TYPE.IN);
	
	// 入出力Canvas
	const inputcanvas = new GuiBlocks.Canvas();
	const outputcanvas = new GuiBlocks.Canvas();
	
	inputcanvas.setPixelSize(srcWidth, srcHeight);
	inputcanvas.setUnit(GuiBlocks.UNIT_TYPE.PX);
	inputcanvas.setSize(srcWidth, srcHeight);
	genefunc(); // 初回画像生成
	gene.put(inputcanvas, GuiBlocks.PUT_TYPE.NEWLINE);
	
	// ラッピング（画像外参照の挙動）の選択
	const wrapmode = [
		PixelProcessing.MODE_WRAP.REPEAT,
		PixelProcessing.MODE_WRAP.CLAMP
	];

	// 補間モード（PixelProcessingの補間定数）
	const filtermode = [
		PixelProcessing.MODE_IP.NEAREST_NEIGHBOR,
		PixelProcessing.MODE_IP.BILINEAR,
		PixelProcessing.MODE_IP.COSINE,
		PixelProcessing.MODE_IP.HERMITE4_3,
		PixelProcessing.MODE_IP.HERMITE4_5,
		PixelProcessing.MODE_IP.HERMITE16,
		PixelProcessing.MODE_IP.BICUBIC,
		PixelProcessing.MODE_IP.BICUBIC_SOFT,
		PixelProcessing.MODE_IP.BICUBIC_NORMAL,
		PixelProcessing.MODE_IP.BICUBIC_SHARP
	];
	
	const cb_selectertype = new GuiBlocks.ComboBox(wrapmode);
	inputcanvas.put(cb_selectertype, GuiBlocks.PUT_TYPE.NEWLINE);
	cb_selectertype.setWidth(16);
	
	const cb_interpolationtype = new GuiBlocks.ComboBox(filtermode);
	cb_selectertype.put(cb_interpolationtype, GuiBlocks.PUT_TYPE.NEWLINE);
	cb_interpolationtype.setWidth(16);
	
	// 拡大処理の実行
	const button = new GuiBlocks.Button("拡大");
	cb_interpolationtype.put(button, GuiBlocks.PUT_TYPE.NEWLINE);
	button.addListener(function() {
		// PixelProcessing.PixelDataYとして画像データを扱う
		const srcdata = new PixelProcessing.DataY(inputcanvas.getImageData());

		// ラッピング・補間方法をユーザ指定
		srcdata.setWrapMode(cb_selectertype.getSelectedItem());
		srcdata.setInterpolationMode(cb_interpolationtype.getSelectedItem());
		const dstdata = new PixelProcessing.DataY(dstWidth, dstHeight);

		// 結果をCanvasへ描画
		dstdata.drawPixelData(srcdata, 0, 0, dstWidth, dstHeight);
		outputcanvas.putImageData(dstdata.getImageData());
	});
	
	// 出力キャンバス初期化
	outputcanvas.setUnit(GuiBlocks.UNIT_TYPE.PX);
	outputcanvas.setPixelSize(dstWidth, dstHeight);
	outputcanvas.setSize(dstWidth, dstHeight);
	button.put(outputcanvas, GuiBlocks.PUT_TYPE.NEWLINE);
	outputcanvas.getContext().fillStyle = "rgb(0, 0, 0)";
	const size = outputcanvas.getPixelSize();
	outputcanvas.getContext().fillRect(0, 0, size.width, size.height);
	
};


/**
 * PixelProcessingの画像ブレンド（合成）機能のサンプル
 * ブレンドモード/アルファ値を変更して画像合成が試せます
 * @param {GuiBlocks.Panel} panel 
 */
const testBlending = function(panel) {
	
	panel.clear();
	
	const canvasWidth  = 128;
	const canvasHeight = 128;
	
	// 2つの画像（ベースと上書き）＋合成結果用Canvas
	const canvas_src1	= new GuiBlocks.Canvas();
	const canvas_src2	= new GuiBlocks.Canvas();
	const canvas_dst	= new GuiBlocks.Canvas();
	
	canvas_src1.setPixelSize(canvasWidth, canvasHeight);
	canvas_src1.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas_src1.setSize(canvasWidth, canvasHeight);
	canvas_src1.putImage("./resource/image_x.png");
	canvas_src2.setPixelSize(canvasWidth, canvasHeight);
	canvas_src2.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas_src2.setSize(canvasWidth, canvasHeight);
	canvas_src2.putImage("./resource/image_y.png");
	canvas_dst.setPixelSize(canvasWidth, canvasHeight);
	canvas_dst.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas_dst.setSize(canvasWidth, canvasHeight);
	
	// ブレンドモード選択・アルファ値選択
	const label1 = new GuiBlocks.Label("ベース画像");
	panel.put(label1, GuiBlocks.PUT_TYPE.IN);
	label1.put(canvas_src1, GuiBlocks.PUT_TYPE.RIGHT);
	
	const label2 = new GuiBlocks.Label("上書き画像");
	canvas_src1.put(label2, GuiBlocks.PUT_TYPE.NEWLINE);
	label2.put(canvas_src2, GuiBlocks.PUT_TYPE.RIGHT);
	
	// ブレンドモードの選択
	const brendtype = [
		PixelProcessing.MODE_BLEND.NONE,
		PixelProcessing.MODE_BLEND.ALPHA,
		PixelProcessing.MODE_BLEND.ADD,
		PixelProcessing.MODE_BLEND.SUB,
		PixelProcessing.MODE_BLEND.REVSUB,
		PixelProcessing.MODE_BLEND.MUL
	];
	const cb_brendtype = new GuiBlocks.ComboBox(brendtype);
	cb_brendtype.setWidth(8);
	canvas_src2.put(cb_brendtype, GuiBlocks.PUT_TYPE.NEWLINE);
	
	const globalalpha = [
		"1.0",
		"0.8",
		"0.5"
	];
	const cb_globalalpha = new GuiBlocks.ComboBox(globalalpha);
	cb_globalalpha.setWidth(8);
	cb_brendtype.put(cb_globalalpha, GuiBlocks.PUT_TYPE.RIGHT);
	
	const button = new GuiBlocks.Button("blend");
	cb_globalalpha.put(button, GuiBlocks.PUT_TYPE.RIGHT);
	button.addListener(function() {
		// PixelProcessingで画像データを取得
		const src1 = new PixelProcessing.DataRGBA(canvas_src1.getImageData());
		const src2 = new PixelProcessing.DataRGBA(canvas_src2.getImageData());

		// ブレンドモードとグローバルアルファを設定
		src1.setBlendType(cb_brendtype.getSelectedItem());
		src1.globalAlpha = parseFloat(cb_globalalpha.getSelectedItem());
		
		// drawPixDataで画像合成
		src1.drawPixelData(src2, 0, 0);

		// 合成結果をCanvasへ
		canvas_dst.putImageData(src1.getImageData());
	});
	
	const label3 = new GuiBlocks.Label("結果画像");
	button.put(label3, GuiBlocks.PUT_TYPE.NEWLINE);
	label3.put(canvas_dst, GuiBlocks.PUT_TYPE.RIGHT);	
};

/**
 * PixelProcessingの各種フィルタ・減色・ノーマルマップ等の応用サンプル
 * PixelProcessingのfilterXxx系メソッドで様々な画像処理が可能です
 * @param {GuiBlocks.Panel} panel 
 */
function testEtc(panel) {
	
	panel.clear();
	
	const canvasWidth  = 320;
	const canvasHeight = 240;
	
	// 入出力用Canvas
	const canvas_src	= new GuiBlocks.Canvas();
	const canvas_dst	= new GuiBlocks.Canvas();
	
	canvas_src.setPixelSize(canvasWidth, canvasHeight);
	canvas_src.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas_src.setSize(canvasWidth, canvasHeight);
	canvas_dst.setPixelSize(canvasWidth, canvasHeight);
	canvas_dst.setUnit(GuiBlocks.UNIT_TYPE.PX);
	canvas_dst.setSize(canvasWidth, canvasHeight);
	
	// 画像選択
	const label1 = new GuiBlocks.Label("使用画像");
	panel.put(label1, GuiBlocks.PUT_TYPE.IN);
	const picturetype = [
		"./resource/image_parrots.jpg",
		"./resource/image_mandrill.jpg",
		"./resource/image_girl.jpg",
		"./resource/image_lenna.jpg",
		"./resource/image_test1.jpg",
		"./resource/sampleimage.png",
		"./resource/image_wg.png"
	];
	const cb_picturetype = new GuiBlocks.ComboBox(picturetype);
	cb_picturetype.setWidth(32);
	label1.put(cb_picturetype, GuiBlocks.PUT_TYPE.RIGHT);
	cb_picturetype.addListener(function () {
		canvas_src.putImage(cb_picturetype.getSelectedItem());
	});
	canvas_src.putImage(picturetype[0], true);
	
	// 入力画像表示
	const label2 = new GuiBlocks.Label("入力画像");
	cb_picturetype.put(label2, GuiBlocks.PUT_TYPE.NEWLINE);
	label2.put(canvas_src, GuiBlocks.PUT_TYPE.RIGHT);
	
	// 処理の種類
	const label3 = new GuiBlocks.Label("処理の種類");
	canvas_src.put(label3, GuiBlocks.PUT_TYPE.NEWLINE);
	const filtertype = [
		"ソフト",
		"シャープ",
		"グレースケール",
		"ノーマルマップ",
		"ガウシアンフィルタ",
		"バイラテラルフィルタ",
		"レンズフィルタ",
		"アンシャープ",
		"単純減色",
		"組織的ディザ法による減色",
		"誤差拡散法による減色"
	];
	const cb_filtertype = new GuiBlocks.ComboBox(filtertype);
	cb_filtertype.setWidth(32);
	label3.put(cb_filtertype, GuiBlocks.PUT_TYPE.RIGHT);
	
	// 実行ボタン（選択に応じて処理）
	const button = new GuiBlocks.Button("実行");
	cb_filtertype.put(button, GuiBlocks.PUT_TYPE.RIGHT);
	button.addListener(function() {
		const src = new PixelProcessing.DataRGBA(canvas_src.getImageData());
		if(cb_filtertype.getSelectedItem() === filtertype[0]) {
			src.setWrapMode(PixelProcessing.MODE_WRAP.CLAMP);
			src.filterBlur(7); // ブラー（ぼかし）
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[1]) {
			src.setWrapMode(PixelProcessing.MODE_WRAP.CLAMP);
			src.filterSharp(0.5); // シャープ
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[2]) {
			src.grayscale(); // グレースケール化
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[3]) {
			src.grayscale();
			const height = new PixelProcessing.DataY(src);
			height.setWrapMode(PixelProcessing.MODE_WRAP.REPEAT);
			height.filterGaussian(5);
			canvas_dst.putImageData(height.getNormalMap().getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[4]) {
			src.setWrapMode(PixelProcessing.MODE_WRAP.CLAMP);
			src.filterGaussian(7); // ガウシアンぼかし
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[5]) {
			src.setWrapMode(PixelProcessing.MODE_WRAP.CLAMP);
			src.filterBilateral(5, 0.8); // バイラテラルフィルタ
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[6]) {
			src.setWrapMode(PixelProcessing.MODE_WRAP.CLAMP);
			src.filterSoftLens(5, 1.2); // ソフトレンズ風
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[7]) {
			src.setWrapMode(PixelProcessing.MODE_WRAP.CLAMP);
			src.filterUnSharp(7, 1); // アンシャープ
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[8]) {
			src.filterQuantizationSimple(64); // 減色（単純）
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[9]) {
			src.filterQuantizationOrdered(64); // 減色（ディザ）
			canvas_dst.putImageData(src.getImageData());
		}
		else if(cb_filtertype.getSelectedItem() === filtertype[10]) {
			src.filterQuantizationDiffusion(64); // 減色（誤差拡散）
			canvas_dst.putImageData(src.getImageData());
		}
	});
	
	// 結果画像表示
	const label4 = new GuiBlocks.Label("結果画像");
	button.put(label4, GuiBlocks.PUT_TYPE.NEWLINE);
	label4.put(canvas_dst, GuiBlocks.PUT_TYPE.RIGHT);
}

/**
 * サンプルデモのエントリポイント
 * PixelProcessingの機能をGUIから色々試せます
 */
const main = function() {
	
	console.log("PixelProcessing クラスのサンプル");
	const mainpanel = new GuiBlocks.Panel();
	mainpanel.putMe("scomponent", GuiBlocks.PUT_TYPE.IN);
	
	const label = new GuiBlocks.Label("ImageProcessing のテストです");
	mainpanel.put(label, GuiBlocks.PUT_TYPE.IN);
	
	// 機能選択コンボボックス
	const combobox_type = [
		"画像ファイルの読み込み",
		"データの読み書き",
		"画像補間",
		"ブレンド",
		"そのほかいろいろ"
	];
	const combobox = new GuiBlocks.ComboBox(combobox_type);
	combobox.setWidth(20);
	label.put(combobox, GuiBlocks.PUT_TYPE.NEWLINE);
	
	combobox.addListener(function () {
		const item = combobox.getSelectedItem();
		
		if(item === combobox_type[0]) {
			testFileLoad(testpanel);
		}
		else if(item === combobox_type[1]) {
			testWritePixel(testpanel);
		}
		else if(item === combobox_type[2]) {
			testInterpolation(testpanel);
		}
		else if(item === combobox_type[3]) {
			testBlending(testpanel);
		}
		else if(item === combobox_type[4]) {
			testEtc(testpanel);
		}
	});
	
	const testpanel = new GuiBlocks.Panel();
	mainpanel.put(testpanel, GuiBlocks.PUT_TYPE.NEWLINE);
	
	combobox.setSelectedItem(combobox_type[4]);
	testEtc(testpanel);
};

main();

