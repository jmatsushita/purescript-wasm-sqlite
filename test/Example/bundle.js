// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Boolean/index.js
var otherwise = true;

// output/Data.Function/index.js
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var voidRight = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return function(x) {
    return map12($$const(x));
  };
};
var functorArray = {
  map: arrayMap
};

// output/Control.Apply/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var apply = function(dict) {
  return dict.apply;
};
var applySecond = function(dictApply) {
  var apply1 = apply(dictApply);
  var map6 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map6($$const(identity2))(a))(b);
    };
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var liftA1 = function(dictApplicative) {
  var apply2 = apply(dictApplicative.Apply0());
  var pure1 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply2(pure1(f))(a);
    };
  };
};

// output/Control.Bind/index.js
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};

// output/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};

// output/Data.Semigroup/index.js
var semigroupString = {
  append: concatString
};
var append = function(dict) {
  return dict.append;
};

// output/Control.Alt/index.js
var alt = function(dict) {
  return dict.alt;
};

// output/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showStringImpl = function(s) {
  var l = s.length;
  return '"' + s.replace(
    /[\0-\x1F\x7F"\\]/g,
    // eslint-disable-line no-control-regex
    function(c, i) {
      switch (c) {
        case '"':
        case "\\":
          return "\\" + c;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k = i + 1;
      var empty2 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty2;
    }
  ) + '"';
};
var showArrayImpl = function(f) {
  return function(xs) {
    var ss = [];
    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }
    return "[" + ss.join(",") + "]";
  };
};

// output/Data.Show/index.js
var showString = {
  show: showStringImpl
};
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};
var showArray = function(dictShow) {
  return {
    show: showArrayImpl(show(dictShow))
  };
};

// output/Data.Maybe/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe$prime = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v(unit);
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 250, column 1 - line 250, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var fromMaybe$prime = function(a) {
  return maybe$prime(a)(identity3);
};
var altMaybe = {
  alt: function(v) {
    return function(v1) {
      if (v instanceof Nothing) {
        return v1;
      }
      ;
      return v;
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  ;
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  ;
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      ;
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var map2 = /* @__PURE__ */ map(functorEither);
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var hush = /* @__PURE__ */ function() {
  return either($$const(Nothing.value))(Just.create);
}();
var applyEither = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      ;
      if (v instanceof Right) {
        return map2(v.value0)(v1);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorEither;
  }
};
var applicativeEither = /* @__PURE__ */ function() {
  return {
    pure: Right.create,
    Apply0: function() {
      return applyEither;
    }
  };
}();

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind4 = bind(dictMonad.Bind1());
  var pure5 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind4(f)(function(f$prime) {
        return bind4(a)(function(a$prime) {
          return pure5(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Monoid/index.js
var monoidString = {
  mempty: "",
  Semigroup0: function() {
    return semigroupString;
  }
};
var mempty = function(dict) {
  return dict.mempty;
};

// output/Effect/index.js
var $runtime_lazy = function(name2, moduleName, init2) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init2();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

// output/Effect.Exception/foreign.js
function error(msg) {
  return new Error(msg);
}

// output/Control.Monad.Error.Class/index.js
var throwError = function(dict) {
  return dict.throwError;
};

// output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var bindIdentity = {
  bind: function(v) {
    return function(f) {
      return f(v);
    };
  },
  Apply0: function() {
    return applyIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};
var monadIdentity = {
  Applicative0: function() {
    return applicativeIdentity;
  },
  Bind1: function() {
    return bindIdentity;
  }
};

// output/Effect.Class/index.js
var liftEffect = function(dict) {
  return dict.liftEffect;
};

// output/Control.Monad.Except.Trans/index.js
var map3 = /* @__PURE__ */ map(functorEither);
var ExceptT = function(x) {
  return x;
};
var runExceptT = function(v) {
  return v;
};
var mapExceptT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorExceptT = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return {
    map: function(f) {
      return mapExceptT(map12(map3(f)));
    }
  };
};
var monadExceptT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeExceptT(dictMonad);
    },
    Bind1: function() {
      return bindExceptT(dictMonad);
    }
  };
};
var bindExceptT = function(dictMonad) {
  var bind4 = bind(dictMonad.Bind1());
  var pure5 = pure(dictMonad.Applicative0());
  return {
    bind: function(v) {
      return function(k) {
        return bind4(v)(either(function($187) {
          return pure5(Left.create($187));
        })(function(a) {
          var v1 = k(a);
          return v1;
        }));
      };
    },
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var applyExceptT = function(dictMonad) {
  var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: ap(monadExceptT(dictMonad)),
    Functor0: function() {
      return functorExceptT1;
    }
  };
};
var applicativeExceptT = function(dictMonad) {
  return {
    pure: function() {
      var $188 = pure(dictMonad.Applicative0());
      return function($189) {
        return ExceptT($188(Right.create($189)));
      };
    }(),
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var monadThrowExceptT = function(dictMonad) {
  var monadExceptT1 = monadExceptT(dictMonad);
  return {
    throwError: function() {
      var $198 = pure(dictMonad.Applicative0());
      return function($199) {
        return ExceptT($198(Left.create($199)));
      };
    }(),
    Monad0: function() {
      return monadExceptT1;
    }
  };
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var unwrap = function() {
  return coerce2;
};

// output/Control.Monad.Except/index.js
var unwrap2 = /* @__PURE__ */ unwrap();
var runExcept = function($3) {
  return unwrap2(runExceptT($3));
};

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init2) {
    return function(xs) {
      var acc = init2;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init2) {
    return function(xs) {
      var acc = init2;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Control.Plus/index.js
var empty = function(dict) {
  return dict.empty;
};

// output/Data.Foldable/index.js
var foldr = function(dict) {
  return dict.foldr;
};
var traverse_ = function(dictApplicative) {
  var applySecond2 = applySecond(dictApplicative.Apply0());
  var pure5 = pure(dictApplicative);
  return function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(f) {
      return foldr22(function($454) {
        return applySecond2(f($454));
      })(pure5(unit));
    };
  };
};
var foldl = function(dict) {
  return dict.foldl;
};
var intercalate = function(dictFoldable) {
  var foldl2 = foldl(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(sep) {
      return function(xs) {
        var go = function(v) {
          return function(v1) {
            if (v.init) {
              return {
                init: false,
                acc: v1
              };
            }
            ;
            return {
              init: false,
              acc: append2(v.acc)(append2(sep)(v1))
            };
          };
        };
        return foldl2(go)({
          init: true,
          acc: mempty3
        })(xs).acc;
      };
    };
  };
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr22 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(f) {
      return foldr22(function(x) {
        return function(acc) {
          return append2(f(x))(acc);
        };
      })(mempty3);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = /* @__PURE__ */ function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply2) {
    return function(map6) {
      return function(pure5) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure5([]);
                case 1:
                  return map6(array1)(f(array[bot]));
                case 2:
                  return apply2(map6(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply2(apply2(map6(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply2(map6(concat2)(go(bot, pivot)))(go(pivot, top2));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  var traverse22 = traverse(dictTraversable);
  return function(dictApplicative) {
    return traverse22(dictApplicative)(identity4);
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};

// output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var singleton2 = function(dictPlus) {
  var empty2 = empty(dictPlus);
  return function(a) {
    return new NonEmpty(a, empty2);
  };
};
var showNonEmpty = function(dictShow) {
  var show4 = show(dictShow);
  return function(dictShow1) {
    var show12 = show(dictShow1);
    return {
      show: function(v) {
        return "(NonEmpty " + (show4(v.value0) + (" " + (show12(v.value1) + ")")));
      }
    };
  };
};

// output/Data.List.Types/index.js
var Nil = /* @__PURE__ */ function() {
  function Nil2() {
  }
  ;
  Nil2.value = new Nil2();
  return Nil2;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cons2.create = function(value0) {
    return function(value1) {
      return new Cons2(value0, value1);
    };
  };
  return Cons2;
}();
var NonEmptyList = function(x) {
  return x;
};
var listMap = function(f) {
  var chunkedRevMap = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v, v1) {
        if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
          $tco_var_v = new Cons(v1, v);
          $copy_v1 = v1.value1.value1.value1;
          return;
        }
        ;
        var unrolledMap = function(v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
            return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
          }
          ;
          if (v2 instanceof Cons && v2.value1 instanceof Nil) {
            return new Cons(f(v2.value0), Nil.value);
          }
          ;
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v2) {
          return function($copy_v3) {
            var $tco_var_v2 = $copy_v2;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v2, v3) {
              if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                $tco_var_v2 = v2.value1;
                $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                return;
              }
              ;
              $tco_done1 = true;
              return v3;
            }
            ;
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
            }
            ;
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(v)(unrolledMap(v1));
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var map4 = /* @__PURE__ */ map(functorList);
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return v;
              }
              ;
              if (v1 instanceof Cons) {
                $tco_var_v = new Cons(v1.value0, v);
                $copy_v1 = v1.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $284 = foldl(foldableList)(flip(f))(b);
      return function($285) {
        return $284(rev($285));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $286 = append2(acc);
        return function($287) {
          return $286(f($287));
        };
      })(mempty3);
    };
  }
};
var foldr2 = /* @__PURE__ */ foldr(foldableList);
var intercalate2 = /* @__PURE__ */ intercalate(foldableList)(monoidString);
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr2(Cons.create)(ys)(xs);
    };
  }
};
var append1 = /* @__PURE__ */ append(semigroupList);
var showList = function(dictShow) {
  var show4 = show(dictShow);
  return {
    show: function(v) {
      if (v instanceof Nil) {
        return "Nil";
      }
      ;
      return "(" + (intercalate2(" : ")(map4(show4)(v)) + " : Nil)");
    }
  };
};
var showNonEmptyList = function(dictShow) {
  var show4 = show(showNonEmpty(dictShow)(showList(dictShow)));
  return {
    show: function(v) {
      return "(NonEmptyList " + (show4(v) + ")");
    }
  };
};
var altList = {
  alt: append1,
  Functor0: function() {
    return functorList;
  }
};
var plusList = /* @__PURE__ */ function() {
  return {
    empty: Nil.value,
    Alt0: function() {
      return altList;
    }
  };
}();

// output/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler2(error3) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error3) {
      setTimeout(function() {
        throw error3;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error3) {
      return left(error3);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error3) {
      k(left(error3))();
      return nonCanceler2;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size !== 0) {
        size--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size) % limit] = cb;
        size++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function() {
                    throw util.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error3) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util, supervisor, aff) {
    var runTick = 0;
    var status = SUSPENDED;
    var step = aff;
    var fail2 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run2(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status) {
          case STEP_BIND:
            status = CONTINUE;
            try {
              step = bhead(step);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail2 = util.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step)) {
              status = RETURN;
              fail2 = step;
              step = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step = util.fromRight(step);
            }
            break;
          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step._2;
                status = CONTINUE;
                step = step._1;
                break;
              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step = util.right(step._1);
                } else {
                  status = STEP_BIND;
                  step = step._1;
                }
                break;
              case SYNC:
                status = STEP_RESULT;
                step = runSync(util.left, util.right, step._1);
                break;
              case ASYNC:
                status = PENDING;
                step = runAsync(util.left, step._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status = STEP_RESULT;
                      step = result2;
                      run2(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status = RETURN;
                fail2 = util.left(step._1);
                step = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util, supervisor, step._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step._1) {
                  tmp.run();
                }
                step = util.right(tmp);
                break;
              case SEQ:
                status = CONTINUE;
                step = sequential2(util, supervisor, step._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status = COMPLETED;
              step = interrupt || fail2 || step;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail2) {
                    status = CONTINUE;
                    step = attempt._2(util.fromLeft(fail2));
                    fail2 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step = util.fromRight(step);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail2 === null) {
                    result = util.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail2) {
                    step = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                  } else {
                    step = attempt._1.completed(util.fromRight(step))(attempt._2);
                  }
                  fail2 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail2 = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }
            joins = null;
            if (interrupt && fail2) {
              setTimeout(function() {
                throw util.fromLeft(fail2);
              }, 0);
            } else if (util.isLeft(step) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util.fromLeft(step);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join3) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join3.rethrow;
          join3.handler(step)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join3;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill(error3, cb) {
      return function() {
        if (status === COMPLETED) {
          cb(util.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util.right(void 0));
          }
        })();
        switch (status) {
          case SUSPENDED:
            interrupt = util.left(error3);
            status = COMPLETED;
            step = interrupt;
            run2(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error3);
            }
            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error3)), attempts, interrupt);
              }
              status = RETURN;
              step = null;
              fail2 = null;
              run2(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util.left(error3);
            }
            if (bracketCount === 0) {
              status = RETURN;
              step = null;
              fail2 = null;
            }
        }
        return canceler;
      };
    }
    function join2(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status === SUSPENDED) {
          run2(runTick);
        }
        return canceler;
      };
    }
    return {
      kill,
      join: join2,
      onComplete,
      isSuspended: function() {
        return status === SUSPENDED;
      },
      run: function() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run2(runTick);
            });
          } else {
            run2(runTick);
          }
        }
      }
    };
  }
  function runPar(util, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill(error3, par2, cb2) {
      var step = par2;
      var head = null;
      var tail = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error3, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head === null) {
                break loop;
              }
              step = head._2;
              if (tail === null) {
                head = null;
              } else {
                head = tail._1;
                tail = tail._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head) {
                tail = new Aff2(CONS, head, tail);
              }
              head = step;
              step = step._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join2(result, head, tail) {
      var fail2, step, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail2 = result;
        step = null;
      } else {
        step = result;
        fail2 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head === null) {
            cb(fail2 || step)();
            return;
          }
          if (head._3 !== EMPTY) {
            return;
          }
          switch (head.tag) {
            case MAP:
              if (fail2 === null) {
                head._3 = util.right(head._1(util.fromRight(step)));
                step = head._3;
              } else {
                head._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head._1._3;
              rhs = head._2._3;
              if (fail2) {
                head._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail2 === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join2(fail2, null, null);
                    } else {
                      join2(fail2, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head._3 = step;
              }
              break;
            case ALT:
              lhs = head._1._3;
              rhs = head._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail2 = step === lhs ? rhs : lhs;
                step = null;
                head._3 = fail2;
              } else {
                head._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join2(step, null, null);
                    } else {
                      join2(step, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail === null) {
            head = null;
          } else {
            head = tail._1;
            tail = tail._2;
          }
        }
    }
    function resolve4(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join2(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run2() {
      var status = CONTINUE;
      var step = par;
      var head = null;
      var tail = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve4(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head === null) {
                break loop;
              }
              if (head._1 === EMPTY) {
                head._1 = step;
                status = CONTINUE;
                step = head._2;
                head._2 = EMPTY;
              } else {
                head._2 = step;
                step = head;
                if (tail === null) {
                  head = null;
                } else {
                  head = tail._1;
                  tail = tail._2;
                }
              }
          }
        }
      root = step;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error3, cb2) {
      interrupt = util.left(error3);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill(error3, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler2;
          };
        });
      };
    }
    run2();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential2(util, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler2;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value) {
        return Aff.Pure(f(value));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
var _liftEffect = Aff.Sync;
function _parAffMap(f) {
  return function(aff) {
    return Aff.ParMap(f, aff);
  };
}
function _parAffApply(aff1) {
  return function(aff2) {
    return Aff.ParApply(aff1, aff2);
  };
}
var makeAff = Aff.Async;
function generalBracket(acquire) {
  return function(options) {
    return function(k) {
      return Aff.Bracket(acquire, options, k);
    };
  };
}
function _makeFiber(util, aff) {
  return function() {
    return Aff.Fiber(util, null, aff);
  };
}
var _sequential = Aff.Seq;

// output/Control.Parallel.Class/index.js
var sequential = function(dict) {
  return dict.sequential;
};
var parallel = function(dict) {
  return dict.parallel;
};

// output/Control.Parallel/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var parTraverse_ = function(dictParallel) {
  var sequential2 = sequential(dictParallel);
  var parallel3 = parallel(dictParallel);
  return function(dictApplicative) {
    var traverse_2 = traverse_(dictApplicative);
    return function(dictFoldable) {
      var traverse_1 = traverse_2(dictFoldable);
      return function(f) {
        var $51 = traverse_1(function($53) {
          return parallel3(f($53));
        });
        return function($52) {
          return sequential2($51($52));
        };
      };
    };
  };
};
var parSequence_ = function(dictParallel) {
  var parTraverse_1 = parTraverse_(dictParallel);
  return function(dictApplicative) {
    var parTraverse_2 = parTraverse_1(dictApplicative);
    return function(dictFoldable) {
      return parTraverse_2(dictFoldable)(identity5);
    };
  };
};

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// output/Effect.Aff/index.js
var $runtime_lazy2 = function(name2, moduleName, init2) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init2();
    state2 = 2;
    return val;
  };
};
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var functorParAff = {
  map: _parAffMap
};
var functorAff = {
  map: _map
};
var ffiUtil = /* @__PURE__ */ function() {
  var unsafeFromRight = function(v) {
    if (v instanceof Right) {
      return v.value0;
    }
    ;
    if (v instanceof Left) {
      return unsafeCrashWith("unsafeFromRight: Left");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
  };
  var unsafeFromLeft = function(v) {
    if (v instanceof Left) {
      return v.value0;
    }
    ;
    if (v instanceof Right) {
      return unsafeCrashWith("unsafeFromLeft: Right");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
  };
  var isLeft = function(v) {
    if (v instanceof Left) {
      return true;
    }
    ;
    if (v instanceof Right) {
      return false;
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
  };
  return {
    isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Left.create,
    right: Right.create
  };
}();
var makeFiber = function(aff) {
  return _makeFiber(ffiUtil, aff);
};
var launchAff = function(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};
var launchAff_ = function($75) {
  return $$void2(launchAff($75));
};
var bracket = function(acquire) {
  return function(completed) {
    return generalBracket(acquire)({
      killed: $$const(completed),
      failed: $$const(completed),
      completed: $$const(completed)
    });
  };
};
var applyParAff = {
  apply: _parAffApply,
  Functor0: function() {
    return functorParAff;
  }
};
var monadAff = {
  Applicative0: function() {
    return applicativeAff;
  },
  Bind1: function() {
    return bindAff;
  }
};
var bindAff = {
  bind: _bind,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var applicativeAff = {
  pure: _pure,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
  return {
    apply: ap(monadAff),
    Functor0: function() {
      return functorAff;
    }
  };
});
var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
var pure2 = /* @__PURE__ */ pure(applicativeAff);
var parallelAff = {
  parallel: unsafeCoerce2,
  sequential: _sequential,
  Apply0: function() {
    return applyAff;
  },
  Apply1: function() {
    return applyParAff;
  }
};
var parallel2 = /* @__PURE__ */ parallel(parallelAff);
var applicativeParAff = {
  pure: function($76) {
    return parallel2(pure2($76));
  },
  Apply0: function() {
    return applyParAff;
  }
};
var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableArray);
var semigroupCanceler = {
  append: function(v) {
    return function(v1) {
      return function(err) {
        return parSequence_2([v(err), v1(err)]);
      };
    };
  }
};
var monadEffectAff = {
  liftEffect: _liftEffect,
  Monad0: function() {
    return monadAff;
  }
};
var monadThrowAff = {
  throwError: _throwError,
  Monad0: function() {
    return monadAff;
  }
};
var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));
var monoidCanceler = {
  mempty: nonCanceler,
  Semigroup0: function() {
    return semigroupCanceler;
  }
};

// output/Effect.Console/foreign.js
var log = function(s) {
  return function() {
    console.log(s);
  };
};

// output/Effect.Console/index.js
var logShow = function(dictShow) {
  var show4 = show(dictShow);
  return function(a) {
    return log(show4(a));
  };
};

// output/Foreign/foreign.js
function tagOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
var isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

// output/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};

// output/Data.Int/index.js
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();

// output/Data.List.NonEmpty/index.js
var singleton3 = /* @__PURE__ */ function() {
  var $200 = singleton2(plusList);
  return function($201) {
    return NonEmptyList($200($201));
  };
}();

// output/Foreign/index.js
var show2 = /* @__PURE__ */ show(showString);
var show1 = /* @__PURE__ */ show(showInt);
var pure3 = /* @__PURE__ */ pure(applicativeEither);
var ForeignError = /* @__PURE__ */ function() {
  function ForeignError2(value0) {
    this.value0 = value0;
  }
  ;
  ForeignError2.create = function(value0) {
    return new ForeignError2(value0);
  };
  return ForeignError2;
}();
var TypeMismatch = /* @__PURE__ */ function() {
  function TypeMismatch2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  TypeMismatch2.create = function(value0) {
    return function(value1) {
      return new TypeMismatch2(value0, value1);
    };
  };
  return TypeMismatch2;
}();
var ErrorAtIndex = /* @__PURE__ */ function() {
  function ErrorAtIndex2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ErrorAtIndex2.create = function(value0) {
    return function(value1) {
      return new ErrorAtIndex2(value0, value1);
    };
  };
  return ErrorAtIndex2;
}();
var ErrorAtProperty = /* @__PURE__ */ function() {
  function ErrorAtProperty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ErrorAtProperty2.create = function(value0) {
    return function(value1) {
      return new ErrorAtProperty2(value0, value1);
    };
  };
  return ErrorAtProperty2;
}();
var unsafeToForeign = unsafeCoerce2;
var unsafeFromForeign = unsafeCoerce2;
var showForeignError = {
  show: function(v) {
    if (v instanceof ForeignError) {
      return "(ForeignError " + (show2(v.value0) + ")");
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "(ErrorAtIndex " + (show1(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "(ErrorAtProperty " + (show2(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "(TypeMismatch " + (show2(v.value0) + (" " + (show2(v.value1) + ")")));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 69, column 1 - line 73, column 89): " + [v.constructor.name]);
  }
};
var fail = function(dictMonad) {
  var $153 = throwError(monadThrowExceptT(dictMonad));
  return function($154) {
    return $153(singleton3($154));
  };
};
var readArray = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(value) {
    if (isArray(value)) {
      return pure1(unsafeFromForeign(value));
    }
    ;
    if (otherwise) {
      return fail1(new TypeMismatch("array", tagOf(value)));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 164, column 1 - line 164, column 99): " + [value.constructor.name]);
  };
};
var unsafeReadTagged = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(tag) {
    return function(value) {
      if (tagOf(value) === tag) {
        return pure1(unsafeFromForeign(value));
      }
      ;
      if (otherwise) {
        return fail1(new TypeMismatch(tag, tagOf(value)));
      }
      ;
      throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value.constructor.name]);
    };
  };
};
var readNumber = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("Number");
};
var readInt = function(dictMonad) {
  var map6 = map(dictMonad.Bind1().Apply0().Functor0());
  var readNumber1 = readNumber(dictMonad);
  return function(value) {
    var error3 = new Left(singleton3(new TypeMismatch("Int", tagOf(value))));
    var fromNumber2 = function() {
      var $155 = maybe(error3)(pure3);
      return function($156) {
        return $155(fromNumber($156));
      };
    }();
    return mapExceptT(map6(either($$const(error3))(fromNumber2)))(readNumber1(value));
  };
};
var readString = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("String");
};

