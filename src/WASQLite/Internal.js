import initWasm from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";

const sqlite = await initWasm(() => wasmUrl);

export function _newDB(filename) {
  return function () {
    return sqlite.open(filename);
  };
}

export function _closeDB(db, eb, cb) {
  db.close(function (err) {
    if (err) {
      eb(err);
    } else {
      cb();
    }
  });
}

export function _queryDB(db, query, params, eb, cb) {
  db.all.apply(
    db,
    [query].concat(
      params.concat(function (err, rows) {
        if (err) {
          eb(err);
        } else {
          cb(rows);
        }
      })
    )
  );
}

export function _queryObjectDB(db, query, params, eb, cb) {
  db.all(query, params, function (err, rows) {
    if (err) {
      eb(err);
    } else {
      cb(rows);
    }
  });
}
