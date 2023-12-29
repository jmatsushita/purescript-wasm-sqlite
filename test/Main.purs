module Test.Main where

import Prelude

import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Aff (bracket, error, throwError)
import Foreign (Foreign, readInt, unsafeToForeign)
import Foreign.Index ((!))
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Mocha (runMocha)
import WASQLite (open, close, exec, execA, execO) as WASQLite

main :: Effect Unit
main = runMocha do

  describe ":memory:" $ do
    describe "it should open and close" $ do
      it "runs WASQLite.open" do
        _ <- WASQLite.open ":memory:"
        "ok" `shouldEqual` "ok"

      it "runs WASQLite.open and WASQLite.close " do
        db <- WASQLite.open ":memory:"
        _ <- WASQLite.close db
        "ok" `shouldEqual` "ok"

    describe "it should query" $ do
      it "runs a basic query with WASQLite.exec" do
        bracket (WASQLite.open ":memory:") WASQLite.close \db -> do
          res <- WASQLite.exec db "SELECT 1 + 1" []
          res `shouldEqual` unit

      it "runs a basic query with WASQLite.execA" do
        bracket (WASQLite.open ":memory:") WASQLite.close \db -> do
          res <- WASQLite.execA db "SELECT 1 + 1" []
          case runExcept $ (traverse <<< traverse) readInt res of
            Left err -> throwError $ error $ show err
            Right ints -> ints `shouldEqual` [[2]]

      it "runs a select query with WASQLite.execO" do
        bracket (WASQLite.open ":memory:") WASQLite.close \db -> do
          res <- WASQLite.execO db "SELECT 1 + 1" []
          let read val = val ! "1 + 1" >>= readInt
          case runExcept $ traverse read res of
            Left err -> throwError $ error $ show err
            Right ints -> ints `shouldEqual` [2]

      it "runs a select query with column alias with WASQLite.execO" do
        bracket (WASQLite.open ":memory:") WASQLite.close \db -> do
          res <- WASQLite.execO db "SELECT 1 + 1 as res" []
          let read val = val ! "res" >>= readInt
          case runExcept $ traverse read res of
            Left err -> throwError $ error $ show err
            Right ints -> ints `shouldEqual` [2]

    describe "it should bind parameters" $ do
      it "with WASQLite.execO" do
        bracket (WASQLite.open ":memory:") WASQLite.close \db -> do
          res <- WASQLite.execO db "SELECT 2 + ? as res" [(unsafeToForeign 2 :: Foreign)]
          let read val = val ! "res" >>= readInt
          case runExcept $ traverse read res of
            Left err -> throwError $ error $ show err
            Right ints -> ints `shouldEqual` [4]