// output/Effect.Uncurried/foreign.js
var mkEffectFn1 = function mkEffectFn12(fn) {
  return function(x) {
    return fn(x)();
  };
};

// output/Promise.Internal/foreign.js
function thenOrCatch(k, c, p) {
  return p.then(k, c);
}
function resolve(a) {
  return Promise.resolve(a);
}

// output/Promise.Rejection/foreign.js
function _toError(just, nothing, ref) {
  if (ref instanceof Error) {
    return just(ref);
  }
  return nothing;
}

// output/Data.Function.Uncurried/foreign.js
var runFn3 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return fn(a, b, c);
      };
    };
  };
};

// output/Promise.Rejection/index.js
var toError = /* @__PURE__ */ function() {
  return runFn3(_toError)(Just.create)(Nothing.value);
}();

// output/Promise/index.js
var thenOrCatch2 = function() {
  return function(k) {
    return function(c) {
      return function(p) {
        return function() {
          return thenOrCatch(mkEffectFn1(k), mkEffectFn1(c), p);
        };
      };
    };
  };
};
var resolve2 = function() {
  return resolve;
};

// output/Promise.Aff/index.js
var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
var thenOrCatch3 = /* @__PURE__ */ thenOrCatch2();
var map5 = /* @__PURE__ */ map(functorEffect);
var resolve3 = /* @__PURE__ */ resolve2();
var alt2 = /* @__PURE__ */ alt(altMaybe);
var map1 = /* @__PURE__ */ map(functorMaybe);
var readString2 = /* @__PURE__ */ readString(monadIdentity);
var bind2 = /* @__PURE__ */ bind(bindAff);
var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
var toAff$prime = function(customCoerce) {
  return function(p) {
    return makeAff(function(cb) {
      return voidRight2(mempty2)(thenOrCatch3(function(a) {
        return map5(resolve3)(cb(new Right(a)));
      })(function(e) {
        return map5(resolve3)(cb(new Left(customCoerce(e))));
      })(p));
    });
  };
};
var coerce3 = function(rej) {
  return fromMaybe$prime(function(v) {
    return error("Promise failed, couldn't extract JS Error or String");
  })(alt2(toError(rej))(map1(error)(hush(runExcept(readString2(unsafeToForeign(rej)))))));
};
var toAff = /* @__PURE__ */ toAff$prime(coerce3);
var toAffE = function(f) {
  return bind2(liftEffect2(f))(toAff);
};

