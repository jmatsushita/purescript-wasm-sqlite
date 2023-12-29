module WASQLite (
  module InternalExported,
  open,
  close,
  exec,
  execA,
  execO
) where

import Prelude

import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Data.Traversable (traverse)
import Effect.Aff (Aff, error, throwError)
import Foreign (Foreign, readArray)
import Promise.Aff as Promise
import WASQLite.Internal (FilePath, Query, Param, DBConnection)
import WASQLite.Internal (FilePath, Query, Param, DBConnection) as InternalExported
import WASQLite.Internal as Internal

open :: FilePath -> Aff DBConnection
open = Internal._open >>> Promise.toAffE

close :: DBConnection -> Aff Unit
close = Internal._close >>> Promise.toAffE

exec :: DBConnection -> Query -> Array Param -> Aff Unit
exec db q p = Promise.toAffE $ Internal._exec db q p

execA :: DBConnection -> Query -> Array Param -> Aff (Array (Array Foreign))
execA db q p = do
  res <- Promise.toAffE $ Internal._execA db q p
  case runExcept (traverse readArray =<< readArray res) of
    Left err -> throwError $ error $ show err
    Right r -> pure r

execO :: DBConnection -> Query -> Array Param -> Aff (Array Foreign)
execO db q p = do
  res <- Promise.toAffE $ Internal._execO db q p
  case runExcept (readArray res) of
    Left err -> throwError $ error $ show err
    Right r -> pure r
