import esbuild from "esbuild";
import { wasmLoader } from "esbuild-plugin-wasm";

esbuild.build({
  entryPoints: ["output/Test.Main/index.js"],
  bundle: true,
  target: "esnext",
  format: "esm",
  outfile: "./output/test.js",
  plugins: [wasmLoader()],
});
