let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.10-20231023/packages.dhall
        sha256:b9a482e743055ba8f2d65b08a88cd772b59c6e2084d0e5ad854025fa90417fd4

in  upstream
      with spec-mocha =
        { dependencies =   
          [ "aff"
          , "datetime"
          , "effect"
          , "either"
          , "foldable-traversable"
          , "maybe"
          , "prelude"
          , "spec"
          ]
        , repo = "https://github.com/jmatsushita/purescript-spec-mocha"
        , version = "master"
        }