// node_modules/@vlcn.io/crsqlite-wasm/dist/crsqlite.mjs
var Module = (() => {
  var _scriptDir = import.meta.url;
  return function(moduleArg = {}) {
    var f = moduleArg, aa, ba;
    f.ready = new Promise((a, b) => {
      aa = a;
      ba = b;
    });
    var ca = Object.assign({}, f), da = "./this.program", ea = (a, b) => {
      throw b;
    }, fa = "object" == typeof window, ia = "function" == typeof importScripts, p = "", ja;
    if (fa || ia)
      ia ? p = self.location.href : "undefined" != typeof document && document.currentScript && (p = document.currentScript.src), _scriptDir && (p = _scriptDir), 0 !== p.indexOf("blob:") ? p = p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1) : p = "", ia && (ja = (a) => {
        var b = new XMLHttpRequest();
        b.open("GET", a, false);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response);
      });
    var ka = f.print || console.log.bind(console), t = f.printErr || console.error.bind(console);
    Object.assign(f, ca);
    ca = null;
    f.thisProgram && (da = f.thisProgram);
    f.quit && (ea = f.quit);
    var la;
    f.wasmBinary && (la = f.wasmBinary);
    var noExitRuntime = f.noExitRuntime || true;
    "object" != typeof WebAssembly && u("no native wasm support detected");
    var ma, v = false, na, w, y, oa, z, B, pa, qa;
    function ra() {
      var a = ma.buffer;
      f.HEAP8 = w = new Int8Array(a);
      f.HEAP16 = oa = new Int16Array(a);
      f.HEAPU8 = y = new Uint8Array(a);
      f.HEAPU16 = new Uint16Array(a);
      f.HEAP32 = z = new Int32Array(a);
      f.HEAPU32 = B = new Uint32Array(a);
      f.HEAPF32 = pa = new Float32Array(a);
      f.HEAPF64 = qa = new Float64Array(a);
    }
    var sa = [], ta = [], ua = [], va = [], wa = 0;
    function xa() {
      var a = f.preRun.shift();
      sa.unshift(a);
    }
    var C = 0, ya = null, za = null;
    function u(a) {
      if (f.onAbort)
        f.onAbort(a);
      a = "Aborted(" + a + ")";
      t(a);
      v = true;
      na = 1;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      ba(a);
      throw a;
    }
    function Aa(a) {
      return a.startsWith("data:application/octet-stream;base64,");
    }
    var Ba;
    if (f.locateFile) {
      if (Ba = "crsqlite.wasm", !Aa(Ba)) {
        var Ca = Ba;
        Ba = f.locateFile ? f.locateFile(Ca, p) : p + Ca;
      }
    } else
      Ba = new URL("crsqlite.wasm", import.meta.url).href;
    function Da(a) {
      if (a == Ba && la)
        return new Uint8Array(la);
      if (ja)
        return ja(a);
      throw "both async and sync fetching of the wasm failed";
    }
    function Ea(a) {
      return la || !fa && !ia || "function" != typeof fetch ? Promise.resolve().then(() => Da(a)) : fetch(a, { credentials: "same-origin" }).then((b) => {
        if (!b.ok)
          throw "failed to load wasm binary file at '" + a + "'";
        return b.arrayBuffer();
      }).catch(() => Da(a));
    }
    function Fa(a, b, c) {
      return Ea(a).then((d) => WebAssembly.instantiate(d, b)).then((d) => d).then(c, (d) => {
        t(`failed to asynchronously prepare wasm: ${d}`);
        u(d);
      });
    }
    function Ga(a, b) {
      var c = Ba;
      return la || "function" != typeof WebAssembly.instantiateStreaming || Aa(c) || "function" != typeof fetch ? Fa(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
        t(`wasm streaming compile failed: ${e}`);
        t("falling back to ArrayBuffer instantiation");
        return Fa(c, a, b);
      }));
    }
    var D, F;
    function Ha(a) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${a})`;
      this.status = a;
    }
    var Ia = (a) => {
      for (; 0 < a.length; )
        a.shift()(f);
    };
    function I(a, b = "i8") {
      b.endsWith("*") && (b = "*");
      switch (b) {
        case "i1":
          return w[a >> 0];
        case "i8":
          return w[a >> 0];
        case "i16":
          return oa[a >> 1];
        case "i32":
          return z[a >> 2];
        case "i64":
          u("to do getValue(i64) use WASM_BIGINT");
        case "float":
          return pa[a >> 2];
        case "double":
          return qa[a >> 3];
        case "*":
          return B[a >> 2];
        default:
          u(`invalid type for getValue: ${b}`);
      }
    }
    function J(a, b, c = "i8") {
      c.endsWith("*") && (c = "*");
      switch (c) {
        case "i1":
          w[a >> 0] = b;
          break;
        case "i8":
          w[a >> 0] = b;
          break;
        case "i16":
          oa[a >> 1] = b;
          break;
        case "i32":
          z[a >> 2] = b;
          break;
        case "i64":
          u("to do setValue(i64) use WASM_BIGINT");
        case "float":
          pa[a >> 2] = b;
          break;
        case "double":
          qa[a >> 3] = b;
          break;
        case "*":
          B[a >> 2] = b;
          break;
        default:
          u(`invalid type for setValue: ${c}`);
      }
    }
    var Ja = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, K = (a, b, c) => {
      var d = b + c;
      for (c = b; a[c] && !(c >= d); )
        ++c;
      if (16 < c - b && a.buffer && Ja)
        return Ja.decode(a.subarray(b, c));
      for (d = ""; b < c; ) {
        var e = a[b++];
        if (e & 128) {
          var h = a[b++] & 63;
          if (192 == (e & 224))
            d += String.fromCharCode((e & 31) << 6 | h);
          else {
            var g = a[b++] & 63;
            e = 224 == (e & 240) ? (e & 15) << 12 | h << 6 | g : (e & 7) << 18 | h << 12 | g << 6 | a[b++] & 63;
            65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
          }
        } else
          d += String.fromCharCode(e);
      }
      return d;
    }, Ka = (a, b) => {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d];
        "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
      }
      if (b)
        for (; c; c--)
          a.unshift("..");
      return a;
    }, M = (a) => {
      var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
      (a = Ka(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
      a && c && (a += "/");
      return (b ? "/" : "") + a;
    }, La = (a) => {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
      a = b[0];
      b = b[1];
      if (!a && !b)
        return ".";
      b && (b = b.substr(0, b.length - 1));
      return a + b;
    }, Ma = (a) => {
      if ("/" === a)
        return "/";
      a = M(a);
      a = a.replace(/\/$/, "");
      var b = a.lastIndexOf("/");
      return -1 === b ? a : a.substr(b + 1);
    }, Na = () => {
      if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues)
        return (a) => crypto.getRandomValues(a);
      u("initRandomDevice");
    }, Oa = (a) => (Oa = Na())(a);
    function Pa() {
      for (var a = "", b = false, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" != typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b)
          return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = Ka(a.split("/").filter((d) => !!d), !b).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var Qa = [], Ra = (a) => {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
      }
      return b;
    }, Sa = (a, b, c, d) => {
      if (!(0 < d))
        return 0;
      var e = c;
      d = c + d - 1;
      for (var h = 0; h < a.length; ++h) {
        var g = a.charCodeAt(h);
        if (55296 <= g && 57343 >= g) {
          var n = a.charCodeAt(++h);
          g = 65536 + ((g & 1023) << 10) | n & 1023;
        }
        if (127 >= g) {
          if (c >= d)
            break;
          b[c++] = g;
        } else {
          if (2047 >= g) {
            if (c + 1 >= d)
              break;
            b[c++] = 192 | g >> 6;
          } else {
            if (65535 >= g) {
              if (c + 2 >= d)
                break;
              b[c++] = 224 | g >> 12;
            } else {
              if (c + 3 >= d)
                break;
              b[c++] = 240 | g >> 18;
              b[c++] = 128 | g >> 12 & 63;
            }
            b[c++] = 128 | g >> 6 & 63;
          }
          b[c++] = 128 | g & 63;
        }
      }
      b[c] = 0;
      return c - e;
    }, Ta = [];
    function Ua(a, b) {
      Ta[a] = { input: [], Ub: [], ec: b };
      Va(a, Wa);
    }
    var Wa = { open(a) {
      var b = Ta[a.node.ic];
      if (!b)
        throw new N(43);
      a.Vb = b;
      a.seekable = false;
    }, close(a) {
      a.Vb.ec.lc(a.Vb);
    }, lc(a) {
      a.Vb.ec.lc(a.Vb);
    }, read(a, b, c, d) {
      if (!a.Vb || !a.Vb.ec.Ac)
        throw new N(60);
      for (var e = 0, h = 0; h < d; h++) {
        try {
          var g = a.Vb.ec.Ac(a.Vb);
        } catch (n) {
          throw new N(29);
        }
        if (void 0 === g && 0 === e)
          throw new N(6);
        if (null === g || void 0 === g)
          break;
        e++;
        b[c + h] = g;
      }
      e && (a.node.timestamp = Date.now());
      return e;
    }, write(a, b, c, d) {
      if (!a.Vb || !a.Vb.ec.uc)
        throw new N(60);
      try {
        for (var e = 0; e < d; e++)
          a.Vb.ec.uc(a.Vb, b[c + e]);
      } catch (h) {
        throw new N(29);
      }
      d && (a.node.timestamp = Date.now());
      return e;
    } }, Xa = { Ac() {
      a: {
        if (!Qa.length) {
          var a = null;
          "undefined" != typeof window && "function" == typeof window.prompt ? (a = window.prompt("Input: "), null !== a && (a += "\n")) : "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
          if (!a) {
            var b = null;
            break a;
          }
          b = Array(Ra(a) + 1);
          a = Sa(a, b, 0, b.length);
          b.length = a;
          Qa = b;
        }
        b = Qa.shift();
      }
      return b;
    }, uc(a, b) {
      null === b || 10 === b ? (ka(K(a.Ub, 0)), a.Ub = []) : 0 != b && a.Ub.push(b);
    }, lc(a) {
      a.Ub && 0 < a.Ub.length && (ka(K(a.Ub, 0)), a.Ub = []);
    }, ad() {
      return {
        Xc: 25856,
        Zc: 5,
        Wc: 191,
        Yc: 35387,
        Vc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
    }, bd() {
      return 0;
    }, cd() {
      return [24, 80];
    } }, Ya = { uc(a, b) {
      null === b || 10 === b ? (t(K(a.Ub, 0)), a.Ub = []) : 0 != b && a.Ub.push(b);
    }, lc(a) {
      a.Ub && 0 < a.Ub.length && (t(K(a.Ub, 0)), a.Ub = []);
    } };
    function Za(a, b) {
      var c = a.Qb ? a.Qb.length : 0;
      c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Qb, a.Qb = new Uint8Array(b), 0 < a.Sb && a.Qb.set(c.subarray(0, a.Sb), 0));
    }
    var O = { Yb: null, Xb() {
      return O.createNode(null, "/", 16895, 0);
    }, createNode(a, b, c, d) {
      if (24576 === (c & 61440) || 4096 === (c & 61440))
        throw new N(63);
      O.Yb || (O.Yb = { dir: { node: { Wb: O.Fb.Wb, Tb: O.Fb.Tb, fc: O.Fb.fc, mc: O.Fb.mc, Ec: O.Fb.Ec, rc: O.Fb.rc, pc: O.Fb.pc, Dc: O.Fb.Dc, qc: O.Fb.qc }, stream: { bc: O.Pb.bc } }, file: { node: { Wb: O.Fb.Wb, Tb: O.Fb.Tb }, stream: { bc: O.Pb.bc, read: O.Pb.read, write: O.Pb.write, xc: O.Pb.xc, nc: O.Pb.nc, oc: O.Pb.oc } }, link: { node: { Wb: O.Fb.Wb, Tb: O.Fb.Tb, jc: O.Fb.jc }, stream: {} }, yc: { node: { Wb: O.Fb.Wb, Tb: O.Fb.Tb }, stream: $a } });
      c = ab(a, b, c, d);
      P(c.mode) ? (c.Fb = O.Yb.dir.node, c.Pb = O.Yb.dir.stream, c.Qb = {}) : 32768 === (c.mode & 61440) ? (c.Fb = O.Yb.file.node, c.Pb = O.Yb.file.stream, c.Sb = 0, c.Qb = null) : 40960 === (c.mode & 61440) ? (c.Fb = O.Yb.link.node, c.Pb = O.Yb.link.stream) : 8192 === (c.mode & 61440) && (c.Fb = O.Yb.yc.node, c.Pb = O.Yb.yc.stream);
      c.timestamp = Date.now();
      a && (a.Qb[b] = c, a.timestamp = c.timestamp);
      return c;
    }, $c(a) {
      return a.Qb ? a.Qb.subarray ? a.Qb.subarray(0, a.Sb) : new Uint8Array(a.Qb) : new Uint8Array(0);
    }, Fb: { Wb(a) {
      var b = {};
      b.Kc = 8192 === (a.mode & 61440) ? a.id : 1;
      b.Bc = a.id;
      b.mode = a.mode;
      b.Qc = 1;
      b.uid = 0;
      b.Nc = 0;
      b.ic = a.ic;
      P(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Sb : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
      b.Gc = new Date(a.timestamp);
      b.Pc = new Date(a.timestamp);
      b.Jc = new Date(a.timestamp);
      b.Hc = 4096;
      b.Ic = Math.ceil(b.size / b.Hc);
      return b;
    }, Tb(a, b) {
      void 0 !== b.mode && (a.mode = b.mode);
      void 0 !== b.timestamp && (a.timestamp = b.timestamp);
      if (void 0 !== b.size && (b = b.size, a.Sb != b))
        if (0 == b)
          a.Qb = null, a.Sb = 0;
        else {
          var c = a.Qb;
          a.Qb = new Uint8Array(b);
          c && a.Qb.set(c.subarray(0, Math.min(b, a.Sb)));
          a.Sb = b;
        }
    }, fc() {
      throw bb[44];
    }, mc(a, b, c, d) {
      return O.createNode(a, b, c, d);
    }, Ec(a, b, c) {
      if (P(a.mode)) {
        try {
          var d = cb(b, c);
        } catch (h) {
        }
        if (d)
          for (var e in d.Qb)
            throw new N(55);
      }
      delete a.parent.Qb[a.name];
      a.parent.timestamp = Date.now();
      a.name = c;
      b.Qb[c] = a;
      b.timestamp = a.parent.timestamp;
      a.parent = b;
    }, rc(a, b) {
      delete a.Qb[b];
      a.timestamp = Date.now();
    }, pc(a, b) {
      var c = cb(a, b), d;
      for (d in c.Qb)
        throw new N(55);
      delete a.Qb[b];
      a.timestamp = Date.now();
    }, Dc(a) {
      var b = [".", ".."], c;
      for (c in a.Qb)
        a.Qb.hasOwnProperty(c) && b.push(c);
      return b;
    }, qc(a, b, c) {
      a = O.createNode(a, b, 41471, 0);
      a.link = c;
      return a;
    }, jc(a) {
      if (40960 !== (a.mode & 61440))
        throw new N(28);
      return a.link;
    } }, Pb: { read(a, b, c, d, e) {
      var h = a.node.Qb;
      if (e >= a.node.Sb)
        return 0;
      a = Math.min(a.node.Sb - e, d);
      if (8 < a && h.subarray)
        b.set(h.subarray(e, e + a), c);
      else
        for (d = 0; d < a; d++)
          b[c + d] = h[e + d];
      return a;
    }, write(a, b, c, d, e, h) {
      b.buffer === w.buffer && (h = false);
      if (!d)
        return 0;
      a = a.node;
      a.timestamp = Date.now();
      if (b.subarray && (!a.Qb || a.Qb.subarray)) {
        if (h)
          return a.Qb = b.subarray(c, c + d), a.Sb = d;
        if (0 === a.Sb && 0 === e)
          return a.Qb = b.slice(c, c + d), a.Sb = d;
        if (e + d <= a.Sb)
          return a.Qb.set(b.subarray(c, c + d), e), d;
      }
      Za(a, e + d);
      if (a.Qb.subarray && b.subarray)
        a.Qb.set(b.subarray(c, c + d), e);
      else
        for (h = 0; h < d; h++)
          a.Qb[e + h] = b[c + h];
      a.Sb = Math.max(a.Sb, e + d);
      return d;
    }, bc(a, b, c) {
      1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Sb);
      if (0 > b)
        throw new N(28);
      return b;
    }, xc(a, b, c) {
      Za(a.node, b + c);
      a.node.Sb = Math.max(a.node.Sb, b + c);
    }, nc(a, b, c, d, e) {
      if (32768 !== (a.node.mode & 61440))
        throw new N(43);
      a = a.node.Qb;
      if (e & 2 || a.buffer !== w.buffer) {
        if (0 < c || c + b < a.length)
          a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
        c = true;
        b = 65536 * Math.ceil(b / 65536);
        (e = db(65536, b)) ? (y.fill(0, e, e + b), b = e) : b = 0;
        if (!b)
          throw new N(48);
        w.set(a, b);
      } else
        c = false, b = a.byteOffset;
      return { Rc: b, Fc: c };
    }, oc(a, b, c, d) {
      O.Pb.write(a, b, 0, d, c, false);
      return 0;
    } } }, eb = (a, b) => {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }, fb = null, gb = {}, hb = [], ib = 1, Q = null, jb = true, N = null, bb = {};
    function R(a, b = {}) {
      a = Pa(a);
      if (!a)
        return { path: "", node: null };
      b = Object.assign({ zc: true, vc: 0 }, b);
      if (8 < b.vc)
        throw new N(32);
      a = a.split("/").filter((g) => !!g);
      for (var c = fb, d = "/", e = 0; e < a.length; e++) {
        var h = e === a.length - 1;
        if (h && b.parent)
          break;
        c = cb(c, a[e]);
        d = M(d + "/" + a[e]);
        c.cc && (!h || h && b.zc) && (c = c.cc.root);
        if (!h || b.ac) {
          for (h = 0; 40960 === (c.mode & 61440); )
            if (c = kb(d), d = Pa(La(d), c), c = R(d, { vc: b.vc + 1 }).node, 40 < h++)
              throw new N(32);
        }
      }
      return { path: d, node: c };
    }
    function lb(a) {
      for (var b; ; ) {
        if (a === a.parent)
          return a = a.Xb.Cc, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
        b = b ? `${a.name}/${b}` : a.name;
        a = a.parent;
      }
    }
    function mb(a, b) {
      for (var c = 0, d = 0; d < b.length; d++)
        c = (c << 5) - c + b.charCodeAt(d) | 0;
      return (a + c >>> 0) % Q.length;
    }
    function nb(a) {
      var b = mb(a.parent.id, a.name);
      if (Q[b] === a)
        Q[b] = a.dc;
      else
        for (b = Q[b]; b; ) {
          if (b.dc === a) {
            b.dc = a.dc;
            break;
          }
          b = b.dc;
        }
    }
    function cb(a, b) {
      var c;
      if (c = (c = ob(a, "x")) ? c : a.Fb.fc ? 0 : 2)
        throw new N(c, a);
      for (c = Q[mb(a.id, b)]; c; c = c.dc) {
        var d = c.name;
        if (c.parent.id === a.id && d === b)
          return c;
      }
      return a.Fb.fc(a, b);
    }
    function ab(a, b, c, d) {
      a = new pb(a, b, c, d);
      b = mb(a.parent.id, a.name);
      a.dc = Q[b];
      return Q[b] = a;
    }
    function P(a) {
      return 16384 === (a & 61440);
    }
    function qb(a) {
      var b = ["r", "w", "rw"][a & 3];
      a & 512 && (b += "w");
      return b;
    }
    function ob(a, b) {
      if (jb)
        return 0;
      if (!b.includes("r") || a.mode & 292) {
        if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
          return 2;
      } else
        return 2;
      return 0;
    }
    function rb(a, b) {
      try {
        return cb(a, b), 20;
      } catch (c) {
      }
      return ob(a, "wx");
    }
    function sb(a, b, c) {
      try {
        var d = cb(a, b);
      } catch (e) {
        return e.Rb;
      }
      if (a = ob(a, "wx"))
        return a;
      if (c) {
        if (!P(d.mode))
          return 54;
        if (d === d.parent || "/" === lb(d))
          return 10;
      } else if (P(d.mode))
        return 31;
      return 0;
    }
    function tb() {
      for (var a = 0; 4096 >= a; a++)
        if (!hb[a])
          return a;
      throw new N(33);
    }
    function S(a) {
      a = hb[a];
      if (!a)
        throw new N(8);
      return a;
    }
    function ub(a, b = -1) {
      vb || (vb = function() {
        this.kc = {};
      }, vb.prototype = {}, Object.defineProperties(vb.prototype, { object: { get() {
        return this.node;
      }, set(c) {
        this.node = c;
      } }, flags: { get() {
        return this.kc.flags;
      }, set(c) {
        this.kc.flags = c;
      } }, position: { get() {
        return this.kc.position;
      }, set(c) {
        this.kc.position = c;
      } } }));
      a = Object.assign(new vb(), a);
      -1 == b && (b = tb());
      a.Zb = b;
      return hb[b] = a;
    }
    var $a = { open(a) {
      a.Pb = gb[a.node.ic].Pb;
      a.Pb.open && a.Pb.open(a);
    }, bc() {
      throw new N(70);
    } };
    function Va(a, b) {
      gb[a] = { Pb: b };
    }
    function wb(a, b) {
      var c = "/" === b, d = !b;
      if (c && fb)
        throw new N(10);
      if (!c && !d) {
        var e = R(b, { zc: false });
        b = e.path;
        e = e.node;
        if (e.cc)
          throw new N(10);
        if (!P(e.mode))
          throw new N(54);
      }
      b = { type: a, ed: {}, Cc: b, Oc: [] };
      a = a.Xb(b);
      a.Xb = b;
      b.root = a;
      c ? fb = a : e && (e.cc = b, e.Xb && e.Xb.Oc.push(b));
    }
    function xb(a, b, c) {
      var d = R(a, { parent: true }).node;
      a = Ma(a);
      if (!a || "." === a || ".." === a)
        throw new N(28);
      var e = rb(d, a);
      if (e)
        throw new N(e);
      if (!d.Fb.mc)
        throw new N(63);
      return d.Fb.mc(d, a, b, c);
    }
    function T(a, b) {
      return xb(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0);
    }
    function yb(a, b, c) {
      "undefined" == typeof c && (c = b, b = 438);
      xb(a, b | 8192, c);
    }
    function zb(a, b) {
      if (!Pa(a))
        throw new N(44);
      var c = R(b, { parent: true }).node;
      if (!c)
        throw new N(44);
      b = Ma(b);
      var d = rb(c, b);
      if (d)
        throw new N(d);
      if (!c.Fb.qc)
        throw new N(63);
      c.Fb.qc(c, b, a);
    }
    function Ab(a) {
      var b = R(a, { parent: true }).node;
      a = Ma(a);
      var c = cb(b, a), d = sb(b, a, true);
      if (d)
        throw new N(d);
      if (!b.Fb.pc)
        throw new N(63);
      if (c.cc)
        throw new N(10);
      b.Fb.pc(b, a);
      nb(c);
    }
    function kb(a) {
      a = R(a).node;
      if (!a)
        throw new N(44);
      if (!a.Fb.jc)
        throw new N(28);
      return Pa(lb(a.parent), a.Fb.jc(a));
    }
    function Bb(a, b) {
      a = R(a, { ac: !b }).node;
      if (!a)
        throw new N(44);
      if (!a.Fb.Wb)
        throw new N(63);
      return a.Fb.Wb(a);
    }
    function Cb(a) {
      return Bb(a, true);
    }
    function Db(a, b) {
      a = "string" == typeof a ? R(a, { ac: true }).node : a;
      if (!a.Fb.Tb)
        throw new N(63);
      a.Fb.Tb(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() });
    }
    function Eb(a, b) {
      if (0 > b)
        throw new N(28);
      a = "string" == typeof a ? R(a, { ac: true }).node : a;
      if (!a.Fb.Tb)
        throw new N(63);
      if (P(a.mode))
        throw new N(31);
      if (32768 !== (a.mode & 61440))
        throw new N(28);
      var c = ob(a, "w");
      if (c)
        throw new N(c);
      a.Fb.Tb(a, { size: b, timestamp: Date.now() });
    }
    function Fb(a, b, c) {
      if ("" === a)
        throw new N(44);
      if ("string" == typeof b) {
        var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
        if ("undefined" == typeof d)
          throw Error(`Unknown file open mode: ${b}`);
        b = d;
      }
      c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
      if ("object" == typeof a)
        var e = a;
      else {
        a = M(a);
        try {
          e = R(a, { ac: !(b & 131072) }).node;
        } catch (h) {
        }
      }
      d = false;
      if (b & 64)
        if (e) {
          if (b & 128)
            throw new N(20);
        } else
          e = xb(a, c, 0), d = true;
      if (!e)
        throw new N(44);
      8192 === (e.mode & 61440) && (b &= -513);
      if (b & 65536 && !P(e.mode))
        throw new N(54);
      if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : P(e.mode) && ("r" !== qb(b) || b & 512) ? 31 : ob(e, qb(b)) : 44))
        throw new N(c);
      b & 512 && !d && Eb(e, 0);
      b &= -131713;
      e = ub({ node: e, path: lb(e), flags: b, seekable: true, position: 0, Pb: e.Pb, Uc: [], error: false });
      e.Pb.open && e.Pb.open(e);
      !f.logReadFiles || b & 1 || (Gb || (Gb = {}), a in Gb || (Gb[a] = 1));
      return e;
    }
    function Hb(a, b, c) {
      if (null === a.Zb)
        throw new N(8);
      if (!a.seekable || !a.Pb.bc)
        throw new N(70);
      if (0 != c && 1 != c && 2 != c)
        throw new N(28);
      a.position = a.Pb.bc(a, b, c);
      a.Uc = [];
    }
    function Ib() {
      N || (N = function(a, b) {
        this.name = "ErrnoError";
        this.node = b;
        this.Sc = function(c) {
          this.Rb = c;
        };
        this.Sc(a);
        this.message = "FS error";
      }, N.prototype = Error(), N.prototype.constructor = N, [44].forEach((a) => {
        bb[a] = new N(a);
        bb[a].stack = "<generic error, no stack>";
      }));
    }
    var Jb;
    function Kb(a, b, c) {
      a = M("/dev/" + a);
      var d = eb(!!b, !!c);
      Lb || (Lb = 64);
      var e = Lb++ << 8 | 0;
      Va(e, { open(h) {
        h.seekable = false;
      }, close() {
        c && c.buffer && c.buffer.length && c(10);
      }, read(h, g, n, k) {
        for (var l = 0, q = 0; q < k; q++) {
          try {
            var m = b();
          } catch (r) {
            throw new N(29);
          }
          if (void 0 === m && 0 === l)
            throw new N(6);
          if (null === m || void 0 === m)
            break;
          l++;
          g[n + q] = m;
        }
        l && (h.node.timestamp = Date.now());
        return l;
      }, write(h, g, n, k) {
        for (var l = 0; l < k; l++)
          try {
            c(g[n + l]);
          } catch (q) {
            throw new N(29);
          }
        k && (h.node.timestamp = Date.now());
        return l;
      } });
      yb(a, d, e);
    }
    var Lb, U = {}, vb, Gb;
    function Mb(a, b, c) {
      if ("/" === b.charAt(0))
        return b;
      a = -100 === a ? "/" : S(a).path;
      if (0 == b.length) {
        if (!c)
          throw new N(44);
        return a;
      }
      return M(a + "/" + b);
    }
    function Nb(a, b, c) {
      try {
        var d = a(b);
      } catch (h) {
        if (h && h.node && M(b) !== M(lb(h.node)))
          return -54;
        throw h;
      }
      z[c >> 2] = d.Kc;
      z[c + 4 >> 2] = d.mode;
      B[c + 8 >> 2] = d.Qc;
      z[c + 12 >> 2] = d.uid;
      z[c + 16 >> 2] = d.Nc;
      z[c + 20 >> 2] = d.ic;
      F = [d.size >>> 0, (D = d.size, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 24 >> 2] = F[0];
      z[c + 28 >> 2] = F[1];
      z[c + 32 >> 2] = 4096;
      z[c + 36 >> 2] = d.Ic;
      a = d.Gc.getTime();
      b = d.Pc.getTime();
      var e = d.Jc.getTime();
      F = [Math.floor(a / 1e3) >>> 0, (D = Math.floor(a / 1e3), 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 40 >> 2] = F[0];
      z[c + 44 >> 2] = F[1];
      B[c + 48 >> 2] = a % 1e3 * 1e3;
      F = [Math.floor(b / 1e3) >>> 0, (D = Math.floor(b / 1e3), 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 56 >> 2] = F[0];
      z[c + 60 >> 2] = F[1];
      B[c + 64 >> 2] = b % 1e3 * 1e3;
      F = [Math.floor(e / 1e3) >>> 0, (D = Math.floor(e / 1e3), 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 72 >> 2] = F[0];
      z[c + 76 >> 2] = F[1];
      B[c + 80 >> 2] = e % 1e3 * 1e3;
      F = [d.Bc >>> 0, (D = d.Bc, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
      z[c + 88 >> 2] = F[0];
      z[c + 92 >> 2] = F[1];
      return 0;
    }
    var Ob = void 0;
    function Pb() {
      var a = z[Ob >> 2];
      Ob += 4;
      return a;
    }
    var Qb = (a, b) => b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN, Rb = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Sb = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Ub = (a) => {
      var b = Ra(a) + 1, c = Tb(b);
      c && Sa(a, y, c, b);
      return c;
    }, Vb = {}, Xb = () => {
      if (!Wb) {
        var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
        for (b in Vb)
          void 0 === Vb[b] ? delete a[b] : a[b] = Vb[b];
        var c = [];
        for (b in a)
          c.push(`${b}=${a[b]}`);
        Wb = c;
      }
      return Wb;
    }, Wb;
    function Yb() {
    }
    function Zb() {
    }
    function $b() {
    }
    function ac() {
    }
    function bc() {
    }
    function cc() {
    }
    function dc() {
    }
    function ec() {
    }
    function fc() {
    }
    function gc() {
    }
    function hc() {
    }
    function ic() {
    }
    function jc() {
    }
    function kc() {
    }
    function lc() {
    }
    function mc() {
    }
    function nc() {
    }
    function oc() {
    }
    function pc() {
    }
    function qc() {
    }
    function rc() {
    }
    function sc() {
    }
    function tc() {
    }
    function uc() {
    }
    function vc() {
    }
    function wc() {
    }
    function xc() {
    }
    function yc() {
    }
    function zc() {
    }
    function Ac() {
    }
    function Bc() {
    }
    function Cc() {
    }
    function Dc() {
    }
    function Ec() {
    }
    function Fc() {
    }
    function Gc() {
    }
    function Hc() {
    }
    function Ic() {
    }
    function Jc() {
    }
    function Kc() {
    }
    var Lc = (a) => {
      na = a;
      if (!(noExitRuntime || 0 < wa)) {
        if (f.onExit)
          f.onExit(a);
        v = true;
      }
      ea(a, new Ha(a));
    }, Mc = (a) => {
      a instanceof Ha || "unwind" == a || ea(1, a);
    }, Nc = (a) => {
      try {
        a();
      } catch (b) {
        u(b);
      }
    };
    function Oc(a) {
      var b = {}, c;
      for (c in a)
        (function(d) {
          var e = a[d];
          b[d] = "function" == typeof e ? function() {
            Pc.push(d);
            try {
              return e.apply(null, arguments);
            } finally {
              v || (Pc.pop() === d || u(), V && 1 === X && 0 === Pc.length && (X = 0, Nc(Qc), "undefined" != typeof Fibers && Fibers.fd()));
            }
          } : e;
        })(c);
      return b;
    }
    var X = 0, V = null, Rc = 0, Pc = [], Sc = {}, Tc = {}, Uc = 0, Vc = null, Wc = [];
    function Xc() {
      return new Promise((a, b) => {
        Vc = { resolve: a, reject: b };
      });
    }
    function Yc() {
      var a = Tb(16396), b = a + 12;
      B[a >> 2] = b;
      B[a + 4 >> 2] = b + 16384;
      b = Pc[0];
      var c = Sc[b];
      void 0 === c && (c = Uc++, Sc[b] = c, Tc[c] = b);
      z[a + 8 >> 2] = c;
      return a;
    }
    function Zc(a) {
      if (!v) {
        if (0 === X) {
          var b = false, c = false;
          a((d = 0) => {
            if (!v && (Rc = d, b = true, c)) {
              X = 2;
              Nc(() => $c(V));
              "undefined" != typeof Browser && Browser.tc.Mc && Browser.tc.resume();
              d = false;
              try {
                var e = (0, Y[Tc[z[V + 8 >> 2]]])();
              } catch (n) {
                e = n, d = true;
              }
              var h = false;
              if (!V) {
                var g = Vc;
                g && (Vc = null, (d ? g.reject : g.resolve)(e), h = true);
              }
              if (d && !h)
                throw e;
            }
          });
          c = true;
          b || (X = 1, V = Yc(), "undefined" != typeof Browser && Browser.tc.Mc && Browser.tc.pause(), Nc(() => ad(V)));
        } else
          2 === X ? (X = 0, Nc(bd), cd(V), V = null, Wc.forEach((d) => {
            if (!v)
              try {
                if (d(), !(noExitRuntime || 0 < wa))
                  try {
                    na = d = na, Lc(d);
                  } catch (e) {
                    Mc(e);
                  }
              } catch (e) {
                Mc(e);
              }
          })) : u(`invalid state: ${X}`);
        return Rc;
      }
    }
    function dd(a) {
      return Zc((b) => {
        a().then(b);
      });
    }
    var ed = {}, Z = (a, b, c, d, e) => {
      function h(m) {
        --wa;
        0 !== k && fd(k);
        return "string" === b ? m ? K(y, m) : "" : "boolean" === b ? !!m : m;
      }
      var g = { string: (m) => {
        var r = 0;
        if (null !== m && void 0 !== m && 0 !== m) {
          r = Ra(m) + 1;
          var x = gd(r);
          Sa(m, y, x, r);
          r = x;
        }
        return r;
      }, array: (m) => {
        var r = gd(m.length);
        w.set(m, r);
        return r;
      } };
      a = f["_" + a];
      var n = [], k = 0;
      if (d)
        for (var l = 0; l < d.length; l++) {
          var q = g[c[l]];
          q ? (0 === k && (k = hd()), n[l] = q(d[l])) : n[l] = d[l];
        }
      c = V;
      d = a.apply(null, n);
      e = e && e.async;
      wa += 1;
      if (V != c)
        return Xc().then(h);
      d = h(d);
      return e ? Promise.resolve(d) : d;
    };
    function pb(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.Xb = a.Xb;
      this.cc = null;
      this.id = ib++;
      this.name = b;
      this.mode = c;
      this.Fb = {};
      this.Pb = {};
      this.ic = d;
    }
    Object.defineProperties(pb.prototype, { read: { get: function() {
      return 365 === (this.mode & 365);
    }, set: function(a) {
      a ? this.mode |= 365 : this.mode &= -366;
    } }, write: { get: function() {
      return 146 === (this.mode & 146);
    }, set: function(a) {
      a ? this.mode |= 146 : this.mode &= -147;
    } } });
    Ib();
    Q = Array(4096);
    wb(O, "/");
    T("/tmp");
    T("/home");
    T("/home/web_user");
    (function() {
      T("/dev");
      Va(259, { read: () => 0, write: (d, e, h, g) => g });
      yb("/dev/null", 259);
      Ua(1280, Xa);
      Ua(1536, Ya);
      yb("/dev/tty", 1280);
      yb("/dev/tty1", 1536);
      var a = new Uint8Array(1024), b = 0, c = () => {
        0 === b && (b = Oa(a).byteLength);
        return a[--b];
      };
      Kb("random", c);
      Kb("urandom", c);
      T("/dev/shm");
      T("/dev/shm/tmp");
    })();
    (function() {
      T("/proc");
      var a = T("/proc/self");
      T("/proc/self/fd");
      wb({ Xb() {
        var b = ab(a, "fd", 16895, 73);
        b.Fb = { fc(c, d) {
          var e = S(+d);
          c = { parent: null, Xb: { Cc: "fake" }, Fb: { jc: () => e.path } };
          return c.parent = c;
        } };
        return b;
      } }, "/proc/self/fd");
    })();
    (function() {
      const a = /* @__PURE__ */ new Map();
      f.setAuthorizer = function(b, c, d) {
        c ? a.set(b, { f: c, wc: d }) : a.delete(b);
        return Z("set_authorizer", "number", ["number"], [b]);
      };
      Yb = function(b, c, d, e, h, g) {
        if (a.has(b)) {
          const { f: n, wc: k } = a.get(b);
          return n(k, c, d ? d ? K(y, d) : "" : null, e ? e ? K(y, e) : "" : null, h ? h ? K(y, h) : "" : null, g ? g ? K(y, g) : "" : null);
        }
        return 0;
      };
    })();
    (function() {
      function a(d, e) {
        const h = [];
        for (let g = 0; 0 != d[e + g]; ++g) {
          if (1e3 < g)
            throw Error("C-string never terminated after 1k characters");
          h.push(d[e + g]);
        }
        return String.fromCharCode(...h);
      }
      const b = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
      f.updateHook = function(d, e) {
        const h = b.size;
        b.set(h, e);
        return Z("update_hook", "void", ["number", "number"], [d, h]);
      };
      f.createFunction = function(d, e, h, g, n, k) {
        const l = b.size;
        b.set(l, { f: k, $b: n });
        return Z("create_function", "number", "number string number number number number".split(" "), [d, e, h, g, l, 0]);
      };
      f.createAggregate = function(d, e, h, g, n, k, l) {
        const q = b.size;
        b.set(q, { step: k, Lc: l, $b: n });
        return Z("create_function", "number", "number string number number number number".split(" "), [d, e, h, g, q, 1]);
      };
      f.getFunctionUserData = function(d) {
        return c.get(d);
      };
      cc = function(d, e, h, g, n, k) {
        d = b.get(d);
        const l = y;
        n = BigInt(k) << 32n | BigInt(n) & 4294967295n;
        d(e, a(l, h), a(l, g), n);
      };
      $b = function(d, e, h, g) {
        d = b.get(d);
        c.set(e, d.$b);
        d.f(e, new Uint32Array(y.buffer, g, h));
        c.delete(e);
      };
      bc = function(d, e, h, g) {
        d = b.get(d);
        c.set(e, d.$b);
        d.step(e, new Uint32Array(y.buffer, g, h));
        c.delete(e);
      };
      Zb = function(d, e) {
        d = b.get(d);
        c.set(e, d.$b);
        d.Lc(e);
        c.delete(e);
      };
    })();
    (function() {
      const a = /* @__PURE__ */ new Map();
      f.progressHandler = function(b, c, d, e) {
        d ? a.set(b, { f: d, wc: e }) : a.delete(b);
        return Z("progress_handler", null, ["number", "number"], [b, c]);
      };
      ac = function(b) {
        if (a.has(b)) {
          const { f: c, wc: d } = a.get(b);
          return c(d);
        }
        return 0;
      };
    })();
    (function() {
      function a(k, l) {
        const q = `get${k}`, m = `set${k}`;
        return new Proxy(new DataView(y.buffer, l, "Int32" === k ? 4 : 8), { get(r, x) {
          if (x === q)
            return function(A, G) {
              if (!G)
                throw Error("must be little endian");
              return r[x](A, G);
            };
          if (x === m)
            return function(A, G, E) {
              if (!E)
                throw Error("must be little endian");
              return r[x](A, G, E);
            };
          if ("string" === typeof x && x.match(/^(get)|(set)/))
            throw Error("invalid type");
          return r[x];
        } });
      }
      const b = "object" === typeof ed, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), h = b ? /* @__PURE__ */ new Set() : null, g = b ? /* @__PURE__ */ new Set() : null, n = /* @__PURE__ */ new Map();
      tc = function(k, l, q, m) {
        n.set(k ? K(y, k) : "", { size: l, hc: Array.from(new Uint32Array(y.buffer, m, q)) });
      };
      f.createModule = function(k, l, q, m) {
        b && (q.handleAsync = dd);
        const r = c.size;
        c.set(r, { module: q, $b: m });
        m = 0;
        q.xCreate && (m |= 1);
        q.xConnect && (m |= 2);
        q.xBestIndex && (m |= 4);
        q.xDisconnect && (m |= 8);
        q.xDestroy && (m |= 16);
        q.xOpen && (m |= 32);
        q.xClose && (m |= 64);
        q.xFilter && (m |= 128);
        q.xNext && (m |= 256);
        q.xEof && (m |= 512);
        q.xColumn && (m |= 1024);
        q.xRowid && (m |= 2048);
        q.xUpdate && (m |= 4096);
        q.xBegin && (m |= 8192);
        q.xSync && (m |= 16384);
        q.xCommit && (m |= 32768);
        q.xRollback && (m |= 65536);
        q.xFindFunction && (m |= 131072);
        q.xRename && (m |= 262144);
        return Z("create_module", "number", ["number", "string", "number", "number"], [k, l, r, m]);
      };
      jc = function(k, l, q, m, r, x) {
        l = c.get(l);
        d.set(r, l);
        if (b) {
          h.delete(r);
          for (const A of h)
            d.delete(A);
        }
        m = Array.from(new Uint32Array(y.buffer, m, q)).map((A) => A ? K(y, A) : "");
        return l.module.xCreate(k, l.$b, m, r, a("Int32", x));
      };
      ic = function(k, l, q, m, r, x) {
        l = c.get(l);
        d.set(r, l);
        if (b) {
          h.delete(r);
          for (const A of h)
            d.delete(A);
        }
        m = Array.from(new Uint32Array(y.buffer, m, q)).map((A) => A ? K(y, A) : "");
        return l.module.xConnect(k, l.$b, m, r, a("Int32", x));
      };
      ec = function(k, l) {
        var q = d.get(k), m = n.get("sqlite3_index_info").hc;
        const r = {};
        r.nConstraint = I(l + m[0], "i32");
        r.aConstraint = [];
        var x = I(l + m[1], "*"), A = n.get("sqlite3_index_constraint").size;
        for (var G = 0; G < r.nConstraint; ++G) {
          var E = r.aConstraint, L = E.push, H = x + G * A, ha = n.get("sqlite3_index_constraint").hc, W = {};
          W.iColumn = I(H + ha[0], "i32");
          W.op = I(H + ha[1], "i8");
          W.usable = !!I(H + ha[2], "i8");
          L.call(E, W);
        }
        r.nOrderBy = I(l + m[2], "i32");
        r.aOrderBy = [];
        x = I(l + m[3], "*");
        A = n.get("sqlite3_index_orderby").size;
        for (G = 0; G < r.nOrderBy; ++G)
          E = r.aOrderBy, L = E.push, H = x + G * A, ha = n.get("sqlite3_index_orderby").hc, W = {}, W.iColumn = I(H + ha[0], "i32"), W.desc = !!I(H + ha[1], "i8"), L.call(E, W);
        r.aConstraintUsage = [];
        for (x = 0; x < r.nConstraint; ++x)
          r.aConstraintUsage.push({ argvIndex: 0, omit: false });
        r.idxNum = I(l + m[5], "i32");
        r.idxStr = null;
        r.orderByConsumed = !!I(l + m[8], "i8");
        r.estimatedCost = I(l + m[9], "double");
        r.estimatedRows = I(l + m[10], "i32");
        r.idxFlags = I(l + m[11], "i32");
        r.colUsed = I(l + m[12], "i32");
        k = q.module.xBestIndex(k, r);
        q = n.get("sqlite3_index_info").hc;
        m = I(l + q[4], "*");
        x = n.get("sqlite3_index_constraint_usage").size;
        for (L = 0; L < r.nConstraint; ++L)
          A = m + L * x, E = r.aConstraintUsage[L], H = n.get("sqlite3_index_constraint_usage").hc, J(A + H[0], E.argvIndex, "i32"), J(A + H[1], E.omit ? 1 : 0, "i8");
        J(l + q[5], r.idxNum, "i32");
        "string" === typeof r.idxStr && (m = Ra(r.idxStr), x = Z("sqlite3_malloc", "number", ["number"], [m + 1]), Sa(r.idxStr, y, x, m + 1), J(l + q[6], x, "*"), J(l + q[7], 1, "i32"));
        J(l + q[8], r.orderByConsumed, "i32");
        J(l + q[9], r.estimatedCost, "double");
        J(l + q[10], r.estimatedRows, "i32");
        J(l + q[11], r.idxFlags, "i32");
        return k;
      };
      lc = function(k) {
        const l = d.get(k);
        b ? h.add(k) : d.delete(k);
        return l.module.xDisconnect(k);
      };
      kc = function(k) {
        const l = d.get(k);
        b ? h.add(k) : d.delete(k);
        return l.module.xDestroy(k);
      };
      pc = function(k, l) {
        const q = d.get(k);
        e.set(l, q);
        if (b) {
          g.delete(l);
          for (const m of g)
            e.delete(m);
        }
        return q.module.xOpen(k, l);
      };
      fc = function(k) {
        const l = e.get(k);
        b ? g.add(k) : e.delete(k);
        return l.module.xClose(k);
      };
      mc = function(k) {
        return e.get(k).module.xEof(k) ? 1 : 0;
      };
      nc = function(k, l, q, m, r) {
        const x = e.get(k);
        q = q ? q ? K(y, q) : "" : null;
        r = new Uint32Array(y.buffer, r, m);
        return x.module.xFilter(k, l, q, r);
      };
      oc = function(k) {
        return e.get(k).module.xNext(k);
      };
      gc = function(k, l, q) {
        return e.get(k).module.xColumn(k, l, q);
      };
      sc = function(k, l) {
        return e.get(k).module.xRowid(k, a("BigInt64", l));
      };
      vc = function(k, l, q, m) {
        const r = d.get(k);
        q = new Uint32Array(y.buffer, q, l);
        return r.module.xUpdate(k, q, a("BigInt64", m));
      };
      dc = function(k) {
        return d.get(k).module.xBegin(k);
      };
      uc = function(k) {
        return d.get(k).module.xSync(k);
      };
      hc = function(k) {
        return d.get(k).module.xCommit(k);
      };
      rc = function(k) {
        return d.get(k).module.xRollback(k);
      };
      qc = function(k, l) {
        const q = d.get(k);
        l = l ? K(y, l) : "";
        return q.module.xRename(k, l);
      };
    })();
    (function() {
      function a(g, n) {
        const k = `get${g}`, l = `set${g}`;
        return new Proxy(new DataView(y.buffer, n, "Int32" === g ? 4 : 8), { get(q, m) {
          if (m === k)
            return function(r, x) {
              if (!x)
                throw Error("must be little endian");
              return q[m](r, x);
            };
          if (m === l)
            return function(r, x, A) {
              if (!A)
                throw Error("must be little endian");
              return q[m](r, x, A);
            };
          if ("string" === typeof m && m.match(/^(get)|(set)/))
            throw Error("invalid type");
          return q[m];
        } });
      }
      function b(g) {
        g >>= 2;
        return B[g] + B[g + 1] * 2 ** 32;
      }
      const c = "object" === typeof ed, d = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
      f.registerVFS = function(g, n) {
        if (Z("sqlite3_vfs_find", "number", ["string"], [g.name]))
          throw Error(`VFS '${g.name}' already registered`);
        c && (g.handleAsync = dd);
        var k = g.dd ?? 64;
        const l = f._malloc(4);
        n = Z("register_vfs", "number", ["string", "number", "number", "number"], [g.name, k, n ? 1 : 0, l]);
        n || (k = I(l, "*"), d.set(k, g));
        f._free(l);
        return n;
      };
      const h = c ? /* @__PURE__ */ new Set() : null;
      yc = function(g) {
        const n = e.get(g);
        c ? h.add(g) : e.delete(g);
        return n.xClose(g);
      };
      Fc = function(g, n, k, l) {
        return e.get(g).xRead(g, y.subarray(n, n + k), b(l));
      };
      Kc = function(g, n, k, l) {
        return e.get(g).xWrite(g, y.subarray(n, n + k), b(l));
      };
      Ic = function(g, n) {
        return e.get(g).xTruncate(g, b(n));
      };
      Hc = function(g, n) {
        return e.get(g).xSync(g, n);
      };
      Cc = function(g, n) {
        const k = e.get(g);
        n = a("BigInt64", n);
        return k.xFileSize(g, n);
      };
      Dc = function(g, n) {
        return e.get(g).xLock(g, n);
      };
      Jc = function(g, n) {
        return e.get(g).xUnlock(g, n);
      };
      xc = function(g, n) {
        const k = e.get(g);
        n = a("Int32", n);
        return k.xCheckReservedLock(g, n);
      };
      Bc = function(g, n, k) {
        const l = e.get(g);
        k = new DataView(y.buffer, k);
        return l.xFileControl(g, n, k);
      };
      Gc = function(g) {
        return e.get(g).xSectorSize(g);
      };
      Ac = function(g) {
        return e.get(g).xDeviceCharacteristics(g);
      };
      Ec = function(g, n, k, l, q) {
        g = d.get(g);
        e.set(k, g);
        if (c) {
          h.delete(k);
          for (var m of h)
            e.delete(m);
        }
        m = null;
        if (l & 64) {
          m = 1;
          const r = [];
          for (; m; ) {
            const x = y[n++];
            if (x)
              r.push(x);
            else
              switch (y[n] || (m = null), m) {
                case 1:
                  r.push(63);
                  m = 2;
                  break;
                case 2:
                  r.push(61);
                  m = 3;
                  break;
                case 3:
                  r.push(38), m = 2;
              }
          }
          m = new TextDecoder().decode(new Uint8Array(r));
        } else
          n && (m = n ? K(y, n) : "");
        q = a("Int32", q);
        return g.xOpen(m, k, l, q);
      };
      zc = function(g, n, k) {
        return d.get(g).xDelete(n ? K(y, n) : "", k);
      };
      wc = function(g, n, k, l) {
        g = d.get(g);
        l = a("Int32", l);
        return g.xAccess(n ? K(y, n) : "", k, l);
      };
    })();
    var kd = {
      a: (a, b, c, d) => {
        u(`Assertion failed: ${a ? K(y, a) : ""}, at: ` + [b ? b ? K(y, b) : "" : "unknown filename", c, d ? d ? K(y, d) : "" : "unknown function"]);
      },
      L: function(a, b) {
        try {
          return a = a ? K(y, a) : "", Db(a, b), 0;
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return -c.Rb;
        }
      },
      N: function(a, b, c) {
        try {
          b = b ? K(y, b) : "";
          b = Mb(a, b);
          if (c & -8)
            return -28;
          var d = R(b, { ac: true }).node;
          if (!d)
            return -44;
          a = "";
          c & 4 && (a += "r");
          c & 2 && (a += "w");
          c & 1 && (a += "x");
          return a && ob(d, a) ? -2 : 0;
        } catch (e) {
          if ("undefined" == typeof U || "ErrnoError" !== e.name)
            throw e;
          return -e.Rb;
        }
      },
      M: function(a, b) {
        try {
          var c = S(a);
          Db(c.node, b);
          return 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Rb;
        }
      },
      K: function(a) {
        try {
          var b = S(a).node;
          var c = "string" == typeof b ? R(b, { ac: true }).node : b;
          if (!c.Fb.Tb)
            throw new N(63);
          c.Fb.Tb(c, { timestamp: Date.now() });
          return 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Rb;
        }
      },
      b: function(a, b, c) {
        Ob = c;
        try {
          var d = S(a);
          switch (b) {
            case 0:
              var e = Pb();
              if (0 > e)
                return -28;
              for (; hb[e]; )
                e++;
              return ub(d, e).Zb;
            case 1:
            case 2:
              return 0;
            case 3:
              return d.flags;
            case 4:
              return e = Pb(), d.flags |= e, 0;
            case 5:
              return e = Pb(), oa[e + 0 >> 1] = 2, 0;
            case 6:
            case 7:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return z[jd() >> 2] = 28, -1;
            default:
              return -28;
          }
        } catch (h) {
          if ("undefined" == typeof U || "ErrnoError" !== h.name)
            throw h;
          return -h.Rb;
        }
      },
      J: function(a, b) {
        try {
          var c = S(a);
          return Nb(Bb, c.path, b);
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Rb;
        }
      },
      n: function(a, b, c) {
        b = Qb(b, c);
        try {
          if (isNaN(b))
            return 61;
          var d = S(a);
          if (0 === (d.flags & 2097155))
            throw new N(28);
          Eb(d.node, b);
          return 0;
        } catch (e) {
          if ("undefined" == typeof U || "ErrnoError" !== e.name)
            throw e;
          return -e.Rb;
        }
      },
      D: function(a, b) {
        try {
          if (0 === b)
            return -28;
          var c = Ra("/") + 1;
          if (b < c)
            return -68;
          Sa("/", y, a, b);
          return c;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Rb;
        }
      },
      G: function(a, b) {
        try {
          return a = a ? K(y, a) : "", Nb(Cb, a, b);
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return -c.Rb;
        }
      },
      A: function(a, b, c) {
        try {
          return b = b ? K(y, b) : "", b = Mb(a, b), b = M(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), T(b, c), 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return -d.Rb;
        }
      },
      F: function(a, b, c, d) {
        try {
          b = b ? K(y, b) : "";
          var e = d & 256;
          b = Mb(a, b, d & 4096);
          return Nb(e ? Cb : Bb, b, c);
        } catch (h) {
          if ("undefined" == typeof U || "ErrnoError" !== h.name)
            throw h;
          return -h.Rb;
        }
      },
      z: function(a, b, c, d) {
        Ob = d;
        try {
          b = b ? K(y, b) : "";
          b = Mb(a, b);
          var e = d ? Pb() : 0;
          return Fb(b, c, e).Zb;
        } catch (h) {
          if ("undefined" == typeof U || "ErrnoError" !== h.name)
            throw h;
          return -h.Rb;
        }
      },
      w: function(a, b, c, d) {
        try {
          b = b ? K(y, b) : "";
          b = Mb(a, b);
          if (0 >= d)
            return -28;
          var e = kb(b), h = Math.min(d, Ra(e)), g = w[c + h];
          Sa(e, y, c, d + 1);
          w[c + h] = g;
          return h;
        } catch (n) {
          if ("undefined" == typeof U || "ErrnoError" !== n.name)
            throw n;
          return -n.Rb;
        }
      },
      v: function(a) {
        try {
          return a = a ? K(y, a) : "", Ab(a), 0;
        } catch (b) {
          if ("undefined" == typeof U || "ErrnoError" !== b.name)
            throw b;
          return -b.Rb;
        }
      },
      H: function(a, b) {
        try {
          return a = a ? K(y, a) : "", Nb(Bb, a, b);
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return -c.Rb;
        }
      },
      r: function(a, b, c) {
        try {
          b = b ? K(y, b) : "";
          b = Mb(a, b);
          if (0 === c) {
            a = b;
            var d = R(a, { parent: true }).node;
            if (!d)
              throw new N(44);
            var e = Ma(a), h = cb(d, e), g = sb(d, e, false);
            if (g)
              throw new N(g);
            if (!d.Fb.rc)
              throw new N(63);
            if (h.cc)
              throw new N(10);
            d.Fb.rc(d, e);
            nb(h);
          } else
            512 === c ? Ab(b) : u("Invalid flags passed to unlinkat");
          return 0;
        } catch (n) {
          if ("undefined" == typeof U || "ErrnoError" !== n.name)
            throw n;
          return -n.Rb;
        }
      },
      q: function(a, b, c) {
        try {
          b = b ? K(y, b) : "";
          b = Mb(a, b, true);
          if (c) {
            var d = B[c >> 2] + 4294967296 * z[c + 4 >> 2], e = z[c + 8 >> 2];
            h = 1e3 * d + e / 1e6;
            c += 16;
            d = B[c >> 2] + 4294967296 * z[c + 4 >> 2];
            e = z[c + 8 >> 2];
            g = 1e3 * d + e / 1e6;
          } else
            var h = Date.now(), g = h;
          a = h;
          var n = R(b, { ac: true }).node;
          n.Fb.Tb(n, { timestamp: Math.max(a, g) });
          return 0;
        } catch (k) {
          if ("undefined" == typeof U || "ErrnoError" !== k.name)
            throw k;
          return -k.Rb;
        }
      },
      k: function(a, b, c) {
        a = new Date(1e3 * Qb(a, b));
        z[c >> 2] = a.getSeconds();
        z[c + 4 >> 2] = a.getMinutes();
        z[c + 8 >> 2] = a.getHours();
        z[c + 12 >> 2] = a.getDate();
        z[c + 16 >> 2] = a.getMonth();
        z[c + 20 >> 2] = a.getFullYear() - 1900;
        z[c + 24 >> 2] = a.getDay();
        b = a.getFullYear();
        z[c + 28 >> 2] = (0 !== b % 4 || 0 === b % 100 && 0 !== b % 400 ? Sb : Rb)[a.getMonth()] + a.getDate() - 1 | 0;
        z[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
        b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
        var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
        z[c + 32 >> 2] = (b != d && a.getTimezoneOffset() == Math.min(d, b)) | 0;
      },
      i: function(a, b, c, d, e, h, g, n) {
        e = Qb(e, h);
        try {
          if (isNaN(e))
            return 61;
          var k = S(d);
          if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (k.flags & 2097155))
            throw new N(2);
          if (1 === (k.flags & 2097155))
            throw new N(2);
          if (!k.Pb.nc)
            throw new N(43);
          var l = k.Pb.nc(k, a, e, b, c);
          var q = l.Rc;
          z[g >> 2] = l.Fc;
          B[n >> 2] = q;
          return 0;
        } catch (m) {
          if ("undefined" == typeof U || "ErrnoError" !== m.name)
            throw m;
          return -m.Rb;
        }
      },
      j: function(a, b, c, d, e, h, g) {
        h = Qb(h, g);
        try {
          if (isNaN(h))
            return 61;
          var n = S(e);
          if (c & 2) {
            if (32768 !== (n.node.mode & 61440))
              throw new N(43);
            d & 2 || n.Pb.oc && n.Pb.oc(n, y.slice(a, a + b), h, b, d);
          }
        } catch (k) {
          if ("undefined" == typeof U || "ErrnoError" !== k.name)
            throw k;
          return -k.Rb;
        }
      },
      s: (a, b, c) => {
        function d(k) {
          return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT";
        }
        var e = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(e, 0, 1), g = new Date(e, 6, 1);
        e = h.getTimezoneOffset();
        var n = g.getTimezoneOffset();
        B[a >> 2] = 60 * Math.max(e, n);
        z[b >> 2] = Number(e != n);
        a = d(h);
        b = d(g);
        a = Ub(a);
        b = Ub(b);
        n < e ? (B[c >> 2] = a, B[c + 4 >> 2] = b) : (B[c >> 2] = b, B[c + 4 >> 2] = a);
      },
      e: () => Date.now(),
      d: () => performance.now(),
      t: (a, b, c) => y.copyWithin(a, b, b + c),
      o: (a) => {
        var b = y.length;
        a >>>= 0;
        if (2147483648 < a)
          return false;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          var e = Math;
          d = Math.max(a, d);
          a: {
            e = (e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - ma.buffer.byteLength + 65535) / 65536;
            try {
              ma.grow(e);
              ra();
              var h = 1;
              break a;
            } catch (g) {
            }
            h = void 0;
          }
          if (h)
            return true;
        }
        return false;
      },
      B: (a, b) => {
        var c = 0;
        Xb().forEach((d, e) => {
          var h = b + c;
          e = B[a + 4 * e >> 2] = h;
          for (h = 0; h < d.length; ++h)
            w[e++ >> 0] = d.charCodeAt(h);
          w[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      C: (a, b) => {
        var c = Xb();
        B[a >> 2] = c.length;
        var d = 0;
        c.forEach((e) => d += e.length + 1);
        B[b >> 2] = d;
        return 0;
      },
      f: function(a) {
        try {
          var b = S(a);
          if (null === b.Zb)
            throw new N(8);
          b.sc && (b.sc = null);
          try {
            b.Pb.close && b.Pb.close(b);
          } catch (c) {
            throw c;
          } finally {
            hb[b.Zb] = null;
          }
          b.Zb = null;
          return 0;
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return c.Rb;
        }
      },
      p: function(a, b) {
        try {
          var c = S(a);
          w[b >> 0] = c.Vb ? 2 : P(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
          oa[b + 2 >> 1] = 0;
          F = [0, (D = 0, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
          z[b + 8 >> 2] = F[0];
          z[b + 12 >> 2] = F[1];
          F = [0, (D = 0, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
          z[b + 16 >> 2] = F[0];
          z[b + 20 >> 2] = F[1];
          return 0;
        } catch (d) {
          if ("undefined" == typeof U || "ErrnoError" !== d.name)
            throw d;
          return d.Rb;
        }
      },
      y: function(a, b, c, d) {
        try {
          a: {
            var e = S(a);
            a = b;
            for (var h, g = b = 0; g < c; g++) {
              var n = B[a >> 2], k = B[a + 4 >> 2];
              a += 8;
              var l = e, q = n, m = k, r = h, x = w;
              if (0 > m || 0 > r)
                throw new N(28);
              if (null === l.Zb)
                throw new N(8);
              if (1 === (l.flags & 2097155))
                throw new N(8);
              if (P(l.node.mode))
                throw new N(31);
              if (!l.Pb.read)
                throw new N(28);
              var A = "undefined" != typeof r;
              if (!A)
                r = l.position;
              else if (!l.seekable)
                throw new N(70);
              var G = l.Pb.read(l, x, q, m, r);
              A || (l.position += G);
              var E = G;
              if (0 > E) {
                var L = -1;
                break a;
              }
              b += E;
              if (E < k)
                break;
              "undefined" !== typeof h && (h += E);
            }
            L = b;
          }
          B[d >> 2] = L;
          return 0;
        } catch (H) {
          if ("undefined" == typeof U || "ErrnoError" !== H.name)
            throw H;
          return H.Rb;
        }
      },
      l: function(a, b, c, d, e) {
        b = Qb(b, c);
        try {
          if (isNaN(b))
            return 61;
          var h = S(a);
          Hb(h, b, d);
          F = [h.position >>> 0, (D = h.position, 1 <= +Math.abs(D) ? 0 < D ? +Math.floor(D / 4294967296) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)];
          z[e >> 2] = F[0];
          z[e + 4 >> 2] = F[1];
          h.sc && 0 === b && 0 === d && (h.sc = null);
          return 0;
        } catch (g) {
          if ("undefined" == typeof U || "ErrnoError" !== g.name)
            throw g;
          return g.Rb;
        }
      },
      E: function(a) {
        try {
          var b = S(a);
          return Zc((c) => {
            var d = b.node.Xb;
            d.type.Tc ? d.type.Tc(d, false, (e) => {
              e ? c(29) : c(0);
            }) : c(0);
          });
        } catch (c) {
          if ("undefined" == typeof U || "ErrnoError" !== c.name)
            throw c;
          return c.Rb;
        }
      },
      u: function(a, b, c, d) {
        try {
          a: {
            var e = S(a);
            a = b;
            for (var h, g = b = 0; g < c; g++) {
              var n = B[a >> 2], k = B[a + 4 >> 2];
              a += 8;
              var l = e, q = n, m = k, r = h, x = w;
              if (0 > m || 0 > r)
                throw new N(28);
              if (null === l.Zb)
                throw new N(8);
              if (0 === (l.flags & 2097155))
                throw new N(8);
              if (P(l.node.mode))
                throw new N(31);
              if (!l.Pb.write)
                throw new N(28);
              l.seekable && l.flags & 1024 && Hb(l, 0, 2);
              var A = "undefined" != typeof r;
              if (!A)
                r = l.position;
              else if (!l.seekable)
                throw new N(70);
              var G = l.Pb.write(l, x, q, m, r, void 0);
              A || (l.position += G);
              var E = G;
              if (0 > E) {
                var L = -1;
                break a;
              }
              b += E;
              "undefined" !== typeof h && (h += E);
            }
            L = b;
          }
          B[d >> 2] = L;
          return 0;
        } catch (H) {
          if ("undefined" == typeof U || "ErrnoError" !== H.name)
            throw H;
          return H.Rb;
        }
      },
      ta: Yb,
      P: Zb,
      ia: $b,
      da: ac,
      _: bc,
      I: cc,
      ma: dc,
      x: ec,
      g: fc,
      pa: gc,
      ka: hc,
      fa: ic,
      ga: jc,
      h: kc,
      m: lc,
      qa: mc,
      sa: nc,
      ra: oc,
      ea: pc,
      ha: qc,
      ja: rc,
      oa: sc,
      c: tc,
      la: uc,
      na: vc,
      ba: wc,
      W: xc,
      aa: yc,
      ca: zc,
      T: Ac,
      V: Bc,
      Z: Cc,
      Y: Dc,
      S: Ec,
      R: Fc,
      U: Gc,
      $: Hc,
      O: Ic,
      X: Jc,
      Q: Kc
    }, Y = function() {
      function a(c) {
        c = c.exports;
        Y = c = Oc(c);
        ma = Y.ua;
        ra();
        ta.unshift(Y.va);
        C--;
        f.monitorRunDependencies && f.monitorRunDependencies(C);
        if (0 == C && (null !== ya && (clearInterval(ya), ya = null), za)) {
          var d = za;
          za = null;
          d();
        }
        return c;
      }
      var b = { a: kd };
      C++;
      f.monitorRunDependencies && f.monitorRunDependencies(C);
      if (f.instantiateWasm)
        try {
          return f.instantiateWasm(b, a);
        } catch (c) {
          t(`Module.instantiateWasm callback failed with error: ${c}`), ba(c);
        }
      Ga(b, function(c) {
        a(c.instance);
      }).catch(ba);
      return {};
    }();
    f._sqlite3_step = (a) => (f._sqlite3_step = Y.wa)(a);
    f._sqlite3_malloc = (a) => (f._sqlite3_malloc = Y.xa)(a);
    f._sqlite3_free = (a) => (f._sqlite3_free = Y.ya)(a);
    f._sqlite3_bind_blob = (a, b, c, d, e) => (f._sqlite3_bind_blob = Y.za)(a, b, c, d, e);
    f._sqlite3_bind_int = (a, b, c) => (f._sqlite3_bind_int = Y.Aa)(a, b, c);
    f._sqlite3_bind_int64 = (a, b, c, d) => (f._sqlite3_bind_int64 = Y.Ba)(a, b, c, d);
    f._sqlite3_bind_double = (a, b, c) => (f._sqlite3_bind_double = Y.Ca)(a, b, c);
    f._sqlite3_bind_null = (a, b) => (f._sqlite3_bind_null = Y.Da)(a, b);
    f._sqlite3_clear_bindings = (a) => (f._sqlite3_clear_bindings = Y.Ea)(a);
    f._sqlite3_bind_text = (a, b, c, d, e) => (f._sqlite3_bind_text = Y.Fa)(a, b, c, d, e);
    f._sqlite3_close = (a) => (f._sqlite3_close = Y.Ga)(a);
    f._sqlite3_column_type = (a, b) => (f._sqlite3_column_type = Y.Ha)(a, b);
    f._sqlite3_column_count = (a) => (f._sqlite3_column_count = Y.Ia)(a);
    f._sqlite3_column_text = (a, b) => (f._sqlite3_column_text = Y.Ja)(a, b);
    f._sqlite3_column_blob = (a, b) => (f._sqlite3_column_blob = Y.Ka)(a, b);
    f._sqlite3_column_bytes = (a, b) => (f._sqlite3_column_bytes = Y.La)(a, b);
    f._sqlite3_column_double = (a, b) => (f._sqlite3_column_double = Y.Ma)(a, b);
    f._sqlite3_column_int = (a, b) => (f._sqlite3_column_int = Y.Na)(a, b);
    f._sqlite3_column_int64 = (a, b) => (f._sqlite3_column_int64 = Y.Oa)(a, b);
    f._sqlite3_column_name = (a, b) => (f._sqlite3_column_name = Y.Pa)(a, b);
    f._sqlite3_declare_vtab = (a, b) => (f._sqlite3_declare_vtab = Y.Qa)(a, b);
    f._sqlite3_errmsg = (a) => (f._sqlite3_errmsg = Y.Ra)(a);
    f._sqlite3_exec = (a, b, c, d, e) => (f._sqlite3_exec = Y.Sa)(a, b, c, d, e);
    f._sqlite3_finalize = (a) => (f._sqlite3_finalize = Y.Ta)(a);
    f._sqlite3_prepare_v2 = (a, b, c, d, e) => (f._sqlite3_prepare_v2 = Y.Ua)(a, b, c, d, e);
    f._sqlite3_result_int = (a, b) => (f._sqlite3_result_int = Y.Va)(a, b);
    f._sqlite3_result_blob = (a, b, c, d) => (f._sqlite3_result_blob = Y.Wa)(a, b, c, d);
    f._sqlite3_result_int64 = (a, b, c) => (f._sqlite3_result_int64 = Y.Xa)(a, b, c);
    f._sqlite3_result_double = (a, b) => (f._sqlite3_result_double = Y.Ya)(a, b);
    f._sqlite3_result_null = (a) => (f._sqlite3_result_null = Y.Za)(a);
    f._sqlite3_result_error = (a, b, c) => (f._sqlite3_result_error = Y._a)(a, b, c);
    f._sqlite3_result_text = (a, b, c, d) => (f._sqlite3_result_text = Y.$a)(a, b, c, d);
    f._sqlite3_sql = (a) => (f._sqlite3_sql = Y.ab)(a);
    f._sqlite3_reset = (a) => (f._sqlite3_reset = Y.bb)(a);
    f._sqlite3_value_text = (a) => (f._sqlite3_value_text = Y.cb)(a);
    f._sqlite3_value_type = (a) => (f._sqlite3_value_type = Y.db)(a);
    f._sqlite3_value_bytes = (a) => (f._sqlite3_value_bytes = Y.eb)(a);
    f._sqlite3_value_blob = (a) => (f._sqlite3_value_blob = Y.fb)(a);
    f._sqlite3_value_int = (a) => (f._sqlite3_value_int = Y.gb)(a);
    f._sqlite3_value_int64 = (a) => (f._sqlite3_value_int64 = Y.hb)(a);
    f._sqlite3_value_double = (a) => (f._sqlite3_value_double = Y.ib)(a);
    f._sqlite3_get_autocommit = (a) => (f._sqlite3_get_autocommit = Y.jb)(a);
    f._sqlite3_vfs_find = (a) => (f._sqlite3_vfs_find = Y.kb)(a);
    f._sqlite3_data_count = (a) => (f._sqlite3_data_count = Y.lb)(a);
    f._sqlite3_bind_parameter_count = (a) => (f._sqlite3_bind_parameter_count = Y.mb)(a);
    f._sqlite3_bind_parameter_name = (a, b) => (f._sqlite3_bind_parameter_name = Y.nb)(a, b);
    f._sqlite3_libversion = () => (f._sqlite3_libversion = Y.ob)();
    f._sqlite3_libversion_number = () => (f._sqlite3_libversion_number = Y.pb)();
    f._sqlite3_changes = (a) => (f._sqlite3_changes = Y.qb)(a);
    f._sqlite3_limit = (a, b, c) => (f._sqlite3_limit = Y.rb)(a, b, c);
    f._sqlite3_open_v2 = (a, b, c, d) => (f._sqlite3_open_v2 = Y.sb)(a, b, c, d);
    var jd = () => (jd = Y.tb)(), Tb = f._malloc = (a) => (Tb = f._malloc = Y.ub)(a), cd = f._free = (a) => (cd = f._free = Y.vb)(a);
    f._RegisterExtensionFunctions = (a) => (f._RegisterExtensionFunctions = Y.wb)(a);
    f._set_authorizer = (a) => (f._set_authorizer = Y.xb)(a);
    f._create_function = (a, b, c, d, e, h) => (f._create_function = Y.yb)(a, b, c, d, e, h);
    f._update_hook = (a, b) => (f._update_hook = Y.zb)(a, b);
    f._create_module = (a, b, c, d) => (f._create_module = Y.Ab)(a, b, c, d);
    f._progress_handler = (a, b) => (f._progress_handler = Y.Bb)(a, b);
    f._register_vfs = (a, b, c, d) => (f._register_vfs = Y.Cb)(a, b, c, d);
    f._getSqliteFree = () => (f._getSqliteFree = Y.Db)();
    var ld = f._main = (a, b) => (ld = f._main = Y.Eb)(a, b), db = (a, b) => (db = Y.Gb)(a, b), md = () => (md = Y.Hb)(), hd = () => (hd = Y.Ib)(), fd = (a) => (fd = Y.Jb)(a), gd = (a) => (gd = Y.Kb)(a), ad = (a) => (ad = Y.Lb)(a), Qc = () => (Qc = Y.Mb)(), $c = (a) => ($c = Y.Nb)(a), bd = () => (bd = Y.Ob)();
    f.getTempRet0 = md;
    f.ccall = Z;
    f.cwrap = (a, b, c, d) => {
      var e = !c || c.every((h) => "number" === h || "boolean" === h);
      return "string" !== b && e && !d ? f["_" + a] : function() {
        return Z(a, b, c, arguments, d);
      };
    };
    f.setValue = J;
    f.getValue = I;
    f.UTF8ToString = (a, b) => a ? K(y, a, b) : "";
    f.stringToUTF8 = (a, b, c) => Sa(a, y, b, c);
    f.lengthBytesUTF8 = Ra;
    var nd;
    za = function od() {
      nd || pd();
      nd || (za = od);
    };
    function pd() {
      function a() {
        if (!nd && (nd = true, f.calledRun = true, !v)) {
          f.noFSInit || Jb || (Jb = true, Ib(), f.stdin = f.stdin, f.stdout = f.stdout, f.stderr = f.stderr, f.stdin ? Kb("stdin", f.stdin) : zb("/dev/tty", "/dev/stdin"), f.stdout ? Kb("stdout", null, f.stdout) : zb("/dev/tty", "/dev/stdout"), f.stderr ? Kb("stderr", null, f.stderr) : zb("/dev/tty1", "/dev/stderr"), Fb("/dev/stdin", 0), Fb("/dev/stdout", 1), Fb("/dev/stderr", 1));
          jb = false;
          Ia(ta);
          Ia(ua);
          aa(f);
          if (f.onRuntimeInitialized)
            f.onRuntimeInitialized();
          if (qd) {
            var b = ld;
            try {
              var c = b(0, 0);
              na = c;
              Lc(c);
            } catch (d) {
              Mc(d);
            }
          }
          if (f.postRun)
            for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length; )
              b = f.postRun.shift(), va.unshift(b);
          Ia(va);
        }
      }
      if (!(0 < C)) {
        if (f.preRun)
          for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length; )
            xa();
        Ia(sa);
        0 < C || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            f.setStatus("");
          }, 1);
          a();
        }, 1)) : a());
      }
    }
    if (f.preInit)
      for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length; )
        f.preInit.pop()();
    var qd = true;
    f.noInitialRun && (qd = false);
    pd();
    return moduleArg.ready;
  };
})();
var crsqlite_default = Module;

// node_modules/@vlcn.io/wa-sqlite/src/sqlite-constants.js
var SQLITE_OK = 0;
var SQLITE_BUSY = 5;
var SQLITE_IOERR = 10;
var SQLITE_NOTFOUND = 12;
var SQLITE_CANTOPEN = 14;
var SQLITE_MISUSE = 21;
var SQLITE_RANGE = 25;
var SQLITE_NOTICE = 27;
var SQLITE_ROW = 100;
var SQLITE_DONE = 101;
var SQLITE_IOERR_LOCK = 3850;
var SQLITE_IOERR_SHORT_READ = 522;
var SQLITE_OPEN_READONLY = 1;
var SQLITE_OPEN_READWRITE = 2;
var SQLITE_OPEN_CREATE = 4;
var SQLITE_OPEN_DELETEONCLOSE = 8;
var SQLITE_OPEN_URI = 64;
var SQLITE_OPEN_MAIN_DB = 256;
var SQLITE_OPEN_TEMP_DB = 512;
var SQLITE_OPEN_TRANSIENT_DB = 1024;
var SQLITE_OPEN_MAIN_JOURNAL = 2048;
var SQLITE_OPEN_TEMP_JOURNAL = 4096;
var SQLITE_OPEN_SUBJOURNAL = 8192;
var SQLITE_OPEN_SUPER_JOURNAL = 16384;
var SQLITE_LOCK_NONE = 0;
var SQLITE_LOCK_SHARED = 1;
var SQLITE_LOCK_RESERVED = 2;
var SQLITE_LOCK_PENDING = 3;
var SQLITE_LOCK_EXCLUSIVE = 4;
var SQLITE_IOCAP_SAFE_APPEND = 512;
var SQLITE_IOCAP_SEQUENTIAL = 1024;
var SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN = 2048;
var SQLITE_IOCAP_BATCH_ATOMIC = 16384;
var SQLITE_INTEGER = 1;
var SQLITE_FLOAT = 2;
var SQLITE_TEXT = 3;
var SQLITE_BLOB = 4;
var SQLITE_NULL = 5;
var SQLITE_UTF8 = 1;

// node_modules/@vlcn.io/wa-sqlite/src/sqlite-api.js
var MAX_INT64 = 0x7fffffffffffffffn;
var MIN_INT64 = -0x8000000000000000n;
var SQLiteError = class extends Error {
  constructor(message2, code) {
    super(message2);
    this.code = code;
  }
};
var async = true;
function Factory(Module2) {
  const sqlite3 = {};
  const sqliteFreeAddress = Module2._getSqliteFree();
  const tmp = Module2._malloc(8);
  const tmpPtr = [tmp, tmp + 4];
  function createUTF8(s) {
    if (typeof s !== "string")
      return 0;
    const n = Module2.lengthBytesUTF8(s);
    const zts = Module2._sqlite3_malloc(n + 1);
    Module2.stringToUTF8(s, zts, n + 1);
    return zts;
  }
  function cvt32x2ToBigInt(lo32, hi32) {
    return BigInt(hi32) << 32n | BigInt(lo32) & 0xffffffffn;
  }
  const cvt32x2AsSafe = function() {
    const hiMax = BigInt(Number.MAX_SAFE_INTEGER) >> 32n;
    const hiMin = BigInt(Number.MIN_SAFE_INTEGER) >> 32n;
    return function(lo32, hi32) {
      if (hi32 > hiMax || hi32 < hiMin) {
        return cvt32x2ToBigInt(lo32, hi32);
      } else {
        return hi32 * 4294967296 + (lo32 & 2147483647) - (lo32 & 2147483648);
      }
    };
  }();
  const databases = /* @__PURE__ */ new Set();
  function verifyDatabase(db) {
    if (!databases.has(db)) {
      throw new SQLiteError("not a database", SQLITE_MISUSE);
    }
  }
  const mapStmtToDB = /* @__PURE__ */ new Map();
  function verifyStatement(stmt) {
    if (!mapStmtToDB.has(stmt)) {
      throw new SQLiteError("not a statement", SQLITE_MISUSE);
    }
  }
  sqlite3.bind_collection = function(stmt, bindings) {
    verifyStatement(stmt);
    const isArray2 = Array.isArray(bindings);
    const nBindings = sqlite3.bind_parameter_count(stmt);
    for (let i = 1; i <= nBindings; ++i) {
      const key = isArray2 ? i - 1 : sqlite3.bind_parameter_name(stmt, i);
      const value = bindings[key];
      if (value !== void 0) {
        sqlite3.bind(stmt, i, value);
      }
    }
    return SQLITE_OK;
  };
  sqlite3.bind = function(stmt, i, value) {
    verifyStatement(stmt);
    switch (typeof value) {
      case "number":
        if (value === (value | 0)) {
          return sqlite3.bind_int(stmt, i, value);
        } else {
          return sqlite3.bind_double(stmt, i, value);
        }
      case "string":
        return sqlite3.bind_text(stmt, i, value);
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          return sqlite3.bind_blob(stmt, i, value);
        } else if (value === null) {
          return sqlite3.bind_null(stmt, i);
        } else if (typeof value === "bigint") {
          return sqlite3.bind_int64(stmt, i, value);
        } else if (value === void 0) {
          return SQLITE_NOTICE;
        } else {
          throw new Error("Unknown binding type " + typeof value);
        }
    }
  };
  sqlite3.bind_blob = function() {
    const fname = "sqlite3_bind_blob";
    const f = Module2.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module2._sqlite3_malloc(byteLength);
      Module2.HEAPU8.subarray(ptr).set(value);
      const result = f(stmt, i, ptr, byteLength, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_count = function() {
    const fname = "sqlite3_bind_parameter_count";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.bind_double = function() {
    const fname = "sqlite3_bind_double";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int = function() {
    const fname = "sqlite3_bind_int";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > 2147483647 || value < -2147483648)
        return SQLITE_RANGE;
      const result = f(stmt, i, value);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_int64 = function() {
    const fname = "sqlite3_bind_int64";
    const f = Module2.cwrap(fname, ...decl("nnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      if (value > MAX_INT64 || value < MIN_INT64)
        return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      const result = f(stmt, i, Number(lo32), Number(hi32));
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_null = function() {
    const fname = "sqlite3_bind_null";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.bind_parameter_name = function() {
    const fname = "sqlite3_bind_parameter_name";
    const f = Module2.cwrap(fname, ...decl("n:s"));
    return function(stmt, i) {
      verifyStatement(stmt);
      const result = f(stmt, i);
      return result;
    };
  }();
  sqlite3.bind_text = function() {
    const fname = "sqlite3_bind_text";
    const f = Module2.cwrap(fname, ...decl("nnnnn:n"));
    return function(stmt, i, value) {
      verifyStatement(stmt);
      const ptr = createUTF8(value);
      const result = f(stmt, i, ptr, -1, sqliteFreeAddress);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.changes = function() {
    const fname = "sqlite3_changes";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(db) {
      verifyDatabase(db);
      const result = f(db);
      return result;
    };
  }();
  sqlite3.close = function() {
    const fname = "sqlite3_close";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(db) {
      verifyDatabase(db);
      const result = await f(db);
      databases.delete(db);
      return check(fname, result, db);
    };
  }();
  sqlite3.column = function(stmt, iCol) {
    verifyStatement(stmt);
    const type = sqlite3.column_type(stmt, iCol);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.column_blob(stmt, iCol);
      case SQLITE_FLOAT:
        return sqlite3.column_double(stmt, iCol);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.column_int(stmt, iCol);
        const hi32 = Module2.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLITE_NULL:
        return null;
      case SQLITE_TEXT:
        return sqlite3.column_text(stmt, iCol);
      default:
        throw new SQLiteError("unknown type", type);
    }
  };
  sqlite3.column_blob = function() {
    const fname = "sqlite3_column_blob";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const nBytes = sqlite3.column_bytes(stmt, iCol);
      const address = f(stmt, iCol);
      const result = Module2.HEAPU8.subarray(address, address + nBytes);
      const dst = new ArrayBuffer(result.byteLength);
      const ret = new Uint8Array(dst);
      ret.set(result);
      return ret;
    };
  }();
  sqlite3.column_bytes = function() {
    const fname = "sqlite3_column_bytes";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_count = function() {
    const fname = "sqlite3_column_count";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.column_double = function() {
    const fname = "sqlite3_column_double";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int = function() {
    const fname = "sqlite3_column_int64";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_int64 = function() {
    const fname = "sqlite3_column_int64";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const lo32 = f(stmt, iCol);
      const hi32 = Module2.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.column_name = function() {
    const fname = "sqlite3_column_name";
    const f = Module2.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_names = function(stmt) {
    const columns = [];
    const nColumns = sqlite3.column_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      columns.push(sqlite3.column_name(stmt, i));
    }
    return columns;
  };
  sqlite3.column_text = function() {
    const fname = "sqlite3_column_text";
    const f = Module2.cwrap(fname, ...decl("nn:s"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.column_type = function() {
    const fname = "sqlite3_column_type";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(stmt, iCol) {
      verifyStatement(stmt);
      const result = f(stmt, iCol);
      return result;
    };
  }();
  sqlite3.update_hook = function(db, xUpdate) {
    verifyDatabase(db);
    Module2.updateHook(db, xUpdate);
    return SQLITE_OK;
  };
  sqlite3.create_function = function(db, zFunctionName, nArg, eTextRep, pApp, xFunc, xStep, xFinal) {
    verifyDatabase(db);
    if (xFunc && !xStep && !xFinal) {
      const result = Module2.createFunction(db, zFunctionName, nArg, eTextRep, pApp, xFunc);
      return check("sqlite3_create_function", result, db);
    }
    if (!xFunc && xStep && xFinal) {
      const result = Module2.createAggregate(db, zFunctionName, nArg, eTextRep, pApp, xStep, xFinal);
      return check("sqlite3_create_function", result, db);
    }
    throw new SQLiteError("invalid function combination", SQLITE_MISUSE);
  };
  sqlite3.create_module = function(db, zName, module, appData) {
    verifyDatabase(db);
    const result = Module2.createModule(db, zName, module, appData);
    return check("sqlite3_create_module", result, db);
  };
  sqlite3.data_count = function() {
    const fname = "sqlite3_data_count";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.declare_vtab = function() {
    const fname = "sqlite3_declare_vtab";
    const f = Module2.cwrap(fname, ...decl("ns:n"));
    return function(pVTab, zSQL) {
      const result = f(pVTab, zSQL);
      return check("sqlite3_declare_vtab", result);
    };
  }();
  sqlite3.exec = async function(db, sql, callback) {
    for await (const stmt of sqlite3.statements(db, sql)) {
      let columns;
      while (await sqlite3.step(stmt) === SQLITE_ROW) {
        if (callback) {
          columns = columns ?? sqlite3.column_names(stmt);
          const row = sqlite3.row(stmt);
          await callback(row, columns);
        }
      }
    }
    return SQLITE_OK;
  };
  sqlite3.finalize = function() {
    const fname = "sqlite3_finalize";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      if (!mapStmtToDB.has(stmt)) {
        return SQLITE_MISUSE;
      }
      const result = await f(stmt);
      const db = mapStmtToDB.get(stmt);
      mapStmtToDB.delete(stmt);
      return result;
    };
  }();
  sqlite3.get_autocommit = function() {
    const fname = "sqlite3_get_autocommit";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(db) {
      const result = f(db);
      return result;
    };
  }();
  sqlite3.libversion = function() {
    const fname = "sqlite3_libversion";
    const f = Module2.cwrap(fname, ...decl(":s"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.libversion_number = function() {
    const fname = "sqlite3_libversion_number";
    const f = Module2.cwrap(fname, ...decl(":n"));
    return function() {
      const result = f();
      return result;
    };
  }();
  sqlite3.limit = function() {
    const fname = "sqlite3_limit";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(db, id, newVal) {
      const result = f(db, id, newVal);
      return result;
    };
  }();
  sqlite3.open_v2 = function() {
    const fname = "sqlite3_open_v2";
    const f = Module2.cwrap(fname, ...decl("snnn:n"), { async });
    return async function(zFilename, flags, zVfs) {
      flags = flags || SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE;
      zVfs = createUTF8(zVfs);
      const result = await f(zFilename, tmpPtr[0], flags, zVfs);
      const db = Module2.getValue(tmpPtr[0], "*");
      databases.add(db);
      Module2._sqlite3_free(zVfs);
      Module2.ccall("RegisterExtensionFunctions", "void", ["number"], [db]);
      check(fname, result);
      return db;
    };
  }();
  sqlite3.prepare_v2 = function() {
    const fname = "sqlite3_prepare_v2";
    const f = Module2.cwrap(fname, ...decl("nnnnn:n"), { async });
    return async function(db, sql) {
      const result = await f(db, sql, -1, tmpPtr[0], tmpPtr[1]);
      check(fname, result, db);
      const stmt = Module2.getValue(tmpPtr[0], "*");
      if (stmt) {
        mapStmtToDB.set(stmt, db);
        return { stmt, sql: Module2.getValue(tmpPtr[1], "*") };
      }
      return null;
    };
  }();
  sqlite3.progress_handler = function(db, nProgressOps, handler, userData) {
    verifyDatabase(db);
    Module2.progressHandler(db, nProgressOps, handler, userData);
  };
  ;
  sqlite3.reset = function() {
    const fname = "sqlite3_reset";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt));
    };
  }();
  sqlite3.result = function(context, value) {
    switch (typeof value) {
      case "number":
        if (value === (value | 0)) {
          sqlite3.result_int(context, value);
        } else {
          sqlite3.result_double(context, value);
        }
        break;
      case "string":
        sqlite3.result_text(context, value);
        break;
      default:
        if (value instanceof Uint8Array || Array.isArray(value)) {
          sqlite3.result_blob(context, value);
        } else if (value === null) {
          sqlite3.result_null(context);
        } else if (typeof value === "bigint") {
          return sqlite3.result_int64(context, value);
        } else {
          console.warn("unknown result converted to null", value);
          sqlite3.result_null(context);
        }
        break;
    }
  };
  sqlite3.result_blob = function() {
    const fname = "sqlite3_result_blob";
    const f = Module2.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const byteLength = value.byteLength ?? value.length;
      const ptr = Module2._sqlite3_malloc(byteLength);
      Module2.HEAPU8.subarray(ptr).set(value);
      f(context, ptr, byteLength, sqliteFreeAddress);
    };
  }();
  sqlite3.result_double = function() {
    const fname = "sqlite3_result_double";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int = function() {
    const fname = "sqlite3_result_int";
    const f = Module2.cwrap(fname, ...decl("nn:n"));
    return function(context, value) {
      f(context, value);
    };
  }();
  sqlite3.result_int64 = function() {
    const fname = "sqlite3_result_int64";
    const f = Module2.cwrap(fname, ...decl("nnn:n"));
    return function(context, value) {
      if (value > MAX_INT64 || value < MIN_INT64)
        return SQLITE_RANGE;
      const lo32 = value & 0xffffffffn;
      const hi32 = value >> 32n;
      f(context, Number(lo32), Number(hi32));
    };
  }();
  sqlite3.result_null = function() {
    const fname = "sqlite3_result_null";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(context) {
      f(context);
    };
  }();
  sqlite3.result_text = function() {
    const fname = "sqlite3_result_text";
    const f = Module2.cwrap(fname, ...decl("nnnn:n"));
    return function(context, value) {
      const ptr = createUTF8(value);
      f(context, ptr, -1, sqliteFreeAddress);
    };
  }();
  sqlite3.row = function(stmt) {
    const row = [];
    const nColumns = sqlite3.data_count(stmt);
    for (let i = 0; i < nColumns; ++i) {
      const value = sqlite3.column(stmt, i);
      row.push(value?.buffer === Module2.HEAPU8.buffer ? value.slice() : value);
    }
    return row;
  };
  sqlite3.set_authorizer = function(db, authFunction, userData) {
    verifyDatabase(db);
    const result = Module2.setAuthorizer(db, authFunction, userData);
    return check("sqlite3_set_authorizer", result, db);
  };
  ;
  sqlite3.sql = function() {
    const fname = "sqlite3_sql";
    const f = Module2.cwrap(fname, ...decl("n:s"));
    return function(stmt) {
      verifyStatement(stmt);
      const result = f(stmt);
      return result;
    };
  }();
  sqlite3.statements = function(db, sql) {
    return async function* () {
      const str = sqlite3.str_new(db, sql);
      let prepared = { stmt: null, sql: sqlite3.str_value(str) };
      try {
        while (prepared = await sqlite3.prepare_v2(db, prepared.sql)) {
          yield prepared.stmt;
          sqlite3.finalize(prepared.stmt);
          prepared.stmt = null;
        }
      } finally {
        if (prepared?.stmt) {
          sqlite3.finalize(prepared.stmt);
        }
        sqlite3.str_finish(str);
      }
    }();
  };
  sqlite3.step = function() {
    const fname = "sqlite3_step";
    const f = Module2.cwrap(fname, ...decl("n:n"), { async });
    return async function(stmt) {
      verifyStatement(stmt);
      const result = await f(stmt);
      return check(fname, result, mapStmtToDB.get(stmt), [SQLITE_ROW, SQLITE_DONE]);
    };
  }();
  let stringId = 0;
  const strings = /* @__PURE__ */ new Map();
  sqlite3.str_new = function(db, s = "") {
    const sBytes = Module2.lengthBytesUTF8(s);
    const str = stringId++ & 4294967295;
    const data = {
      offset: Module2._sqlite3_malloc(sBytes + 1),
      bytes: sBytes
    };
    strings.set(str, data);
    Module2.stringToUTF8(s, data.offset, data.bytes + 1);
    return str;
  };
  sqlite3.str_appendall = function(str, s) {
    if (!strings.has(str)) {
      throw new SQLiteError("not a string", SQLITE_MISUSE);
    }
    const data = strings.get(str);
    const sBytes = Module2.lengthBytesUTF8(s);
    const newBytes = data.bytes + sBytes;
    const newOffset = Module2._sqlite3_malloc(newBytes + 1);
    const newArray = Module2.HEAPU8.subarray(newOffset, newOffset + newBytes + 1);
    newArray.set(Module2.HEAPU8.subarray(data.offset, data.offset + data.bytes));
    Module2.stringToUTF8(s, newOffset + data.bytes, sBytes + 1);
    Module2._sqlite3_free(data.offset);
    data.offset = newOffset;
    data.bytes = newBytes;
    strings.set(str, data);
  };
  sqlite3.str_finish = function(str) {
    if (!strings.has(str)) {
      throw new SQLiteError("not a string", SQLITE_MISUSE);
    }
    const data = strings.get(str);
    strings.delete(str);
    Module2._sqlite3_free(data.offset);
  };
  sqlite3.str_value = function(str) {
    if (!strings.has(str)) {
      throw new SQLiteError("not a string", SQLITE_MISUSE);
    }
    return strings.get(str).offset;
  };
  sqlite3.user_data = function(context) {
    return Module2.getFunctionUserData(context);
  };
  sqlite3.value = function(pValue) {
    const type = sqlite3.value_type(pValue);
    switch (type) {
      case SQLITE_BLOB:
        return sqlite3.value_blob(pValue);
      case SQLITE_FLOAT:
        return sqlite3.value_double(pValue);
      case SQLITE_INTEGER:
        const lo32 = sqlite3.value_int(pValue);
        const hi32 = Module2.getTempRet0();
        return cvt32x2AsSafe(lo32, hi32);
      case SQLITE_NULL:
        return null;
      case SQLITE_TEXT:
        return sqlite3.value_text(pValue);
      default:
        throw new SQLiteError("unknown type", type);
    }
  };
  sqlite3.value_blob = function() {
    const fname = "sqlite3_value_blob";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const nBytes = sqlite3.value_bytes(pValue);
      const address = f(pValue);
      const result = Module2.HEAPU8.subarray(address, address + nBytes);
      return result;
    };
  }();
  sqlite3.value_bytes = function() {
    const fname = "sqlite3_value_bytes";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_double = function() {
    const fname = "sqlite3_value_double";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int = function() {
    const fname = "sqlite3_value_int64";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_int64 = function() {
    const fname = "sqlite3_value_int64";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const lo32 = f(pValue);
      const hi32 = Module2.getTempRet0();
      const result = cvt32x2ToBigInt(lo32, hi32);
      return result;
    };
  }();
  sqlite3.value_text = function() {
    const fname = "sqlite3_value_text";
    const f = Module2.cwrap(fname, ...decl("n:s"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.value_type = function() {
    const fname = "sqlite3_value_type";
    const f = Module2.cwrap(fname, ...decl("n:n"));
    return function(pValue) {
      const result = f(pValue);
      return result;
    };
  }();
  sqlite3.vfs_register = function(vfs, makeDefault) {
    const result = Module2.registerVFS(vfs, makeDefault);
    return check("sqlite3_vfs_register", result);
  };
  function check(fname, result, db = null, allowed = [SQLITE_OK]) {
    if (allowed.includes(result))
      return result;
    const message2 = db ? Module2.ccall("sqlite3_errmsg", "string", ["number"], [db]) : fname;
    throw new SQLiteError(message2, result);
  }
  return sqlite3;
}
function decl(s) {
  const result = [];
  const m = s.match(/([ns@]*):([nsv@])/);
  switch (m[2]) {
    case "n":
      result.push("number");
      break;
    case "s":
      result.push("string");
      break;
    case "v":
      result.push(null);
      break;
  }
  const args = [];
  for (let c of m[1]) {
    switch (c) {
      case "n":
        args.push("number");
        break;
      case "s":
        args.push("string");
        break;
    }
  }
  result.push(args);
  return result;
}

// node_modules/@vlcn.io/wa-sqlite/src/VFS.js
var Base = class {
  mxPathName = 64;
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xClose(fileId) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xRead(fileId, pData, iOffset) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xWrite(fileId, pData, iOffset) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  xTruncate(fileId, iSize) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {*} flags 
   * @returns {number}
   */
  xSync(fileId, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  xFileSize(fileId, pSize64) {
    return SQLITE_IOERR;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xLock(fileId, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xUnlock(fileId, flags) {
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xCheckReservedLock(fileId, pResOut) {
    pResOut.setInt32(0, 0, true);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} op 
   * @param {DataView} pArg 
   * @returns {number}
   */
  xFileControl(fileId, op, pArg) {
    return SQLITE_NOTFOUND;
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xSectorSize(fileId) {
    return 512;
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xDeviceCharacteristics(fileId) {
    return 0;
  }
  /**
   * @param {string?} name 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  xOpen(name2, fileId, flags, pOutFlags) {
    return SQLITE_CANTOPEN;
  }
  /**
   * @param {string} name 
   * @param {number} syncDir 
   * @returns {number}
   */
  xDelete(name2, syncDir) {
    return SQLITE_IOERR;
  }
  /**
   * @param {string} name 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xAccess(name2, flags, pResOut) {
    return SQLITE_IOERR;
  }
  /**
   * Handle asynchronous operation. This implementation will be overriden on
   * registration by an Asyncify build.
   * @param {function(): Promise<number>} f 
   * @returns {number}
   */
  handleAsync(f) {
    return f();
  }
};
var FILE_TYPE_MASK = [
  SQLITE_OPEN_MAIN_DB,
  SQLITE_OPEN_MAIN_JOURNAL,
  SQLITE_OPEN_TEMP_DB,
  SQLITE_OPEN_TEMP_JOURNAL,
  SQLITE_OPEN_TRANSIENT_DB,
  SQLITE_OPEN_SUBJOURNAL,
  SQLITE_OPEN_SUPER_JOURNAL
].reduce((mask, element) => mask | element);

// node_modules/@vlcn.io/wa-sqlite/src/examples/WebLocks.js
var LOCK_TYPE_MASK = SQLITE_LOCK_NONE | SQLITE_LOCK_SHARED | SQLITE_LOCK_RESERVED | SQLITE_LOCK_PENDING | SQLITE_LOCK_EXCLUSIVE;
var WebLocksBase = class {
  get state() {
    return this.#state;
  }
  #state = SQLITE_LOCK_NONE;
  timeoutMillis = 0;
  /** @type {Map<string, (value: any) => void>} */
  #releasers = /* @__PURE__ */ new Map();
  /** @type {Promise<0|5|3850>} */
  #pending = Promise.resolve(0);
  /**
   * @param {number} flags 
   * @returns {Promise<0|5|3850>} SQLITE_OK, SQLITE_BUSY, SQLITE_IOERR_LOCK
   */
  async lock(flags) {
    return this.#apply(this.#lock, flags);
  }
  /**
   * @param {number} flags 
   * @returns {Promise<0|5|3850>} SQLITE_OK, SQLITE_IOERR_LOCK
   */
  async unlock(flags) {
    return this.#apply(this.#unlock, flags);
  }
  /**
   * @returns {Promise<boolean>}
   */
  async isSomewhereReserved() {
    throw new Error("unimplemented");
  }
  /**
   * 
   * @param {(targetState: number) => void} method 
   * @param {number} flags 
   */
  async #apply(method, flags) {
    const targetState = flags & LOCK_TYPE_MASK;
    try {
      const call = () => method.call(this, targetState);
      await (this.#pending = this.#pending.then(call, call));
      this.#state = targetState;
      return SQLITE_OK;
    } catch (e) {
      if (e.name === "AbortError") {
        return SQLITE_BUSY;
      }
      console.error(e);
      return SQLITE_IOERR_LOCK;
    }
  }
  async #lock(targetState) {
    if (targetState === this.#state)
      return SQLITE_OK;
    switch (this.#state) {
      case SQLITE_LOCK_NONE:
        switch (targetState) {
          case SQLITE_LOCK_SHARED:
            return this._NONEtoSHARED();
          default:
            throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
        }
      case SQLITE_LOCK_SHARED:
        switch (targetState) {
          case SQLITE_LOCK_RESERVED:
            return this._SHAREDtoRESERVED();
          case SQLITE_LOCK_EXCLUSIVE:
            return this._SHAREDtoEXCLUSIVE();
          default:
            throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
        }
      case SQLITE_LOCK_RESERVED:
        switch (targetState) {
          case SQLITE_LOCK_EXCLUSIVE:
            return this._RESERVEDtoEXCLUSIVE();
          default:
            throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
        }
      default:
        throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
    }
  }
  async #unlock(targetState) {
    if (targetState === this.#state)
      return SQLITE_OK;
    switch (this.#state) {
      case SQLITE_LOCK_EXCLUSIVE:
        switch (targetState) {
          case SQLITE_LOCK_SHARED:
            return this._EXCLUSIVEtoSHARED();
          case SQLITE_LOCK_NONE:
            return this._EXCLUSIVEtoNONE();
          default:
            throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
        }
      case SQLITE_LOCK_RESERVED:
        switch (targetState) {
          case SQLITE_LOCK_SHARED:
            return this._RESERVEDtoSHARED();
          case SQLITE_LOCK_NONE:
            return this._RESERVEDtoNONE();
          default:
            throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
        }
      case SQLITE_LOCK_SHARED:
        switch (targetState) {
          case SQLITE_LOCK_NONE:
            return this._SHAREDtoNONE();
          default:
            throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
        }
      default:
        throw new Error(`unexpected transition ${this.#state} -> ${targetState}`);
    }
  }
  async _NONEtoSHARED() {
  }
  async _SHAREDtoEXCLUSIVE() {
    await this._SHAREDtoRESERVED();
    await this._RESERVEDtoEXCLUSIVE();
  }
  async _SHAREDtoRESERVED() {
  }
  async _RESERVEDtoEXCLUSIVE() {
  }
  async _EXCLUSIVEtoRESERVED() {
  }
  async _EXCLUSIVEtoSHARED() {
    await this._EXCLUSIVEtoRESERVED();
    await this._RESERVEDtoSHARED();
  }
  async _EXCLUSIVEtoNONE() {
    await this._EXCLUSIVEtoRESERVED();
    await this._RESERVEDtoSHARED();
    await this._SHAREDtoNONE();
  }
  async _RESERVEDtoSHARED() {
  }
  async _RESERVEDtoNONE() {
    await this._RESERVEDtoSHARED();
    await this._SHAREDtoNONE();
  }
  async _SHAREDtoNONE() {
  }
  /**
   * @param {string} lockName 
   * @param {LockOptions} options 
   * @returns {Promise<?Lock>}
   */
  _acquireWebLock(lockName, options) {
    return new Promise(async (resolve4, reject2) => {
      try {
        await navigator.locks.request(lockName, options, (lock) => {
          resolve4(lock);
          if (lock) {
            return new Promise((release) => this.#releasers.set(lockName, release));
          }
        });
      } catch (e) {
        reject2(e);
      }
    });
  }
  /**
   * @param {string} lockName 
   */
  _releaseWebLock(lockName) {
    this.#releasers.get(lockName)?.();
    this.#releasers.delete(lockName);
  }
  /**
   * @param {string} lockName 
   */
  async _pollWebLock(lockName) {
    const query2 = await navigator.locks.query();
    return query2.held.find(({ name: name2 }) => name2 === lockName)?.mode;
  }
  /**
   * @returns {?AbortSignal}
   */
  _getTimeoutSignal() {
    if (this.timeoutMillis) {
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), this.timeoutMillis);
      return abortController.signal;
    }
    return void 0;
  }
};
var WebLocksExclusive = class extends WebLocksBase {
  /**
   * @param {string} name 
   */
  constructor(name2) {
    super();
    this._lockName = name2 + "-outer";
    this._reservedName = name2 + "-reserved";
  }
  async isSomewhereReserved() {
    const mode = await this._pollWebLock(this._reservedName);
    return mode === "exclusive";
  }
  async _NONEtoSHARED() {
    await this._acquireWebLock(this._lockName, {
      mode: "exclusive",
      signal: this._getTimeoutSignal()
    });
  }
  async _SHAREDtoRESERVED() {
    await this._acquireWebLock(this._reservedName, {
      mode: "exclusive",
      signal: this._getTimeoutSignal()
    });
  }
  async _RESERVEDtoSHARED() {
    this._releaseWebLock(this._reservedName);
  }
  async _SHAREDtoNONE() {
    this._releaseWebLock(this._lockName);
  }
};

