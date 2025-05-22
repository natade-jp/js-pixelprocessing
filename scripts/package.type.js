import NTFile from "ntfile";

NTFile.exec("npx tsc -p ./scripts/tsconfig.json");
NTFile.copy("./build/type/PixelProcessing.d.ts", "./build/cjs/PixelProcessing.min.d.ts");
NTFile.copy("./build/type/PixelProcessing.d.ts", "./build/umd/PixelProcessing.min.d.ts");
NTFile.copy("./build/type/PixelProcessing.d.ts", "./build/esm/PixelProcessing.min.d.ts");
