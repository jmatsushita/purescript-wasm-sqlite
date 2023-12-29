import initWasm from "@vlcn.io/crsqlite-wasm";
// import wasmUrl from "../../node_modules/@vlcn.io/crsqlite-wasm/dist/crsqlite.wasm";

const sqlite = await initWasm();

export const _newDB = (filename) => () => sqlite.open(filename);

export const _closeDB = (db) => () => db.close();

export const _queryDB = (db) => (query) => (params) => () =>
  db.exec(query, params);

export function _queryObjectDB(db, query, params, eb, cb) {
  db.all(query, params, function (err, rows) {
    if (err) {
      eb(err);
    } else {
      cb(rows);
    }
  });
}
