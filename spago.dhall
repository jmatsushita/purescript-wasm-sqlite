{ name = "purescript-wasm-sqlite"
, dependencies =
  [ "aff"
  , "console"
  , "effect"
  , "either"
  , "foldable-traversable"
  , "foreign"
  , "js-promise-aff"
  , "prelude"
  , "spec"
  , "spec-mocha"
  , "transformers"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
