module WASQLite (
  module InternalExported,
  newDB,
  closeDB,
  queryDB,
  queryObjectDB
) where

import Prelude

import Data.Either (Either(..))
import Effect.Aff (Aff, makeAff)
import Effect.Uncurried as EU
import Foreign (Foreign)
import WASQLite.Internal as Internal
import WASQLite.Internal (FilePath, Query, Param, DBConnection)
import WASQLite.Internal (FilePath, Query, Param, DBConnection) as InternalExported

import Promise.Aff as Promise

newDB :: FilePath -> Aff DBConnection
newDB = Internal._newDB >>> Promise.toAffE

closeDB :: DBConnection -> Aff Unit
closeDB conn = makeAff \cb ->
  mempty <$ EU.runEffectFn3 Internal._closeDB conn
    (EU.mkEffectFn1 $ cb <<< Left)
    (cb $ Right unit)

queryDB :: DBConnection -> Query -> Array Param -> Aff Foreign
queryDB conn query params = makeAff \cb ->
  mempty <$
    EU.runEffectFn5 Internal._queryDB conn query params
      (EU.mkEffectFn1 $ cb <<< Left)
      (EU.mkEffectFn1 $ cb <<< Right)

-- | fairly unsafe function for using an object with a query, see https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
queryObjectDB :: forall params. DBConnection -> Query -> { | params } -> Aff Foreign
queryObjectDB conn query params = makeAff \cb ->
  mempty <$
    EU.runEffectFn5 Internal._queryObjectDB conn query params
      (EU.mkEffectFn1 $ cb <<< Left)
      (EU.mkEffectFn1 $ cb <<< Right)
