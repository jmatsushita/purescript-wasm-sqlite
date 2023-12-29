import initWasm from "@vlcn.io/crsqlite-wasm";
// import wasmUrl from "../../node_modules/@vlcn.io/crsqlite-wasm/dist/crsqlite.wasm";

const sqlite = await initWasm();

export const _open = (filename) => () => sqlite.open(filename);

export const _close = (db) => () => db.close();

export const _exec = (db) => (query) => (params) => () =>
  db.execA(query, params);

export const _execA = (db) => (query) => (params) => () =>
  db.execA(query, params);

export const _execO = (db) => (query) => (params) => () =>
  db.execO(query, params);
