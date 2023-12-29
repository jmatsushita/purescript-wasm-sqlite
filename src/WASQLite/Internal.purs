module WASQLite.Internal (
  FilePath,
  Query,
  Param,
  DBConnection,
  _newDB,
  _closeDB,
  _queryDB,
  _queryObjectDB
) where

import Prelude

import Effect (Effect)
import Effect.Exception (Error)
import Effect.Uncurried as EU
import Foreign (Foreign)
import Promise.Aff (Promise)

type FilePath = String
type Query = String
type Param = Foreign

foreign import data DBConnection :: Type

foreign import _newDB :: FilePath -> Effect (Promise DBConnection)

foreign import _closeDB :: DBConnection -> Effect (Promise Unit)

foreign import _queryDB :: DBConnection -> Query -> Array Param -> Effect (Promise Foreign)

foreign import _queryObjectDB :: forall params.
  EU.EffectFn5
    DBConnection
    Query
    { | params}
    (EU.EffectFn1 Error Unit)
    (EU.EffectFn1 Foreign Unit)
    Unit
