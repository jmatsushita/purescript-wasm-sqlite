{ name = "purescript-wasm-sqlite"
, dependencies =
  [ "aff"
  , "datetime"
  , "effect"
  , "either"
  , "exceptions"
  , "foreign"
  , "js-promise-aff"
  , "prelude"
  , "spec"
  , "spec-mocha"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
