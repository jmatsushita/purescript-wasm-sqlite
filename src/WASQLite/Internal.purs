module WASQLite.Internal (
  FilePath,
  Query,
  Param,
  DBConnection,
  _open,
  _close,
  _exec,
  _execA,
  _execO
) where

import Prelude

import Effect (Effect)
import Foreign (Foreign)
import Promise.Aff (Promise)

type FilePath = String
type Query = String
type Param = Foreign

foreign import data DBConnection :: Type

foreign import _open :: FilePath -> Effect (Promise DBConnection)

foreign import _close :: DBConnection -> Effect (Promise Unit)

foreign import _exec :: DBConnection -> Query -> Array Param -> Effect (Promise Unit)

foreign import _execA :: DBConnection -> Query -> Array Param -> Effect (Promise Foreign)

foreign import _execO :: DBConnection -> Query -> Array Param -> Effect (Promise Foreign)

