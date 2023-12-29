module Test.Main where

import Prelude

import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Aff (delay)
import Test.Spec (describe, it, pending)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Mocha (runMocha)
import WASQLite (newDB)

main :: Effect Unit
main = runMocha do
  describe "it should create a new connection" $
    it "runs newDB with :memory: path" do
      _ <- newDB ":memory:"
      "ok" `shouldEqual` "ok"
