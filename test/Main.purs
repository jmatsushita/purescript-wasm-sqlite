module Test.Main where

import Prelude

import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Aff (bracket, error, throwError)
import Foreign (readArray, readInt)
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Mocha (runMocha)
import WASQLite (closeDB, newDB, queryDB)

main :: Effect Unit
main = runMocha do

  describe ":memory:" $ do
    describe "it should open and close" $ do
      it "runs newDB" do
        _ <- newDB ":memory:"
        "ok" `shouldEqual` "ok"

      it "runs newDB and closeDB " do
        db <- newDB ":memory:"
        _ <- closeDB db
        "ok" `shouldEqual` "ok"

    describe "it should query" $ do
      it "runs basic queryDB" do
        bracket (newDB ":memory:") closeDB \db -> do
          res <- queryDB db "SELECT 1 + 1" []
          case runExcept $ (traverse <<< traverse) readInt =<< traverse readArray =<< readArray res of
            Left err -> throwError $ error $ show err
            Right ints -> ints `shouldEqual` [[2]]
