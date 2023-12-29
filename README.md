# purescript-wasm-sqlite

Bindings for Sqlite3 in the browser with wa-sqlite or cr-sqlite.

NOTE: Use `purescript-node-sqlite3` in nodejs, this module will only work in the browser (or possibly another wasm runtime). 

## Usage

```purescript
import Prelude

import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Aff (Aff, bracket, error, launchAff_, throwError)
import Effect.Class (liftEffect)
import Effect.Console (logShow)
import Foreign (readArray, readInt)
import WASQLite (closeDB, newDB, queryDB)

query :: Aff (Array (Array Int)) 
query = bracket (newDB ":memory:") closeDB \db -> do
  res <- queryDB db "SELECT 1 + 1" []
  case runExcept $ (traverse <<< traverse) readInt =<< traverse readArray =<< readArray res of
    Left err -> throwError $ error $ show err
    Right ints -> pure ints

main :: Effect Unit
main = launchAff_ do
  res <- query
  liftEffect $ logShow res
  -- [[2]]
```

To bundle and run this in the browser here's an option:
```bash
spago bundle-module -m Example --to test/Example/bundle.js
# for now you need to manually copy the wasm file in the bundle's directory.
cp node_modules/@vlcn.io/crsqlite-wasm/dist/crsqlite.wasm test/Example
# run a webserver and open the default browser
yarn dlx http-server test/Example -o /
```

You should see `[[2]]` in the dev console.

## Run tests

```bash
# In one window run which will open a browser window
yarn test:browser
# In another run the purscript compiler and rebundle on changes
yarn test:watch
```

## TODOS

 - [x] rename exports to reflect the low level api.
 - [x] implement `execO`/`execA`
 - [ ] implement binding params
 - [ ] fix wasm loading
 - [ ] implement prepared statements
