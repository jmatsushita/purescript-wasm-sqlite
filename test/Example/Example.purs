module Example where

import Prelude

import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Aff (Aff, bracket, error, launchAff_, throwError)
import Effect.Class (liftEffect)
import Effect.Console (logShow)
import Foreign (readInt)
import WASQLite (close, open, execA)

query :: Aff (Array (Array Int)) 
query = bracket (open ":memory:") close \db -> do
  res <- execA db "SELECT 1 + 1" []
  case runExcept $ (traverse <<< traverse) readInt res of
    Left err -> throwError $ error $ show err
    Right ints -> pure ints

main :: Effect Unit
main = launchAff_ do
  res <- query
  liftEffect $ logShow res
  -- [[2]]
