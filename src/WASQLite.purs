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
closeDB = Internal._closeDB >>> Promise.toAffE

queryDB :: DBConnection -> Query -> Array Param -> Aff Foreign
queryDB db q p = Promise.toAffE $ Internal._queryDB db q p


-- | fairly unsafe function for using an object with a query, see https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
queryObjectDB :: forall params. DBConnection -> Query -> { | params } -> Aff Foreign
queryObjectDB conn query params = makeAff \cb ->
  mempty <$
    EU.runEffectFn5 Internal._queryObjectDB conn query params
      (EU.mkEffectFn1 $ cb <<< Left)
      (EU.mkEffectFn1 $ cb <<< Right)