// node_modules/@vlcn.io/wa-sqlite/src/examples/IDBContext.js
var MAX_TRANSACTION_LIFETIME_MILLIS = 5e3;
var nextTxId = 0;
var mapTxToId = /* @__PURE__ */ new WeakMap();
function log3(...args) {
}
var IDBContext = class {
  /** @type {IDBDatabase} */
  #db;
  /** @type {Promise<IDBDatabase>} */
  #dbReady;
  #txOptions;
  /** @type {IDBTransaction} */
  #tx = null;
  #txTimestamp = 0;
  #runChain = Promise.resolve();
  #putChain = Promise.resolve();
  /**
   * @param {IDBDatabase|Promise<IDBDatabase>} idbDatabase
   */
  constructor(idbDatabase, txOptions = { durability: "default" }) {
    this.#dbReady = Promise.resolve(idbDatabase).then((db) => this.#db = db);
    this.#txOptions = txOptions;
  }
  async close() {
    const db = this.#db ?? await this.#dbReady;
    await this.#runChain;
    await this.sync();
    db.close();
  }
  /**
   * Run a function with the provided object stores. The function
   * should be idempotent in case it is passed an expired transaction.
   * @param {IDBTransactionMode} mode
   * @param {(stores: Object.<string, ObjectStore>) => any} f 
   */
  async run(mode, f) {
    const result = this.#runChain.then(() => this.#run(mode, f));
    this.#runChain = result.catch(() => {
    });
    return result;
  }
  /**
   * @param {IDBTransactionMode} mode
   * @param {(stores: Object.<string, ObjectStore>) => any} f 
   * @returns 
   */
  async #run(mode, f) {
    const db = this.#db ?? await this.#dbReady;
    if (mode === "readwrite" && this.#tx?.mode === "readonly") {
      this.#tx = null;
    } else if (performance.now() - this.#txTimestamp > MAX_TRANSACTION_LIFETIME_MILLIS) {
      try {
        this.#tx?.commit();
      } catch (e) {
        if (e.name !== "InvalidStateError")
          throw e;
      }
      await new Promise((resolve4) => setTimeout(resolve4));
      this.#tx = null;
    }
    for (let i = 0; i < 2; ++i) {
      if (!this.#tx) {
        this.#tx = db.transaction(db.objectStoreNames, mode, this.#txOptions);
        const timestamp = this.#txTimestamp = performance.now();
        this.#putChain = this.#putChain.then(() => {
          return new Promise((resolve4, reject2) => {
            this.#tx.addEventListener("complete", (event) => {
              resolve4();
              if (this.#tx === event.target) {
                this.#tx = null;
              }
              log3(`transaction ${mapTxToId.get(event.target)} complete`);
            });
            this.#tx.addEventListener("abort", (event) => {
              console.warn("tx abort", (performance.now() - timestamp) / 1e3);
              const e = event.target.error;
              reject2(e);
              if (this.#tx === event.target) {
                this.#tx = null;
              }
              log3(`transaction ${mapTxToId.get(event.target)} aborted`, e);
            });
          });
        });
        log3(`new transaction ${nextTxId} ${mode}`);
        mapTxToId.set(this.#tx, nextTxId++);
      }
      try {
        const stores = Object.fromEntries(Array.from(db.objectStoreNames, (name2) => {
          return [name2, new ObjectStore(this.#tx.objectStore(name2))];
        }));
        return await f(stores);
      } catch (e) {
        this.#tx = null;
        if (i)
          throw e;
      }
    }
  }
  async sync() {
    await this.#runChain;
    await this.#putChain;
    this.#putChain = Promise.resolve();
  }
};
function wrapRequest(request) {
  return new Promise((resolve4, reject2) => {
    request.addEventListener("success", () => resolve4(request.result));
    request.addEventListener("error", () => reject2(request.error));
  });
}
var ObjectStore = class {
  #objectStore;
  /**
   * @param {IDBObjectStore} objectStore 
   */
  constructor(objectStore) {
    this.#objectStore = objectStore;
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise}
   */
  get(query2) {
    log3(`get ${this.#objectStore.name}`, query2);
    const request = this.#objectStore.get(query2);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise}
   */
  getAll(query2, count) {
    log3(`getAll ${this.#objectStore.name}`, query2, count);
    const request = this.#objectStore.getAll(query2, count);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise<IDBValidKey>}
   */
  getKey(query2) {
    log3(`getKey ${this.#objectStore.name}`, query2);
    const request = this.#objectStore.getKey(query2);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise}
   */
  getAllKeys(query2, count) {
    log3(`getAllKeys ${this.#objectStore.name}`, query2, count);
    const request = this.#objectStore.getAllKeys(query2, count);
    return wrapRequest(request);
  }
  /**
   * @param {any} value
   * @param {IDBValidKey} [key] 
   * @returns {Promise}
   */
  put(value, key) {
    log3(`put ${this.#objectStore.name}`, value, key);
    const request = this.#objectStore.put(value, key);
    return wrapRequest(request);
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @returns {Promise}
   */
  delete(query2) {
    log3(`delete ${this.#objectStore.name}`, query2);
    const request = this.#objectStore.delete(query2);
    return wrapRequest(request);
  }
  clear() {
    log3(`clear ${this.#objectStore.name}`);
    const request = this.#objectStore.clear();
    return wrapRequest(request);
  }
  index(name2) {
    return new Index(this.#objectStore.index(name2));
  }
};
var Index = class {
  /** @type {IDBIndex} */
  #index;
  /**
   * @param {IDBIndex} index 
   */
  constructor(index2) {
    this.#index = index2;
  }
  /**
   * @param {IDBValidKey|IDBKeyRange} query 
   * @param {number} [count]
   * @returns {Promise<IDBValidKey[]>}
   */
  getAllKeys(query2, count) {
    log3(`IDBIndex.getAllKeys ${this.#index.objectStore.name}<${this.#index.name}>`, query2, count);
    const request = this.#index.getAllKeys(query2, count);
    return wrapRequest(request);
  }
};

// node_modules/@vlcn.io/wa-sqlite/src/examples/IDBBatchAtomicVFS.js
var SECTOR_SIZE = 512;
var MAX_TASK_MILLIS = 3e3;
var DEFAULT_OPTIONS = {
  durability: "default",
  purge: "deferred",
  purgeAtLeast: 16
};
function log4(...args) {
}
var IDBBatchAtomicVFS = class extends Base {
  #options;
  /** @type {Map<number, OpenedFileEntry>} */
  #mapIdToFile = /* @__PURE__ */ new Map();
  /** @type {IDBContext} */
  #idb;
  /** @type {Set<string>} */
  #pendingPurges = /* @__PURE__ */ new Set();
  #taskTimestamp = performance.now();
  #pendingAsync = /* @__PURE__ */ new Set();
  constructor(idbDatabaseName = "wa-sqlite", options = DEFAULT_OPTIONS) {
    super();
    this.name = idbDatabaseName;
    this.#options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.#idb = new IDBContext(openDatabase(idbDatabaseName), {
      durability: this.#options.durability
    });
  }
  async close() {
    for (const fileId of this.#mapIdToFile.keys()) {
      await this.xClose(fileId);
    }
    await this.#idb?.close();
    this.#idb = null;
  }
  /**
   * @param {string?} name 
   * @param {number} fileId 
   * @param {number} flags 
   * @param {DataView} pOutFlags 
   * @returns {number}
   */
  xOpen(name2, fileId, flags, pOutFlags) {
    return this.handleAsync(async () => {
      if (name2 === null)
        name2 = `null_${fileId}`;
      log4(`xOpen ${name2} 0x${fileId.toString(16)} 0x${flags.toString(16)}`);
      try {
        const url = new URL(name2, "http://localhost/");
        const file = {
          path: url.pathname,
          flags,
          block0: null,
          isMetadataChanged: true,
          locks: new WebLocksExclusive(url.pathname)
        };
        this.#mapIdToFile.set(fileId, file);
        await this.#idb.run("readwrite", async ({ blocks }) => {
          file.block0 = await blocks.get(this.#bound(file, 0));
          if (!file.block0) {
            if (flags & SQLITE_OPEN_CREATE) {
              file.block0 = {
                path: file.path,
                offset: 0,
                version: 0,
                data: new Uint8Array(0),
                fileSize: 0
              };
              blocks.put(file.block0);
            } else {
              throw new Error(`file not found: ${file.path}`);
            }
          }
        });
        pOutFlags.setInt32(0, flags & SQLITE_OPEN_READONLY, true);
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_CANTOPEN;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xClose(fileId) {
    return this.handleAsync(async () => {
      try {
        const file = this.#mapIdToFile.get(fileId);
        if (file) {
          log4(`xClose ${file.path}`);
          this.#mapIdToFile.delete(fileId);
          if (file.flags & SQLITE_OPEN_DELETEONCLOSE) {
            this.#idb.run("readwrite", ({ blocks }) => {
              blocks.delete(IDBKeyRange.bound([file.path], [file.path, []]));
            });
          }
        }
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xRead(fileId, pData, iOffset) {
    return this.handleAsync(async () => {
      const file = this.#mapIdToFile.get(fileId);
      log4(`xRead ${file.path} ${pData.byteLength} ${iOffset}`);
      try {
        const result = await this.#idb.run("readonly", async ({ blocks }) => {
          let pDataOffset = 0;
          while (pDataOffset < pData.byteLength) {
            const fileOffset = iOffset + pDataOffset;
            const block = fileOffset < file.block0.data.byteLength ? file.block0 : await blocks.get(this.#bound(file, -fileOffset));
            if (!block || block.data.byteLength - block.offset <= fileOffset) {
              pData.fill(0, pDataOffset);
              return SQLITE_IOERR_SHORT_READ;
            }
            const buffer = pData.subarray(pDataOffset);
            const blockOffset = fileOffset + block.offset;
            const nBytesToCopy = Math.min(
              Math.max(block.data.byteLength - blockOffset, 0),
              // source bytes
              buffer.byteLength
            );
            buffer.set(block.data.subarray(blockOffset, blockOffset + nBytesToCopy));
            pDataOffset += nBytesToCopy;
          }
          return SQLITE_OK;
        });
        return result;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  xWrite(fileId, pData, iOffset) {
    const rewound = this.#pendingAsync.has(fileId);
    if (rewound || performance.now() - this.#taskTimestamp > MAX_TASK_MILLIS) {
      const result = this.handleAsync(async () => {
        if (this.handleAsync !== super.handleAsync) {
          this.#pendingAsync.add(fileId);
        }
        await new Promise((resolve4) => setTimeout(resolve4));
        const result2 = this.#xWriteHelper(fileId, pData, iOffset);
        this.#taskTimestamp = performance.now();
        return result2;
      });
      if (rewound)
        this.#pendingAsync.delete(fileId);
      return result;
    }
    return this.#xWriteHelper(fileId, pData, iOffset);
  }
  /**
   * @param {number} fileId 
   * @param {Uint8Array} pData 
   * @param {number} iOffset
   * @returns {number}
   */
  #xWriteHelper(fileId, pData, iOffset) {
    const file = this.#mapIdToFile.get(fileId);
    log4(`xWrite ${file.path} ${pData.byteLength} ${iOffset}`);
    try {
      const prevFileSize = file.block0.fileSize;
      if (file.block0.fileSize < iOffset + pData.byteLength) {
        file.block0.fileSize = iOffset + pData.byteLength;
        file.isMetadataChanged = true;
      }
      const block = iOffset === 0 ? file.block0 : {
        path: file.path,
        offset: -iOffset,
        version: file.block0.version,
        data: null
      };
      block.data = pData.slice();
      if (file.changedPages) {
        if (prevFileSize === file.block0.fileSize) {
          file.changedPages.add(-iOffset);
        }
        if (iOffset !== 0) {
          this.#idb.run("readwrite", ({ blocks }) => blocks.put(block));
        }
      } else {
        this.#idb.run("readwrite", ({ blocks }) => blocks.put(block));
      }
      file.isMetadataChanged = iOffset === 0 ? false : file.isMetadataChanged;
      return SQLITE_OK;
    } catch (e) {
      console.error(e);
      return SQLITE_IOERR;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} iSize 
   * @returns {number}
   */
  xTruncate(fileId, iSize) {
    const file = this.#mapIdToFile.get(fileId);
    log4(`xTruncate ${file.path} ${iSize}`);
    try {
      Object.assign(file.block0, {
        fileSize: iSize,
        data: file.block0.data.slice(0, iSize)
      });
      const block0 = Object.assign({}, file.block0);
      this.#idb.run("readwrite", ({ blocks }) => {
        blocks.delete(this.#bound(file, -Infinity, -iSize));
        blocks.put(block0);
      });
      return SQLITE_OK;
    } catch (e) {
      console.error(e);
      return SQLITE_IOERR;
    }
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xSync(fileId, flags) {
    const rewound = this.#pendingAsync.has(fileId);
    if (rewound || this.#options.durability !== "relaxed" || performance.now() - this.#taskTimestamp > MAX_TASK_MILLIS) {
      const result = this.handleAsync(async () => {
        if (this.handleAsync !== super.handleAsync) {
          this.#pendingAsync.add(fileId);
        }
        const result2 = await this.#xSyncHelper(fileId, flags);
        this.#taskTimestamp = performance.now();
        return result2;
      });
      if (rewound)
        this.#pendingAsync.delete(fileId);
      return result;
    }
    const file = this.#mapIdToFile.get(fileId);
    log4(`xSync ${file.path} ${flags}`);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {Promise<number>}
   */
  async #xSyncHelper(fileId, flags) {
    const file = this.#mapIdToFile.get(fileId);
    log4(`xSync ${file.path} ${flags}`);
    try {
      if (file.isMetadataChanged) {
        this.#idb.run("readwrite", async ({ blocks }) => {
          await blocks.put(file.block0);
        });
        file.isMetadataChanged = false;
      }
      await this.#idb.sync();
    } catch (e) {
      console.error(e);
      return SQLITE_IOERR;
    }
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pSize64 
   * @returns {number}
   */
  xFileSize(fileId, pSize64) {
    const file = this.#mapIdToFile.get(fileId);
    log4(`xFileSize ${file.path}`);
    pSize64.setBigInt64(0, BigInt(file.block0.fileSize), true);
    return SQLITE_OK;
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xLock(fileId, flags) {
    return this.handleAsync(async () => {
      const file = this.#mapIdToFile.get(fileId);
      log4(`xLock ${file.path} ${flags}`);
      try {
        const result = await file.locks.lock(flags);
        if (result === SQLITE_OK && file.locks.state === SQLITE_LOCK_SHARED) {
          file.block0 = await this.#idb.run("readonly", ({ blocks }) => {
            return blocks.get(this.#bound(file, 0));
          });
        }
        return result;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {number} flags 
   * @returns {number}
   */
  xUnlock(fileId, flags) {
    return this.handleAsync(async () => {
      const file = this.#mapIdToFile.get(fileId);
      log4(`xUnlock ${file.path} ${flags}`);
      try {
        return file.locks.unlock(flags);
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {number} fileId 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xCheckReservedLock(fileId, pResOut) {
    return this.handleAsync(async () => {
      const file = this.#mapIdToFile.get(fileId);
      log4(`xCheckReservedLock ${file.path}`);
      const isReserved = await file.locks.isSomewhereReserved();
      pResOut.setInt32(0, isReserved ? 1 : 0, true);
      return SQLITE_OK;
    });
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xSectorSize(fileId) {
    log4("xSectorSize");
    return SECTOR_SIZE;
  }
  /**
   * @param {number} fileId 
   * @returns {number}
   */
  xDeviceCharacteristics(fileId) {
    log4("xDeviceCharacteristics");
    return SQLITE_IOCAP_BATCH_ATOMIC | SQLITE_IOCAP_SAFE_APPEND | SQLITE_IOCAP_SEQUENTIAL | SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN;
  }
  /**
   * @param {number} fileId 
   * @param {number} op 
   * @param {DataView} pArg 
   * @returns {number}
   */
  xFileControl(fileId, op, pArg) {
    const file = this.#mapIdToFile.get(fileId);
    log4(`xFileControl ${file.path} ${op}`);
    switch (op) {
      case 11:
        file.overwrite = true;
        return SQLITE_OK;
      case 21:
        if (file.overwrite) {
          try {
            return this.handleAsync(async () => {
              await this.#reblockIfNeeded(file);
              return SQLITE_OK;
            });
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        }
        if (file.isMetadataChanged) {
          try {
            this.#idb.run("readwrite", async ({ blocks }) => {
              await blocks.put(file.block0);
            });
            file.isMetadataChanged = false;
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        }
        return SQLITE_OK;
      case 22:
        file.overwrite = false;
        return SQLITE_OK;
      case 31:
        return this.handleAsync(async () => {
          try {
            file.block0.version--;
            file.changedPages = /* @__PURE__ */ new Set();
            this.#idb.run("readwrite", async ({ blocks }) => {
              const keys = await blocks.index("version").getAllKeys(IDBKeyRange.bound(
                [file.path],
                [file.path, file.block0.version]
              ));
              for (const key of keys) {
                blocks.delete(key);
              }
            });
            return SQLITE_OK;
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        });
      case 32:
        try {
          const block0 = Object.assign({}, file.block0);
          block0.data = block0.data.slice();
          const changedPages = file.changedPages;
          file.changedPages = null;
          file.isMetadataChanged = false;
          this.#idb.run("readwrite", async ({ blocks }) => {
            blocks.put(block0);
            const purgeBlock = await blocks.get([file.path, "purge", 0]) ?? {
              path: file.path,
              offset: "purge",
              version: 0,
              data: /* @__PURE__ */ new Map(),
              count: 0
            };
            purgeBlock.count += changedPages.size;
            for (const pageIndex of changedPages) {
              purgeBlock.data.set(pageIndex, block0.version);
            }
            blocks.put(purgeBlock);
            this.#maybePurge(file.path, purgeBlock.count);
          });
          return SQLITE_OK;
        } catch (e) {
          console.error(e);
          return SQLITE_IOERR;
        }
      case 33:
        return this.handleAsync(async () => {
          try {
            file.changedPages = null;
            file.isMetadataChanged = false;
            file.block0 = await this.#idb.run("readonly", ({ blocks }) => {
              return blocks.get([file.path, 0, file.block0.version + 1]);
            });
            return SQLITE_OK;
          } catch (e) {
            console.error(e);
            return SQLITE_IOERR;
          }
        });
      default:
        return SQLITE_NOTFOUND;
    }
  }
  /**
   * @param {string} name 
   * @param {number} flags 
   * @param {DataView} pResOut 
   * @returns {number}
   */
  xAccess(name2, flags, pResOut) {
    return this.handleAsync(async () => {
      try {
        const path = new URL(name2, "file://localhost/").pathname;
        log4(`xAccess ${path} ${flags}`);
        const key = await this.#idb.run("readonly", ({ blocks }) => {
          return blocks.getKey(this.#bound({ path }, 0));
        });
        pResOut.setInt32(0, key ? 1 : 0, true);
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * @param {string} name 
   * @param {number} syncDir 
   * @returns {number}
   */
  xDelete(name2, syncDir) {
    return this.handleAsync(async () => {
      const path = new URL(name2, "file://localhost/").pathname;
      log4(`xDelete ${path} ${syncDir}`);
      try {
        this.#idb.run("readwrite", ({ blocks }) => {
          return blocks.delete(IDBKeyRange.bound([path], [path, []]));
        });
        if (syncDir) {
          await this.#idb.sync();
        }
        return SQLITE_OK;
      } catch (e) {
        console.error(e);
        return SQLITE_IOERR;
      }
    });
  }
  /**
   * Purge obsolete blocks from a database file.
   * @param {string} path 
   */
  async purge(path) {
    const start = Date.now();
    await this.#idb.run("readwrite", async ({ blocks }) => {
      const purgeBlock = await blocks.get([path, "purge", 0]);
      if (purgeBlock) {
        for (const [pageOffset, version] of purgeBlock.data) {
          blocks.delete(IDBKeyRange.bound(
            [path, pageOffset, version],
            [path, pageOffset, Infinity],
            true,
            false
          ));
        }
        await blocks.delete([path, "purge", 0]);
      }
      log4(`purge ${path} ${purgeBlock?.data.size ?? 0} pages in ${Date.now() - start} ms`);
    });
  }
  /**
   * Conditionally schedule a purge task.
   * @param {string} path 
   * @param {number} nPages 
   */
  #maybePurge(path, nPages) {
    if (this.#options.purge === "manual" || this.#pendingPurges.has(path) || nPages < this.#options.purgeAtLeast) {
      return;
    }
    if (globalThis.requestIdleCallback) {
      globalThis.requestIdleCallback(() => {
        this.purge(path);
        this.#pendingPurges.delete(path);
      });
    } else {
      setTimeout(() => {
        this.purge(path);
        this.#pendingPurges.delete(path);
      });
    }
    this.#pendingPurges.add(path);
  }
  #bound(file, begin, end = 0) {
    const version = !begin || -begin < file.block0.data.length ? -Infinity : file.block0.version;
    return IDBKeyRange.bound(
      [file.path, begin, version],
      [file.path, end, Infinity]
    );
  }
  // The database page size can be changed with PRAGMA page_size and VACUUM.
  // The updated file will be overwritten with a regular transaction using
  // the old page size. After that it will be read and written using the
  // new page size, so the IndexedDB objects must be combined or split
  // appropriately.
  async #reblockIfNeeded(file) {
    const oldPageSize = file.block0.data.length;
    if (oldPageSize < 18)
      return;
    const view = new DataView(file.block0.data.buffer, file.block0.data.byteOffset);
    let newPageSize = view.getUint16(16);
    if (newPageSize === 1)
      newPageSize = 65536;
    if (newPageSize === oldPageSize)
      return;
    const maxPageSize = Math.max(oldPageSize, newPageSize);
    const nOldPages = maxPageSize / oldPageSize;
    const nNewPages = maxPageSize / newPageSize;
    const newPageCount = view.getUint32(28);
    const fileSize = newPageCount * newPageSize;
    const version = file.block0.version;
    await this.#idb.run("readwrite", async ({ blocks }) => {
      const keys = await blocks.index("version").getAllKeys(IDBKeyRange.bound(
        [file.path, version + 1],
        [file.path, Infinity]
      ));
      for (const key of keys) {
        blocks.delete(key);
      }
      blocks.delete([file.path, "purge", 0]);
      for (let iOffset = 0; iOffset < fileSize; iOffset += maxPageSize) {
        const oldPages = await blocks.getAll(
          IDBKeyRange.lowerBound([file.path, -(iOffset + maxPageSize), Infinity]),
          nOldPages
        );
        for (const oldPage of oldPages) {
          blocks.delete([oldPage.path, oldPage.offset, oldPage.version]);
        }
        if (nNewPages === 1) {
          const buffer = new Uint8Array(newPageSize);
          for (const oldPage of oldPages) {
            buffer.set(oldPage.data, -(iOffset + oldPage.offset));
          }
          const newPage = {
            path: file.path,
            offset: -iOffset,
            version,
            data: buffer
          };
          if (newPage.offset === 0) {
            newPage.fileSize = fileSize;
            file.block0 = newPage;
          }
          blocks.put(newPage);
        } else {
          const oldPage = oldPages[0];
          for (let i = 0; i < nNewPages; ++i) {
            const offset = -(iOffset + i * newPageSize);
            if (-offset >= fileSize)
              break;
            const newPage = {
              path: oldPage.path,
              offset,
              version,
              data: oldPage.data.subarray(i * newPageSize, (i + 1) * newPageSize)
            };
            if (newPage.offset === 0) {
              newPage.fileSize = fileSize;
              file.block0 = newPage;
            }
            blocks.put(newPage);
          }
        }
      }
    });
  }
};
function openDatabase(idbDatabaseName) {
  return new Promise((resolve4, reject2) => {
    const request = globalThis.indexedDB.open(idbDatabaseName, 5);
    request.addEventListener("upgradeneeded", function() {
      const blocks = request.result.createObjectStore("blocks", {
        keyPath: ["path", "offset", "version"]
      });
      blocks.createIndex("version", ["path", "version"]);
    });
    request.addEventListener("success", () => {
      resolve4(request.result);
    });
    request.addEventListener("error", () => {
      reject2(request.error);
    });
  });
}

// node_modules/async-mutex/index.mjs
var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
var E_ALREADY_LOCKED = new Error("mutex already locked");
var E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve4) {
      resolve4(value);
    });
  }
  return new (P || (P = Promise))(function(resolve4, reject2) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject2(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject2(e);
      }
    }
    function step(result) {
      result.done ? resolve4(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Semaphore = class {
  constructor(_value, _cancelError = E_CANCELED) {
    this._value = _value;
    this._cancelError = _cancelError;
    this._weightedQueues = [];
    this._weightedWaiters = [];
  }
  acquire(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve4, reject2) => {
      if (!this._weightedQueues[weight - 1])
        this._weightedQueues[weight - 1] = [];
      this._weightedQueues[weight - 1].push({ resolve: resolve4, reject: reject2 });
      this._dispatch();
    });
  }
  runExclusive(callback, weight = 1) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire(weight);
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve4) => {
      if (!this._weightedWaiters[weight - 1])
        this._weightedWaiters[weight - 1] = [];
      this._weightedWaiters[weight - 1].push(resolve4);
      this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
    this._dispatch();
  }
  release(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    this._value += weight;
    this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((queue) => queue.forEach((entry) => entry.reject(this._cancelError)));
    this._weightedQueues = [];
  }
  _dispatch() {
    var _a;
    for (let weight = this._value; weight > 0; weight--) {
      const queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
      if (!queueEntry)
        continue;
      const previousValue = this._value;
      const previousWeight = weight;
      this._value -= weight;
      weight = this._value + 1;
      queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(weight) {
    let called = false;
    return () => {
      if (called)
        return;
      called = true;
      this.release(weight);
    };
  }
  _drainUnlockWaiters() {
    for (let weight = this._value; weight > 0; weight--) {
      if (!this._weightedWaiters[weight - 1])
        continue;
      this._weightedWaiters[weight - 1].forEach((waiter) => waiter());
      this._weightedWaiters[weight - 1] = [];
    }
  }
};
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve4) {
      resolve4(value);
    });
  }
  return new (P || (P = Promise))(function(resolve4, reject2) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject2(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject2(e);
      }
    }
    function step(result) {
      result.done ? resolve4(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Mutex = class {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const [, releaser] = yield this._semaphore.acquire();
      return releaser;
    });
  }
  runExclusive(callback) {
    return this._semaphore.runExclusive(() => callback());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    if (this._semaphore.isLocked())
      this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};

// node_modules/@vlcn.io/crsqlite-wasm/dist/log.js
var isDebug = globalThis.__vlcn_wa_crsqlite_dbg;
function log5(...data) {
  if (isDebug) {
    console.log("crsqlite-wasm: ", ...data);
  }
}

// node_modules/@vlcn.io/crsqlite-wasm/dist/cache.js
var re = /insert\s|update\s|delete\s/;
var txRe = /begin\s|commit\s|rollback\s|savepoint\s/;
function computeCacheKey(sql, mode, bind4) {
  const lower = sql.toLowerCase();
  if (txRe.exec(lower) != null) {
    return void 0;
  }
  if (re.exec(lower) != null) {
    log5("received write");
    return null;
  }
  if (bind4 != null) {
    const ret = lower + "|" + mode + "|" + bind4.map((b) => b != null ? b.toString() : "null").join("|");
    return ret;
  }
  return lower;
}

// node_modules/@vlcn.io/crsqlite-wasm/dist/Stmt.js
var Stmt = class {
  originDB;
  stmtFinalizer;
  cache;
  api;
  base;
  str;
  sql;
  // TOOD: use mode in get/all!
  mode = "o";
  finalized = false;
  bindings = [];
  constructor(originDB, stmtFinalizer, cache, api2, base, str, sql) {
    this.originDB = originDB;
    this.stmtFinalizer = stmtFinalizer;
    this.cache = cache;
    this.api = api2;
    this.base = base;
    this.str = str;
    this.sql = sql;
    stmtFinalizer.set(base, this);
  }
  run(tx, ...bindArgs) {
    return serialize(this.cache, computeCacheKey(this.sql, this.mode, bindArgs.length > 0 ? bindArgs : this.bindings), () => {
      bindArgs.length > 0 && this.bind(bindArgs);
      return this.api.step(this.base).then(() => this.api.reset(this.base));
    }, tx?.__mutex || this.originDB.__mutex);
  }
  get(tx, ...bindArgs) {
    return serialize(this.cache, computeCacheKey(this.sql, this.mode, bindArgs.length > 0 ? bindArgs : this.bindings), async () => {
      bindArgs.length > 0 && this.bind(bindArgs);
      let ret = null;
      let columnNames = this.mode === "o" ? this.api.column_names(this.base) : null;
      if (await this.api.step(this.base) == SQLITE_ROW) {
        const row = this.api.row(this.base);
        if (columnNames != null) {
          const o = {};
          for (let i = 0; i < columnNames.length; ++i) {
            o[columnNames[i]] = row[i];
          }
          ret = o;
        } else {
          ret = row;
        }
      }
      await this.api.reset(this.base);
      return ret;
    }, tx?.__mutex || this.originDB.__mutex);
  }
  all(tx, ...bindArgs) {
    return serialize(this.cache, computeCacheKey(this.sql, this.mode, bindArgs.length > 0 ? bindArgs : this.bindings), async () => {
      bindArgs.length > 0 && this.bind(bindArgs);
      const ret = [];
      let columnNames = this.mode === "o" ? this.api.column_names(this.base) : null;
      while (await this.api.step(this.base) == SQLITE_ROW) {
        if (columnNames != null) {
          const row = {};
          for (let i = 0; i < columnNames.length; ++i) {
            row[columnNames[i]] = this.api.column(this.base, i);
          }
          ret.push(row);
        } else {
          ret.push(this.api.row(this.base));
          continue;
        }
      }
      await this.api.reset(this.base);
      return ret;
    }, tx?.__mutex || this.originDB.__mutex);
  }
  async *iterate(tx, ...bindArgs) {
    this.bind(bindArgs);
    while (await serialize(this.cache, void 0, () => this.api.step(this.base), tx?.__mutex || this.originDB.__mutex) == SQLITE_ROW) {
      yield this.api.row(this.base);
    }
    await serialize(this.cache, void 0, () => this.api.reset(this.base), tx?.__mutex || this.originDB.__mutex);
  }
  raw(isRaw) {
    if (isRaw) {
      this.mode = "a";
    } else {
      this.mode = "o";
    }
    return this;
  }
  bind(args) {
    this.bindings = args;
    for (let i = 0; i < args.length; ++i) {
      this.api.bind(this.base, i + 1, args[i]);
    }
    return this;
  }
  /**
   * Release the resources associated with the prepared statement.
   * If you fail to call this it will automatically be called when the statement is garbage collected.
   */
  finalize(tx) {
    return serialize(this.cache, void 0, () => {
      if (this.finalized)
        return;
      this.finalized = true;
      this.api.str_finish(this.str);
      this.stmtFinalizer.delete(this.base);
      return this.api.finalize(this.base);
    }, tx?.__mutex || this.originDB.__mutex);
  }
};

// node_modules/@vlcn.io/crsqlite-wasm/dist/TX.js
var TX = class _TX {
  api;
  db;
  __mutex;
  assertOpen;
  stmtFinalizer;
  cache = /* @__PURE__ */ new Map();
  constructor(api2, db, __mutex, assertOpen, stmtFinalizer) {
    this.api = api2;
    this.db = db;
    this.__mutex = __mutex;
    this.assertOpen = assertOpen;
    this.stmtFinalizer = stmtFinalizer;
  }
  execMany(sql) {
    this.assertOpen();
    return serialize(this.cache, null, () => this.api.exec(this.db, sql.join("")), this.__mutex);
  }
  exec(sql, bind4) {
    this.assertOpen();
    return serialize(this.cache, computeCacheKey(sql, "a", bind4), () => {
      return this.statements(sql, false, bind4);
    }, this.__mutex);
  }
  execO(sql, bind4) {
    this.assertOpen();
    return serialize(this.cache, computeCacheKey(sql, "o", bind4), () => this.statements(sql, true, bind4), this.__mutex);
  }
  execA(sql, bind4) {
    this.assertOpen();
    return serialize(this.cache, computeCacheKey(sql, "a", bind4), () => this.statements(sql, false, bind4), this.__mutex);
  }
  prepare(sql) {
    this.assertOpen();
    return serialize(this.cache, void 0, async () => {
      const str = this.api.str_new(this.db, sql);
      const prepared = await this.api.prepare_v2(this.db, this.api.str_value(str));
      if (prepared == null) {
        this.api.str_finish(str);
        throw new Error(`Could not prepare ${sql}`);
      }
      return new Stmt(
        this,
        this.stmtFinalizer,
        // this.stmtFinalizationRegistry,
        this.cache,
        this.api,
        prepared.stmt,
        str,
        sql
      );
    }, this.__mutex);
  }
  tx(cb) {
    this.assertOpen();
    const id = "crsql" + crypto.randomUUID().replaceAll("-", "");
    return serializeTx(async (tx) => {
      await tx.exec("SAVEPOINT " + id);
      try {
        await cb(tx);
      } catch (e) {
        await tx.exec("ROLLBACK TO " + id);
        await tx.exec("RELEASE " + id);
        throw e;
      }
      await tx.exec("RELEASE " + id);
    }, this.__mutex, this);
  }
  imperativeTx() {
    return this.__mutex.acquire().then((release) => {
      const subMutex = new Mutex();
      return [
        release,
        new _TX(this.api, this.db, subMutex, this.assertOpen, this.stmtFinalizer)
      ];
    });
  }
  async statements(sql, retObjects, bind4) {
    const results = [];
    const str = this.api.str_new(this.db, sql);
    let prepared = {
      stmt: null,
      sql: this.api.str_value(str)
    };
    try {
      while (prepared = await this.api.prepare_v2(this.db, prepared.sql)) {
        const stmt = prepared.stmt;
        const rows = [];
        const columns = this.api.column_names(stmt);
        if (bind4) {
          this.bind(stmt, bind4);
        }
        while (await this.api.step(stmt) === SQLITE_ROW) {
          const row = this.api.row(stmt);
          rows.push(row);
        }
        if (columns.length) {
          results.push({ columns, rows });
        }
        this.api.finalize(prepared.stmt);
        prepared.stmt = null;
      }
    } catch (error3) {
      console.error(`Failed running ${sql}`, error3);
      throw error3;
    } finally {
      if (prepared?.stmt) {
        this.api.finalize(prepared.stmt);
      }
      this.api.str_finish(str);
    }
    const returning = results[0];
    if (returning == null)
      return null;
    if (!retObjects) {
      return returning.rows;
    }
    const objects = [];
    for (const row of returning.rows) {
      const o = {};
      for (let i = 0; i < returning.columns.length; ++i) {
        o[returning.columns[i]] = row[i];
      }
      objects.push(o);
    }
    return objects;
  }
  bind(stmt, values) {
    for (let i = 0; i < values.length; ++i) {
      const v = values[i];
      this.api.bind(stmt, i + 1, typeof v === "boolean" ? v && 1 || 0 : v);
    }
  }
};

// node_modules/@vlcn.io/crsqlite-wasm/dist/serialize.js
var topLevelMutex = new Mutex();
topLevelMutex.name = "topLevelMutex";
function serialize(cache, key, cb, mutex) {
  if (key === null) {
    log5("Cache clear");
    cache?.clear();
  } else if (key !== void 0) {
    const existing = cache?.get(key);
    if (existing) {
      log5("Cache hit", key);
      return existing;
    }
  }
  log5("Enqueueing query ", key);
  let cause = null;
  if (import.meta.env?.DEV) {
    cause = new Error();
  }
  const res = mutex.runExclusive(cb);
  if (key) {
    cache?.set(key, res);
    res.finally(() => cache?.delete(key)).catch((e) => {
      console.error(e);
      if (cause) {
        console.error("Caused by", cause);
      }
    });
  }
  return res;
}
function serializeTx(cb, mutex, db) {
  return mutex.runExclusive(() => {
    const subMutex = new Mutex();
    const tx = new TX(db.api, db.db, subMutex, db.assertOpen, db.stmtFinalizer);
    return cb(tx);
  });
}

// node_modules/@vlcn.io/xplat-api/dist/xplat-api.js
function cryb64(str, seed = 0) {
  let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296n * BigInt(h2) + BigInt(h1);
}
function firstPick(data) {
  const d = data[0];
  if (d == null) {
    return void 0;
  }
  return d[Object.keys(d)[0]];
}

// node_modules/@vlcn.io/crsqlite-wasm/dist/DB.js
var DB = class {
  api;
  db;
  filename;
  __mutex = topLevelMutex;
  stmtFinalizer = /* @__PURE__ */ new Map();
  // private stmtFinalizationRegistry = new FinalizationRegistry(
  //   (base: number) => {
  //     const ref = this.stmtFinalizer.get(base);
  //     const stmt = ref?.deref();
  //     if (stmt) {
  //       console.log("finalized ", base);
  //       stmt.finalize();
  //     }
  //     this.stmtFinalizer.delete(base);
  //   }
  // );
  #siteid = null;
  #tablesUsedStmt = null;
  cache = /* @__PURE__ */ new Map();
  #updateHooks = null;
  #closed = false;
  #tx;
  constructor(api2, db, filename) {
    this.api = api2;
    this.db = db;
    this.filename = filename;
    this.#tx = new TX(api2, db, topLevelMutex, this.#assertOpen, this.stmtFinalizer);
  }
  get siteid() {
    return this.#siteid;
  }
  _setSiteid(siteid) {
    if (this.#siteid) {
      throw new Error("Site id already set");
    }
    this.#siteid = siteid;
  }
  _setTablesUsedStmt(stmt) {
    this.#tablesUsedStmt = stmt;
  }
  get tablesUsedStmt() {
    if (this.#tablesUsedStmt == null) {
      throw new Error("tablesUsedStmt not set");
    }
    return this.#tablesUsedStmt;
  }
  async automigrateTo(schemaName, schemaContent) {
    const version = cryb64(schemaContent);
    const storedName = firstPick(await this.execA(`SELECT value FROM crsql_master WHERE key = 'schema_name'`));
    const storedVersion = firstPick(await this.execA(`SELECT value FROM crsql_master WHERE key = 'schema_version'`));
    if (storedName === schemaName && BigInt(storedVersion || 0) === version) {
      return "noop";
    }
    const ret = storedName === void 0 || storedName !== schemaName ? "apply" : "migrate";
    await this.tx(async (tx) => {
      if (storedVersion == null || storedName !== schemaName) {
        if (storedName !== schemaName) {
          const tables = await tx.execA(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'crsql_%'`);
          for (const table of tables) {
            await tx.exec(`DROP TABLE [${table[0]}]`);
          }
        }
        await tx.exec(schemaContent);
      } else {
        await tx.exec(`SELECT crsql_automigrate(?, 'SELECT crsql_finalize();')`, [schemaContent]);
      }
      await tx.exec(`INSERT OR REPLACE INTO crsql_master (key, value) VALUES (?, ?)`, ["schema_version", version]);
      await tx.exec(`INSERT OR REPLACE INTO crsql_master (key, value) VALUES (?, ?)`, ["schema_name", schemaName]);
    });
    await this.exec(`VACUUM;`);
    return ret;
  }
  execMany(sql) {
    return this.#tx.execMany(sql);
  }
  exec(sql, bind4) {
    return this.#tx.exec(sql, bind4);
  }
  #assertOpen = () => {
    if (this.#closed) {
      throw new Error("The DB is closed");
    }
  };
  /**
   * @returns returns an object for each row, e.g. `{ col1: valA, col2: valB, ... }`
   */
  execO(sql, bind4) {
    return this.#tx.execO(sql, bind4);
  }
  // TODO: execOCached() -- which takes a table list
  /**
   * @returns returns an array for each row, e.g. `[ valA, valB, ... ]`
   */
  execA(sql, bind4) {
    return this.#tx.execA(sql, bind4);
  }
  prepare(sql) {
    return this.#tx.prepare(sql);
  }
  tx(cb) {
    return this.#tx.tx(cb);
  }
  imperativeTx() {
    return this.#tx.imperativeTx();
  }
  /**
   * Close the database and finalize any prepared statements that were not freed for the given DB.
   */
  async close() {
    for (const stmt of this.stmtFinalizer.values()) {
      await stmt.finalize(this);
    }
    this.#tablesUsedStmt?.finalize(this);
    return this.exec("SELECT crsql_finalize()").then(() => {
      this.#closed = true;
      return serialize(this.cache, void 0, () => this.api.close(this.db), this.__mutex);
    });
  }
  createFunction(name2, fn, opts) {
    this.#assertOpen();
    this.api.create_function(this.db, name2, fn.length, SQLITE_UTF8, 0, (context, values) => {
      const args = [];
      for (let i = 0; i < fn.length; ++i) {
        args.push(this.api.value(values[i]));
      }
      const r = fn(...args);
      if (r !== void 0) {
        this.api.result(context, r);
      }
    });
  }
  onUpdate(cb) {
    if (this.#updateHooks == null) {
      this.api.update_hook(this.db, this.#onUpdate);
      this.#updateHooks = /* @__PURE__ */ new Set();
    }
    this.#updateHooks.add(cb);
    return () => this.#updateHooks?.delete(cb);
  }
  #onUpdate = (type, dbName, tblName, rowid) => {
    if (this.#updateHooks == null) {
      return;
    }
    this.#updateHooks.forEach((h) => {
      try {
        h(type, dbName, tblName, rowid);
      } catch (e) {
        console.error("Failed notifying a DB update listener");
        console.error(e);
      }
    });
  };
};

// node_modules/@vlcn.io/crsqlite-wasm/dist/index.js
var api = null;
var SQLite3 = class {
  base;
  constructor(base) {
    this.base = base;
  }
  open(filename, mode = "c") {
    return serialize(null, void 0, () => {
      return this.base.open_v2(filename || ":memory:", SQLITE_OPEN_CREATE | SQLITE_OPEN_READWRITE | SQLITE_OPEN_URI, filename != null ? "idb-batch-atomic" : void 0);
    }, topLevelMutex).then((db) => {
      const ret = new DB(this.base, db, filename || ":memory:");
      return ret.prepare(`SELECT tbl_name FROM tables_used(?) AS u
        JOIN sqlite_master ON sqlite_master.name = u.name
        WHERE u.schema = 'main'`).then((stmt) => {
        stmt.raw(true);
        ret._setTablesUsedStmt(stmt);
      }).then(() => ret.execA("select quote(crsql_site_id());")).then((siteid) => {
        ret._setSiteid(siteid[0][0].replace(/'|X/g, ""));
        return ret;
      });
    });
  }
};
async function initWasm(locateWasm) {
  if (api != null) {
    return api;
  }
  const wasmModule = await crsqlite_default({
    locateFile(file) {
      if (locateWasm) {
        return locateWasm(file);
      }
      return new URL("crsqlite.wasm", import.meta.url).href;
    }
  });
  const sqlite3 = Factory(wasmModule);
  sqlite3.vfs_register(new IDBBatchAtomicVFS("idb-batch-atomic", { durability: "relaxed" }));
  api = new SQLite3(sqlite3);
  return api;
}

// output/WASQLite.Internal/foreign.js
var sqlite = await initWasm();
var _newDB = (filename) => () => sqlite.open(filename);
var _closeDB = (db) => () => db.close();
var _queryDB = (db) => (query2) => (params) => () => db.execA(query2, params);

// output/WASQLite/index.js
var queryDB = function(db) {
  return function(q) {
    return function(p) {
      return toAffE(_queryDB(db)(q)(p));
    };
  };
};
var newDB = function($6) {
  return toAffE(_newDB($6));
};
var closeDB = function($7) {
  return toAffE(_closeDB($7));
};

// output/Example/index.js
var bind3 = /* @__PURE__ */ bind(bindAff);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
var traverse2 = /* @__PURE__ */ traverse(traversableArray)(/* @__PURE__ */ applicativeExceptT(monadIdentity));
var readInt2 = /* @__PURE__ */ readInt(monadIdentity);
var readArray2 = /* @__PURE__ */ readArray(monadIdentity);
var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
var show3 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
var pure4 = /* @__PURE__ */ pure(applicativeAff);
var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
var logShow2 = /* @__PURE__ */ logShow(/* @__PURE__ */ showArray(/* @__PURE__ */ showArray(showInt)));
var query = /* @__PURE__ */ bracket(/* @__PURE__ */ newDB(":memory:"))(closeDB)(function(db) {
  return bind3(queryDB(db)("SELECT 1 + 1")([]))(function(res) {
    var v = runExcept(bindFlipped2(traverse2(traverse2(readInt2)))(bindFlipped2(traverse2(readArray2))(readArray2(res))));
    if (v instanceof Left) {
      return throwError2(error(show3(v.value0)));
    }
    ;
    if (v instanceof Right) {
      return pure4(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Example (line 18, column 3 - line 20, column 28): " + [v.constructor.name]);
  });
});
var main = /* @__PURE__ */ launchAff_(/* @__PURE__ */ bind3(query)(function(res) {
  return liftEffect3(logShow2(res));
}));
export {
  main,
  query
};
