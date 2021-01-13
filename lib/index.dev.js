'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var applyDecoratedDescriptor = _applyDecoratedDescriptor;

var __filename$1 = '/query/Query.js';

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

var initializerDefineProperty = _initializerDefineProperty;

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

var superPropBase = _superPropBase;

var get = createCommonjsModule(function (module) {
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
});

var flowRuntime_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	 module.exports = factory() ;
}(commonjsGlobal, (function () {
/**
 * This file exports a dictionary of global primitive types that are shared by all contexts.
 * It is populated in [registerPrimitiveTypes()](./registerPrimitiveTypes.js).
 */

var primitiveTypes = {};

var _regeneratorRuntime = runtime_1;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function makeJSONError(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var input = validation.input,
      context = validation.context;

  var errors = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validation.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : null;
      var actual = context.typeOf(_resolvePath(input, path)).toString();
      var field = stringifyPath(validation.path.concat(path));

      var pointer = '/' + path.join('/');

      errors.push({
        pointer: pointer,
        field: field,
        message: message,
        expected: expected,
        actual: actual
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return errors;
}

// Tracks whether we're in validation of cyclic objects.
var cyclicValidation = new WeakMap();
// Tracks whether we're toString() of cyclic objects.


var cyclicToString = new WeakSet();

function inValidationCycle(type, input) {
  try {
    var tracked = cyclicValidation.get(type);
    if (!tracked) {
      return false;
    } else {
      return weakSetHas(tracked, input);
    }
  } catch (e) {
    // some exotic values cannot be checked
    return true;
  }
}

function startValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (!tracked) {
    tracked = new WeakSet();
    cyclicValidation.set(type, tracked);
  }
  weakSetAdd(tracked, input);
}

function endValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (tracked) {
    weakSetDelete(tracked, input);
  }
}

function inToStringCycle(type) {
  return cyclicToString.has(type);
}

function startToStringCycle(type) {
  cyclicToString.add(type);
}

function endToStringCycle(type) {
  cyclicToString.delete(type);
}

function weakSetHas(weakset, value) {
  try {
    return weakset.has(value);
  } catch (e) {
    return true;
  }
}

function weakSetAdd(weakset, value) {
  try {
    weakset.add(value);
  } catch (e) {}
}

function weakSetDelete(weakset, value) {
  try {
    weakset.delete(value);
  } catch (e) {}
}

var validIdentifierOrAccessor = /^[$A-Z_][0-9A-Z_$[\].]*$/i;

var Validation = function () {
  function Validation(context, input) {
    classCallCheck(this, Validation);
    this.path = [];
    this.prefix = '';
    this.errors = [];
    this.cyclic = new WeakMap();

    this.context = context;
    this.input = input;
  }

  // Tracks whether we're in validation of cyclic objects.


  createClass(Validation, [{
    key: 'inCycle',
    value: function inCycle(type, input) {
      var tracked = this.cyclic.get(type);
      if (!tracked) {
        return false;
      } else {
        return weakSetHas(tracked, input);
      }
    }
  }, {
    key: 'startCycle',
    value: function startCycle(type, input) {
      var tracked = this.cyclic.get(type);
      if (!tracked) {
        tracked = new WeakSet();
        this.cyclic.set(type, tracked);
      }
      weakSetAdd(tracked, input);
    }
  }, {
    key: 'endCycle',
    value: function endCycle(type, input) {
      var tracked = this.cyclic.get(type);
      if (tracked) {
        weakSetDelete(tracked, input);
      }
    }
  }, {
    key: 'hasErrors',
    value: function hasErrors(path) {
      if (path) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = slicedToArray(_ref, 1);

            var candidate = _ref2[0];

            if (matchPath(path, candidate)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return false;
      } else {
        return this.errors.length > 0;
      }
    }
  }, {
    key: 'addError',
    value: function addError(path, expectedType, message) {
      this.errors.push([path, message, expectedType]);
      return this;
    }
  }, {
    key: 'clearError',
    value: function clearError(path) {
      var didClear = false;
      if (path) {
        var _errors = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.errors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var error = _step2.value;

            if (matchPath(path, error[0])) {
              didClear = true;
            } else {
              _errors.push(error);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.errors = _errors;
      } else {
        didClear = this.errors.length > 0;
        this.errors = [];
      }
      return didClear;
    }
  }, {
    key: 'resolvePath',
    value: function resolvePath(path) {
      return _resolvePath(this.input, path);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return makeJSONError(this);
    }
  }]);
  return Validation;
}();

function stringifyPath(path) {
  if (!path.length) {
    return 'Value';
  }
  var length = path.length;

  var parts = new Array(length);
  for (var i = 0; i < length; i++) {
    var part = path[i];
    if (part === '[[Return Type]]') {
      parts[i] = 'Return Type';
    } else if (typeof part !== 'string' || !validIdentifierOrAccessor.test(part)) {
      parts[i] = '[' + String(part) + ']';
    } else if (i > 0) {
      parts[i] = '.' + String(part);
    } else {
      parts[i] = String(part);
    }
  }
  return parts.join('');
}

function _resolvePath(input, path) {
  var subject = input;
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (subject == null) {
      return undefined;
    }
    var part = path[i];
    if (part === '[[Return Type]]') {
      continue;
    }
    if (subject instanceof Map) {
      subject = subject.get(part);
    } else {
      subject = subject[part];
    }
  }
  return subject;
}

function matchPath(path, candidate) {
  var length = path.length;

  if (length > candidate.length) {
    return false;
  }
  for (var i = 0; i < length; i++) {
    if (candidate[i] !== path[i]) {
      return false;
    }
  }
  return true;
}

var RuntimeTypeError = function (_TypeError) {
  inherits(RuntimeTypeError, _TypeError);

  function RuntimeTypeError(message, options) {
    classCallCheck(this, RuntimeTypeError);

    var _this = possibleConstructorReturn(this, (RuntimeTypeError.__proto__ || Object.getPrototypeOf(RuntimeTypeError)).call(this, message));

    _this.name = "RuntimeTypeError";

    Object.assign(_this, options);
    return _this;
  }

  return RuntimeTypeError;
}(TypeError);

var delimiter = '\n-------------------------------------------------\n\n';

function makeTypeError(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var prefix = validation.prefix,
      input = validation.input,
      context = validation.context,
      errors = validation.errors;

  var collected = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : "*";
      var actual = _resolvePath(input, path);
      var actualType = context.typeOf(actual).toString();

      var field = stringifyPath(validation.path.concat(path));

      var actualAsString = makeString(actual);

      if (typeof actualAsString === 'string') {
        collected.push(field + ' ' + message + '\n\nExpected: ' + expected + '\n\nActual Value: ' + actualAsString + '\n\nActual Type: ' + actualType + '\n');
      } else {
        collected.push(field + ' ' + message + '\n\nExpected: ' + expected + '\n\nActual: ' + actualType + '\n');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (prefix) {
    return new RuntimeTypeError(prefix.trim() + ' ' + collected.join(delimiter), { errors: errors });
  } else {
    return new RuntimeTypeError(collected.join(delimiter), { errors: errors });
  }
}

function makeString(value) {
  if (value === null) {
    return 'null';
  }
  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'string':
      return '"' + value + '"';
    // Issue
    case 'symbol':
    case 'number':
    case 'boolean':
    case 'undefined':
      return String(value);
    case 'function':
      return;
    default:
      if (Array.isArray(value) || value.constructor == null || value.constructor === Object) {
        try {
          return JSON.stringify(value, null, 2);
        } catch (e) {
          return;
        }
      }
      return;
  }
}

function makeError(expected, input) {
  var context = expected.context;

  var validation = context.validate(expected, input);
  return makeTypeError(validation);
}

/**
 * Given two types, A and B, compare them and return either -1, 0, or 1:
 *
 *   -1 if A cannot accept type B.
 *
 *    0 if the types are effectively identical.
 *
 *    1 if A accepts every possible B.
 */


function compareTypes(a, b) {
  var result = void 0;

  if (a === b) {
    return 0;
  }

  if (b instanceof TypeAlias || b instanceof TypeParameter || b instanceof TypeParameterApplication || b instanceof TypeTDZ) {
    b = b.unwrap();
  }

  if (a instanceof TypeAlias) {
    result = a.compareWith(b);
  } else if (a instanceof FlowIntoType || a instanceof TypeParameter || b instanceof FlowIntoType) {
    result = a.compareWith(b);
  } else if (a instanceof AnyType || a instanceof ExistentialType || a instanceof MixedType) {
    return 1;
  } else {
    result = a.compareWith(b);
  }

  if (b instanceof AnyType) {
    // Note: This check cannot be moved higher in the scope,
    // as this would prevent types from being propagated upwards.
    return 1;
  } else {
    return result;
  }
}

/**
 * # Type
 *
 * This is the base class for all types.
 */
var Type = function () {
  function Type(context) {
    classCallCheck(this, Type);
    this.typeName = 'Type';

    this.context = context;
  }

  createClass(Type, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var validation = new Validation(this.context, input);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.errors(validation, [], input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;
          // eslint-disable-line no-unused-vars
          return false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (compareTypes(this, input) === -1) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return -1;
    }
  }, {
    key: 'assert',
    value: function assert(input) {
      var error = makeError(this, input);
      if (error) {
        if (typeof Error.captureStackTrace === 'function') {
          Error.captureStackTrace(error, this.assert);
        }
        throw error;
      }
      return input;
    }

    /**
     * Get the inner type.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Type';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return Type;
}();

var AnyType = function (_Type) {
  inherits(AnyType, _Type);

  function AnyType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AnyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AnyType.__proto__ || Object.getPrototypeOf(AnyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'AnyType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AnyType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return 1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'any';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return AnyType;
}(Type);

var errorMessages = {
  ERR_CONSTRAINT_VIOLATION: 'violated a constraint',
  ERR_EXPECT_ARRAY: 'must be an Array',
  ERR_EXPECT_TRUE: 'must be true',
  ERR_EXPECT_FALSE: 'must be false',
  ERR_EXPECT_BOOLEAN: 'must be true or false',
  ERR_EXPECT_EMPTY: 'must be empty',
  ERR_EXPECT_EXACT_VALUE: 'must be exactly $0',
  ERR_EXPECT_CALLABLE: 'must be callable',
  ERR_EXPECT_CLASS: 'must be a Class of $0',
  ERR_EXPECT_FUNCTION: 'must be a function',
  ERR_EXPECT_GENERATOR: 'must be a generator function',
  ERR_EXPECT_ITERABLE: 'must be iterable',
  ERR_EXPECT_ARGUMENT: 'argument "$0" must be: $1',
  ERR_EXPECT_RETURN: 'expected return type of: $0',
  ERR_EXPECT_N_ARGUMENTS: 'requires $0 argument(s)',
  ERR_EXPECT_INSTANCEOF: 'must be an instance of $0',
  ERR_EXPECT_KEY_TYPE: 'keys must be: $0',
  ERR_EXPECT_NULL: 'must be null',
  ERR_EXPECT_NUMBER: 'must be a number',
  ERR_EXPECT_OBJECT: 'must be an object',
  ERR_EXPECT_PROMISE: 'must be a promise of $0',
  ERR_EXPECT_STRING: 'must be a string',
  ERR_EXPECT_SYMBOL: 'must be a symbol',
  ERR_EXPECT_THIS: 'must be exactly this',
  ERR_EXPECT_VOID: 'must be undefined',
  ERR_INVALID_DATE: 'must be a valid date',
  ERR_MISSING_PROPERTY: 'does not exist on object',
  ERR_NO_INDEXER: 'is not one of the permitted indexer types',
  ERR_NO_UNION: 'must be one of: $0',
  ERR_UNKNOWN_KEY: 'should not contain the key: "$0"'
};

function getErrorMessage(key) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var message = errorMessages[key];
  if (params.length > 0) {
    return message.replace(/\$(\d+)/g, function (m, i) {
      return String(params[i]);
    });
  } else {
    return message;
  }
}

var TupleType = function (_Type) {
  inherits(TupleType, _Type);

  function TupleType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TupleType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TupleType.__proto__ || Object.getPrototypeOf(TupleType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TupleType', _this.types = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TupleType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var types, length, context, i;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              types = this.types;
              length = types.length;
              context = this.context;

              if (context.checkPredicate('Array', input)) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return [path, getErrorMessage('ERR_EXPECT_ARRAY'), this];

            case 6:
              return _context.abrupt('return');

            case 7:
              i = 0;

            case 8:
              if (!(i < length)) {
                _context.next = 13;
                break;
              }

              return _context.delegateYield(types[i].errors(validation, path.concat(i), input[i]), 't0', 10);

            case 10:
              i++;
              _context.next = 8;
              break;

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;
      var context = this.context;


      if (!context.checkPredicate('Array', input) || input.length < length) {
        return false;
      }
      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (!type.accepts(input[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof TupleType)) {
        return -1;
      }
      var types = this.types;
      var inputTypes = input.types;
      if (inputTypes.length < types.length) {
        return -1;
      }
      var isGreater = false;
      for (var i = 0; i < types.length; i++) {
        var result = compareTypes(types[i], inputTypes[i]);
        if (result === 1) {
          isGreater = true;
        } else if (result === -1) {
          return -1;
        }
      }
      if (types.length < inputTypes.length) {
        return 0;
      } else if (isGreater) {
        return 1;
      } else {
        return 0;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[' + this.types.join(', ') + ']';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);
  return TupleType;
}(Type);

var ArrayType = function (_Type) {
  inherits(ArrayType, _Type);

  function ArrayType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ArrayType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ArrayType.__proto__ || Object.getPrototypeOf(ArrayType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ArrayType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ArrayType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var context, elementType, length, i;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              context = this.context;

              if (context.checkPredicate('Array', input)) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_ARRAY'), this];

            case 4:
              return _context.abrupt('return');

            case 5:
              if (!validation.inCycle(this, input)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return');

            case 7:
              validation.startCycle(this, input);
              elementType = this.elementType;
              length = input.length;
              i = 0;

            case 11:
              if (!(i < length)) {
                _context.next = 16;
                break;
              }

              return _context.delegateYield(elementType.errors(validation, path.concat(i), input[i]), 't0', 13);

            case 13:
              i++;
              _context.next = 11;
              break;

            case 16:
              validation.endCycle(this, input);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var context = this.context;

      if (!context.checkPredicate('Array', input)) {
        return false;
      }
      if (inValidationCycle(this, input)) {
        return true;
      }
      startValidationCycle(this, input);
      var elementType = this.elementType;
      var length = input.length;

      for (var i = 0; i < length; i++) {
        if (!elementType.accepts(input[i])) {
          endValidationCycle(this, input);
          return false;
        }
      }
      endValidationCycle(this, input);
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var elementType = this.elementType;

      if (input instanceof TupleType) {
        var types = input.types;

        for (var i = 0; i < types.length; i++) {
          var result = compareTypes(elementType, types[i]);
          if (result === -1) {
            return -1;
          }
        }
        return 1;
      } else if (input instanceof ArrayType) {
        return compareTypes(elementType, input.elementType);
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var elementType = this.elementType;

      if (inToStringCycle(this)) {
        if (typeof elementType.name === 'string') {
          return 'Array<$Cycle<' + elementType.name + '>>';
        } else {
          return 'Array<$Cycle<Object>>';
        }
      }
      startToStringCycle(this);
      var output = 'Array<' + elementType.toString() + '>';
      endToStringCycle(this);
      return output;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        elementType: this.elementType
      };
    }
  }]);
  return ArrayType;
}(Type);

var BooleanLiteralType = function (_Type) {
  inherits(BooleanLiteralType, _Type);

  function BooleanLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, BooleanLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = BooleanLiteralType.__proto__ || Object.getPrototypeOf(BooleanLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'BooleanLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(BooleanLiteralType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(input !== this.value)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage(this.value ? 'ERR_EXPECT_TRUE' : 'ERR_EXPECT_FALSE'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof BooleanLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.value ? 'true' : 'false';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.typeName,
        value: this.value
      };
    }
  }]);
  return BooleanLiteralType;
}(Type);

var BooleanType = function (_Type) {
  inherits(BooleanType, _Type);

  function BooleanType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, BooleanType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = BooleanType.__proto__ || Object.getPrototypeOf(BooleanType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'BooleanType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(BooleanType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof input !== 'boolean')) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_BOOLEAN'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'boolean';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof BooleanLiteralType) {
        return 1;
      } else if (input instanceof BooleanType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'boolean';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return BooleanType;
}(Type);

var EmptyType = function (_Type) {
  inherits(EmptyType, _Type);

  function EmptyType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, EmptyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = EmptyType.__proto__ || Object.getPrototypeOf(EmptyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'EmptyType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(EmptyType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return [path, getErrorMessage('ERR_EXPECT_EMPTY'), this];

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return false; // empty types accepts nothing.
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof EmptyType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'empty';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return EmptyType;
}(Type);

var ExistentialType = function (_Type) {
  inherits(ExistentialType, _Type);

  function ExistentialType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ExistentialType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ExistentialType.__proto__ || Object.getPrototypeOf(ExistentialType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ExistentialType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ExistentialType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return 1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '*';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return ExistentialType;
}(Type);

/**
 * # TypeParameterApplication
 *
 */
var TypeParameterApplication = function (_Type) {
  inherits(TypeParameterApplication, _Type);

  function TypeParameterApplication() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeParameterApplication);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeParameterApplication.__proto__ || Object.getPrototypeOf(TypeParameterApplication)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeParameterApplication', _this.typeInstances = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeParameterApplication, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var parent, typeInstances;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              parent = this.parent, typeInstances = this.typeInstances;
              return _context.delegateYield(parent.errors.apply(parent, [validation, path, input].concat(toConsumableArray(typeInstances))), 't0', 2);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var parent = this.parent,
          typeInstances = this.typeInstances;

      return parent.accepts.apply(parent, [input].concat(toConsumableArray(typeInstances)));
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var _parent;

      return (_parent = this.parent).compareWith.apply(_parent, [input].concat(toConsumableArray(this.typeInstances)));
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.parent;
      if (inner && typeof inner.hasProperty === 'function') {
        var _ref2;

        return (_ref2 = inner).hasProperty.apply(_ref2, [name].concat(toConsumableArray(this.typeInstances)));
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.parent;
      if (inner && typeof inner.getProperty === 'function') {
        var _ref3;

        return (_ref3 = inner).getProperty.apply(_ref3, [name].concat(toConsumableArray(this.typeInstances)));
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _parent2;

      return (_parent2 = this.parent).unwrap.apply(_parent2, toConsumableArray(this.typeInstances));
    }
  }, {
    key: 'toString',
    value: function toString() {
      var parent = this.parent,
          typeInstances = this.typeInstances;
      var name = parent.name;

      if (typeInstances.length) {
        var items = [];
        for (var i = 0; i < typeInstances.length; i++) {
          var typeInstance = typeInstances[i];
          items.push(typeInstance.toString());
        }
        return name + '<' + items.join(', ') + '>';
      } else {
        return name;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        typeInstances: this.typeInstances
      };
    }
  }]);
  return TypeParameterApplication;
}(Type);

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(collectConstraintErrors);

/**
 * Add constraints to the given subject type.
 */
function addConstraints(subject) {
  var _subject$constraints;

  for (var _len = arguments.length, constraints = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    constraints[_key - 1] = arguments[_key];
  }

  (_subject$constraints = subject.constraints).push.apply(_subject$constraints, toConsumableArray(constraints));
}

/**
 * Collect any errors from constraints on the given subject type.
 */


function collectConstraintErrors(subject, validation, path) {
  for (var _len2 = arguments.length, input = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    input[_key2 - 3] = arguments[_key2];
  }

  var constraints, length, i, constraint, violation;
  return _regeneratorRuntime.wrap(function collectConstraintErrors$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          constraints = subject.constraints;
          length = constraints.length;
          i = 0;

        case 3:
          if (!(i < length)) {
            _context.next = 12;
            break;
          }

          constraint = constraints[i];
          violation = constraint.apply(undefined, toConsumableArray(input));

          if (!(typeof violation === 'string')) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return [path, violation, this];

        case 9:
          i++;
          _context.next = 3;
          break;

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

/**
 * Determine whether the input passes the constraints on the subject type.
 */
function constraintsAccept(subject) {
  var constraints = subject.constraints;
  var length = constraints.length;

  for (var _len3 = arguments.length, input = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    input[_key3 - 1] = arguments[_key3];
  }

  for (var i = 0; i < length; i++) {
    var constraint = constraints[i];
    if (typeof constraint.apply(undefined, toConsumableArray(input)) === 'string') {
      return false;
    }
  }
  return true;
}

var TypeAlias = function (_Type) {
  inherits(TypeAlias, _Type);

  function TypeAlias() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeAlias);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeAlias.__proto__ || Object.getPrototypeOf(TypeAlias)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeAlias', _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeAlias, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type, hasErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type;
              hasErrors = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = type.errors(validation, path, input)[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 15;
                break;
              }

              error = _step.value;

              hasErrors = true;
              _context.next = 12;
              return error;

            case 12:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 15:
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              if (hasErrors) {
                _context.next = 31;
                break;
              }

              return _context.delegateYield(collectConstraintErrors(this, validation, path, input), 't1', 31);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[5, 17, 21, 29], [22,, 24, 28]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0; // should never need this because it's taken care of by compareTypes.
      } else if (this.hasConstraints) {
        // if we have constraints the types cannot be the same
        return -1;
      } else {
        return compareTypes(this.type, input);
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len3 = arguments.length, typeInstances = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        typeInstances[_key3] = arguments[_key3];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          type = this.type;

      if (withDeclaration) {
        return 'type ' + name + ' = ' + type.toString() + ';';
      } else {
        return name;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        type: this.type
      };
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      return this.type.properties;
    }
  }, {
    key: 'hasConstraints',
    get: function get$$1() {
      return this.constraints.length > 0;
    }
  }]);
  return TypeAlias;
}(Type);

var FlowIntoSymbol = Symbol('FlowInto');

/**
 * # TypeParameter
 *
 * Type parameters allow polymorphic type safety.
 * The first time a type parameter is checked, it records the shape of its input,
 * this recorded shape is used to check all future inputs for this particular instance.
 */

var TypeParameter = function (_Type) {
  inherits(TypeParameter, _Type);

  function TypeParameter() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeParameter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeParameter.__proto__ || Object.getPrototypeOf(TypeParameter)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeParameter', _this[FlowIntoSymbol] = null, _temp), possibleConstructorReturn(_this, _ret);
  }

  // Issue 252


  createClass(TypeParameter, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var boundOrDefault, recorded, context, hasErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              boundOrDefault = this.bound || this.default;
              recorded = this.recorded, context = this.context;

              if (!(boundOrDefault instanceof FlowIntoType || boundOrDefault instanceof TypeAlias)) {
                _context.next = 7;
                break;
              }

              return _context.delegateYield(boundOrDefault.errors(validation, path, input), 't0', 4);

            case 4:
              return _context.abrupt('return');

            case 7:
              if (!recorded) {
                _context.next = 12;
                break;
              }

              return _context.delegateYield(recorded.errors(validation, path, input), 't1', 9);

            case 9:
              return _context.abrupt('return');

            case 12:
              if (!boundOrDefault) {
                _context.next = 47;
                break;
              }

              if (!(boundOrDefault.typeName === 'AnyType' || boundOrDefault.typeName === 'ExistentialType')) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('return');

            case 17:
              hasErrors = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 21;
              _iterator = boundOrDefault.errors(validation, path, input)[Symbol.iterator]();

            case 23:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 31;
                break;
              }

              error = _step.value;

              hasErrors = true;
              _context.next = 28;
              return error;

            case 28:
              _iteratorNormalCompletion = true;
              _context.next = 23;
              break;

            case 31:
              _context.next = 37;
              break;

            case 33:
              _context.prev = 33;
              _context.t2 = _context['catch'](21);
              _didIteratorError = true;
              _iteratorError = _context.t2;

            case 37:
              _context.prev = 37;
              _context.prev = 38;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 40:
              _context.prev = 40;

              if (!_didIteratorError) {
                _context.next = 43;
                break;
              }

              throw _iteratorError;

            case 43:
              return _context.finish(40);

            case 44:
              return _context.finish(37);

            case 45:
              if (!hasErrors) {
                _context.next = 47;
                break;
              }

              return _context.abrupt('return');

            case 47:

              this.recorded = context.typeOf(input);

            case 48:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[21, 33, 37, 45], [38,, 40, 44]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded,
          context = this.context;

      if (boundOrDefault instanceof FlowIntoType || boundOrDefault instanceof TypeAlias) {
        // We defer to the other type parameter so that values from this
        // one can flow "upwards".
        return boundOrDefault.accepts(input);
      } else if (recorded) {
        return recorded.accepts(input);
      } else if (boundOrDefault) {
        if (boundOrDefault.typeName === "AnyType" || boundOrDefault.typeName === "ExistentialType") {
          return true;
        } else if (!boundOrDefault.accepts(input)) {
          return false;
        }
      }

      this.recorded = context.typeOf(input);
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded;

      if (input instanceof TypeParameter) {
        // We don't need to check for `recorded` or `bound` fields
        // because the input has already been unwrapped, so
        // if we got a type parameter it must be totally generic and
        // we treat it like Any.
        return 1;
      } else if (recorded) {
        return compareTypes(recorded, input);
      } else if (boundOrDefault) {
        return compareTypes(boundOrDefault, input);
      } else {
        // A generic type parameter accepts any input.
        return 1;
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded;

      if (recorded) {
        return recorded.unwrap();
      } else if (boundOrDefault) {
        return boundOrDefault.unwrap();
      } else {
        return this;
      }
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      var id = this.id,
          bound = this.bound,
          defaultType = this.default;

      if (withBinding) {
        if (defaultType) {
          return id + ' = ' + defaultType.toString();
        } else if (bound) {
          return id + ': ' + bound.toString();
        }
      }
      return id;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        id: this.id,
        bound: this.bound,
        recorded: this.recorded
      };
    }
  }]);
  return TypeParameter;
}(Type);

function flowIntoTypeParameter(typeParameter) {
  var existing = typeParameter[FlowIntoSymbol];
  if (existing) {
    return existing;
  }

  var target = new FlowIntoType(typeParameter.context);
  target.typeParameter = typeParameter;
  typeParameter[FlowIntoSymbol] = target;
  return target;
}

/**
 * # FlowIntoType
 *
 * A virtual type which allows types it receives to "flow" upwards into a type parameter.
 * The type parameter will become of a union of any types seen by this instance.
 */

var FlowIntoType = function (_Type) {
  inherits(FlowIntoType, _Type);

  function FlowIntoType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FlowIntoType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FlowIntoType.__proto__ || Object.getPrototypeOf(FlowIntoType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FlowIntoType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FlowIntoType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var typeParameter, context, recorded, bound, hasError, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error, _hasError, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              typeParameter = this.typeParameter, context = this.context;
              recorded = typeParameter.recorded, bound = typeParameter.bound;

              if (!(bound instanceof FlowIntoType)) {
                _context.next = 5;
                break;
              }

              return _context.delegateYield(bound.errors(validation, path, input), 't0', 4);

            case 4:
              return _context.abrupt('return');

            case 5:
              if (!recorded) {
                _context.next = 47;
                break;
              }

              if (!bound) {
                _context.next = 39;
                break;
              }

              hasError = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 11;
              _iterator = bound.errors(validation, path, input)[Symbol.iterator]();

            case 13:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 21;
                break;
              }

              error = _step.value;
              _context.next = 17;
              return error;

            case 17:
              hasError = true;

            case 18:
              _iteratorNormalCompletion = true;
              _context.next = 13;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t1 = _context['catch'](11);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 30:
              _context.prev = 30;

              if (!_didIteratorError) {
                _context.next = 33;
                break;
              }

              throw _iteratorError;

            case 33:
              return _context.finish(30);

            case 34:
              return _context.finish(27);

            case 35:
              if (!hasError) {
                _context.next = 37;
                break;
              }

              return _context.abrupt('return');

            case 37:
              _context.next = 45;
              break;

            case 39:
              if (!recorded.accepts(input)) {
                _context.next = 43;
                break;
              }

              return _context.abrupt('return');

            case 43:
              // we need to make a union
              typeParameter.recorded = context.union(recorded, context.typeOf(input));
              return _context.abrupt('return');

            case 45:
              _context.next = 82;
              break;

            case 47:
              if (!bound) {
                _context.next = 82;
                break;
              }

              if (!(bound.typeName === 'AnyType' || bound.typeName === 'ExistentialType')) {
                _context.next = 52;
                break;
              }

              return _context.abrupt('return');

            case 52:
              _hasError = false;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 56;
              _iterator2 = bound.errors(validation, path, input)[Symbol.iterator]();

            case 58:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 66;
                break;
              }

              _error = _step2.value;
              _context.next = 62;
              return _error;

            case 62:
              _hasError = true;

            case 63:
              _iteratorNormalCompletion2 = true;
              _context.next = 58;
              break;

            case 66:
              _context.next = 72;
              break;

            case 68:
              _context.prev = 68;
              _context.t2 = _context['catch'](56);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t2;

            case 72:
              _context.prev = 72;
              _context.prev = 73;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 75:
              _context.prev = 75;

              if (!_didIteratorError2) {
                _context.next = 78;
                break;
              }

              throw _iteratorError2;

            case 78:
              return _context.finish(75);

            case 79:
              return _context.finish(72);

            case 80:
              if (!_hasError) {
                _context.next = 82;
                break;
              }

              return _context.abrupt('return');

            case 82:

              typeParameter.recorded = context.typeOf(input);

            case 83:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[11, 23, 27, 35], [28,, 30, 34], [56, 68, 72, 80], [73,, 75, 79]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var typeParameter = this.typeParameter,
          context = this.context;
      var recorded = typeParameter.recorded,
          bound = typeParameter.bound;


      if (bound instanceof FlowIntoType) {
        // We defer to the other type so that values from this
        // one can flow "upwards".
        return bound.accepts(input);
      }
      if (recorded) {
        // we've already recorded a value for this type parameter
        if (bound && !bound.accepts(input)) {
          return false;
        } else if (recorded.accepts(input)) {
          // our existing type already permits this value, there's nothing to do.
          return true;
        } else {
          // we need to make a union
          typeParameter.recorded = context.union(recorded, context.typeOf(input));
          return true;
        }
      } else if (bound) {
        if (bound.typeName === 'AnyType' || bound.typeName === 'ExistentialType') {
          return true;
        } else if (!bound.accepts(input)) {
          return false;
        }
      }

      typeParameter.recorded = context.typeOf(input);
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var typeParameter = this.typeParameter,
          context = this.context;
      var recorded = typeParameter.recorded,
          bound = typeParameter.bound;

      if (bound instanceof FlowIntoType) {
        // We defer to the other type so that values from this
        // one can flow "upwards".
        return bound.compareWith(input);
      }
      if (recorded) {
        if (bound && compareTypes(bound, input) === -1) {
          return -1;
        }
        var result = compareTypes(recorded, input);
        if (result === 0) {
          // our existing type already permits this value, there's nothing to do.
          return 0;
        }
        // we need to make a union
        typeParameter.recorded = context.union(recorded, input);
        return 1;
      } else if (bound) {
        if (bound.typeName === 'AnyType' || bound.typeName === 'ExistentialType') {
          return 1;
        }
        var _result = compareTypes(bound, input);
        if (_result === -1) {
          return -1;
        }
      }

      typeParameter.recorded = input;
      return 0;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.typeParameter.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      return this.typeParameter.toString(withBinding);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.typeParameter.toJSON();
    }
  }]);
  return FlowIntoType;
}(Type);

var FunctionTypeRestParam = function (_Type) {
  inherits(FunctionTypeRestParam, _Type);

  function FunctionTypeRestParam() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionTypeRestParam);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionTypeRestParam.__proto__ || Object.getPrototypeOf(FunctionTypeRestParam)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeRestParam', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionTypeRestParam, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type;
              return _context.delegateYield(type.errors(validation, path, input), 't0', 2);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      return type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof FunctionTypeParam || input instanceof FunctionTypeRestParam) {
        return compareTypes(this.type, input.type);
      } else {
        var result = compareTypes(this.type, input);
        if (result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return '...' + this.name + ': ' + type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        type: this.type
      };
    }
  }]);
  return FunctionTypeRestParam;
}(Type);

var FunctionTypeParam = function (_Type) {
  inherits(FunctionTypeParam, _Type);

  function FunctionTypeParam() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionTypeParam);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionTypeParam.__proto__ || Object.getPrototypeOf(FunctionTypeParam)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeParam', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionTypeParam, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var optional, type;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              optional = this.optional, type = this.type;

              if (!(optional && input === undefined)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return');

            case 5:
              return _context.delegateYield(type.errors(validation, path, input), 't0', 6);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var optional = this.optional,
          type = this.type;

      if (optional && input === undefined) {
        return true;
      } else {
        return type.accepts(input);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof FunctionTypeParam || input instanceof FunctionTypeRestParam) {
        return compareTypes(this.type, input.type);
      } else {
        return compareTypes(this.type, input);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var optional = this.optional,
          type = this.type;

      return '' + this.name + (optional ? '?' : '') + ': ' + type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        optional: this.optional,
        type: this.type
      };
    }
  }]);
  return FunctionTypeParam;
}(Type);

var FunctionTypeReturn = function (_Type) {
  inherits(FunctionTypeReturn, _Type);

  function FunctionTypeReturn() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionTypeReturn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionTypeReturn.__proto__ || Object.getPrototypeOf(FunctionTypeReturn)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeReturn', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionTypeReturn, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type;
              return _context.delegateYield(type.errors(validation, path.concat('[[Return Type]]'), input), 't0', 2);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      return type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof FunctionTypeReturn) {
        return compareTypes(this.type, input.type);
      } else {
        var result = compareTypes(this.type, input);
        if (result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return FunctionTypeReturn;
}(Type);

var ParentSymbol = Symbol('Parent');
var NameRegistrySymbol = Symbol('NameRegistry');
var ModuleRegistrySymbol = Symbol('ModuleRegistry');
var CurrentModuleSymbol = Symbol('CurrentModule');
var TypeConstructorRegistrySymbol = Symbol('TypeConstructorRegistry');
var InferrerSymbol = Symbol('Inferrer');


var TypeSymbol = Symbol('Type');
var TypeParametersSymbol = Symbol('TypeParameters');
var TypePredicateRegistrySymbol = Symbol('TypePredicateRegistry');

var FunctionType = function (_Type) {
  inherits(FunctionType, _Type);

  function FunctionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionType.__proto__ || Object.getPrototypeOf(FunctionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionType', _this.params = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var annotation, returnType, params, i, param, annotationParam, context, _i, _param;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof input !== 'function')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_FUNCTION'), this];

            case 3:
              return _context.abrupt('return');

            case 4:
              annotation = input[TypeSymbol];
              returnType = this.returnType, params = this.params;

              if (!annotation) {
                _context.next = 29;
                break;
              }

              if (annotation.params) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return');

            case 9:
              i = 0;

            case 10:
              if (!(i < params.length)) {
                _context.next = 24;
                break;
              }

              param = params[i];
              annotationParam = annotation.params[i];

              if (!(!annotationParam && !param.optional)) {
                _context.next = 18;
                break;
              }

              _context.next = 16;
              return [path, getErrorMessage('ERR_EXPECT_ARGUMENT', param.name, param.type.toString()), this];

            case 16:
              _context.next = 21;
              break;

            case 18:
              if (param.acceptsType(annotationParam)) {
                _context.next = 21;
                break;
              }

              _context.next = 21;
              return [path, getErrorMessage('ERR_EXPECT_ARGUMENT', param.name, param.type.toString()), this];

            case 21:
              i++;
              _context.next = 10;
              break;

            case 24:
              if (returnType.acceptsType(annotation.returnType)) {
                _context.next = 27;
                break;
              }

              _context.next = 27;
              return [path, getErrorMessage('ERR_EXPECT_RETURN', returnType.toString()), this];

            case 27:
              _context.next = 32;
              break;

            case 29:
              context = this.context;
              // We cannot safely check an unannotated function.
              // But we need to propagate `any` type feedback upwards.

              for (_i = 0; _i < params.length; _i++) {
                _param = params[_i];

                _param.acceptsType(context.any());
              }
              returnType.acceptsType(context.any());

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (typeof input !== 'function') {
        return false;
      }
      var returnType = this.returnType,
          params = this.params;

      var annotation = input[TypeSymbol];
      if (annotation) {
        if (!annotation.params) {
          return true;
        }
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          var annotationParam = annotation.params[i];
          if (!annotationParam && !param.optional) {
            return false;
          } else if (!param.acceptsType(annotationParam)) {
            return false;
          }
        }
        if (!returnType.acceptsType(annotation.returnType)) {
          return false;
        }
        return true;
      } else {
        var context = this.context;
        // We cannot safely check an unannotated function.
        // But we need to propagate `any` type feedback upwards.

        for (var _i2 = 0; _i2 < params.length; _i2++) {
          var _param2 = params[_i2];
          _param2.acceptsType(context.any());
        }
        returnType.acceptsType(context.any());
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof FunctionType)) {
        return -1;
      }
      var returnType = this.returnType;
      var inputReturnType = input.returnType;
      var isGreater = false;
      var returnTypeResult = compareTypes(returnType, inputReturnType);
      if (returnTypeResult === -1) {
        return -1;
      } else if (returnTypeResult === 1) {
        isGreater = true;
      }

      var params = this.params;
      var inputParams = input.params;
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var inputParam = i >= inputParams.length ? input.rest : inputParams[i];
        if (inputParam == null) {
          return -1;
        }
        var result = compareTypes(param, inputParam);
        if (result === -1) {
          return -1;
        } else if (result === 1) {
          isGreater = true;
        }
      }
      return isGreater ? 1 : 0;
    }
  }, {
    key: 'acceptsParams',
    value: function acceptsParams() {
      var params = this.params,
          rest = this.rest;

      var paramsLength = params.length;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          if (!param.accepts(args[i])) {
            return false;
          }
        } else if (!param.accepts(undefined)) {
          return false;
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i3 = paramsLength; _i3 < argsLength; _i3++) {
          if (!rest.accepts(args[_i3])) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.returnType.accepts(input);
    }
  }, {
    key: 'assertParams',
    value: function assertParams() {
      var params = this.params,
          rest = this.rest;

      var paramsLength = params.length;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          param.assert(args[i]);
        } else {
          param.assert(undefined);
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i4 = paramsLength; _i4 < argsLength; _i4++) {
          rest.assert(args[_i4]);
        }
      }

      return args;
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      this.returnType.assert(input);
      return input;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var params = this.params,
          rest = this.rest,
          context = this.context;

      var paramsLength = params.length;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          if (!param.acceptsType(args[i])) {
            return context.empty();
          }
        } else if (!param.accepts(undefined)) {
          return context.empty();
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i5 = paramsLength; _i5 < argsLength; _i5++) {
          if (!rest.acceptsType(args[_i5])) {
            return context.empty();
          }
        }
      }

      return this.returnType.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var params = this.params,
          rest = this.rest,
          returnType = this.returnType;

      var args = [];
      for (var i = 0; i < params.length; i++) {
        args.push(params[i].toString());
      }
      if (rest) {
        args.push(rest.toString());
      }
      return '(' + args.join(', ') + ') => ' + returnType.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        params: this.params,
        rest: this.rest,
        returnType: this.returnType
      };
    }
  }]);
  return FunctionType;
}(Type);

var GeneratorType = function (_Type) {
  inherits(GeneratorType, _Type);

  function GeneratorType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, GeneratorType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = GeneratorType.__proto__ || Object.getPrototypeOf(GeneratorType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'GeneratorType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(GeneratorType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var isValid;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isValid = input && typeof input.next === 'function' && typeof input.return === 'function' && typeof input.throw === 'function';

              if (isValid) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_GENERATOR'), this];

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input && typeof input.next === 'function' && typeof input.return === 'function' && typeof input.throw === 'function';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof GeneratorType)) {
        var _result = compareTypes(this.yieldType, input);
        if (_result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
      var isGreater = false;
      var result = compareTypes(this.yieldType, input.yieldType);
      if (result === -1) {
        return -1;
      } else if (result === 1) {
        isGreater = true;
      }

      result = compareTypes(this.returnType, input.returnType);
      if (result === -1) {
        return -1;
      } else if (result === 1) {
        isGreater = true;
      }

      result = compareTypes(this.nextType, input.nextType);
      if (result === -1) {
        return -1;
      } else if (result === 1) {
        isGreater = true;
      }

      return isGreater ? 1 : 0;
    }
  }, {
    key: 'acceptsYield',
    value: function acceptsYield(input) {
      return this.yieldType.accepts(input);
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.returnType.accepts(input);
    }
  }, {
    key: 'acceptsNext',
    value: function acceptsNext(input) {
      return this.nextType.accepts(input);
    }
  }, {
    key: 'assertYield',
    value: function assertYield(input) {
      return this.yieldType.assert(input);
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      return this.returnType.assert(input);
    }
  }, {
    key: 'assertNext',
    value: function assertNext(input) {
      return this.nextType.assert(input);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var yieldType = this.yieldType,
          returnType = this.returnType,
          nextType = this.nextType;

      return 'Generator<' + yieldType.toString() + ', ' + returnType.toString() + ', ' + nextType.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        yieldType: this.yieldType,
        returnType: this.returnType,
        nextType: this.nextType
      };
    }
  }]);
  return GeneratorType;
}(Type);

var warnedInstances = new WeakSet();

var TypeConstructor = function (_Type) {
  inherits(TypeConstructor, _Type);

  function TypeConstructor() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeConstructor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeConstructor.__proto__ || Object.getPrototypeOf(TypeConstructor)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeConstructor', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeConstructor, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var context = this.context,
          name = this.name;

      if (!warnedInstances.has(this)) {
        context.emitWarningMessage('TypeConstructor ' + name + ' does not implement accepts().');
        warnedInstances.add(this);
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var context = this.context,
          name = this.name;

      if (!warnedInstances.has(this)) {
        context.emitWarningMessage('TypeConstructor ' + name + ' does not implement compareWith().');
        warnedInstances.add(this);
      }
      return -1;
    }
  }, {
    key: 'inferTypeParameters',
    value: function inferTypeParameters(input) {
      return [];
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name
      };
    }
  }]);
  return TypeConstructor;
}(Type);

var GenericType = function (_TypeConstructor) {
  inherits(GenericType, _TypeConstructor);

  function GenericType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, GenericType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = GenericType.__proto__ || Object.getPrototypeOf(GenericType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = "GenericType", _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(GenericType, [{
    key: "errors",
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var name, impl;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = this.name, impl = this.impl;

              if (input instanceof impl) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage("ERR_EXPECT_INSTANCEOF", name), this];

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: "accepts",
    value: function accepts(input) {
      var impl = this.impl;

      return input instanceof impl;
    }
  }, {
    key: "compareWith",
    value: function compareWith(input) {
      var context = this.context,
          impl = this.impl;

      var annotation = context.getAnnotation(impl);
      if (annotation) {
        for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          typeInstances[_key2 - 1] = arguments[_key2];
        }

        var expected = annotation.unwrap.apply(annotation, toConsumableArray(typeInstances));
        return compareTypes(input, expected);
      } else if (input instanceof GenericType && (input.impl === impl || impl && impl.isPrototypeOf(input.impl))) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: "unwrap",
    value: function unwrap() {
      var context = this.context,
          impl = this.impl;

      if (typeof impl !== "function") {
        return this;
      }
      var annotation = context.getAnnotation(impl);
      if (annotation != null) {
        return annotation.unwrap.apply(annotation, arguments);
      } else {
        return this;
      }
    }
  }, {
    key: "inferTypeParameters",
    value: function inferTypeParameters(input) {
      return [];
    }
  }]);
  return GenericType;
}(TypeConstructor);

function invariant(input, message) {
  if (!input) {
    var error = new Error(message);
    error.name = 'InvariantViolation';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(error, invariant);
    }
    throw error;
  }
}

var NullLiteralType = function (_Type) {
  inherits(NullLiteralType, _Type);

  function NullLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NullLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NullLiteralType.__proto__ || Object.getPrototypeOf(NullLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NullLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NullLiteralType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(input !== null)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_NULL'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === null;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NullLiteralType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'null';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return NullLiteralType;
}(Type);

var VoidType = function (_Type) {
  inherits(VoidType, _Type);

  function VoidType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, VoidType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = VoidType.__proto__ || Object.getPrototypeOf(VoidType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'VoidType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(VoidType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(input !== undefined)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_VOID'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === undefined;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof VoidType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'void';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return VoidType;
}(Type);

var NullableType = function (_Type) {
  inherits(NullableType, _Type);

  function NullableType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NullableType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NullableType.__proto__ || Object.getPrototypeOf(NullableType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NullableType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NullableType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(input != null)) {
                _context.next = 2;
                break;
              }

              return _context.delegateYield(this.type.errors(validation, path, input), 't0', 2);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (input == null) {
        return true;
      } else {
        return this.type.accepts(input);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NullLiteralType || input instanceof VoidType) {
        return 1;
      } else if (input instanceof NullableType) {
        return compareTypes(this.type, input.type);
      } else {
        var result = compareTypes(this.type, input);
        if (result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '? ' + this.type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return NullableType;
}(Type);

var ObjectTypeProperty = function (_Type) {
  inherits(ObjectTypeProperty, _Type);

  function ObjectTypeProperty() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectTypeProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectTypeProperty.__proto__ || Object.getPrototypeOf(ObjectTypeProperty)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeProperty', _this['static'] = false, _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }
  // Ignore


  createClass(ObjectTypeProperty, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }

    /**
     * Determine whether the property is nullable.
     */

  }, {
    key: 'isNullable',
    value: function isNullable() {
      return this.value instanceof NullableType;
    }

    /**
     * Determine whether the property exists on the given input or its prototype chain.
     */

  }, {
    key: 'existsOn',
    value: function existsOn(input) {
      // Ignore
      var key = this.key,
          isStatic = this.static;

      return key in (isStatic ? input.constructor : input) === true;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var optional, key, value, isStatic, target, targetPath, hasErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Ignore
              optional = this.optional, key = this.key, value = this.value, isStatic = this.static;
              target = void 0;
              targetPath = void 0;

              if (!isStatic) {
                _context.next = 18;
                break;
              }

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 7:
              return _context.abrupt('return');

            case 8:
              targetPath = path.concat('constructor');

              if (!(typeof input.constructor !== 'function')) {
                _context.next = 14;
                break;
              }

              if (optional) {
                _context.next = 13;
                break;
              }

              _context.next = 13;
              return [targetPath, getErrorMessage('ERR_EXPECT_FUNCTION'), this];

            case 13:
              return _context.abrupt('return');

            case 14:
              targetPath.push(key);
              target = input.constructor[key];
              _context.next = 20;
              break;

            case 18:
              target = input[key];
              targetPath = path.concat(key);

            case 20:
              if (!(optional && target === undefined)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt('return');

            case 22:
              if (!(this.isNullable() && !this.existsOn(input))) {
                _context.next = 26;
                break;
              }

              _context.next = 25;
              return [targetPath, getErrorMessage('ERR_MISSING_PROPERTY'), this];

            case 25:
              return _context.abrupt('return');

            case 26:
              hasErrors = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 30;
              _iterator = value.errors(validation, targetPath, target)[Symbol.iterator]();

            case 32:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 40;
                break;
              }

              error = _step.value;

              hasErrors = true;
              _context.next = 37;
              return error;

            case 37:
              _iteratorNormalCompletion = true;
              _context.next = 32;
              break;

            case 40:
              _context.next = 46;
              break;

            case 42:
              _context.prev = 42;
              _context.t0 = _context['catch'](30);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 46:
              _context.prev = 46;
              _context.prev = 47;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 49:
              _context.prev = 49;

              if (!_didIteratorError) {
                _context.next = 52;
                break;
              }

              throw _iteratorError;

            case 52:
              return _context.finish(49);

            case 53:
              return _context.finish(46);

            case 54:
              if (hasErrors) {
                _context.next = 56;
                break;
              }

              return _context.delegateYield(collectConstraintErrors(this, validation, targetPath, target), 't1', 56);

            case 56:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[30, 42, 46, 54], [47,, 49, 53]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      // Ignore
      var optional = this.optional,
          key = this.key,
          value = this.value,
          isStatic = this.static;

      var target = void 0;
      if (isStatic) {
        if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
          return false;
        }
        if (typeof input.constructor !== 'function') {
          return optional ? true : false;
        }
        target = input.constructor[key];
      } else {
        target = input[key];
      }

      if (optional && target === undefined) {
        return true;
      }

      if (this.isNullable() && !this.existsOn(input)) {
        return false;
      }

      if (!value.accepts(target)) {
        return false;
      } else {
        return constraintsAccept(this, target);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ObjectTypeProperty)) {
        return -1;
      } else if (input.key !== this.key) {
        return -1;
      } else {
        return compareTypes(this.value, input.value);
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      var key = this.key;
      // Issue 252
      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol') {
        key = '[' + key.toString() + ']';
      }
      if (this.static) {
        return 'static ' + key + (this.optional ? '?' : '') + ': ' + this.value.toString() + ';';
      } else {
        return '' + key + (this.optional ? '?' : '') + ': ' + this.value.toString() + ';';
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        key: this.key,
        value: this.value,
        optional: this.optional
      };
    }
  }]);
  return ObjectTypeProperty;
}(Type);

var ObjectTypeIndexer = function (_Type) {
  inherits(ObjectTypeIndexer, _Type);

  function ObjectTypeIndexer() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectTypeIndexer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectTypeIndexer.__proto__ || Object.getPrototypeOf(ObjectTypeIndexer)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeIndexer', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ObjectTypeIndexer, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, key, value) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // special case number types
              if (this.key.typeName === 'NumberType' || this.key.typeName === 'NumericLiteralType') {
                key = +key;
              }

              return _context.delegateYield(this.key.errors(validation, path.concat('[[Key]]'), key), 't0', 2);

            case 2:
              return _context.delegateYield(this.value.errors(validation, path.concat(key), value), 't1', 3);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(value) {
      return this.value.accepts(value);
    }
  }, {
    key: 'acceptsKey',
    value: function acceptsKey(key) {
      // special case number types
      if (this.key.typeName === 'NumberType' || this.key.typeName === 'NumericLiteralType') {
        key = +key;
      }
      return this.key.accepts(key);
    }
  }, {
    key: 'acceptsValue',
    value: function acceptsValue(value) {
      return this.value.accepts(value);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof ObjectTypeProperty) {
        if (!this.key.accepts(input.key)) {
          return -1;
        } else {
          return compareTypes(this.value, input.value);
        }
      } else if (!(input instanceof ObjectTypeIndexer)) {
        return -1;
      }

      var keyResult = compareTypes(this.key, input.key);
      if (keyResult === -1) {
        return -1;
      }
      var valueResult = compareTypes(this.value, input.value);
      if (valueResult === -1) {
        return -1;
      }

      if (keyResult === 0 && valueResult === 0) {
        return 0;
      } else {
        return 1;
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[' + this.id + ': ' + this.key.toString() + ']: ' + this.value.toString() + ';';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        id: this.id,
        key: this.key,
        value: this.value
      };
    }
  }]);
  return ObjectTypeIndexer;
}(Type);

var ObjectTypeCallProperty = function (_Type) {
  inherits(ObjectTypeCallProperty, _Type);

  function ObjectTypeCallProperty() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectTypeCallProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectTypeCallProperty.__proto__ || Object.getPrototypeOf(ObjectTypeCallProperty)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeCallProperty', _this['static'] = false, _temp), possibleConstructorReturn(_this, _ret);
  }
  // Ignore


  createClass(ObjectTypeCallProperty, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var value, isStatic, target, targetPath;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Ignore
              value = this.value, isStatic = this.static;
              target = void 0;
              targetPath = void 0;

              if (!isStatic) {
                _context.next = 16;
                break;
              }

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 7:
              return _context.abrupt('return');

            case 8:
              targetPath = path.concat('constructor');

              if (!(typeof input.constructor !== 'function')) {
                _context.next = 13;
                break;
              }

              _context.next = 12;
              return [targetPath, getErrorMessage('ERR_EXPECT_FUNCTION'), this];

            case 12:
              return _context.abrupt('return');

            case 13:
              target = input.constructor;
              _context.next = 18;
              break;

            case 16:
              target = input;
              targetPath = path;

            case 18:
              return _context.delegateYield(value.errors(validation, targetPath, target), 't0', 19);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      // Ignore
      var value = this.value,
          isStatic = this.static;

      var target = void 0;
      if (isStatic) {
        if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
          return false;
        }
        if (typeof input.constructor !== 'function') {
          return false;
        }
        target = input.constructor;
      } else {
        target = input;
      }
      return value.accepts(target);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ObjectTypeCallProperty)) {
        return -1;
      }
      return compareTypes(this.value, input.value);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      if (this.static) {
        return 'static ' + this.value.toString() + ';';
      } else {
        return this.value.toString();
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return ObjectTypeCallProperty;
}(Type);

var Declaration = function (_Type) {
  inherits(Declaration, _Type);

  function Declaration() {
    classCallCheck(this, Declaration);
    return possibleConstructorReturn(this, (Declaration.__proto__ || Object.getPrototypeOf(Declaration)).apply(this, arguments));
  }

  return Declaration;
}(Type);

var VarDeclaration = function (_Declaration) {
  inherits(VarDeclaration, _Declaration);

  function VarDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, VarDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = VarDeclaration.__proto__ || Object.getPrototypeOf(VarDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'VarDeclaration', _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(VarDeclaration, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type, hasErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type;
              hasErrors = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = type.errors(validation, path, input)[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 15;
                break;
              }

              error = _step.value;

              hasErrors = true;
              _context.next = 12;
              return error;

            case 12:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 15:
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              if (hasErrors) {
                _context.next = 31;
                break;
              }

              return _context.delegateYield(collectConstraintErrors(this, validation, path, input), 't1', 31);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[5, 17, 21, 29], [22,, 24, 28]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.type, input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'declare var ' + this.name + ': ' + this.type.toString() + ';';
    }
  }]);
  return VarDeclaration;
}(Declaration);

var TypeDeclaration = function (_Declaration) {
  inherits(TypeDeclaration, _Declaration);

  function TypeDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeDeclaration.__proto__ || Object.getPrototypeOf(TypeDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeDeclaration', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeDeclaration, [{
    key: 'addConstraint',
    value: function addConstraint() {
      var _typeAlias;

      (_typeAlias = this.typeAlias).addConstraint.apply(_typeAlias, arguments);
      return this;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.typeAlias.errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'apply',
    value: function apply() {
      var _typeAlias2;

      return (_typeAlias2 = this.typeAlias).apply.apply(_typeAlias2, arguments);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.typeAlias.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.typeAlias, input);
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var _typeAlias3;

      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 1] = arguments[_key2];
      }

      return (_typeAlias3 = this.typeAlias).hasProperty.apply(_typeAlias3, [name].concat(toConsumableArray(typeInstances)));
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var _typeAlias4;

      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return (_typeAlias4 = this.typeAlias).getProperty.apply(_typeAlias4, [name].concat(toConsumableArray(typeInstances)));
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _typeAlias5;

      return (_typeAlias5 = this.typeAlias).unwrap.apply(_typeAlias5, arguments);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'declare ' + this.typeAlias.toString(true) + ';';
    }
  }, {
    key: 'type',
    get: function get$$1() {
      return this.typeAlias.type;
    }
  }]);
  return TypeDeclaration;
}(Declaration);

var ModuleDeclaration = function (_Declaration) {
  inherits(ModuleDeclaration, _Declaration);

  function ModuleDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ModuleDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ModuleDeclaration.__proto__ || Object.getPrototypeOf(ModuleDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ModuleDeclaration', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ModuleDeclaration, [{
    key: 'get',
    value: function get$$1(name) {
      var moduleExports = this.moduleExports;

      if (moduleExports) {
        var exporting = moduleExports.unwrap();
        if (typeof exporting.getProperty === 'function') {
          var prop = exporting.getProperty(name);
          if (prop) {
            return prop.unwrap();
          }
        }
      } else {
        var declaration = this.declarations[name];
        if (declaration) {
          return declaration.unwrap();
        }
      }
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'import',
    value: function _import(moduleName) {
      if (/^\.\//.test(moduleName)) {
        moduleName = '' + this.name + moduleName.slice(1);
      }
      return this.innerContext.import(moduleName);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var name = this.name,
          declarations = this.declarations,
          modules = this.modules,
          moduleExports = this.moduleExports;

      var body = [];
      for (var _name in declarations) {
        // eslint-disable-line guard-for-in
        var declaration = declarations[_name];
        body.push(declaration.toString(true));
      }
      if (modules) {
        for (var _name2 in modules) {
          // eslint-disable-line guard-for-in
          var module = modules[_name2];
          body.push(module.toString());
        }
      }
      if (moduleExports) {
        body.push(moduleExports.toString());
      }
      return 'declare module "' + name + '" {\n' + indent$1(body.join('\n\n')) + '}';
    }
  }, {
    key: 'moduleType',
    get: function get$$1() {
      if (this.moduleExports) {
        return 'commonjs';
      } else {
        return 'es6';
      }
    }
  }, {
    key: 'isCommonJS',
    get: function get$$1() {
      return this.moduleExports ? true : false;
    }
  }, {
    key: 'isES6',
    get: function get$$1() {
      return this.moduleExports ? false : true;
    }
  }, {
    key: 'declarations',
    get: function get$$1() {
      var innerContext = this.innerContext;

      return innerContext[NameRegistrySymbol];
    }
  }, {
    key: 'modules',
    get: function get$$1() {
      var innerContext = this.innerContext;

      return innerContext[ModuleRegistrySymbol];
    }
  }]);
  return ModuleDeclaration;
}(Declaration);

function indent$1(input) {
  var lines = input.split('\n');
  var length = lines.length;

  for (var i = 0; i < length; i++) {
    lines[i] = '  ' + lines[i];
  }
  return lines.join('\n');
}

var ModuleExports = function (_Declaration) {
  inherits(ModuleExports, _Declaration);

  function ModuleExports() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ModuleExports);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ModuleExports.__proto__ || Object.getPrototypeOf(ModuleExports)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ModuleExports', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ModuleExports, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.type.errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'declare module.exports: ' + this.type.toString() + ';';
    }
  }]);
  return ModuleExports;
}(Declaration);

var ClassDeclaration = function (_Declaration) {
  inherits(ClassDeclaration, _Declaration);

  function ClassDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ClassDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ClassDeclaration.__proto__ || Object.getPrototypeOf(ClassDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ClassDeclaration', _this.shapeID = Symbol(), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ClassDeclaration, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var body, superClass, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref2, _ref3, errorPath, errorMessage, expectedType, propertyName;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = this.body;
              superClass = this.superClass && this.superClass.unwrap();

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', this.name), this];

            case 5:
              return _context.abrupt('return');

            case 6:
              if (!superClass) {
                _context.next = 42;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 10;
              _iterator = superClass.errors(validation, path, input)[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 28;
                break;
              }

              _ref2 = _step.value;
              _ref3 = slicedToArray(_ref2, 3);
              errorPath = _ref3[0];
              errorMessage = _ref3[1];
              expectedType = _ref3[2];
              propertyName = errorPath[path.length];

              if (!body.getProperty(propertyName)) {
                _context.next = 23;
                break;
              }

              return _context.abrupt('continue', 25);

            case 23:
              _context.next = 25;
              return [errorPath, errorMessage, expectedType];

            case 25:
              _iteratorNormalCompletion = true;
              _context.next = 12;
              break;

            case 28:
              _context.next = 34;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 34:
              _context.prev = 34;
              _context.prev = 35;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 37:
              _context.prev = 37;

              if (!_didIteratorError) {
                _context.next = 40;
                break;
              }

              throw _iteratorError;

            case 40:
              return _context.finish(37);

            case 41:
              return _context.finish(34);

            case 42:
              return _context.delegateYield(body.errors(validation, path, input), 't1', 43);

            case 43:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[10, 30, 34, 42], [35,, 37, 41]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var body = this.body;

      var superClass = this.superClass && this.superClass.unwrap();
      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
        return false;
      } else if (superClass && !superClass.accepts(input)) {
        return false;
      } else if (!body.accepts(input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof ClassDeclaration) {
        if (input === this) {
          return 0;
        } else if (this.isSuperClassOf(input)) {
          return 1;
        } else {
          return -1;
        }
      }
      return compareTypes(this.body, input);
    }

    /**
     * Get a property with the given name, or undefined if it does not exist.
     */

  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      var body = this.body,
          superClass = this.superClass;

      var prop = body.getProperty(key);
      if (prop) {
        return prop;
      } else if (superClass && typeof superClass.getProperty === 'function') {
        return superClass.getProperty(key);
      }
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var body = this.body,
          superClass = this.superClass;

      if (body.hasProperty(key)) {
        return true;
      } else if (superClass && typeof superClass.hasProperty === 'function') {
        return superClass.hasProperty(key);
      } else {
        return false;
      }
    }

    /**
     * Determine whether this class declaration represents a super class of
     * the given type.
     */

  }, {
    key: 'isSuperClassOf',
    value: function isSuperClassOf(candidate) {
      var body = this.body,
          shapeID = this.shapeID;

      var current = candidate;

      while (current != null) {
        if (current === this || current === body || current.shapeID === shapeID) {
          return true;
        }
        if (current instanceof ClassDeclaration) {
          current = current.superClass;
        } else {
          current = current.unwrap();
        }
      }
      return false;
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          superClass = this.superClass,
          body = this.body;

      if (withDeclaration) {
        var superClassName = superClass && (typeof superClass.name === 'string' && superClass.name || superClass.toString());
        return 'declare class ' + name + (superClassName ? ' extends ' + superClassName : '') + ' ' + body.toString();
      } else {
        return name;
      }
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      var body = this.body,
          superClass = this.superClass;

      if (superClass == null) {
        return body.properties;
      }
      var bodyProps = body.properties;
      var superProps = superClass.unwrap().properties;
      if (superProps == null) {
        return bodyProps;
      }
      var seen = {};
      var seenStatic = {};
      var props = [];
      for (var i = 0; i < superProps.length; i++) {
        var prop = superProps[i];
        props.push(prop);
        if (prop.static) {
          seenStatic[prop.key] = i;
        } else {
          seen[prop.key] = i;
        }
      }
      for (var _i = 0; _i < bodyProps.length; _i++) {
        var _prop = bodyProps[_i];
        if (seen[_prop.key]) {
          props[_i] = _prop;
        } else {
          props.push(_prop);
        }
      }
      return props;
    }
  }]);
  return ClassDeclaration;
}(Declaration);

var PartialType = function (_Type) {
  inherits(PartialType, _Type);

  function PartialType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, PartialType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = PartialType.__proto__ || Object.getPrototypeOf(PartialType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'PartialType', _this.typeParameters = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(PartialType, [{
    key: 'typeParameter',
    value: function typeParameter(id, bound, defaultType) {
      var target = new TypeParameter(this.context);
      target.id = id;
      target.bound = bound;
      target.default = defaultType;
      this.typeParameters.push(target);
      return target;
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var constraints, type, hasErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              constraints = this.constraints, type = this.type;
              hasErrors = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = type.errors(validation, path, input)[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 15;
                break;
              }

              error = _step.value;

              hasErrors = true;
              _context.next = 12;
              return error;

            case 12:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 15:
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              if (!(!hasErrors && constraints)) {
                _context.next = 31;
                break;
              }

              return _context.delegateYield(collectConstraintErrors(this, validation, path, input), 't1', 31);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[5, 17, 21, 29], [22,, 24, 28]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var constraints = this.constraints,
          type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (constraints && !constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0;
      } else {
        return compareTypes(this.type, input);
      }
    }
  }, {
    key: 'toString',
    value: function toString(expand) {
      var type = this.type;

      return type.toString(expand);
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        typeParameters: this.typeParameters,
        type: this.type
      };
    }
  }]);
  return PartialType;
}(Type);

var ParameterizedClassDeclaration = function (_Declaration) {
  inherits(ParameterizedClassDeclaration, _Declaration);

  function ParameterizedClassDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParameterizedClassDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParameterizedClassDeclaration.__proto__ || Object.getPrototypeOf(ParameterizedClassDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedClassDeclaration', _this.shapeID = Symbol(), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ParameterizedClassDeclaration, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 3] = arguments[_key2];
      }

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(getPartial.apply(undefined, [this].concat(toConsumableArray(typeInstances))).errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return getPartial.apply(undefined, [this].concat(toConsumableArray(typeInstances))).accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return getPartial(this).compareWith(input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len4 = arguments.length, typeInstances = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        typeInstances[_key4] = arguments[_key4];
      }

      return getPartial.apply(undefined, [this].concat(toConsumableArray(typeInstances))).type;
    }
  }, {
    key: 'isSuperClassOf',
    value: function isSuperClassOf(candidate) {
      return getPartial(this).type.isSuperClassOf(candidate);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len5 = arguments.length, typeInstances = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        typeInstances[_key5] = arguments[_key5];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      if (!withDeclaration) {
        return this.name;
      }
      var partial = getPartial(this);
      var type = partial.type,
          typeParameters = partial.typeParameters;

      if (typeParameters.length === 0) {
        return partial.toString(true);
      }
      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }
      var superClass = type.superClass,
          body = type.body;

      var superClassName = superClass && (typeof superClass.name === 'string' && superClass.name || superClass.toString());
      return 'declare class ' + this.name + '<' + items.join(', ') + '>' + (superClassName ? ' extends ' + superClassName : '') + ' ' + body.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return getPartial(this).toJSON();
    }
  }, {
    key: 'superClass',
    get: function get$$1() {
      return getPartial(this).type.superClass;
    }
  }, {
    key: 'body',
    get: function get$$1() {
      return getPartial(this).type.body;
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      return getPartial(this).type.properties;
    }
  }, {
    key: 'typeParameters',
    get: function get$$1() {
      return getPartial(this).typeParameters;
    }
  }]);
  return ParameterizedClassDeclaration;
}(Declaration);

function getPartial(parent) {
  var context = parent.context,
      bodyCreator = parent.bodyCreator;

  var partial = new PartialType(context);
  var body = bodyCreator(partial);
  if (Array.isArray(body)) {
    partial.type = context.class.apply(context, [parent.name].concat(toConsumableArray(body)));
  } else {
    partial.type = context.class(parent.name, body);
  }

  partial.type.shapeID = parent.shapeID;

  var typeParameters = partial.typeParameters;

  for (var _len6 = arguments.length, typeInstances = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    typeInstances[_key6 - 1] = arguments[_key6];
  }

  var limit = Math.min(typeInstances.length, typeParameters.length);
  for (var i = 0; i < limit; i++) {
    var typeParameter = typeParameters[i];
    var typeInstance = typeInstances[i];
    if (typeParameter.bound && typeParameter.bound !== typeInstance) {
      // if the type parameter is already bound we need to
      // create an intersection type with this one.
      typeParameter.bound = context.intersect(typeParameter.bound, typeInstance);
    } else {
      typeParameter.bound = typeInstance;
    }
  }

  return partial;
}

var ExtendsDeclaration = function (_Declaration) {
  inherits(ExtendsDeclaration, _Declaration);

  function ExtendsDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ExtendsDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ExtendsDeclaration.__proto__ || Object.getPrototypeOf(ExtendsDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ExtendsDeclaration', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ExtendsDeclaration, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.type.errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var type = this.type;

      if (withDeclaration) {
        return 'extends ' + type.toString();
      } else {
        return type.toString();
      }
    }
  }]);
  return ExtendsDeclaration;
}(Declaration);

var _marked$1 = /*#__PURE__*/_regeneratorRuntime.mark(collectErrorsWithIndexers);
var _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(collectErrorsWithoutIndexers);
var _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(collectErrorsExact);

var ObjectType = function (_Type) {
  inherits(ObjectType, _Type);

  function ObjectType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectType.__proto__ || Object.getPrototypeOf(ObjectType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectType', _this.properties = [], _this.indexers = [], _this.callProperties = [], _this.exact = false, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ObjectType, [{
    key: 'getProperty',


    /**
     * Get a property with the given name, or undefined if it does not exist.
     */
    value: function getProperty(key) {
      var properties = this.properties;
      var length = properties.length;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          return property;
        }
      }
      return this.getIndexer(key);
    }
  }, {
    key: 'setProperty',
    value: function setProperty(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var context = this.context,
          properties = this.properties;
      var length = properties.length;

      var newProp = new ObjectTypeProperty(context);
      newProp.key = key;
      newProp.value = value;
      newProp.optional = optional;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          properties[i] = newProp;
          return;
        }
      }
      properties.push(newProp);
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var properties = this.properties;
      var length = properties.length;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          return true;
        }
      }
      return this.hasIndexer(key);
    }

    /**
     * Get an indexer with which matches the given key type.
     */

  }, {
    key: 'getIndexer',
    value: function getIndexer(key) {
      var indexers = this.indexers;
      var length = indexers.length;

      for (var i = 0; i < length; i++) {
        var indexer = indexers[i];
        if (indexer.acceptsKey(key)) {
          return indexer;
        }
      }
    }

    /**
     * Determine whether an indexer exists which matches the given key type.
     */

  }, {
    key: 'hasIndexer',
    value: function hasIndexer(key) {
      var indexers = this.indexers;
      var length = indexers.length;

      for (var i = 0; i < length; i++) {
        var indexer = indexers[i];
        if (indexer.acceptsKey(key)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var hasCallProperties;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(input === null)) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 3:
              return _context.abrupt('return');

            case 4:
              hasCallProperties = this.callProperties.length > 0;

              if (!hasCallProperties) {
                _context.next = 11;
                break;
              }

              if (acceptsCallProperties(this, input)) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return [path, getErrorMessage('ERR_EXPECT_CALLABLE'), this];

            case 9:
              _context.next = 15;
              break;

            case 11:
              if (!((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object')) {
                _context.next = 15;
                break;
              }

              _context.next = 14;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 14:
              return _context.abrupt('return');

            case 15:
              if (!validation.inCycle(this, input)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('return');

            case 17:
              validation.startCycle(this, input);

              if (!(this.indexers.length > 0)) {
                _context.next = 26;
                break;
              }

              if (!(input instanceof Object && Array.isArray(input))) {
                _context.next = 23;
                break;
              }

              _context.next = 22;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 22:
              return _context.abrupt('return');

            case 23:
              return _context.delegateYield(collectErrorsWithIndexers(this, validation, path, input), 't0', 24);

            case 24:
              _context.next = 27;
              break;

            case 26:
              return _context.delegateYield(collectErrorsWithoutIndexers(this, validation, path, input), 't1', 27);

            case 27:
              if (!this.exact) {
                _context.next = 29;
                break;
              }

              return _context.delegateYield(collectErrorsExact(this, validation, path, input), 't2', 29);

            case 29:
              validation.endCycle(this, input);

            case 30:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (input === null) {
        return false;
      }
      var hasCallProperties = this.callProperties.length > 0;

      if (hasCallProperties) {
        if (!acceptsCallProperties(this, input)) {
          return false;
        }
      } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object') {
        return false;
      }
      if (inValidationCycle(this, input)) {
        return true;
      }
      startValidationCycle(this, input);

      var result = void 0;
      if (this.indexers.length > 0) {
        result = acceptsWithIndexers(this, input);
      } else {
        result = acceptsWithoutIndexers(this, input);
      }
      if (result && this.exact) {
        result = acceptsExact(this, input);
      }
      endValidationCycle(this, input);
      return result;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ObjectType || input instanceof ClassDeclaration || input instanceof ParameterizedClassDeclaration)) {
        return -1;
      }
      var hasCallProperties = this.callProperties.length > 0;

      var isGreater = false;
      if (hasCallProperties) {
        var _result = compareTypeCallProperties(this, input);
        if (_result === -1) {
          return -1;
        } else if (_result === 1) {
          isGreater = true;
        }
      }

      var result = void 0;
      if (this.indexers.length > 0) {
        result = compareTypeWithIndexers(this, input);
      } else {
        result = compareTypeWithoutIndexers(this, input);
      }

      if (result === -1) {
        return -1;
      } else if (isGreater) {
        return 1;
      } else {
        return result;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var callProperties = this.callProperties,
          properties = this.properties,
          indexers = this.indexers;

      if (inToStringCycle(this)) {
        return '$Cycle<Object>';
      }
      startToStringCycle(this);
      var body = [];
      for (var i = 0; i < callProperties.length; i++) {
        body.push(callProperties[i].toString());
      }
      for (var _i = 0; _i < properties.length; _i++) {
        body.push(properties[_i].toString());
      }
      for (var _i2 = 0; _i2 < indexers.length; _i2++) {
        body.push(indexers[_i2].toString());
      }
      endToStringCycle(this);
      if (this.exact) {
        return '{|\n' + indent(body.join('\n')) + '\n|}';
      } else {
        return '{\n' + indent(body.join('\n')) + '\n}';
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        callProperties: this.callProperties,
        properties: this.properties,
        indexers: this.indexers,
        exact: this.exact
      };
    }
  }]);
  return ObjectType;
}(Type);

function acceptsCallProperties(type, input) {
  var callProperties = type.callProperties;

  for (var i = 0; i < callProperties.length; i++) {
    var callProperty = callProperties[i];
    if (callProperty.accepts(input)) {
      return true;
    }
  }
  return false;
}

function compareTypeCallProperties(type, input) {
  var callProperties = type.callProperties;

  var inputCallProperties = input.callProperties;
  var identicalCount = 0;
  loop: for (var i = 0; i < callProperties.length; i++) {
    var callProperty = callProperties[i];

    for (var j = 0; j < inputCallProperties.length; j++) {
      var inputCallProperty = inputCallProperties[j];
      var result = compareTypes(callProperty, inputCallProperty);
      if (result === 0) {
        identicalCount++;
        continue loop;
      } else if (result === 1) {
        continue loop;
      }
    }
    // If we got this far, nothing accepted.
    return -1;
  }
  if (identicalCount === callProperties.length) {
    return 0;
  } else {
    return 1;
  }
}

function acceptsWithIndexers(type, input) {
  var properties = type.properties,
      indexers = type.indexers;

  var seen = [];
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (!property.accepts(input)) {
      return false;
    }
    seen.push(property.key);
  }
  loop: for (var key in input) {
    if (seen.indexOf(key) !== -1) {
      continue;
    }
    var value = input[key];
    for (var _i3 = 0; _i3 < indexers.length; _i3++) {
      var indexer = indexers[_i3];
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop;
      }
    }

    // if we got this far the key / value did not accepts any indexers.
    return false;
  }
  return true;
}

function compareTypeWithIndexers(type, input) {
  var indexers = type.indexers,
      properties = type.properties;

  var inputIndexers = input.indexers;
  var inputProperties = input.properties;
  var isGreater = false;
  loop: for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    for (var j = 0; j < inputProperties.length; j++) {
      var inputProperty = inputProperties[j];
      if (inputProperty.key === property.key) {
        var result = compareTypes(property, inputProperty);
        if (result === -1) {
          return -1;
        } else if (result === 1) {
          isGreater = true;
        }
        continue loop;
      }
    }
  }
  loop: for (var _i4 = 0; _i4 < indexers.length; _i4++) {
    var indexer = indexers[_i4];
    for (var _j = 0; _j < inputIndexers.length; _j++) {
      var inputIndexer = inputIndexers[_j];
      var _result2 = compareTypes(indexer, inputIndexer);
      if (_result2 === 1) {
        isGreater = true;
        continue loop;
      } else if (_result2 === 0) {
        continue loop;
      }
    }
    // if we got this far, nothing accepted
    return -1;
  }
  return isGreater ? 1 : 0;
}

function acceptsWithoutIndexers(type, input) {
  var properties = type.properties;

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (!property.accepts(input)) {
      return false;
    }
  }
  return true;
}

function acceptsExact(type, input) {
  var properties = type.properties;

  var _loop = function _loop(key) {
    // eslint-disable-line guard-for-in
    if (!properties.some(function (property) {
      return property.key === key;
    })) {
      return {
        v: false
      };
    }
  };

  for (var key in input) {
    var _ret2 = _loop(key);

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  }
  return true;
}

function compareTypeWithoutIndexers(type, input) {
  var properties = type.properties;

  var inputProperties = input.properties;
  var isGreater = false;
  loop: for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    for (var j = 0; j < inputProperties.length; j++) {
      var inputProperty = inputProperties[j];
      if (inputProperty.key === property.key) {
        var result = compareTypes(property.value, inputProperty.value);
        if (result === -1) {
          return -1;
        } else if (result === 1) {
          isGreater = true;
        }
        continue loop;
      }
    }
    return -1;
  }
  return isGreater ? 1 : 0;
}

function collectErrorsWithIndexers(type, validation, path, input) {
  var properties, indexers, seen, i, property, key, value, _i5, indexer;

  return _regeneratorRuntime.wrap(function collectErrorsWithIndexers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          properties = type.properties, indexers = type.indexers;
          seen = [];
          i = 0;

        case 3:
          if (!(i < properties.length)) {
            _context2.next = 10;
            break;
          }

          property = properties[i];
          return _context2.delegateYield(property.errors(validation, path, input), 't0', 6);

        case 6:
          seen.push(property.key);

        case 7:
          i++;
          _context2.next = 3;
          break;

        case 10:
          _context2.t1 = _regeneratorRuntime.keys(input);

        case 11:
          if ((_context2.t2 = _context2.t1()).done) {
            _context2.next = 28;
            break;
          }

          key = _context2.t2.value;

          if (!(seen.indexOf(key) !== -1)) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt('continue', 11);

        case 15:
          value = input[key];
          _i5 = 0;

        case 17:
          if (!(_i5 < indexers.length)) {
            _context2.next = 24;
            break;
          }

          indexer = indexers[_i5];

          if (!(indexer.acceptsKey(key) && indexer.acceptsValue(value))) {
            _context2.next = 21;
            break;
          }

          return _context2.abrupt('continue', 11);

        case 21:
          _i5++;
          _context2.next = 17;
          break;

        case 24:
          _context2.next = 26;
          return [path.concat(key), getErrorMessage('ERR_NO_INDEXER'), type];

        case 26:
          _context2.next = 11;
          break;

        case 28:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked$1, this);
}

function collectErrorsWithoutIndexers(type, validation, path, input) {
  var properties, i, property;
  return _regeneratorRuntime.wrap(function collectErrorsWithoutIndexers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          properties = type.properties;
          i = 0;

        case 2:
          if (!(i < properties.length)) {
            _context3.next = 8;
            break;
          }

          property = properties[i];
          return _context3.delegateYield(property.errors(validation, path, input), 't0', 5);

        case 5:
          i++;
          _context3.next = 2;
          break;

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked2, this);
}

function collectErrorsExact(type, validation, path, input) {
  var _this2 = this;

  var properties, _loop2, key;

  return _regeneratorRuntime.wrap(function collectErrorsExact$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          properties = type.properties;
          _loop2 = /*#__PURE__*/_regeneratorRuntime.mark(function _loop2(key) {
            return _regeneratorRuntime.wrap(function _loop2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (properties.some(function (property) {
                      return property.key === key;
                    })) {
                      _context4.next = 3;
                      break;
                    }

                    _context4.next = 3;
                    return [path, getErrorMessage('ERR_UNKNOWN_KEY', key), type];

                  case 3:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _loop2, _this2);
          });
          _context5.t0 = _regeneratorRuntime.keys(input);

        case 3:
          if ((_context5.t1 = _context5.t0()).done) {
            _context5.next = 8;
            break;
          }

          key = _context5.t1.value;
          return _context5.delegateYield(_loop2(key), 't2', 6);

        case 6:
          _context5.next = 3;
          break;

        case 8:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked3, this);
}

function indent(input) {
  var lines = input.split('\n');
  var length = lines.length;

  for (var i = 0; i < length; i++) {
    lines[i] = '  ' + lines[i];
  }
  return lines.join('\n');
}

var IntersectionType = function (_Type) {
  inherits(IntersectionType, _Type);

  function IntersectionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, IntersectionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = IntersectionType.__proto__ || Object.getPrototypeOf(IntersectionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'IntersectionType', _this.types = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(IntersectionType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var types, length, i;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              types = this.types;
              length = types.length;
              i = 0;

            case 3:
              if (!(i < length)) {
                _context.next = 8;
                break;
              }

              return _context.delegateYield(types[i].errors(validation, path, input), 't0', 5);

            case 5:
              i++;
              _context.next = 3;
              break;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })

    /**
     * Get a property with the given name, or undefined if it does not exist.
     */

  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      var types = this.types;
      var length = types.length;

      for (var i = length - 1; i >= 0; i--) {
        var type = types[i];
        if (typeof type.getProperty === 'function') {
          var prop = type.getProperty(key);
          if (prop) {
            return prop;
          }
        }
      }
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (typeof type.hasProperty === 'function' && type.hasProperty(key)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (!type.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var types = this.types;
      var identicalCount = 0;
      if (input instanceof IntersectionType) {
        var inputTypes = input.types;
        loop: for (var i = 0; i < types.length; i++) {
          var type = types[i];
          for (var j = 0; j < inputTypes.length; j++) {
            var result = compareTypes(type, inputTypes[i]);
            if (result === 0) {
              identicalCount++;
              continue loop;
            } else if (result === 1) {
              continue loop;
            }
          }
          // if we got this far then nothing accepted this type.
          return -1;
        }
        return identicalCount === types.length ? 0 : 1;
      } else {
        for (var _i = 0; _i < types.length; _i++) {
          var _type = types[_i];
          var _result = compareTypes(_type, input);
          if (_result === -1) {
            return -1;
          } else if (_result === 0) {
            identicalCount++;
          }
        }
        return identicalCount === types.length ? 0 : 1;
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _ref2;

      var callProperties = [];
      var properties = [];
      var indexers = [];
      var types = this.types,
          context = this.context;

      for (var i = 0; i < types.length; i++) {
        var type = types[i].unwrap();
        invariant(type instanceof ObjectType, 'Can only intersect object types');
        callProperties.push.apply(callProperties, toConsumableArray(type.callProperties));
        indexers.push.apply(indexers, toConsumableArray(type.indexers));
        mergeProperties(properties, type.properties);
      }
      return (_ref2 = context).object.apply(_ref2, callProperties.concat(properties, indexers));
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.types.join(' & ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);
  return IntersectionType;
}(Type);

function getPropertyIndex(name, properties) {
  for (var i = 0; i < properties.length; i++) {
    if (properties[i].name === name) {
      return i;
    }
  }
  return -1;
}

function mergeProperties(target, source) {
  for (var i = 0; i < source.length; i++) {
    var typeProp = source[i];
    var index = getPropertyIndex(typeProp.key, target);
    if (index === -1) {
      target.push(typeProp);
    } else {
      target[index] = typeProp;
    }
  }
  return target;
}

var MixedType = function (_Type) {
  inherits(MixedType, _Type);

  function MixedType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, MixedType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = MixedType.__proto__ || Object.getPrototypeOf(MixedType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'MixedType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(MixedType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'mixed';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return MixedType;
}(Type);

var NumericLiteralType = function (_Type) {
  inherits(NumericLiteralType, _Type);

  function NumericLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NumericLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NumericLiteralType.__proto__ || Object.getPrototypeOf(NumericLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NumericLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NumericLiteralType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var value;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = this.value;

              if (!(input !== value)) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', value), this];

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NumericLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '' + this.value;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return NumericLiteralType;
}(Type);

var NumberType = function (_Type) {
  inherits(NumberType, _Type);

  function NumberType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NumberType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NumberType.__proto__ || Object.getPrototypeOf(NumberType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NumberType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NumberType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof input !== 'number')) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_NUMBER'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'number';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NumberType) {
        return 0;
      } else if (input instanceof NumericLiteralType) {
        return 1;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'number';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return NumberType;
}(Type);

var ParameterizedTypeAlias = function (_TypeAlias) {
  inherits(ParameterizedTypeAlias, _TypeAlias);

  function ParameterizedTypeAlias() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParameterizedTypeAlias);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParameterizedTypeAlias.__proto__ || Object.getPrototypeOf(ParameterizedTypeAlias)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedTypeAlias', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ParameterizedTypeAlias, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 3] = arguments[_key2];
      }

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(getPartial$1.apply(undefined, [this].concat(toConsumableArray(typeInstances))).errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      var partial = getPartial$1.apply(undefined, [this].concat(toConsumableArray(typeInstances)));
      if (!partial.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0; // should never need this because it's taken care of by compareTypes.
      } else if (this.hasConstraints) {
        // if we have constraints the types cannot be the same
        return -1;
      } else {
        return compareTypes(getPartial$1(this), input);
      }
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      for (var _len4 = arguments.length, typeInstances = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        typeInstances[_key4 - 1] = arguments[_key4];
      }

      var inner = this.unwrap.apply(this, toConsumableArray(typeInstances));
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty.apply(inner, [name].concat(toConsumableArray(typeInstances)));
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      for (var _len5 = arguments.length, typeInstances = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        typeInstances[_key5 - 1] = arguments[_key5];
      }

      var inner = this.unwrap.apply(this, toConsumableArray(typeInstances));
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty.apply(inner, [name].concat(toConsumableArray(typeInstances)));
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len6 = arguments.length, typeInstances = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        typeInstances[_key6] = arguments[_key6];
      }

      return getPartial$1.apply(undefined, [this].concat(toConsumableArray(typeInstances))).unwrap();
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var partial = getPartial$1(this);
      var typeParameters = partial.typeParameters;

      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }

      var name = this.name;

      var identifier = typeParameters.length > 0 ? name + '<' + items.join(', ') + '>' : name;

      if (withDeclaration) {
        return 'type ' + identifier + ' = ' + partial.toString() + ';';
      } else {
        return identifier;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var partial = getPartial$1(this);
      return partial.toJSON();
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      return getPartial$1(this).type.properties;
    }
  }]);
  return ParameterizedTypeAlias;
}(TypeAlias);

function getPartial$1(parent) {
  var typeCreator = parent.typeCreator,
      context = parent.context,
      name = parent.name;

  var partial = new PartialType(context);
  partial.name = name;
  partial.type = typeCreator(partial);
  partial.constraints = parent.constraints;

  var typeParameters = partial.typeParameters;

  for (var _len7 = arguments.length, typeInstances = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    typeInstances[_key7 - 1] = arguments[_key7];
  }

  var limit = Math.min(typeInstances.length, typeParameters.length);
  for (var i = 0; i < limit; i++) {
    var typeParameter = typeParameters[i];
    var typeInstance = typeInstances[i];
    if (typeParameter.bound && typeParameter.bound !== typeInstance) {
      // if the type parameter is already bound we need to
      // create an intersection type with this one.
      typeParameter.bound = context.intersect(typeParameter.bound, typeInstance);
    } else {
      typeParameter.bound = typeInstance;
    }
  }

  return partial;
}

var ParameterizedFunctionType = function (_Type) {
  inherits(ParameterizedFunctionType, _Type);

  function ParameterizedFunctionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParameterizedFunctionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParameterizedFunctionType.__proto__ || Object.getPrototypeOf(ParameterizedFunctionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedFunctionType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ParameterizedFunctionType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 3] = arguments[_key2];
      }

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(getPartial$2.apply(undefined, [this].concat(toConsumableArray(typeInstances))).errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return getPartial$2.apply(undefined, [this].concat(toConsumableArray(typeInstances))).accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(getPartial$2(this), input);
    }
  }, {
    key: 'acceptsParams',
    value: function acceptsParams() {
      var _getPartial$type;

      return (_getPartial$type = getPartial$2(this).type).acceptsParams.apply(_getPartial$type, arguments);
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return getPartial$2(this).type.acceptsReturn(input);
    }
  }, {
    key: 'assertParams',
    value: function assertParams() {
      var _getPartial$type2;

      return (_getPartial$type2 = getPartial$2(this).type).assertParams.apply(_getPartial$type2, arguments);
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      return getPartial$2(this).type.assertReturn(input);
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len4 = arguments.length, typeInstances = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        typeInstances[_key4] = arguments[_key4];
      }

      return getPartial$2.apply(undefined, [this].concat(toConsumableArray(typeInstances))).unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      var partial = getPartial$2(this);
      var type = partial.type,
          typeParameters = partial.typeParameters;

      if (typeParameters.length === 0) {
        return type.toString();
      }
      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }
      return '<' + items.join(', ') + '> ' + type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var partial = getPartial$2(this);
      return partial.toJSON();
    }
  }, {
    key: 'typeParameters',
    get: function get$$1() {
      return getPartial$2(this).typeParameters;
    }
  }, {
    key: 'params',
    get: function get$$1() {
      return getPartial$2(this).type.params;
    }
  }, {
    key: 'rest',
    get: function get$$1() {
      return getPartial$2(this).type.rest;
    }
  }, {
    key: 'returnType',
    get: function get$$1() {
      return getPartial$2(this).type.returnType;
    }
  }]);
  return ParameterizedFunctionType;
}(Type);

function getPartial$2(parent) {
  var context = parent.context,
      bodyCreator = parent.bodyCreator;

  var partial = new PartialType(context);
  var body = bodyCreator(partial);
  partial.type = context.function.apply(context, toConsumableArray(body));

  var typeParameters = partial.typeParameters;

  for (var _len5 = arguments.length, typeInstances = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    typeInstances[_key5 - 1] = arguments[_key5];
  }

  var limit = Math.min(typeInstances.length, typeParameters.length);
  for (var i = 0; i < limit; i++) {
    var typeParameter = typeParameters[i];
    var typeInstance = typeInstances[i];
    if (typeParameter.bound && typeParameter.bound !== typeInstance) {
      // if the type parameter is already bound we need to
      // create an intersection type with this one.
      typeParameter.bound = context.intersect(typeParameter.bound, typeInstance);
    } else {
      typeParameter.bound = typeInstance;
    }
  }

  return partial;
}

var RefinementType = function (_Type) {
  inherits(RefinementType, _Type);

  function RefinementType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, RefinementType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = RefinementType.__proto__ || Object.getPrototypeOf(RefinementType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'RefinementType', _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(RefinementType, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }
  }, {
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type, hasErrors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type;
              hasErrors = false;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = type.errors(validation, path, input)[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 15;
                break;
              }

              error = _step.value;

              hasErrors = true;
              _context.next = 12;
              return error;

            case 12:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 15:
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              if (hasErrors) {
                _context.next = 31;
                break;
              }

              return _context.delegateYield(collectConstraintErrors(this, validation, path, input), 't1', 31);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[5, 17, 21, 29], [22,, 24, 28]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len3 = arguments.length, typeInstances = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        typeInstances[_key3] = arguments[_key3];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return '$Refinment<' + type.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return RefinementType;
}(Type);

var StringLiteralType = function (_Type) {
  inherits(StringLiteralType, _Type);

  function StringLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, StringLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StringLiteralType.__proto__ || Object.getPrototypeOf(StringLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'StringLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(StringLiteralType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var value;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = this.value;

              if (!(input !== value)) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', this.toString()), this];

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof StringLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.value);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return StringLiteralType;
}(Type);

var StringType = function (_Type) {
  inherits(StringType, _Type);

  function StringType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, StringType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StringType.__proto__ || Object.getPrototypeOf(StringType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'StringType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(StringType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof input !== 'string')) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_STRING'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'string';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof StringLiteralType) {
        return 1;
      } else if (input instanceof StringType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'string';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return StringType;
}(Type);

var SymbolLiteralType = function (_Type) {
  inherits(SymbolLiteralType, _Type);

  function SymbolLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, SymbolLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = SymbolLiteralType.__proto__ || Object.getPrototypeOf(SymbolLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'SymbolLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(SymbolLiteralType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var value;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = this.value;

              if (!(input !== value)) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', this.toString()), this];

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof SymbolLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'typeof ' + String(this.value);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return SymbolLiteralType;
}(Type);

var SymbolType = function (_Type) {
  inherits(SymbolType, _Type);

  function SymbolType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, SymbolType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = SymbolType.__proto__ || Object.getPrototypeOf(SymbolType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'SymbolType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(SymbolType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'symbol')) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_SYMBOL'), this];

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'symbol';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof SymbolLiteralType) {
        return 1;
      } else if (input instanceof SymbolType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Symbol';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return SymbolType;
}(Type);

/**
 * # ThisType
 * Captures a reference to a particular instance of a class or a value,
 * and uses that value to perform an identity check.
 * In the case that `this` is undefined, any value will be permitted.
 */

var ThisType = function (_Type) {
  inherits(ThisType, _Type);

  function ThisType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ThisType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ThisType.__proto__ || Object.getPrototypeOf(ThisType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ThisType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ThisType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var recorded;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              recorded = this.recorded;

              if (!(input === recorded)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return');

            case 5:
              if (!(typeof recorded === 'function' && input instanceof recorded)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return');

            case 9:
              if (!(recorded != null)) {
                _context.next = 12;
                break;
              }

              _context.next = 12;
              return [path, getErrorMessage('ERR_EXPECT_THIS'), this];

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var recorded = this.recorded;

      if (input === recorded) {
        return true;
      } else if (typeof recorded === 'function' && input instanceof recorded) {
        return true;
      } else if (recorded != null) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ThisType)) {
        return -1;
      } else if (input.recorded && this.recorded) {
        return input.recorded === this.recorded ? 0 : -1;
      } else if (this.recorded) {
        return 0;
      } else {
        return 1;
      }
    }

    /**
     * Get the inner type.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      return 'this';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return ThisType;
}(Type);

var warnedInstances$1 = new WeakSet();

var TypeBox = function (_Type) {
  inherits(TypeBox, _Type);

  function TypeBox() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeBox.__proto__ || Object.getPrototypeOf(TypeBox)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeBox', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeBox, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.type.errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.type, input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this.type;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.type.toJSON();
    }
  }, {
    key: 'name',
    get: function get$$1() {
      return this.type.name;
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var reveal = this.reveal;

      var type = reveal();
      if (!type) {
        if (!warnedInstances$1.has(this)) {
          this.context.emitWarningMessage('Failed to reveal boxed type.');
          warnedInstances$1.add(this);
        }
        return this.context.mixed();
      } else if (!(type instanceof Type)) {
        // we got a boxed reference to something like a class
        return this.context.ref(type);
      }
      return type;
    }
  }]);
  return TypeBox;
}(Type);

var warnedMissing = {};

var TypeReference = function (_Type) {
  inherits(TypeReference, _Type);

  function TypeReference() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeReference);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeReference.__proto__ || Object.getPrototypeOf(TypeReference)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeReference', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeReference, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.type.errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.type, input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name
      };
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var context = this.context,
          name = this.name;

      var type = context.get(name);
      if (!type) {
        if (!warnedMissing[name]) {
          context.emitWarningMessage('Cannot resolve type: ' + name);
          warnedMissing[name] = true;
        }
        return context.any();
      }
      return type;
    }
  }]);
  return TypeReference;
}(Type);

var warnedInstances$2 = new WeakSet();

var RevealedName = Symbol('RevealedName');
var RevealedValue = Symbol('RevealedValue');

var TypeTDZ = function (_Type) {
  inherits(TypeTDZ, _Type);

  function TypeTDZ() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeTDZ);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeTDZ.__proto__ || Object.getPrototypeOf(TypeTDZ)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeTDZ', _this[RevealedName] = undefined, _this[RevealedValue] = undefined, _temp), possibleConstructorReturn(_this, _ret);
  }

  // Issue 252


  // Issue 252


  createClass(TypeTDZ, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(getRevealed(this).errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return getRevealed(this).accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(getRevealed(this), input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = getRevealed(this);

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return getRevealed(this).unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return getRevealed(this).toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return getRevealed(this).toJSON();
    }
  }, {
    key: 'name',
    get: function get$$1() {
      var name = this[RevealedName];
      if (!name) {
        name = getRevealed(this).name;
      }
      return name;
    },
    set: function set$$1(value) {
      this[RevealedName] = value;
    }
  }]);
  return TypeTDZ;
}(Type);

function getRevealed(container) {
  var existing = container[RevealedValue];
  if (existing) {
    return existing;
  } else {
    var reveal = container.reveal;

    var type = reveal();
    if (!type) {
      if (!warnedInstances$2.has(container)) {
        var name = container[RevealedName];
        if (name) {
          container.context.emitWarningMessage('Failed to reveal type called "' + name + '" in Temporal Dead Zone.');
        } else {
          container.context.emitWarningMessage('Failed to reveal unknown type in Temporal Dead Zone.');
        }
        warnedInstances$2.add(container);
      }
      return container.context.mixed();
    } else if (!(type instanceof Type)) {
      // we got a boxed reference to something like a class
      return container.context.ref(type);
    }
    return type;
  }
}

var UnionType = function (_Type) {
  inherits(UnionType, _Type);

  function UnionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, UnionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UnionType.__proto__ || Object.getPrototypeOf(UnionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'UnionType', _this.types = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(UnionType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var types, length, i, type;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              types = this.types;
              length = types.length;
              i = 0;

            case 3:
              if (!(i < length)) {
                _context.next = 10;
                break;
              }

              type = types[i];

              if (!type.accepts(input)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return');

            case 7:
              i++;
              _context.next = 3;
              break;

            case 10:
              _context.next = 12;
              return [path, getErrorMessage('ERR_NO_UNION', this.toString()), this];

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.accepts(input)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var types = this.types;
      if (input instanceof UnionType) {
        var inputTypes = input.types;
        var identicalCount = 0;
        loop: for (var i = 0; i < types.length; i++) {
          var type = types[i];
          for (var j = 0; j < inputTypes.length; j++) {
            var result = compareTypes(type, inputTypes[i]);
            if (result === 0) {
              identicalCount++;
              continue loop;
            } else if (result === 1) {
              continue loop;
            }
          }
          // if we got this far then nothing accepted this type.
          return -1;
        }

        if (identicalCount === types.length) {
          return 0;
        } else {
          return 1;
        }
      } else {
        for (var _i = 0; _i < types.length; _i++) {
          var _type = types[_i];
          if (compareTypes(_type, input) >= 0) {
            return 1;
          }
        }
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var types = this.types;

      var normalized = new Array(types.length);
      for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (type.typeName === 'FunctionType' || type.typeName === 'ParameterizedFunctionType') {
          normalized[i] = '(' + type.toString() + ')';
        } else {
          normalized[i] = type.toString();
        }
      }
      return normalized.join(' | ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);
  return UnionType;
}(Type);

function registerPrimitiveTypes(t) {
  primitiveTypes.null = Object.freeze(new NullLiteralType(t));
  primitiveTypes.empty = Object.freeze(new EmptyType(t));
  primitiveTypes.number = Object.freeze(new NumberType(t));
  primitiveTypes.boolean = Object.freeze(new BooleanType(t));
  primitiveTypes.string = Object.freeze(new StringType(t));
  primitiveTypes.symbol = Object.freeze(new SymbolType(t));
  primitiveTypes.any = Object.freeze(new AnyType(t));
  primitiveTypes.mixed = Object.freeze(new MixedType(t));
  primitiveTypes.void = Object.freeze(new VoidType(t));
  primitiveTypes.existential = Object.freeze(new ExistentialType(t));
  return t;
}

function registerBuiltinTypeConstructors(t) {

  t.declareTypeConstructor({
    name: 'Date',
    impl: Date,
    typeName: 'DateType',
    errors: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (input instanceof Date) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', 'Date'), this];

            case 3:
              _context.next = 8;
              break;

            case 5:
              if (!isNaN(input.getTime())) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return [path, getErrorMessage('ERR_INVALID_DATE'), this];

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    }),
    accepts: function accepts(input) {
      return input instanceof Date && !isNaN(input.getTime());
    },
    compareWith: function compareWith(input) {
      if (input.typeName === 'DateType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Promise',
    impl: Promise,
    typeName: 'PromiseType',
    errors: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input, futureType) {
      var context;
      return _regeneratorRuntime.wrap(function errors$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              invariant(futureType, 'Must specify type parameter for Promise.');
              context = this.context;

              if (context.checkPredicate('Promise', input)) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return [path, getErrorMessage('ERR_EXPECT_PROMISE', futureType), this];

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, errors, this);
    }),
    accepts: function accepts(input) {
      var context = this.context;

      return context.checkPredicate('Promise', input);
    },
    compareWith: function compareWith(input) {
      if (input.typeName === 'PromiseType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Map',
    impl: Map,
    typeName: 'MapType',
    errors: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input, keyType, valueType) {
      var context, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref, _ref2, key, value;

      return _regeneratorRuntime.wrap(function errors$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              invariant(keyType, 'Must specify two type parameters for Map.');
              invariant(valueType, 'Must specify two type parameters for Map.');
              context = this.context;

              if (context.checkPredicate('Map', input)) {
                _context3.next = 7;
                break;
              }

              _context3.next = 6;
              return [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', 'Map'), this];

            case 6:
              return _context3.abrupt('return');

            case 7:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 10;
              _iterator = input[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context3.next = 24;
                break;
              }

              _ref = _step.value;
              _ref2 = slicedToArray(_ref, 2);
              key = _ref2[0];
              value = _ref2[1];

              if (keyType.accepts(key)) {
                _context3.next = 20;
                break;
              }

              _context3.next = 20;
              return [path, getErrorMessage('ERR_EXPECT_KEY_TYPE', keyType), this];

            case 20:
              return _context3.delegateYield(valueType.errors(validation, path.concat(key), value), 't0', 21);

            case 21:
              _iteratorNormalCompletion = true;
              _context3.next = 12;
              break;

            case 24:
              _context3.next = 30;
              break;

            case 26:
              _context3.prev = 26;
              _context3.t1 = _context3['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context3.t1;

            case 30:
              _context3.prev = 30;
              _context3.prev = 31;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 33:
              _context3.prev = 33;

              if (!_didIteratorError) {
                _context3.next = 36;
                break;
              }

              throw _iteratorError;

            case 36:
              return _context3.finish(33);

            case 37:
              return _context3.finish(30);

            case 38:
            case 'end':
              return _context3.stop();
          }
        }
      }, errors, this, [[10, 26, 30, 38], [31,, 33, 37]]);
    }),
    accepts: function accepts(input, keyType, valueType) {
      var context = this.context;

      if (!context.checkPredicate('Map', input)) {
        return false;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref3 = _step2.value;

          var _ref4 = slicedToArray(_ref3, 2);

          var key = _ref4[0];
          var value = _ref4[1];

          if (!keyType.accepts(key) || !valueType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    },
    compareWith: function compareWith(input) {
      if (input.typeName === 'MapType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      var keyTypes = [];
      var valueTypes = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        loop: for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref5 = _step3.value;

          var _ref6 = slicedToArray(_ref5, 2);

          var key = _ref6[0];
          var value = _ref6[1];

          findKey: {
            for (var i = 0; i < keyTypes.length; i++) {
              var type = keyTypes[i];
              if (type.accepts(key)) {
                break findKey;
              }
            }
            keyTypes.push(t.typeOf(key));
          }

          for (var _i = 0; _i < valueTypes.length; _i++) {
            var _type = valueTypes[_i];
            if (_type.accepts(value)) {
              continue loop;
            }
          }
          valueTypes.push(t.typeOf(value));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var typeInstances = [];

      if (keyTypes.length === 0) {
        typeInstances.push(t.existential());
      } else if (keyTypes.length === 1) {
        typeInstances.push(keyTypes[0]);
      } else {
        typeInstances.push(t.union.apply(t, keyTypes));
      }

      if (valueTypes.length === 0) {
        typeInstances.push(t.existential());
      } else if (valueTypes.length === 1) {
        typeInstances.push(valueTypes[0]);
      } else {
        typeInstances.push(t.union.apply(t, valueTypes));
      }

      return typeInstances;
    }
  });

  t.declareTypeConstructor({
    name: 'Set',
    impl: Set,
    typeName: 'SetType',
    errors: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input, valueType) {
      var context, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, value;

      return _regeneratorRuntime.wrap(function errors$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              invariant(valueType, 'Must specify type parameter for Set.');
              context = this.context;

              if (context.checkPredicate('Set', input)) {
                _context4.next = 6;
                break;
              }

              _context4.next = 5;
              return [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', 'Set'), this];

            case 5:
              return _context4.abrupt('return');

            case 6:
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context4.prev = 9;
              _iterator4 = input[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context4.next = 17;
                break;
              }

              value = _step4.value;
              return _context4.delegateYield(valueType.errors(validation, path, value), 't0', 14);

            case 14:
              _iteratorNormalCompletion4 = true;
              _context4.next = 11;
              break;

            case 17:
              _context4.next = 23;
              break;

            case 19:
              _context4.prev = 19;
              _context4.t1 = _context4['catch'](9);
              _didIteratorError4 = true;
              _iteratorError4 = _context4.t1;

            case 23:
              _context4.prev = 23;
              _context4.prev = 24;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 26:
              _context4.prev = 26;

              if (!_didIteratorError4) {
                _context4.next = 29;
                break;
              }

              throw _iteratorError4;

            case 29:
              return _context4.finish(26);

            case 30:
              return _context4.finish(23);

            case 31:
            case 'end':
              return _context4.stop();
          }
        }
      }, errors, this, [[9, 19, 23, 31], [24,, 26, 30]]);
    }),
    accepts: function accepts(input, valueType) {
      var context = this.context;

      if (!context.checkPredicate('Set', input)) {
        return false;
      }
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = input[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var value = _step5.value;

          if (!valueType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return true;
    },
    compareWith: function compareWith(input) {
      if (input.typeName === 'SetType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters: function inferTypeParameters(input) {
      var valueTypes = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        loop: for (var _iterator6 = input[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var value = _step6.value;

          for (var i = 0; i < valueTypes.length; i++) {
            var type = valueTypes[i];
            if (type.accepts(value)) {
              continue loop;
            }
          }
          valueTypes.push(t.typeOf(value));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (valueTypes.length === 0) {
        return [t.existential()];
      } else if (valueTypes.length === 1) {
        return [valueTypes[0]];
      } else {
        return [t.union.apply(t, valueTypes)];
      }
    }
  });

  return t;
}

function registerTypePredicates(context) {
  context.setPredicate('Array', function (input) {
    return Array.isArray(input);
  });
  context.setPredicate('Map', function (input) {
    return input instanceof Map;
  });
  context.setPredicate('Set', function (input) {
    return input instanceof Set;
  });
  context.setPredicate('Promise', function (input) {
    if (input instanceof Promise) {
      return true;
    } else {
      return input !== null && ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' || typeof input === 'function') && typeof input.then === 'function';
    }
  });
}

var TypeInferer = function () {
  function TypeInferer(context) {
    classCallCheck(this, TypeInferer);

    this.context = context;
  }

  createClass(TypeInferer, [{
    key: 'infer',
    value: function infer(input) {
      var primitive = this.inferPrimitive(input);
      if (primitive) {
        return primitive;
      }
      var inferred = new Map();
      return this.inferComplex(input, inferred);
    }
  }, {
    key: 'inferInternal',
    value: function inferInternal(input, inferred) {
      var primitive = this.inferPrimitive(input);
      if (primitive) {
        return primitive;
      }
      return this.inferComplex(input, inferred);
    }
  }, {
    key: 'inferPrimitive',
    value: function inferPrimitive(input) {
      var context = this.context;

      if (input === null) {
        return context.null();
      } else if (input === undefined) {
        return context.void();
      } else if (typeof input === 'number') {
        return context.number();
      } else if (typeof input === 'boolean') {
        return context.boolean();
      } else if (typeof input === 'string') {
        return context.string();
      }
      // Issue 252
      else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'symbol') {
          return context.symbol(input);
        } else {
          return undefined;
        }
    }
  }, {
    key: 'inferComplex',
    value: function inferComplex(input, inferred) {
      var context = this.context;


      if (typeof input === 'function') {
        return this.inferFunction(input, inferred);
      } else if (input !== null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
        return this.inferObject(input, inferred);
      } else {
        return context.any();
      }
    }
  }, {
    key: 'inferFunction',
    value: function inferFunction(input, inferred) {
      var context = this.context;
      var length = input.length;

      var body = new Array(length + 1);
      for (var i = 0; i < length; i++) {
        body[i] = context.param(String.fromCharCode(97 + i), context.existential());
      }
      body[length] = context.return(context.existential());
      return context.fn.apply(context, body);
    }
  }, {
    key: 'inferObject',
    value: function inferObject(input, inferred) {
      var existing = inferred.get(input);
      if (existing) {
        return existing;
      }
      var context = this.context;

      var type = void 0;

      // Temporarily create a box for this type to catch cyclical references.
      // Nested references to this object will receive the boxed type.
      var box = context.box(function () {
        return type;
      });
      inferred.set(input, box);

      if (context.checkPredicate('Array', input)) {
        type = this.inferArray(input, inferred);
      } else if (!(input instanceof Object)) {
        type = this.inferDict(input, inferred);
      } else if (input.constructor !== Object) {
        var handler = context.getTypeConstructor(input.constructor);
        if (handler) {
          var typeParameters = handler.inferTypeParameters(input);
          type = handler.apply.apply(handler, toConsumableArray(typeParameters));
        } else {
          type = context.ref(input.constructor);
        }
      } else {
        var body = [];
        for (var key in input) {
          // eslint-disable-line
          var value = input[key];
          body.push(context.property(key, this.inferInternal(value, inferred)));
        }
        type = context.object.apply(context, body);
      }

      // Overwrite the box with the real value.
      inferred.set(input, type);
      return type;
    }
  }, {
    key: 'inferDict',
    value: function inferDict(input, inferred) {
      var numericIndexers = [];
      var stringIndexers = [];
      loop: for (var key in input) {
        // eslint-disable-line
        var value = input[key];
        var types = isNaN(+key) ? stringIndexers : numericIndexers;
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          if (type.accepts(value)) {
            continue loop;
          }
        }
        types.push(this.inferInternal(value, inferred));
      }

      var context = this.context;

      var body = [];
      if (numericIndexers.length === 1) {
        body.push(context.indexer('index', context.number(), numericIndexers[0]));
      } else if (numericIndexers.length > 1) {
        body.push(context.indexer('index', context.number(), context.union.apply(context, numericIndexers)));
      }

      if (stringIndexers.length === 1) {
        body.push(context.indexer('key', context.string(), stringIndexers[0]));
      } else if (stringIndexers.length > 1) {
        body.push(context.indexer('key', context.string(), context.union.apply(context, stringIndexers)));
      }

      return context.object.apply(context, body);
    }
  }, {
    key: 'inferArray',
    value: function inferArray(input, inferred) {
      var context = this.context;

      var types = [];
      var values = [];
      var length = input.length;

      loop: for (var i = 0; i < length; i++) {
        var item = input[i];
        var inferredType = this.inferInternal(item, inferred);
        for (var j = 0; j < types.length; j++) {
          var type = types[j];
          if (type.accepts(item) && inferredType.accepts(values[j])) {
            continue loop;
          }
        }
        types.push(inferredType);
        values.push(item);
      }
      if (types.length === 0) {
        return context.array(context.any());
      } else if (types.length === 1) {
        return context.array(types[0]);
      } else {
        return context.array(context.union.apply(context, types));
      }
    }
  }]);
  return TypeInferer;
}();

function makeReactPropTypes(objectType) {
  var output = {};
  if (!objectType.properties) {
    return output;
  }

  var _loop = function _loop(property) {
    output[property.key] = function (props, propName, componentName) {
      return makeError(property, props);
    };
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = objectType.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      _loop(property);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return output;
}

var delimiter$1 = '\n-------------------------------------------------\n\n';

function makeWarningMessage(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var input = validation.input,
      context = validation.context;

  var collected = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validation.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : "*";
      var actual = context.typeOf(_resolvePath(input, path)).toString();

      var field = stringifyPath(validation.path.concat(path));

      collected.push(field + ' ' + message + '\n\nExpected: ' + expected + '\n\nActual: ' + actual + '\n');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return 'Warning: ' + collected.join(delimiter$1);
}

function makeUnion(context, types) {
  var length = types.length;
  var merged = [];
  for (var i = 0; i < length; i++) {
    var type = types[i];
    if (type instanceof AnyType || type instanceof MixedType || type instanceof ExistentialType) {
      return type;
    }
    if (type instanceof UnionType) {
      mergeUnionTypes(merged, type.types);
    } else {
      merged.push(type);
    }
  }
  var union = new UnionType(context);
  union.types = merged;
  return union;
}

function mergeUnionTypes(aTypes, bTypes) {
  loop: for (var i = 0; i < bTypes.length; i++) {
    var bType = bTypes[i];
    for (var j = 0; j < aTypes.length; j++) {
      var aType = aTypes[j];
      if (compareTypes(aType, bType) !== -1) {
        continue loop;
      }
    }
    aTypes.push(bType);
  }
}

function makePropertyDescriptor(typeSource, input, propertyName, descriptor, shouldAssert) {
  if (typeof descriptor.get === 'function' && typeof descriptor.set === 'function') {
    return augmentExistingAccessors(typeSource, input, propertyName, descriptor, shouldAssert);
  } else {
    return propertyToAccessor(typeSource, input, propertyName, descriptor, shouldAssert);
  }
}

function makePropertyName(name) {
  return '_flowRuntime$' + name;
}

function getClassName(input) {
  if (typeof input === 'function') {
    return input.name || '[Class anonymous]';
  } else if (typeof input.constructor === 'function') {
    return getClassName(input.constructor);
  } else {
    return '[Class anonymous]';
  }
}

function resolveType(receiver, typeSource) {
  if (typeof typeSource === 'function') {
    return typeSource.call(receiver);
  } else {
    return typeSource;
  }
}

function propertyToAccessor(typeSource, input, propertyName, descriptor, shouldAssert) {
  var safeName = makePropertyName(propertyName);
  var className = getClassName(input);
  var initializer = descriptor.initializer,
      writable = descriptor.writable,
      config = objectWithoutProperties(descriptor, ['initializer', 'writable']); // eslint-disable-line no-unused-vars

  var propertyPath = [className, propertyName];

  return _extends({}, config, {
    type: 'accessor',
    get: function get$$1() {
      if (safeName in this) {
        return this[safeName];
      } else if (initializer) {
        var type = resolveType(this, typeSource);
        var _value = initializer.call(this);
        var context = type.context;
        context.check(type, _value, 'Default value for property', propertyPath);
        Object.defineProperty(this, safeName, {
          writable: true,
          value: _value
        });
        return _value;
      } else {
        Object.defineProperty(this, safeName, {
          writable: true,
          value: undefined
        });
      }
    },
    set: function set$$1(value) {
      var type = resolveType(this, typeSource);
      var context = type.context;
      if (shouldAssert) {
        context.assert(type, value, 'Property', propertyPath);
      } else {
        context.warn(type, value, 'Property', propertyPath);
      }
      if (safeName in this) {
        this[safeName] = value;
      } else {
        Object.defineProperty(this, safeName, {
          writable: true,
          value: value
        });
      }
    }
  });
}

function augmentExistingAccessors(typeSource, input, propertyName, descriptor, shouldAssert) {

  var className = getClassName(input);
  var propertyPath = [className, propertyName];

  var originalSetter = descriptor.set;

  descriptor.set = function set$$1(value) {
    var type = resolveType(this, typeSource);
    var context = type.context;
    if (shouldAssert) {
      context.assert(type, value, 'Property', propertyPath);
    } else {
      context.warn(type, value, 'Property', propertyPath);
    }
    originalSetter.call(this, value);
  };
}

// eslint-disable-line no-redeclare

function annotateValue(input, type) {
  // eslint-disable-line no-redeclare
  if (type instanceof Type) {
    input[TypeSymbol] = type;
    return input;
  } else {
    var _type = input;
    return function (input) {
      input[TypeSymbol] = _type;
      return input;
    };
  }
}

// If A and B are object types, $Diff<A,B> is the type of objects that have
// properties defined in A, but not in B.
// Properties that are defined in both A and B are allowed too.

var $DiffType = function (_Type) {
  inherits($DiffType, _Type);

  function $DiffType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $DiffType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $DiffType.__proto__ || Object.getPrototypeOf($DiffType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$DiffType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($DiffType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var aType, bType, properties, i, property;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              aType = this.aType, bType = this.bType;

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 4:
              return _context.abrupt('return');

            case 5:
              aType = aType.unwrap();
              bType = bType.unwrap();
              invariant(aType instanceof ObjectType && bType instanceof ObjectType, 'Can only $Diff object types.');
              properties = aType.properties;
              i = 0;

            case 10:
              if (!(i < properties.length)) {
                _context.next = 18;
                break;
              }

              property = properties[i];

              if (!bType.hasProperty(property.key)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('continue', 15);

            case 14:
              return _context.delegateYield(property.errors(validation, path.concat(property.key), input), 't0', 15);

            case 15:
              i++;
              _context.next = 10;
              break;

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var aType = this.aType,
          bType = this.bType;

      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
        return false;
      }
      aType = aType.unwrap();
      bType = bType.unwrap();
      invariant(aType instanceof ObjectType && bType instanceof ObjectType, 'Can only $Diff object types.');
      var properties = aType.properties;
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        if (!property.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _context2;

      var aType = this.aType,
          bType = this.bType;

      aType = aType.unwrap();
      bType = bType.unwrap();
      invariant(aType instanceof ObjectType && bType instanceof ObjectType, 'Can only $Diff object types.');
      var properties = aType.properties;
      var args = [];
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        args.push(property);
      }
      return (_context2 = this.context).object.apply(_context2, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Diff<' + this.aType.toString() + ', ' + this.bType.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        aType: this.aType,
        bType: this.bType
      };
    }
  }]);
  return $DiffType;
}(Type);

// Any subtype of T

var $FlowFixMeType = function (_Type) {
  inherits($FlowFixMeType, _Type);

  function $FlowFixMeType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $FlowFixMeType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $FlowFixMeType.__proto__ || Object.getPrototypeOf($FlowFixMeType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$FlowFixMeType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($FlowFixMeType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return 1;
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$FlowFixMe';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return $FlowFixMeType;
}(Type);

// The set of keys of T.

var $KeysType = function (_Type) {
  inherits($KeysType, _Type);

  function $KeysType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $KeysType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $KeysType.__proto__ || Object.getPrototypeOf($KeysType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$KeysType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($KeysType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type, properties, length, i, property, keys, _i;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type.unwrap();

              invariant(type instanceof ObjectType, 'Can only $Keys<T> object types.');

              properties = type.properties;
              length = properties.length;
              i = 0;

            case 5:
              if (!(i < length)) {
                _context.next = 12;
                break;
              }

              property = properties[i];

              if (!(input === property.key)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return');

            case 9:
              i++;
              _context.next = 5;
              break;

            case 12:
              keys = new Array(length);

              for (_i = 0; _i < length; _i++) {
                keys[_i] = properties[_i].key;
              }
              _context.next = 16;
              return [path, getErrorMessage('ERR_NO_UNION', keys.join(' | ')), this];

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Keys<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (input === property.key) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _context2;

      var context = this.context;
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Keys<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      var keys = new Array(length);
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        keys[i] = context.literal(property.key);
      }
      return (_context2 = this.context).union.apply(_context2, keys);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Keys<' + this.type.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $KeysType;
}(Type);

// Map over the keys and values in an object.

var $ObjMapiType = function (_Type) {
  inherits($ObjMapiType, _Type);

  function $ObjMapiType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ObjMapiType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ObjMapiType.__proto__ || Object.getPrototypeOf($ObjMapiType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ObjMapiType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ObjMapiType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var object, mapper, context, target, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, prop, applied, returnType, value;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              object = this.object, mapper = this.mapper, context = this.context;
              target = object.unwrap();

              invariant(target instanceof ObjectType, 'Target must be an object type.');

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 6:
              return _context.abrupt('return');

            case 7:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 10;
              _iterator = target.properties[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 22;
                break;
              }

              prop = _step.value;
              applied = mapper.unwrap();

              invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

              returnType = applied.invoke(context.literal(prop.key), prop.value);
              value = input[prop.key];
              return _context.delegateYield(returnType.errors(validation, path.concat(prop.key), value), 't0', 19);

            case 19:
              _iteratorNormalCompletion = true;
              _context.next = 12;
              break;

            case 22:
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t1 = _context['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 31:
              _context.prev = 31;

              if (!_didIteratorError) {
                _context.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(28);

            case 36:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[10, 24, 28, 36], [29,, 31, 35]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
        return false;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = target.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          var returnType = applied.invoke(context.literal(prop.key), prop.value);

          var value = input[prop.key];
          if (!returnType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      var args = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = target.properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prop = _step3.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          args.push(context.property(prop.key, applied.invoke(context.literal(prop.key), prop.value)));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return context.object.apply(context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$ObjMapi<' + this.object.toString() + ', ' + this.mapper.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        object: this.object,
        mapper: this.mapper
      };
    }
  }]);
  return $ObjMapiType;
}(Type);

// Map over the keys in an object.

var $ObjMapType = function (_Type) {
  inherits($ObjMapType, _Type);

  function $ObjMapType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ObjMapType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ObjMapType.__proto__ || Object.getPrototypeOf($ObjMapType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ObjMapType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ObjMapType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var object, mapper, context, target, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, prop, applied, returnType, value;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              object = this.object, mapper = this.mapper, context = this.context;
              target = object.unwrap();

              invariant(target instanceof ObjectType, 'Target must be an object type.');

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 6:
              return _context.abrupt('return');

            case 7:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 10;
              _iterator = target.properties[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 22;
                break;
              }

              prop = _step.value;
              applied = mapper.unwrap();

              invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

              returnType = applied.invoke(context.literal(prop.key));
              value = input[prop.key];
              return _context.delegateYield(returnType.errors(validation, path.concat(prop.key), value), 't0', 19);

            case 19:
              _iteratorNormalCompletion = true;
              _context.next = 12;
              break;

            case 22:
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t1 = _context['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 31:
              _context.prev = 31;

              if (!_didIteratorError) {
                _context.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(28);

            case 36:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this, [[10, 24, 28, 36], [29,, 31, 35]]);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
        return false;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = target.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          var returnType = applied.invoke(context.literal(prop.key));

          var value = input[prop.key];
          if (!returnType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      var args = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = target.properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prop = _step3.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          args.push(context.property(prop.key, applied.invoke(context.literal(prop.key))));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return context.object.apply(context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$ObjMap<' + this.object.toString() + ', ' + this.mapper.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        object: this.object,
        mapper: this.mapper
      };
    }
  }]);
  return $ObjMapType;
}(Type);

// The type of the named object property

var $PropertyType = function (_Type) {
  inherits($PropertyType, _Type);

  function $PropertyType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $PropertyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $PropertyType.__proto__ || Object.getPrototypeOf($PropertyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$PropertyType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($PropertyType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.unwrap().errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.unwrap().accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var object = this.object,
          property = this.property;

      var unwrapped = object.unwrap();
      invariant(typeof unwrapped.getProperty === 'function', 'Can only use $PropertyType on Objects.');
      return unwrapped.getProperty(property).unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$PropertyType<' + this.object.toString() + ', ' + String(this.property) + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        object: this.object,
        property: this.property
      };
    }
  }]);
  return $PropertyType;
}(Type);

// An object of type $Shape<T> does not have to have all of the properties
// that type T defines. But the types of the properties that it does have
// must accepts the types of the same properties in T.

var $ShapeType = function (_Type) {
  inherits($ShapeType, _Type);

  function $ShapeType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ShapeType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ShapeType.__proto__ || Object.getPrototypeOf($ShapeType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ShapeType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ShapeType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type, key, property;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type;

              if (!(input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function')) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];

            case 4:
              return _context.abrupt('return');

            case 5:

              type = type.unwrap();
              invariant(typeof type.getProperty === 'function', 'Can only $Shape<T> object types.');

              _context.t0 = _regeneratorRuntime.keys(input);

            case 8:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 16;
                break;
              }

              key = _context.t1.value;
              // eslint-disable-line guard-for-in
              property = type.getProperty(key);

              if (property) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('continue', 8);

            case 13:
              return _context.delegateYield(property.errors(validation, path, input), 't2', 14);

            case 14:
              _context.next = 8;
              break;

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (input === null || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && typeof input !== 'function') {
        return false;
      }
      type = type.unwrap();
      invariant(typeof type.getProperty === 'function', 'Can only $Shape<T> object types.');
      for (var key in input) {
        // eslint-disable-line guard-for-in
        var property = type.getProperty(key);
        if (!property || !property.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _context2;

      var type = this.type;

      type = type.unwrap();
      var context = this.context;
      invariant(type instanceof ObjectType, 'Can only $Shape<T> object types.');
      var properties = type.properties;
      var args = new Array(properties.length);
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        args[i] = context.property(property.key, property.value, true);
      }
      return (_context2 = this.context).object.apply(_context2, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Shape<' + this.type.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $ShapeType;
}(Type);

// Any subtype of T

var $SubType = function (_Type) {
  inherits($SubType, _Type);

  function $SubType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $SubType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $SubType.__proto__ || Object.getPrototypeOf($SubType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$SubType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($SubType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.type.errors(input, path), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Subtype<' + this.type.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $SubType;
}(Type);

// Any, but at least T.

var $SuperType = function (_Type) {
  inherits($SuperType, _Type);

  function $SuperType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $SuperType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $SuperType.__proto__ || Object.getPrototypeOf($SuperType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$SuperType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($SuperType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this.type.errors(validation, path, input), 't0', 1);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Supertype<' + this.type.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $SuperType;
}(Type);

// Map over the values in a tuple.

var $TupleMapType = function (_Type) {
  inherits($TupleMapType, _Type);

  function $TupleMapType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $TupleMapType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $TupleMapType.__proto__ || Object.getPrototypeOf($TupleMapType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$TupleMapType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($TupleMapType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var tuple, mapper, context, target, i, type, applied, expected, value;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tuple = this.tuple, mapper = this.mapper, context = this.context;
              target = tuple.unwrap();

              invariant(target instanceof TupleType, 'Target must be a tuple type.');

              if (context.checkPredicate('Array', input)) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return [path, getErrorMessage('ERR_EXPECT_ARRAY'), this];

            case 6:
              return _context.abrupt('return');

            case 7:
              i = 0;

            case 8:
              if (!(i < target.types.length)) {
                _context.next = 18;
                break;
              }

              type = target.types[i];
              applied = mapper.unwrap();

              invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

              expected = applied.invoke(type);
              value = input[i];
              return _context.delegateYield(expected.errors(validation, path.concat(i), value), 't0', 15);

            case 15:
              i++;
              _context.next = 8;
              break;

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var tuple = this.tuple,
          mapper = this.mapper,
          context = this.context;

      var target = tuple.unwrap();
      invariant(target instanceof TupleType, 'Target must be a tuple type.');

      if (!context.checkPredicate('Array', input)) {
        return false;
      }

      for (var i = 0; i < target.types.length; i++) {
        var type = target.types[i];
        var applied = mapper.unwrap();
        invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

        if (!applied.invoke(type).accepts(input[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var tuple = this.tuple,
          mapper = this.mapper,
          context = this.context;

      var target = tuple.unwrap();
      invariant(target instanceof TupleType, 'Target must be an tuple type.');

      var args = [];
      for (var i = 0; i < target.types.length; i++) {
        var type = target.types[i];
        var applied = mapper.unwrap();
        invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

        args.push(applied.invoke(type).unwrap().unwrap());
      }

      return context.tuple.apply(context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$TupleMap<' + this.tuple.toString() + ', ' + this.mapper.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        tuple: this.tuple,
        mapper: this.mapper
      };
    }
  }]);
  return $TupleMapType;
}(Type);

// The set of keys of T.

var $ValuesType = function (_Type) {
  inherits($ValuesType, _Type);

  function $ValuesType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ValuesType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ValuesType.__proto__ || Object.getPrototypeOf($ValuesType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ValuesType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ValuesType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var type, properties, length, i, property, values, _i;

      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.type.unwrap();

              invariant(type instanceof ObjectType, 'Can only $Values<T> object types.');

              properties = type.properties;
              length = properties.length;
              i = 0;

            case 5:
              if (!(i < length)) {
                _context.next = 12;
                break;
              }

              property = properties[i];

              if (!property.value.accepts(input)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return');

            case 9:
              i++;
              _context.next = 5;
              break;

            case 12:
              values = new Array(length);

              for (_i = 0; _i < length; _i++) {
                values[_i] = properties[_i].value.toString();
              }
              _context.next = 16;
              return [path, getErrorMessage('ERR_NO_UNION', values.join(' | ')), this];

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Values<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.value.accepts(input)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var context = this.context;
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Values<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      var values = new Array(length);
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        values[i] = property.value;
      }
      return context.union.apply(context, values);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Values<' + this.type.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $ValuesType;
}(Type);

function checkGenericType(context, expected, input) {
  var impl = expected.impl;

  if (typeof impl !== 'function') {
    // There is little else we can do here, so accept anything.
    return true;
  } else if (impl === input || impl.isPrototypeOf(input)) {
    return true;
  }

  var annotation = context.getAnnotation(impl);
  if (annotation == null) {
    return false;
  } else {
    return checkType(context, annotation, input);
  }
}

function checkType(context, expected, input) {
  var annotation = context.getAnnotation(input);
  if (annotation != null) {
    var result = compareTypes(expected, annotation);
    return result !== -1;
  }
  return true;
}

var ClassType = function (_Type) {
  inherits(ClassType, _Type);

  function ClassType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ClassType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ClassType.__proto__ || Object.getPrototypeOf(ClassType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ClassType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ClassType, [{
    key: 'errors',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function errors(validation, path, input) {
      var instanceType, context, expectedType, isValid;
      return _regeneratorRuntime.wrap(function errors$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              instanceType = this.instanceType, context = this.context;

              if (!(typeof input !== 'function')) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return [path, getErrorMessage('ERR_EXPECT_CLASS', instanceType.toString()), this];

            case 4:
              return _context.abrupt('return');

            case 5:
              expectedType = instanceType.typeName === 'ClassDeclaration' ? instanceType : instanceType.unwrap();
              isValid = expectedType instanceof GenericType ? checkGenericType(context, expectedType, input) : checkType(context, expectedType, input);

              if (isValid) {
                _context.next = 10;
                break;
              }

              _context.next = 10;
              return [path, getErrorMessage('ERR_EXPECT_CLASS', instanceType.toString()), this];

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, errors, this);
    })
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var instanceType = this.instanceType,
          context = this.context;

      if (typeof input !== 'function') {
        return false;
      }
      var expectedType = instanceType.typeName === 'ClassDeclaration' ? instanceType : instanceType.unwrap();
      if (expectedType instanceof GenericType) {
        return checkGenericType(context, expectedType, input);
      } else {
        return checkType(context, expectedType, input);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var instanceType = this.instanceType;

      if (input instanceof ClassType) {
        return compareTypes(instanceType, input.instanceType);
      }
      return -1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Class<' + this.instanceType.toString() + '>';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        instanceType: this.instanceType
      };
    }
  }]);
  return ClassType;
}(Type);

/**
 * Keeps track of invalid references in order to prevent
 * multiple warnings.
 */
var warnedInvalidReferences = new WeakSet();

var TypeContext = function () {
  function TypeContext() {
    classCallCheck(this, TypeContext);
    this.mode = 'assert';
    this[NameRegistrySymbol] = {};
    this[TypePredicateRegistrySymbol] = {};
    this[TypeConstructorRegistrySymbol] = new Map();
    this[InferrerSymbol] = new TypeInferer(this);
    this[ModuleRegistrySymbol] = {};
  }

  /**
   * Calls to `t.check(...)` will call either
   * `t.assert(...)` or `t.warn(...)` depending on this setting.
   */


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  createClass(TypeContext, [{
    key: 'makeJSONError',
    value: function makeJSONError$$1(validation) {
      return makeJSONError(validation);
    }
  }, {
    key: 'makeTypeError',
    value: function makeTypeError$$1(validation) {
      return makeTypeError(validation);
    }
  }, {
    key: 'createContext',
    value: function createContext() {
      var context = new TypeContext();
      // Issue 252
      context[ParentSymbol] = this;
      return context;
    }
  }, {
    key: 'typeOf',
    value: function typeOf(input) {

      var annotation = this.getAnnotation(input);
      if (annotation) {
        if (typeof input === 'function' && (annotation instanceof ClassDeclaration || annotation instanceof ParameterizedClassDeclaration)) {
          return this.Class(annotation);
        }
        return annotation;
      }
      // Issue 252
      var inferrer = this[InferrerSymbol];

      return inferrer.infer(input);
    }
  }, {
    key: 'compareTypes',
    value: function compareTypes$$1(a, b) {
      return compareTypes(a, b);
    }
  }, {
    key: 'get',
    value: function get$$1(name) {
      // Issue 252
      var item = this[NameRegistrySymbol][name];

      for (var _len = arguments.length, propertyNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        propertyNames[_key - 1] = arguments[_key];
      }

      if (item != null) {
        var current = typeof item === 'function' ? new item(this) : item;
        for (var i = 0; i < propertyNames.length; i++) {
          var propertyName = propertyNames[i];
          if (typeof current.getProperty !== 'function') {
            return;
          }
          current = current.getProperty(propertyName);
          if (!current) {
            return;
          }
          current = current.unwrap();
        }
        return current;
      }
      // Issue 252
      var parent = this[ParentSymbol];
      if (parent) {
        var fromParent = parent.get.apply(parent, [name].concat(toConsumableArray(propertyNames)));
        if (fromParent) {
          return fromParent;
        }
      }

      // if we got this far, see if we have a global type with this name.
      if (typeof commonjsGlobal[name] === 'function') {
        var target = new GenericType(this);
        target.name = name;
        target.impl = commonjsGlobal[name];
        // Issue 252
        this[NameRegistrySymbol][name] = target;
        return target;
      }
    }

    /**
     * Get the predicate for a given type name.
     * e.g. `t.getPredicate('Array')`.
     */

  }, {
    key: 'getPredicate',
    value: function getPredicate(name) {
      var item = this[TypePredicateRegistrySymbol][name];
      if (item) {
        return item;
      }
      var parent = this[ParentSymbol];
      if (parent) {
        return parent.getPredicate(name);
      }
    }

    /**
     * Set the predicate for a given type name.
     * This can be used to customise the behaviour of things like Array
     * detection or allowing Thenables in place of the global Promise.
     */

  }, {
    key: 'setPredicate',
    value: function setPredicate(name, predicate) {
      this[TypePredicateRegistrySymbol][name] = predicate;
    }

    /**
     * Check the given value against the named predicate.
     * Returns false if no such predicate exists.
     * e.g. `t.checkPredicate('Array', [1, 2, 3])`
     */

  }, {
    key: 'checkPredicate',
    value: function checkPredicate(name, input) {
      var predicate = this.getPredicate(name);
      if (predicate) {
        return predicate(input);
      } else {
        return false;
      }
    }

    /**
     * Returns a decorator for a function or object with the given type.
     */

  }, {
    key: 'decorate',
    value: function decorate(type, shouldAssert) {
      var _this2 = this;

      if (shouldAssert == null) {
        shouldAssert = this.mode === 'assert';
      }
      return function (input, propertyName, descriptor) {
        if (descriptor && typeof propertyName === 'string') {
          return makePropertyDescriptor(type, input, propertyName, descriptor, Boolean(shouldAssert));
        } else {
          invariant(typeof type !== 'function', 'Cannot decorate an object or function as a method.');
          return _this2.annotate(input, type);
        }
      };
    }

    /**
     * Annotates an object or function with the given type.
     * If a type is specified as the sole argument, returns a
     * function which can decorate classes or functions with the given type.
     */

  }, {
    key: 'annotate',
    value: function annotate(input, type) {
      if (type === undefined) {
        return annotateValue(input);
      } else {
        return annotateValue(input, type);
      }
    }
  }, {
    key: 'getAnnotation',
    value: function getAnnotation(input) {
      if (input !== null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' || typeof input === 'function') {
        // Issue 252
        return input[TypeSymbol];
      }
    }
  }, {
    key: 'hasAnnotation',
    value: function hasAnnotation(input) {
      if (input == null) {
        return false;
      } else {
        return input[TypeSymbol] ? true : false;
      }
    }
  }, {
    key: 'setAnnotation',
    value: function setAnnotation(input, type) {
      input[TypeSymbol] = type;
      return input;
    }
  }, {
    key: 'type',
    value: function type(name, _type) {
      if (typeof _type === 'function') {
        var target = new ParameterizedTypeAlias(this);
        target.name = name;
        target.typeCreator = _type;
        return target;
      } else {
        var _target = new TypeAlias(this);
        _target.name = name;
        _target.type = _type;
        return _target;
      }
    }
  }, {
    key: 'declare',
    value: function declare(name, type) {

      if (name instanceof Declaration) {
        type = name;
        name = type.name;
      } else if (name instanceof TypeAlias) {
        type = name;
        name = type.name;
      }
      if (typeof type === 'function') {
        type = this.type(name, type);
      }
      if (type instanceof ModuleDeclaration) {
        var moduleRegistry = this[ModuleRegistrySymbol];
        moduleRegistry[name] = type;
        return type;
      } else {
        invariant(typeof name === 'string', 'Name must be a string');
        invariant(type instanceof Type, 'Type must be supplied to declaration');
        var nameRegistry = this[NameRegistrySymbol];

        if (type instanceof Declaration) {
          nameRegistry[name] = type;
          return type;
        } else if (type instanceof TypeAlias || type instanceof ParameterizedTypeAlias) {
          var target = new TypeDeclaration(this);
          target.name = name;
          target.typeAlias = type;
          nameRegistry[name] = target;
          return target;
        } else {
          var _target2 = this.var(name, type);
          nameRegistry[name] = _target2;
          return _target2;
        }
      }
    }
  }, {
    key: 'declarations',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function declarations() {
      var nameRegistry, key;
      return _regeneratorRuntime.wrap(function declarations$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              nameRegistry = this[NameRegistrySymbol];
              _context.t0 = _regeneratorRuntime.keys(nameRegistry);

            case 2:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 8;
                break;
              }

              key = _context.t1.value;
              _context.next = 6;
              return [key, nameRegistry[key]];

            case 6:
              _context.next = 2;
              break;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, declarations, this);
    })
  }, {
    key: 'modules',
    value: /*#__PURE__*/_regeneratorRuntime.mark(function modules() {
      var moduleRegistry, key;
      return _regeneratorRuntime.wrap(function modules$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              moduleRegistry = this[ModuleRegistrySymbol];
              _context2.t0 = _regeneratorRuntime.keys(moduleRegistry);

            case 2:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 8;
                break;
              }

              key = _context2.t1.value;
              _context2.next = 6;
              return moduleRegistry[key];

            case 6:
              _context2.next = 2;
              break;

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, modules, this);
    })
  }, {
    key: 'import',
    value: function _import(moduleName) {
      var moduleRegistry = this[ModuleRegistrySymbol];
      if (moduleRegistry[moduleName]) {
        return moduleRegistry[moduleName];
      }

      var _moduleName$split = moduleName.split('/'),
          _moduleName$split2 = slicedToArray(_moduleName$split, 1),
          head = _moduleName$split2[0];

      var module = moduleRegistry[head];
      if (module) {
        return module.import(moduleName);
      }
      var parent = this[ParentSymbol];
      if (parent) {
        return parent.import(moduleName);
      }
    }
  }, {
    key: 'declareTypeConstructor',
    value: function declareTypeConstructor(_ref) {
      var name = _ref.name,
          impl = _ref.impl,
          typeName = _ref.typeName,
          errors = _ref.errors,
          accepts = _ref.accepts,
          inferTypeParameters = _ref.inferTypeParameters,
          compareWith = _ref.compareWith;

      var nameRegistry = this[NameRegistrySymbol];

      if (nameRegistry[name]) {
        this.emitWarningMessage('Redeclaring type: ' + name + ', this may be unintended.');
      }

      var target = new TypeConstructor(this);
      target.name = name;
      target.typeName = typeName;
      target.impl = impl;
      target.errors = errors;
      target.accepts = accepts;
      target.inferTypeParameters = inferTypeParameters;
      if (typeof compareWith === 'function') {
        target.compareWith = compareWith;
      }

      nameRegistry[name] = target;

      if (typeof impl === 'function') {
        // Issue 252
        var handlerRegistry = this[TypeConstructorRegistrySymbol];

        if (handlerRegistry.has(impl)) {
          this.emitWarningMessage('A type handler already exists for the given implementation of ' + name + '.');
        }
        handlerRegistry.set(impl, target);
      }
      return target;
    }
  }, {
    key: 'getTypeConstructor',
    value: function getTypeConstructor(impl) {
      // Issue 252
      var handlerRegistry = this[TypeConstructorRegistrySymbol];

      return handlerRegistry.get(impl);
    }
  }, {
    key: 'literal',
    value: function literal(input) {
      if (input === undefined) {
        return this.void();
      } else if (input === null) {
        return this.null();
      } else if (typeof input === 'boolean') {
        return this.boolean(input);
      } else if (typeof input === 'number') {
        return this.number(input);
      } else if (typeof input === 'string') {
        return this.string(input);
      }
      // Issue 252
      else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'symbol') {
          return this.symbol(input);
        } else {
          return this.typeOf(input);
        }
    }
  }, {
    key: 'null',
    value: function _null() {
      return primitiveTypes.null;
    }
  }, {
    key: 'nullable',
    value: function nullable(type) {
      var target = new NullableType(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'existential',
    value: function existential() {
      return primitiveTypes.existential;
    }
  }, {
    key: 'empty',
    value: function empty() {
      return primitiveTypes.empty;
    }
  }, {
    key: 'any',
    value: function any() {
      return primitiveTypes.any;
    }
  }, {
    key: 'mixed',
    value: function mixed() {
      return primitiveTypes.mixed;
    }
  }, {
    key: 'void',
    value: function _void() {
      return primitiveTypes.void;
    }
  }, {
    key: 'this',
    value: function _this(input) {
      var target = new ThisType(this);
      if (input !== undefined) {
        target.recorded = input;
      }
      return target;
    }
  }, {
    key: 'number',
    value: function number(input) {
      if (input !== undefined) {
        var target = new NumericLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.number;
      }
    }
  }, {
    key: 'boolean',
    value: function boolean(input) {
      if (input !== undefined) {
        var target = new BooleanLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.boolean;
      }
    }
  }, {
    key: 'string',
    value: function string(input) {
      if (input !== undefined) {
        var target = new StringLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.string;
      }
    }
  }, {
    key: 'symbol',
    value: function symbol(input) {
      if (input !== undefined) {
        var target = new SymbolLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.symbol;
      }
    }
  }, {
    key: 'typeParameter',
    value: function typeParameter(id, bound, defaultType) {
      var target = new TypeParameter(this);
      target.id = id;
      target.bound = bound;
      target.default = defaultType;
      return target;
    }
  }, {
    key: 'flowInto',
    value: function flowInto(typeParameter) {
      return flowIntoTypeParameter(typeParameter);
    }

    /**
     * Bind the type parameters for the parent class of the given instance.
     */

  }, {
    key: 'bindTypeParameters',
    value: function bindTypeParameters(subject) {
      var instancePrototype = Object.getPrototypeOf(subject);
      // Issue
      var parentPrototype = instancePrototype && Object.getPrototypeOf(instancePrototype);
      // Issue
      var parentClass = parentPrototype && parentPrototype.constructor;

      if (!parentClass) {
        this.emitWarningMessage('Could not bind type parameters for non-existent parent class.');
        return subject;
      }
      // Issue 252
      var typeParametersPointer = parentClass[TypeParametersSymbol];

      if (typeParametersPointer) {
        var typeParameters = subject[typeParametersPointer];
        var keys = Object.keys(typeParameters);

        for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          typeInstances[_key2 - 1] = arguments[_key2];
        }

        var length = Math.min(keys.length, typeInstances.length);
        for (var i = 0; i < length; i++) {
          var typeParam = typeParameters[keys[i]];
          typeParam.bound = typeInstances[i];
        }
      }
      return subject;
    }
  }, {
    key: 'module',
    value: function module(name, body) {
      var target = new ModuleDeclaration(this);
      target.name = name;
      var innerContext = this.createContext();
      // Issue 252
      innerContext[ParentSymbol] = this;
      // Issue 252
      innerContext[CurrentModuleSymbol] = target;

      target.innerContext = innerContext;
      body(innerContext);
      return target;
    }
  }, {
    key: 'moduleExports',
    value: function moduleExports(type) {
      var currentModule = this[CurrentModuleSymbol];
      if (!currentModule) {
        throw new Error('Cannot declare module.exports outside of a module.');
      }
      var target = new ModuleExports(this);
      target.type = type;
      currentModule.moduleExports = target;
      return target;
    }
  }, {
    key: 'var',
    value: function _var(name, type) {
      var target = new VarDeclaration(this);
      target.name = name;
      target.type = type;
      return target;
    }
  }, {
    key: 'class',
    value: function _class(name, head) {
      if (typeof head === 'function') {
        var _target3 = new ParameterizedClassDeclaration(this);
        _target3.name = name;
        _target3.bodyCreator = head;
        return _target3;
      }
      var target = new ClassDeclaration(this);
      target.name = name;

      for (var _len3 = arguments.length, tail = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        tail[_key3 - 2] = arguments[_key3];
      }

      if (head != null) {
        tail.unshift(head);
      }
      var length = tail.length;

      var properties = [];
      var body = void 0;

      for (var i = 0; i < length; i++) {
        var item = tail[i];
        if (item instanceof ObjectTypeProperty || item instanceof ObjectTypeIndexer) {
          properties.push(item);
        } else if (item instanceof ObjectType) {
          invariant(!body, 'Class body must only be declared once.');
          body = item;
        } else if (item instanceof ExtendsDeclaration) {
          invariant(!target.superClass, 'Classes can only have one super class.');
          target.superClass = item;
        } else if (item != null && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !(item instanceof Type)) {
          for (var propertyName in item) {
            // eslint-disable-line
            properties.push(this.property(propertyName, item[propertyName]));
          }
        } else {
          throw new Error('ClassDeclaration cannot contain the given type directly.');
        }
      }
      if (!body) {
        body = new ObjectType(this);
      }
      if (properties.length) {
        var _body$properties;

        (_body$properties = body.properties).push.apply(_body$properties, properties);
      }
      target.body = body;
      return target;
    }
  }, {
    key: 'extends',
    value: function _extends(subject) {
      var target = new ExtendsDeclaration(this);

      for (var _len4 = arguments.length, typeInstances = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        typeInstances[_key4 - 1] = arguments[_key4];
      }

      target.type = this.ref.apply(this, [subject].concat(toConsumableArray(typeInstances)));
      return target;
    }
  }, {
    key: 'fn',
    value: function fn(head) {
      for (var _len5 = arguments.length, tail = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        tail[_key5 - 1] = arguments[_key5];
      }

      return this.function.apply(this, [head].concat(tail));
    }
  }, {
    key: 'function',
    value: function _function(head) {
      if (typeof head === 'function') {
        var _target4 = new ParameterizedFunctionType(this);
        _target4.bodyCreator = head;
        return _target4;
      }
      var target = new FunctionType(this);
      if (head != null) {
        for (var _len6 = arguments.length, tail = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          tail[_key6 - 1] = arguments[_key6];
        }

        tail.unshift(head);
        var length = tail.length;

        for (var i = 0; i < length; i++) {
          var item = tail[i];
          if (item instanceof FunctionTypeParam) {
            target.params.push(item);
          } else if (item instanceof FunctionTypeRestParam) {
            target.rest = item;
          } else if (item instanceof FunctionTypeReturn) {
            target.returnType = item;
          } else {
            throw new Error('FunctionType cannot contain the given type directly.');
          }
        }
      }
      if (!target.returnType) {
        target.returnType = this.any();
      }
      return target;
    }
  }, {
    key: 'param',
    value: function param(name, type) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var target = new FunctionTypeParam(this);
      target.name = name;
      target.type = type;
      target.optional = optional;
      return target;
    }
  }, {
    key: 'rest',
    value: function rest(name, type) {
      var target = new FunctionTypeRestParam(this);
      target.name = name;
      target.type = type;
      return target;
    }
  }, {
    key: 'return',
    value: function _return(type) {
      var target = new FunctionTypeReturn(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'generator',
    value: function generator(yieldType, returnType, nextType) {
      var target = new GeneratorType(this);
      target.yieldType = yieldType;
      target.returnType = returnType || this.any();
      target.nextType = nextType || this.any();
      return target;
    }
  }, {
    key: 'object',
    value: function object(head) {
      var target = new ObjectType(this);
      if (head != null && (typeof head === 'undefined' ? 'undefined' : _typeof(head)) === 'object' && !(head instanceof Type)) {
        for (var propertyName in head) {
          // eslint-disable-line
          target.properties.push(this.property(propertyName, head[propertyName]));
        }
      } else {
        var body = void 0;

        for (var _len7 = arguments.length, tail = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          tail[_key7 - 1] = arguments[_key7];
        }

        if (head) {
          body = [head].concat(toConsumableArray(tail));
        } else {
          body = tail;
        }
        var _body = body,
            length = _body.length;

        for (var i = 0; i < length; i++) {
          var item = body[i];
          if (item instanceof ObjectTypeProperty) {
            target.properties.push(item);
          } else if (item instanceof ObjectTypeIndexer) {
            target.indexers.push(item);
          } else if (item instanceof ObjectTypeCallProperty) {
            target.callProperties.push(item);
          } else {
            throw new Error('ObjectType cannot contain the given type directly.');
          }
        }
      }
      return target;
    }
  }, {
    key: 'exactObject',
    value: function exactObject(head) {
      for (var _len8 = arguments.length, tail = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        tail[_key8 - 1] = arguments[_key8];
      }

      var object = this.object.apply(this, [head].concat(toConsumableArray(tail)));
      object.exact = true;
      return object;
    }
  }, {
    key: 'callProperty',
    value: function callProperty(value) {
      var target = new ObjectTypeCallProperty(this);
      target.value = value;
      return target;
    }
  }, {
    key: 'property',
    value: function property(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var target = new ObjectTypeProperty(this);
      target.key = key;
      if (value instanceof Type) {
        target.value = value;
      } else {
        target.value = this.object(value);
      }
      target.optional = optional;
      return target;
    }
  }, {
    key: 'indexer',
    value: function indexer(id, key, value) {
      var target = new ObjectTypeIndexer(this);
      target.id = id;
      target.key = key;
      target.value = value;
      return target;
    }
  }, {
    key: 'method',
    value: function method(name, head) {
      var target = new ObjectTypeProperty(this);
      target.key = name;

      for (var _len9 = arguments.length, tail = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
        tail[_key9 - 2] = arguments[_key9];
      }

      target.value = this.function.apply(this, [head].concat(tail));
      return target;
    }
  }, {
    key: 'staticCallProperty',
    value: function staticCallProperty(value) {
      var prop = this.callProperty(value);
      prop.static = true;
      return prop;
    }
  }, {
    key: 'staticProperty',
    value: function staticProperty(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var prop = this.property(key, value, optional);
      prop.static = true;
      return prop;
    }
  }, {
    key: 'staticMethod',
    value: function staticMethod(name, head) {
      for (var _len10 = arguments.length, tail = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
        tail[_key10 - 2] = arguments[_key10];
      }

      var prop = this.method.apply(this, [name, head].concat(tail));
      prop.static = true;
      return prop;
    }
  }, {
    key: 'spread',
    value: function spread() {
      var target = new ObjectType(this);

      for (var _len11 = arguments.length, types = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        types[_key11] = arguments[_key11];
      }

      for (var i = 0; i < types.length; i++) {
        var type = types[i].unwrap();
        if (Array.isArray(type.callProperties)) {
          var _target$callPropertie;

          (_target$callPropertie = target.callProperties).push.apply(_target$callPropertie, toConsumableArray(type.callProperties));
        }
        if (Array.isArray(type.indexers)) {
          var _target$indexers;

          (_target$indexers = target.indexers).push.apply(_target$indexers, toConsumableArray(type.indexers));
        }
        if (Array.isArray(type.properties)) {
          for (var j = 0; j < type.properties.length; j++) {
            var prop = type.properties[j];
            invariant(prop instanceof ObjectTypeProperty);
            target.setProperty(prop.key, prop.value, prop.optional);
          }
        }
      }
      return target;
    }
  }, {
    key: 'tuple',
    value: function tuple() {
      var target = new TupleType(this);

      for (var _len12 = arguments.length, types = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        types[_key12] = arguments[_key12];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'array',
    value: function array(elementType) {
      var target = new ArrayType(this);
      target.elementType = elementType || this.any();
      return target;
    }
  }, {
    key: 'union',
    value: function union() {
      for (var _len13 = arguments.length, types = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        types[_key13] = arguments[_key13];
      }

      return makeUnion(this, types);
    }
  }, {
    key: 'intersect',
    value: function intersect() {
      var target = new IntersectionType(this);

      for (var _len14 = arguments.length, types = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        types[_key14] = arguments[_key14];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'intersection',
    value: function intersection() {
      return this.intersect.apply(this, arguments);
    }
  }, {
    key: 'box',
    value: function box(reveal) {
      var box = new TypeBox(this);
      box.reveal = reveal;
      return box;
    }
  }, {
    key: 'tdz',
    value: function tdz(reveal, name) {
      var tdz = new TypeTDZ(this);
      tdz.reveal = reveal;
      tdz.name = name;
      return tdz;
    }
  }, {
    key: 'ref',
    value: function ref(subject) {
      var target = void 0;
      if (typeof subject === 'string') {
        // try and eagerly resolve the reference
        target = this.get(subject);
        if (!target) {
          // defer dereferencing for now
          target = new TypeReference(this);
          target.name = subject;
        }
      } else if (typeof subject === 'function') {
        // Issue 252
        var handlerRegistry = this[TypeConstructorRegistrySymbol];

        // see if we have a dedicated TypeConstructor for this.
        target = handlerRegistry.get(subject);

        if (!target) {
          // just use a generic type handler.
          target = new GenericType(this);
          target.impl = subject;
          target.name = subject.name;
        }
      } else if (subject instanceof Type) {
        target = subject;
      } else {
        if (subject == null || (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) !== 'object') {
          this.emitWarningMessage('Could not reference the given type, try t.typeOf(value) instead. (got ' + String(subject) + ')');
        } else if (!warnedInvalidReferences.has(subject)) {
          this.emitWarningMessage('Could not reference the given type, try t.typeOf(value) instead.');
          warnedInvalidReferences.add(subject);
        }
        return this.any();
      }

      for (var _len15 = arguments.length, typeInstances = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        typeInstances[_key15 - 1] = arguments[_key15];
      }

      if (typeInstances.length) {
        var _target5;

        invariant(typeof target.apply === 'function', 'Cannot apply non-applicable type: ' + target.typeName + '.');
        return (_target5 = target).apply.apply(_target5, toConsumableArray(typeInstances));
      } else {
        return target;
      }
    }
  }, {
    key: 'validate',
    value: function validate(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      var validation = new Validation(this, input);
      if (path) {
        var _validation$path;

        (_validation$path = validation.path).push.apply(_validation$path, toConsumableArray(path));
      } else if (typeof type.name === 'string') {
        validation.path.push(type.name);
      }
      validation.prefix = prefix;
      validation.errors = Array.from(type.errors(validation, [], input));
      return validation;
    }
  }, {
    key: 'check',
    value: function check(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      if (this.mode === 'assert') {
        return this.assert(type, input, prefix, path);
      } else {
        return this.warn(type, input, prefix, path);
      }
    }
  }, {
    key: 'assert',
    value: function assert(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      var validation = this.validate(type, input, prefix, path);
      var error = this.makeTypeError(validation);
      if (error) {
        throw error;
      }
      return input;
    }
  }, {
    key: 'warn',
    value: function warn(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      var validation = this.validate(type, input, prefix, path);
      var message = makeWarningMessage(validation);
      if (typeof message === 'string') {
        this.emitWarningMessage(message);
      }
      return input;
    }

    /**
     * Emits a warning message, using `console.warn()` by default.
     */

  }, {
    key: 'emitWarningMessage',
    value: function emitWarningMessage(message) {
      console.warn('flow-runtime:', message);
    }
  }, {
    key: 'propTypes',
    value: function propTypes(type) {
      return makeReactPropTypes(type.unwrap());
    }
  }, {
    key: 'match',
    value: function match() {
      for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      var clauses = args.pop();
      if (!Array.isArray(clauses)) {
        throw new Error('Invalid pattern, last argument must be an array.');
      }
      var pattern = this.pattern.apply(this, toConsumableArray(clauses));
      return pattern.apply(undefined, args);
    }
  }, {
    key: 'pattern',
    value: function pattern() {
      for (var _len17 = arguments.length, clauses = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        clauses[_key17] = arguments[_key17];
      }

      var length = clauses.length;

      var tests = new Array(length);
      for (var i = 0; i < length; i++) {
        var clause = clauses[i];
        var annotation = this.getAnnotation(clause);
        if (!annotation) {
          if (i !== length - 1) {
            throw new Error('Invalid Pattern - found unannotated function in position ' + i + ', default clauses must be last.');
          }
          tests[i] = true;
        } else {
          invariant(annotation instanceof FunctionType || annotation instanceof ParameterizedFunctionType, 'Pattern clauses must be annotated functions.');
          tests[i] = annotation;
        }
      }
      return function () {
        for (var _i = 0; _i < tests.length; _i++) {
          var test = tests[_i];
          var _clause = clauses[_i];
          if (test === true) {
            return _clause.apply(undefined, arguments);
          } else if (test.acceptsParams.apply(test, arguments)) {
            return _clause.apply(undefined, arguments);
          }
        }
        var error = new TypeError('Value did not match any of the candidates.');
        error.name = 'RuntimeTypeError';
        throw error;
      };
    }
  }, {
    key: 'wrapIterator',
    value: function wrapIterator(type) {
      var t = this;
      return (/*#__PURE__*/_regeneratorRuntime.mark(function wrappedIterator(input) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

          return _regeneratorRuntime.wrap(function wrappedIterator$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context3.prev = 3;
                  _iterator = input[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context3.next = 12;
                    break;
                  }

                  item = _step.value;
                  _context3.next = 9;
                  return t.check(type, item);

                case 9:
                  _iteratorNormalCompletion = true;
                  _context3.next = 5;
                  break;

                case 12:
                  _context3.next = 18;
                  break;

                case 14:
                  _context3.prev = 14;
                  _context3.t0 = _context3['catch'](3);
                  _didIteratorError = true;
                  _iteratorError = _context3.t0;

                case 18:
                  _context3.prev = 18;
                  _context3.prev = 19;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 21:
                  _context3.prev = 21;

                  if (!_didIteratorError) {
                    _context3.next = 24;
                    break;
                  }

                  throw _iteratorError;

                case 24:
                  return _context3.finish(21);

                case 25:
                  return _context3.finish(18);

                case 26:
                case 'end':
                  return _context3.stop();
              }
            }
          }, wrappedIterator, this, [[3, 14, 18, 26], [19,, 21, 25]]);
        })
      );
    }
  }, {
    key: 'refinement',
    value: function refinement(type) {
      var target = new RefinementType(this);
      target.type = type;

      for (var _len18 = arguments.length, constraints = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
        constraints[_key18 - 1] = arguments[_key18];
      }

      target.addConstraint.apply(target, toConsumableArray(constraints));
      return target;
    }
  }, {
    key: '$exact',
    value: function $exact(type) {
      var target = new ObjectType(this);
      type = type.unwrap();
      if (Array.isArray(type.callProperties)) {
        var _target$callPropertie2;

        (_target$callPropertie2 = target.callProperties).push.apply(_target$callPropertie2, toConsumableArray(type.callProperties));
      }
      if (Array.isArray(type.indexers)) {
        var _target$indexers2;

        (_target$indexers2 = target.indexers).push.apply(_target$indexers2, toConsumableArray(type.indexers));
      }
      if (Array.isArray(type.properties)) {
        var _target$properties;

        (_target$properties = target.properties).push.apply(_target$properties, toConsumableArray(type.properties));
      }
      target.exact = true;
      return target;
    }
  }, {
    key: '$diff',
    value: function $diff(aType, bType) {
      var target = new $DiffType(this);
      target.aType = aType;
      target.bType = bType;
      return target;
    }
  }, {
    key: '$flowFixMe',
    value: function $flowFixMe() {
      return new $FlowFixMeType(this);
    }
  }, {
    key: '$keys',
    value: function $keys(type) {
      var target = new $KeysType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$objMap',
    value: function $objMap(object, mapper) {
      var target = new $ObjMapType(this);
      target.object = object;
      target.mapper = mapper;
      return target;
    }
  }, {
    key: '$objMapi',
    value: function $objMapi(object, mapper) {
      var target = new $ObjMapiType(this);
      target.object = object;
      target.mapper = mapper;
      return target;
    }
  }, {
    key: '$propertyType',
    value: function $propertyType(object, property) {
      var target = new $PropertyType(this);
      target.object = object;
      if (property instanceof Type) {
        var unwrapped = property.unwrap();
        target.property = unwrapped.value;
      } else {
        target.property = property;
      }
      return target;
    }
  }, {
    key: '$shape',
    value: function $shape(type) {
      var target = new $ShapeType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$subtype',
    value: function $subtype(type) {
      var target = new $SubType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$supertype',
    value: function $supertype(type) {
      var target = new $SuperType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$tupleMap',
    value: function $tupleMap(tuple, mapper) {
      var target = new $TupleMapType(this);
      target.tuple = tuple;
      target.mapper = mapper;
      return target;
    }
  }, {
    key: '$values',
    value: function $values(type) {
      var target = new $ValuesType(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'Class',
    value: function Class(instanceType) {
      var target = new ClassType(this);
      target.instanceType = instanceType;
      return target;
    }
  }, {
    key: 'TypeParametersSymbol',


    // Issue 252
    get: function get$$1() {
      return TypeParametersSymbol;
    }
  }]);
  return TypeContext;
}();

var globalContext$1 = void 0;
if (typeof commonjsGlobal !== 'undefined' && typeof commonjsGlobal.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__ !== 'undefined') {
  globalContext$1 = commonjsGlobal.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__;
} else {
  globalContext$1 = new TypeContext();
  registerPrimitiveTypes(globalContext$1);
  registerBuiltinTypeConstructors(globalContext$1);
  registerTypePredicates(globalContext$1);
  if (typeof commonjsGlobal !== 'undefined') {
    commonjsGlobal.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__ = globalContext$1;
  }
}

var globalContext$2 = globalContext$1;

function v(thing) {
  return { value: thing };
}

if (typeof commonjsGlobal !== 'undefined' && commonjsGlobal.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__ !== globalContext$2) {
  Object.defineProperties(globalContext$2, {
    TypeContext: v(TypeContext),
    Type: v(Type),
    TypeBox: v(TypeBox),
    TypeParameter: v(TypeParameter),
    TypeReference: v(TypeReference),
    TypeTDZ: v(TypeTDZ),
    ParameterizedTypeAlias: v(ParameterizedTypeAlias),
    TypeAlias: v(TypeAlias),
    TypeConstructor: v(TypeConstructor),
    GenericType: v(GenericType),
    NullLiteralType: v(NullLiteralType),
    NumberType: v(NumberType),
    NumericLiteralType: v(NumericLiteralType),
    BooleanType: v(BooleanType),
    BooleanLiteralType: v(BooleanLiteralType),
    SymbolType: v(SymbolType),
    SymbolLiteralType: v(SymbolLiteralType),
    StringType: v(StringType),
    StringLiteralType: v(StringLiteralType),
    ArrayType: v(ArrayType),
    ObjectType: v(ObjectType),
    ObjectTypeCallProperty: v(ObjectTypeCallProperty),
    ObjectTypeIndexer: v(ObjectTypeIndexer),
    ObjectTypeProperty: v(ObjectTypeProperty),
    FunctionType: v(FunctionType),
    FunctionTypeParam: v(FunctionTypeParam),
    FunctionTypeRestParam: v(FunctionTypeRestParam),
    FunctionTypeReturn: v(FunctionTypeReturn),
    ParameterizedFunctionType: v(ParameterizedFunctionType),
    PartialType: v(PartialType),
    RefinementType: v(RefinementType),
    TypeParameterApplication: v(TypeParameterApplication),
    GeneratorType: v(GeneratorType),
    ExistentialType: v(ExistentialType),
    FlowIntoType: v(FlowIntoType),
    AnyType: v(AnyType),
    MixedType: v(MixedType),
    EmptyType: v(EmptyType),
    NullableType: v(NullableType),
    ThisType: v(ThisType),
    TupleType: v(TupleType),
    UnionType: v(UnionType),
    IntersectionType: v(IntersectionType),
    VoidType: v(VoidType),
    Declaration: v(Declaration),
    VarDeclaration: v(VarDeclaration),
    TypeDeclaration: v(TypeDeclaration),
    ModuleDeclaration: v(ModuleDeclaration),
    ModuleExportsDeclaration: v(ModuleExports),
    ClassDeclaration: v(ClassDeclaration),
    ParameterizedClassDeclaration: v(ParameterizedClassDeclaration),
    ExtendsDeclaration: v(ExtendsDeclaration)
  });
}

return globalContext$2;

})));

});

// This file is part of leanes-queryable-addon.
//
// leanes-queryable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-queryable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-queryable-addon.  If not, see <https://www.gnu.org/licenses/>.
var QueryInterface = flowRuntime_umd.type("QueryInterface", function (QueryInterface) {
  return flowRuntime_umd.object(flowRuntime_umd.property("$forIn", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$join", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$let", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$filter", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$collect", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$into", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd.property("$having", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$sort", flowRuntime_umd.nullable(flowRuntime_umd.array())), flowRuntime_umd.property("$limit", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd.property("$offset", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd.property("$avg", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$sum", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$min", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$max", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$count", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd.property("$distinct", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd.property("$remove", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd.property("$patch", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$return", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd.property("forIn", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("join", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("filter", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("let", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("collect", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("into", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinition", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("having", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("sort", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("limit", flowRuntime_umd["function"](flowRuntime_umd.param("anValue", flowRuntime_umd.number()), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("offset", flowRuntime_umd["function"](flowRuntime_umd.param("anValue", flowRuntime_umd.number()), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("distinct", flowRuntime_umd["function"](flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("remove", flowRuntime_umd["function"](flowRuntime_umd.param("expr", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("patch", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("return", flowRuntime_umd["function"](flowRuntime_umd.param("aoDefinition", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("count", flowRuntime_umd["function"](flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("avg", flowRuntime_umd["function"](flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("min", flowRuntime_umd["function"](flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("max", flowRuntime_umd["function"](flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](QueryInterface))), flowRuntime_umd.property("sum", flowRuntime_umd["function"](flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](QueryInterface))));
});

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var QueryInterface$1 = flowRuntime_umd.tdz(function () {
  return QueryInterface;
});
var hasProp = {}.hasOwnProperty;
var Query = (function (Module) {
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _class3, _temp;

  var _Module$NS = Module.NS,
      CoreObject = _Module$NS.CoreObject,
      assert = _Module$NS.assert,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      nameBy = _Module$NS.nameBy,
      _ = _Module$NS.Utils._;
  var Query = (_dec = flowRuntime_umd.annotate(flowRuntime_umd["class"]("Query", flowRuntime_umd["extends"](CoreObject), flowRuntime_umd.staticProperty("__filename", flowRuntime_umd.any()), flowRuntime_umd.staticProperty("object", flowRuntime_umd.any()), flowRuntime_umd.property("$forIn", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$join", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$let", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$filter", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$collect", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$into", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd.property("$having", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$sort", flowRuntime_umd.nullable(flowRuntime_umd.array())), flowRuntime_umd.property("$limit", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd.property("$offset", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd.property("$avg", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$sum", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$min", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$max", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("$count", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd.property("$distinct", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd.property("$remove", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd.property("$patch", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("$return", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd.method("forIn", flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("join", flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("filter", flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("let", flowRuntime_umd.param("aoDefinitions", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("collect", flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("into", flowRuntime_umd.param("aoDefinition", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("having", flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("sort", flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("limit", flowRuntime_umd.param("anValue", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("offset", flowRuntime_umd.param("anValue", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("distinct", flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("remove", flowRuntime_umd.param("expr", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("patch", flowRuntime_umd.param("aoDefinition", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("return", flowRuntime_umd.param("aoDefinition", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("count", flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("avg", flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("min", flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("max", flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.method("sum", flowRuntime_umd.param("asDefinition", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.staticMethod("restoreObject", flowRuntime_umd.param("acModule", flowRuntime_umd.Class(flowRuntime_umd.existential())), flowRuntime_umd.param("replica", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1))), flowRuntime_umd.staticMethod("replicateObject", flowRuntime_umd.param("instance", flowRuntime_umd.ref(QueryInterface$1)), flowRuntime_umd["return"](flowRuntime_umd.ref("object"))), flowRuntime_umd.method("toJSON", flowRuntime_umd["return"](flowRuntime_umd.ref("object"))), flowRuntime_umd.method("constructor", flowRuntime_umd.param("aoQuery", flowRuntime_umd.nullable(flowRuntime_umd.ref("object")))))), _dec2 = partOf(Module), _dec3 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec4 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec5 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec6 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec7 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec8 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), _dec9 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec10 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.array())), _dec11 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.number())), _dec12 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.number())), _dec13 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.string())), _dec14 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.string())), _dec15 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.string())), _dec16 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.string())), _dec17 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), _dec18 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), _dec19 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), _dec20 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), _dec21 = flowRuntime_umd.decorate(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), _dec(_class = initialize(_class = _dec2(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_CoreObject) {
    inherits(Query, _CoreObject);

    var _super = _createSuper(Query);

    createClass(Query, [{
      key: "forIn",
      // TODO: это надо переделать на нормальную проверку типа в $filter - т.е. сделать спец flow тип
      // static operatorsMap: object = {
      //   $and: Array,
      //   $or: Array,
      //   $not: Object,
      //   $nor: Array, // not or # !(a||b) === !a && !b
      //
      //   // без вложенных условий и операторов - value конечное значение для сравнения
      //   $eq: AnyT, // ==
      //   $ne: AnyT, // !=
      //   $lt: AnyT, // <
      //   $lte: AnyT, // <=
      //   $gt: AnyT, // >
      //   $gte: AnyT, // >=
      //   $in: Array, // check value present in array
      //   $nin: Array, // ... not present in array
      //
      //   // field has array of values
      //   $all: Array, // contains some values
      //   $elemMatch: Object, // conditions for complex item
      //   $size: Number, // condition for array length
      //   $exists: Boolean, // condition for check present some value in field
      //   $type: String, // check value type
      //   $mod: Array, // [divisor, remainder] for example [4,0] делится ли на 4
      //   $regex: UnionG(RegExp, String), // value must be string. ckeck it by RegExp.
      //   $td: Boolean, // this day (today)
      //   $ld: Boolean, // last day (yesterday)
      //   $tw: Boolean, // this week
      //   $lw: Boolean, // last week
      //   $tm: Boolean, // this month
      //   $lm: Boolean, // last month
      //   $ty: Boolean, // this year
      //   $ly: Boolean // last year
      // }
      // '@doc.price'
      // '@doc.price'
      // '@doc.price'
      // '@doc.price'
      // yes or not present
      // yes or not present
      value: function forIn(aoDefinitions) {
        var _aoDefinitionsType = flowRuntime_umd.ref("object");

        var _returnType3 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinitions", _aoDefinitionsType).assert(aoDefinitions);

        for (var k in aoDefinitions) {
          if (!hasProp.call(aoDefinitions, k)) continue;
          var v = aoDefinitions[k];
          this.$forIn[k] = v;
        }

        return _returnType3.assert(this);
      }
    }, {
      key: "join",
      value: function join(aoDefinitions) {
        var _aoDefinitionsType2 = flowRuntime_umd.ref("object");

        var _returnType4 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinitions", _aoDefinitionsType2).assert(aoDefinitions);
        this.$join = aoDefinitions;
        return _returnType4.assert(this);
      }
    }, {
      key: "filter",
      value: function filter(aoDefinitions) {
        var _aoDefinitionsType3 = flowRuntime_umd.ref("object");

        var _returnType5 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinitions", _aoDefinitionsType3).assert(aoDefinitions);
        this.$filter = aoDefinitions;
        return _returnType5.assert(this);
      }
    }, {
      key: 'let',
      value: function _let(aoDefinitions) {
        var _aoDefinitionsType4 = flowRuntime_umd.ref("object");

        var _returnType6 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinitions", _aoDefinitionsType4).assert(aoDefinitions);

        if (this.$let == null) {
          this.$let = {};
        }

        for (var k in aoDefinitions) {
          if (!hasProp.call(aoDefinitions, k)) continue;
          var v = aoDefinitions[k];
          this.$let[k] = v;
        }

        return _returnType6.assert(this);
      }
    }, {
      key: "collect",
      value: function collect(aoDefinition) {
        var _aoDefinitionType = flowRuntime_umd.ref("object");

        var _returnType7 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinition", _aoDefinitionType).assert(aoDefinition);
        this.$collect = aoDefinition;
        return _returnType7.assert(this);
      }
    }, {
      key: "into",
      value: function into(aoDefinition) {
        var _aoDefinitionType2 = flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object"));

        var _returnType8 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinition", _aoDefinitionType2).assert(aoDefinition);
        this.$into = aoDefinition;
        return _returnType8.assert(this);
      }
    }, {
      key: "having",
      value: function having(aoDefinition) {
        var _aoDefinitionType3 = flowRuntime_umd.ref("object");

        var _returnType9 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinition", _aoDefinitionType3).assert(aoDefinition);
        this.$having = aoDefinition;
        return _returnType9.assert(this);
      }
    }, {
      key: "sort",
      value: function sort(aoDefinition) {
        var _aoDefinitionType4 = flowRuntime_umd.ref("object");

        var _returnType10 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinition", _aoDefinitionType4).assert(aoDefinition);

        if (this.$sort == null) {
          this.$sort = [];
        }

        this.$sort.push(aoDefinition);
        return _returnType10.assert(this);
      }
    }, {
      key: "limit",
      value: function limit(anValue) {
        var _anValueType = flowRuntime_umd.number();

        var _returnType11 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("anValue", _anValueType).assert(anValue);
        this.$limit = anValue;
        return _returnType11.assert(this);
      }
    }, {
      key: "offset",
      value: function offset(anValue) {
        var _anValueType2 = flowRuntime_umd.number();

        var _returnType12 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("anValue", _anValueType2).assert(anValue);
        this.$offset = anValue;
        return _returnType12.assert(this);
      }
    }, {
      key: "distinct",
      value: function distinct() {
        var _returnType13 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        this.$distinct = true;
        return _returnType13.assert(this);
      }
    }, {
      key: "remove",
      value: function remove() {
        var expr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

        var _exprType = flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")));

        var _returnType14 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("expr", _exprType).assert(expr);
        this.$remove = expr;
        return _returnType14.assert(this);
      }
    }, {
      key: "patch",
      value: function patch(aoDefinition) {
        var _aoDefinitionType5 = flowRuntime_umd.ref("object");

        var _returnType15 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinition", _aoDefinitionType5).assert(aoDefinition);
        this.$patch = aoDefinition;
        return _returnType15.assert(this);
      }
    }, {
      key: 'return',
      value: function _return(aoDefinition) {
        var _aoDefinitionType6 = flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object"));

        var _returnType16 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("aoDefinition", _aoDefinitionType6).assert(aoDefinition);
        this.$return = aoDefinition;
        return _returnType16.assert(this);
      }
    }, {
      key: "count",
      value: function count() {
        var _returnType17 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        this.$count = true;
        return _returnType17.assert(this);
      }
    }, {
      key: "avg",
      value: function avg(asDefinition) {
        var _asDefinitionType = flowRuntime_umd.string();

        var _returnType18 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("asDefinition", _asDefinitionType).assert(asDefinition);
        this.$avg = asDefinition;
        return _returnType18.assert(this);
      }
    }, {
      key: "min",
      value: function min(asDefinition) {
        var _asDefinitionType2 = flowRuntime_umd.string();

        var _returnType19 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("asDefinition", _asDefinitionType2).assert(asDefinition);
        this.$min = asDefinition;
        return _returnType19.assert(this);
      }
    }, {
      key: "max",
      value: function max(asDefinition) {
        var _asDefinitionType3 = flowRuntime_umd.string();

        var _returnType20 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("asDefinition", _asDefinitionType3).assert(asDefinition);
        this.$max = asDefinition;
        return _returnType20.assert(this);
      }
    }, {
      key: "sum",
      value: function sum(asDefinition) {
        var _asDefinitionType4 = flowRuntime_umd.string();

        var _returnType21 = flowRuntime_umd["return"](flowRuntime_umd.ref(QueryInterface$1));

        flowRuntime_umd.param("asDefinition", _asDefinitionType4).assert(asDefinition);
        this.$sum = asDefinition;
        return _returnType21.assert(this);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var _returnType22 = flowRuntime_umd["return"](flowRuntime_umd.ref("object"));

        var res = {};

        for (var _i = 0, _arr = ['$forIn', '$join', '$let', '$filter', '$collect', '$into', '$having', '$sort', '$limit', '$offset', '$avg', '$sum', '$min', '$max', '$count', '$distinct', '$remove', '$patch', '$return']; _i < _arr.length; _i++) {
          var k = _arr[_i];

          if (this[k] != null) {
            res[k] = this[k];
          }
        }

        return _returnType22.assert(res);
      }
    }], [{
      key: "restoreObject",
      value: function () {
        var _restoreObject = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(acModule, replica) {
          var _acModuleType, _replicaType, _returnType;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _acModuleType = flowRuntime_umd.Class(flowRuntime_umd.existential());
                  _replicaType = flowRuntime_umd.ref("object");
                  _returnType = flowRuntime_umd["return"](flowRuntime_umd.mixed());
                  flowRuntime_umd.param("acModule", _acModuleType).assert(acModule);
                  flowRuntime_umd.param("replica", _replicaType).assert(replica);

                  if (!((replica != null ? replica["class"] : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance')) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", _returnType.assert(this["new"](replica.query)));

                case 9:
                  _context.t0 = _returnType;
                  _context.next = 12;
                  return get(getPrototypeOf(Query), "restoreObject", this).call(this, acModule, replica);

                case 12:
                  _context.t1 = _context.sent;
                  return _context.abrupt("return", _context.t0.assert.call(_context.t0, _context.t1));

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function restoreObject(_x, _x2) {
          return _restoreObject.apply(this, arguments);
        }

        return restoreObject;
      }()
    }, {
      key: "replicateObject",
      value: function () {
        var _replicateObject = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(instance) {
          var _instanceType, _returnType2, replica;

          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _instanceType = flowRuntime_umd.ref(QueryInterface$1);
                  _returnType2 = flowRuntime_umd["return"](flowRuntime_umd.mixed());
                  flowRuntime_umd.param("instance", _instanceType).assert(instance);
                  _context2.next = 5;
                  return get(getPrototypeOf(Query), "replicateObject", this).call(this, instance);

                case 5:
                  replica = _context2.sent;
                  replica.query = instance.toJSON();
                  return _context2.abrupt("return", _returnType2.assert(replica));

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function replicateObject(_x3) {
          return _replicateObject.apply(this, arguments);
        }

        return replicateObject;
      }()
    }]);

    function Query(aoQuery) {
      var _this;

      classCallCheck(this, Query);

      var _aoQueryType = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

      flowRuntime_umd.param("aoQuery", _aoQueryType).assert(aoQuery);
      _this = _super.apply(this, arguments);

      initializerDefineProperty(_this, "$forIn", _descriptor, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$join", _descriptor2, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$let", _descriptor3, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$filter", _descriptor4, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$collect", _descriptor5, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$into", _descriptor6, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$having", _descriptor7, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$sort", _descriptor8, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$limit", _descriptor9, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$offset", _descriptor10, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$avg", _descriptor11, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$sum", _descriptor12, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$min", _descriptor13, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$max", _descriptor14, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$count", _descriptor15, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$distinct", _descriptor16, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$remove", _descriptor17, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$patch", _descriptor18, assertThisInitialized(_this));

      initializerDefineProperty(_this, "$return", _descriptor19, assertThisInitialized(_this));

      _this.$forIn = {};

      if (aoQuery != null) {
        for (var key in aoQuery) {
          if (!hasProp.call(aoQuery, key)) continue;
          var value = aoQuery[key];
          _this[key] = value;
        }
      }

      flowRuntime_umd.ref(QueryInterface$1).assert(assertThisInitialized(_this));
      return _this;
    }

    return Query;
  }(CoreObject), _class3.__filename = __filename$1, _class3.object = {}, _temp), (applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2), _descriptor = applyDecoratedDescriptor(_class2.prototype, "$forIn", [_dec3, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor2 = applyDecoratedDescriptor(_class2.prototype, "$join", [_dec4, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor3 = applyDecoratedDescriptor(_class2.prototype, "$let", [_dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor4 = applyDecoratedDescriptor(_class2.prototype, "$filter", [_dec6, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor5 = applyDecoratedDescriptor(_class2.prototype, "$collect", [_dec7, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor6 = applyDecoratedDescriptor(_class2.prototype, "$into", [_dec8, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor7 = applyDecoratedDescriptor(_class2.prototype, "$having", [_dec9, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor8 = applyDecoratedDescriptor(_class2.prototype, "$sort", [_dec10, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor9 = applyDecoratedDescriptor(_class2.prototype, "$limit", [_dec11, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor10 = applyDecoratedDescriptor(_class2.prototype, "$offset", [_dec12, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor11 = applyDecoratedDescriptor(_class2.prototype, "$avg", [_dec13, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor12 = applyDecoratedDescriptor(_class2.prototype, "$sum", [_dec14, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor13 = applyDecoratedDescriptor(_class2.prototype, "$min", [_dec15, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor14 = applyDecoratedDescriptor(_class2.prototype, "$max", [_dec16, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor15 = applyDecoratedDescriptor(_class2.prototype, "$count", [_dec17, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor16 = applyDecoratedDescriptor(_class2.prototype, "$distinct", [_dec18, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor17 = applyDecoratedDescriptor(_class2.prototype, "$remove", [_dec19, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor18 = applyDecoratedDescriptor(_class2.prototype, "$patch", [_dec20, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor19 = applyDecoratedDescriptor(_class2.prototype, "$return", [_dec21, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), applyDecoratedDescriptor(_class2.prototype, "forIn", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "forIn"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "join", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "join"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "filter", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "filter"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, 'let', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'let'), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "collect", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "collect"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "into", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "into"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "having", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "having"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "sort", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "sort"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "limit", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "limit"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "offset", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "distinct", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "distinct"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "remove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "remove"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "patch", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "patch"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, 'return', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'return'), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "count", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "count"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "avg", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "avg"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "min", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "min"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "max", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "max"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "sum", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "sum"), _class2.prototype), applyDecoratedDescriptor(_class2, "restoreObject", [method], Object.getOwnPropertyDescriptor(_class2, "restoreObject"), _class2), applyDecoratedDescriptor(_class2, "replicateObject", [method], Object.getOwnPropertyDescriptor(_class2, "replicateObject"), _class2), applyDecoratedDescriptor(_class2.prototype, "toJSON", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "toJSON"), _class2.prototype)), _class2)) || _class) || _class) || _class);
});

var __filename$2 = '/mixins/GenerateAutoincrementIdMixin.js';

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
// This file is part of leanes-mapper-addon.
//
// leanes-mapper-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-mapper-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-mapper-addon.  If not, see <https://www.gnu.org/licenses/>.
var GenerateAutoincrementIdMixin = (function (Module) {
  var _Module$NS = Module.NS,
      Query = _Module$NS.Query,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      method = _Module$NS.method;
  Module.defineMixin(__filename$2, function (BaseClass) {
    var _dec, _class, _class2, _init, _class3, _temp;

    var Mixin = (_dec = flowRuntime_umd.annotate(flowRuntime_umd["class"]("Mixin", flowRuntime_umd["extends"](BaseClass), flowRuntime_umd.staticProperty("object", flowRuntime_umd.any()), flowRuntime_umd.method("generateId", flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.number()))))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      inherits(Mixin, _BaseClass);

      var _super = _createSuper$1(Mixin);

      function Mixin() {
        classCallCheck(this, Mixin);

        return _super.apply(this, arguments);
      }

      createClass(Mixin, [{
        key: "generateId",
        value: function () {
          var _generateId = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
            var _returnType, voQuery, maxId;

            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _returnType = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.ref("Promise", flowRuntime_umd.number())));
                    voQuery = Query["new"]().forIn({
                      '@doc': this.collectionFullName()
                    }).max('@doc.id');
                    _context.next = 4;
                    return this.query(voQuery);

                  case 4:
                    _context.next = 6;
                    return _context.sent.first();

                  case 6:
                    maxId = _context.sent;
                    maxId = maxId || 0;
                    return _context.abrupt("return", _returnType.assert(++maxId));

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function generateId() {
            return _generateId.apply(this, arguments);
          }

          return generateId;
        }()
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), applyDecoratedDescriptor(_class2.prototype, "generateId", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "generateId"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$3 = '/mixins/QueryableCollectionMixin.js';

// This file is part of leanes-mapper-addon.
//
// leanes-mapper-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-mapper-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-mapper-addon.  If not, see <https://www.gnu.org/licenses/>.
// import type { CollectionInterface } from './CollectionInterface';
var CursorInterface = flowRuntime_umd.type("CursorInterface", function (CursorInterface) {
  var Collection = CursorInterface.typeParameter("Collection"),
      Delegate = CursorInterface.typeParameter("Delegate"),
      Iterable = CursorInterface.typeParameter("Iterable", undefined, flowRuntime_umd.array(flowRuntime_umd.nullable(Delegate)));
  return flowRuntime_umd.object(flowRuntime_umd.property("isClosed", flowRuntime_umd["boolean"]()), flowRuntime_umd.property("setCollection", flowRuntime_umd["function"](flowRuntime_umd.param("aoCollection", Collection), flowRuntime_umd["return"](CursorInterface))), flowRuntime_umd.property("setIterable", flowRuntime_umd["function"](flowRuntime_umd.param("alArray", Iterable), flowRuntime_umd["return"](CursorInterface))), flowRuntime_umd.property("toArray", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(flowRuntime_umd.nullable(Delegate)))))), flowRuntime_umd.property("next", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.nullable(Delegate))))), flowRuntime_umd.property("hasNext", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())))), flowRuntime_umd.property("close", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("count", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.number())))), flowRuntime_umd.property("forEach", flowRuntime_umd["function"](flowRuntime_umd.param("lambda", flowRuntime_umd["function"](flowRuntime_umd.param("_arg0", Delegate), flowRuntime_umd.param("_arg1", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.nullable(flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]()))))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("map", flowRuntime_umd["function"](function (_fn) {
    var R = _fn.typeParameter("R");

    return [flowRuntime_umd.param("lambda", flowRuntime_umd["function"](flowRuntime_umd.param("_arg0", Delegate), flowRuntime_umd.param("_arg1", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.union(R, flowRuntime_umd.ref("Promise", R))))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(R)))];
  })), flowRuntime_umd.property("filter", flowRuntime_umd["function"](flowRuntime_umd.param("lambda", flowRuntime_umd["function"](flowRuntime_umd.param("_arg0", Delegate), flowRuntime_umd.param("_arg1", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["boolean"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]()))))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(flowRuntime_umd.nullable(Delegate)))))), flowRuntime_umd.property("find", flowRuntime_umd["function"](flowRuntime_umd.param("lambda", flowRuntime_umd["function"](flowRuntime_umd.param("_arg0", Delegate), flowRuntime_umd.param("_arg1", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["boolean"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]()))))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.nullable(Delegate))))), flowRuntime_umd.property("compact", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(flowRuntime_umd.nullable(Delegate)))))), flowRuntime_umd.property("reduce", flowRuntime_umd["function"](function (_fn2) {
    var I = _fn2.typeParameter("I");

    return [flowRuntime_umd.param("lambda", flowRuntime_umd["function"](flowRuntime_umd.param("_arg0", I), flowRuntime_umd.param("_arg1", Delegate), flowRuntime_umd.param("_arg2", flowRuntime_umd.number()), flowRuntime_umd["return"](flowRuntime_umd.union(I, flowRuntime_umd.ref("Promise", I))))), flowRuntime_umd.param("initialValue", I), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", I))];
  })), flowRuntime_umd.property("first", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.nullable(Delegate))))));
});

// This file is part of leanes-mapper-addon.
var CursorInterface$1 = flowRuntime_umd.tdz(function () {
  return CursorInterface;
});
var CollectionInterface = flowRuntime_umd.type("CollectionInterface", function (CollectionInterface) {
  var T = CollectionInterface.typeParameter("T");
  return flowRuntime_umd.object(flowRuntime_umd.property("collectionName", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.string()))), flowRuntime_umd.property("collectionPrefix", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.string()))), flowRuntime_umd.property("collectionFullName", flowRuntime_umd["function"](flowRuntime_umd.param("asName", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd["return"](flowRuntime_umd.string()))), flowRuntime_umd.property("recordHasBeenChanged", flowRuntime_umd["function"](flowRuntime_umd.param("asType", flowRuntime_umd.string()), flowRuntime_umd.param("aoData", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("generateId", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number()))))), flowRuntime_umd.property("build", flowRuntime_umd["function"](flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("create", flowRuntime_umd["function"](flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("push", flowRuntime_umd["function"](flowRuntime_umd.param("aoRecord", T), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("delete", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("destroy", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("remove", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("find", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.nullable(T))))), flowRuntime_umd.property("findMany", flowRuntime_umd["function"](flowRuntime_umd.param("ids", flowRuntime_umd.array(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number()))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$1, flowRuntime_umd.ref(CollectionInterface, T), T))))), flowRuntime_umd.property("take", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.nullable(T))))), flowRuntime_umd.property("takeMany", flowRuntime_umd["function"](flowRuntime_umd.param("ids", flowRuntime_umd.array(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number()))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$1, flowRuntime_umd.ref(CollectionInterface, T), T))))), flowRuntime_umd.property("takeAll", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$1, flowRuntime_umd.ref(CollectionInterface, T), T))))), flowRuntime_umd.property("update", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("override", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd.param("aoRecord", T), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("clone", flowRuntime_umd["function"](flowRuntime_umd.param("aoRecord", T), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("copy", flowRuntime_umd["function"](flowRuntime_umd.param("aoRecord", T), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", T)))), flowRuntime_umd.property("includes", flowRuntime_umd["function"](flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())))), flowRuntime_umd.property("length", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.number())))));
});

// This file is part of leanes-mapper-addon.
//
// leanes-mapper-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-mapper-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-mapper-addon.  If not, see <https://www.gnu.org/licenses/>.
// import type { CollectionInterface } from './CollectionInterface';
// import type { RecordStaticInterface } from './RecordStaticInterface';
var RecordInterface = flowRuntime_umd.type("RecordInterface", function (RecordInterface) {
  return flowRuntime_umd.object(flowRuntime_umd.property("parseRecordName", flowRuntime_umd["function"](flowRuntime_umd.param("asName", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.tuple(flowRuntime_umd.string(), flowRuntime_umd.string())))), flowRuntime_umd.property("findRecordByName", flowRuntime_umd["function"](flowRuntime_umd.param("asName", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.Class(flowRuntime_umd.existential())))), flowRuntime_umd.property("save", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("create", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("update", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("delete", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd["void"](), RecordInterface))))), flowRuntime_umd.property("destroy", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("attributes", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("object")))), flowRuntime_umd.property("clone", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("copy", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("decrement", flowRuntime_umd["function"](flowRuntime_umd.param("asAttribute", flowRuntime_umd.string()), flowRuntime_umd.param("step", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("increment", flowRuntime_umd["function"](flowRuntime_umd.param("asAttribute", flowRuntime_umd.string()), flowRuntime_umd.param("step", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("toggle", flowRuntime_umd["function"](flowRuntime_umd.param("asAttribute", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("updateAttribute", flowRuntime_umd["function"](flowRuntime_umd.param("name", flowRuntime_umd.string()), flowRuntime_umd.param("value", flowRuntime_umd.nullable(flowRuntime_umd.any())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("updateAttributes", flowRuntime_umd["function"](flowRuntime_umd.param("aoAttributes", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("isNew", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())))), flowRuntime_umd.property("reload", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", RecordInterface)))), flowRuntime_umd.property("changedAttributes", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.object(flowRuntime_umd.indexer("key", flowRuntime_umd.string(), flowRuntime_umd.tuple(flowRuntime_umd.nullable(flowRuntime_umd.any()), flowRuntime_umd.nullable(flowRuntime_umd.any())))))))), flowRuntime_umd.property("resetAttribute", flowRuntime_umd["function"](flowRuntime_umd.param("asAttribute", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("rollbackAttributes", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))));
});

// This file is part of leanes-queryable-addon.
var CursorInterface$2 = flowRuntime_umd.tdz(function () {
  return CursorInterface;
});
var QueryInterface$2 = flowRuntime_umd.tdz(function () {
  return QueryInterface;
});
var QueryableCollectionInterface = flowRuntime_umd.type("QueryableCollectionInterface", function (QueryableCollectionInterface) {
  var C = QueryableCollectionInterface.typeParameter("C"),
      D = QueryableCollectionInterface.typeParameter("D");
  return flowRuntime_umd.object(flowRuntime_umd.property("findBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("options", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$2, C, D))))), flowRuntime_umd.property("takeBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("options", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$2, C, D))))), flowRuntime_umd.property("deleteBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("destroyBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("removeBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("updateBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("patchBy", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())))), flowRuntime_umd.property("exists", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())))), flowRuntime_umd.property("query", flowRuntime_umd["function"](flowRuntime_umd.param("aoQuery", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$2))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$2, flowRuntime_umd.nullable(C), flowRuntime_umd.existential()))))), flowRuntime_umd.property("parseQuery", flowRuntime_umd["function"](flowRuntime_umd.param("aoQuery", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$2))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$2)))))), flowRuntime_umd.property("executeQuery", flowRuntime_umd["function"](flowRuntime_umd.param("query", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$2))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$2, flowRuntime_umd.nullable(C), flowRuntime_umd.existential()))))));
});

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var QueryableCollectionInterface$1 = flowRuntime_umd.tdz(function () {
  return QueryableCollectionInterface;
});
var QueryInterface$3 = flowRuntime_umd.tdz(function () {
  return QueryInterface;
});
var CursorInterface$3 = flowRuntime_umd.tdz(function () {
  return CursorInterface;
});
var RecordInterface$1 = flowRuntime_umd.tdz(function () {
  return RecordInterface;
});
var CollectionInterface$1 = flowRuntime_umd.tdz(function () {
  return CollectionInterface;
});
var QueryableCollectionMixin = (function (Module) {
  var _Module$NS = Module.NS,
      Cursor = _Module$NS.Cursor,
      Query = _Module$NS.Query,
      assert = _Module$NS.assert,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      method = _Module$NS.method,
      _ = _Module$NS.Utils._;
  Module.defineMixin(__filename$3, function (BaseClass) {
    var _t$TypeParametersSymb;

    var _dec, _class, _class2, _init, _class3, _temp;

    var _MixinTypeParametersSymbol = Symbol("MixinTypeParameters");

    var Mixin = (_dec = flowRuntime_umd.annotate(flowRuntime_umd["class"]("Mixin", function (Mixin) {
      var D = Mixin.typeParameter("D", undefined, flowRuntime_umd.ref(RecordInterface$1));
      var C = Mixin.typeParameter("C", undefined, flowRuntime_umd.ref(CollectionInterface$1, D));
      return [flowRuntime_umd["extends"](BaseClass), flowRuntime_umd.staticProperty("object", flowRuntime_umd.any()), flowRuntime_umd.method("constructor", flowRuntime_umd.param("args", flowRuntime_umd.any())), flowRuntime_umd.method("findBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("options", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, C, D)))), flowRuntime_umd.method("takeBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("options", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, C, D)))), flowRuntime_umd.method("deleteBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]()))), flowRuntime_umd.method("destroyBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]()))), flowRuntime_umd.method("removeBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]()))), flowRuntime_umd.method("updateBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]()))), flowRuntime_umd.method("patchBy", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("properties", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]()))), flowRuntime_umd.method("includes", flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]()))), flowRuntime_umd.method("length", flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.number()))), flowRuntime_umd.method("exists", flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]()))), flowRuntime_umd.method("query", flowRuntime_umd.param("aoQuery", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$3))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, flowRuntime_umd.nullable(C), flowRuntime_umd.existential())))), flowRuntime_umd.method("parseQuery", flowRuntime_umd.param("query", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$3))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$3))))), flowRuntime_umd.method("executeQuery", flowRuntime_umd.param("query", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$3))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, flowRuntime_umd.nullable(C), flowRuntime_umd.existential()))))];
    })), _dec(_class = initializeMixin(_class = (_class2 = (_temp = (_t$TypeParametersSymb = flowRuntime_umd.TypeParametersSymbol, _class3 = /*#__PURE__*/function (_BaseClass) {
      inherits(Mixin, _BaseClass);

      var _super = _createSuper$2(Mixin);

      function Mixin() {
        var _this;

        classCallCheck(this, Mixin);

        var _typeParameters = {
          D: flowRuntime_umd.typeParameter("D"),
          C: flowRuntime_umd.typeParameter("C")
        };

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));
        _this[_MixinTypeParametersSymbol] = _typeParameters;
        flowRuntime_umd.ref(QueryableCollectionInterface$1, _this[_MixinTypeParametersSymbol].C, _this[_MixinTypeParametersSymbol].D).assert(assertThisInitialized(_this));
        return _this;
      }

      createClass(Mixin, [{
        key: "findBy",
        value: function () {
          var _findBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(query) {
            var options,
                _queryType,
                _optionsType,
                _returnType,
                _args = arguments;

            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                    _queryType = flowRuntime_umd.ref("object");
                    _optionsType = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));
                    _returnType = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.ref(CursorInterface$3, this[_MixinTypeParametersSymbol].C, this[_MixinTypeParametersSymbol].D), flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, this[_MixinTypeParametersSymbol].C, this[_MixinTypeParametersSymbol].D))));
                    flowRuntime_umd.param("query", _queryType).assert(query);
                    flowRuntime_umd.param("options", _optionsType).assert(options);
                    _context.t0 = _returnType;
                    _context.next = 9;
                    return this.takeBy(query, options);

                  case 9:
                    _context.t1 = _context.sent;
                    return _context.abrupt("return", _context.t0.assert.call(_context.t0, _context.t1));

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function findBy(_x) {
            return _findBy.apply(this, arguments);
          }

          return findBy;
        }()
      }, {
        key: "takeBy",
        value: function () {
          var _takeBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(query) {
            var options,
                _queryType2,
                _optionsType2,
                _returnType2,
                result,
                _args2 = arguments;

            return regenerator.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                    _queryType2 = flowRuntime_umd.ref("object");
                    _optionsType2 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));
                    _returnType2 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.ref(CursorInterface$3, this[_MixinTypeParametersSymbol].C, this[_MixinTypeParametersSymbol].D), flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, this[_MixinTypeParametersSymbol].C, this[_MixinTypeParametersSymbol].D))));
                    flowRuntime_umd.param("query", _queryType2).assert(query);
                    flowRuntime_umd.param("options", _optionsType2).assert(options);
                    _context2.next = 8;
                    return this.adapter.takeBy(this.delegate, query, options);

                  case 8:
                    result = _context2.sent;
                    return _context2.abrupt("return", _returnType2.assert(this._cursorFactory(this.getName(), result)));

                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function takeBy(_x2) {
            return _takeBy.apply(this, arguments);
          }

          return takeBy;
        }()
      }, {
        key: "deleteBy",
        value: function () {
          var _deleteBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(query) {
            var _queryType3, _returnType3, voRecordsCursor;

            return regenerator.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _queryType3 = flowRuntime_umd.ref("object");
                    _returnType3 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["void"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())));
                    flowRuntime_umd.param("query", _queryType3).assert(query);
                    _context4.next = 5;
                    return this.takeBy(query);

                  case 5:
                    voRecordsCursor = _context4.sent;
                    _context4.next = 8;
                    return voRecordsCursor.forEach( /*#__PURE__*/function () {
                      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(aoRecord) {
                        return regenerator.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return aoRecord["delete"]();

                              case 2:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));

                      return function (_x4) {
                        return _ref.apply(this, arguments);
                      };
                    }());

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function deleteBy(_x3) {
            return _deleteBy.apply(this, arguments);
          }

          return deleteBy;
        }()
      }, {
        key: "destroyBy",
        value: function () {
          var _destroyBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(query) {
            var _queryType4, _returnType4, voRecordsCursor;

            return regenerator.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _queryType4 = flowRuntime_umd.ref("object");
                    _returnType4 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["void"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())));
                    flowRuntime_umd.param("query", _queryType4).assert(query);
                    _context6.next = 5;
                    return this.takeBy(query);

                  case 5:
                    voRecordsCursor = _context6.sent;
                    _context6.next = 8;
                    return voRecordsCursor.forEach( /*#__PURE__*/function () {
                      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(aoRecord) {
                        return regenerator.wrap(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                _context5.next = 2;
                                return aoRecord.destroy();

                              case 2:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, _callee5);
                      }));

                      return function (_x6) {
                        return _ref2.apply(this, arguments);
                      };
                    }());

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function destroyBy(_x5) {
            return _destroyBy.apply(this, arguments);
          }

          return destroyBy;
        }()
      }, {
        key: "removeBy",
        value: function () {
          var _removeBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(query) {
            var _queryType5, _returnType5, voQuery;

            return regenerator.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _queryType5 = flowRuntime_umd.ref("object");
                    _returnType5 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["void"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())));
                    flowRuntime_umd.param("query", _queryType5).assert(query);
                    voQuery = Query["new"]().forIn({
                      '@doc': this.collectionFullName()
                    }).filter(query).remove('@doc').into(this.collectionFullName());
                    _context7.next = 6;
                    return this.query(voQuery);

                  case 6:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));

          function removeBy(_x7) {
            return _removeBy.apply(this, arguments);
          }

          return removeBy;
        }()
      }, {
        key: "updateBy",
        value: function () {
          var _updateBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9(query, properties) {
            var _queryType6, _propertiesType, _returnType6, voRecordsCursor;

            return regenerator.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _queryType6 = flowRuntime_umd.ref("object");
                    _propertiesType = flowRuntime_umd.ref("object");
                    _returnType6 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["void"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())));
                    flowRuntime_umd.param("query", _queryType6).assert(query);
                    flowRuntime_umd.param("properties", _propertiesType).assert(properties);
                    _context9.next = 7;
                    return this.takeBy(query);

                  case 7:
                    voRecordsCursor = _context9.sent;
                    _context9.next = 10;
                    return voRecordsCursor.forEach( /*#__PURE__*/function () {
                      var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(aoRecord) {
                        return regenerator.wrap(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                _context8.next = 2;
                                return aoRecord.updateAttributes(properties);

                              case 2:
                              case "end":
                                return _context8.stop();
                            }
                          }
                        }, _callee8);
                      }));

                      return function (_x10) {
                        return _ref3.apply(this, arguments);
                      };
                    }());

                  case 10:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          }));

          function updateBy(_x8, _x9) {
            return _updateBy.apply(this, arguments);
          }

          return updateBy;
        }()
      }, {
        key: "patchBy",
        value: function () {
          var _patchBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10(query, properties) {
            var _queryType7, _propertiesType2, _returnType7, voQuery;

            return regenerator.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _queryType7 = flowRuntime_umd.ref("object");
                    _propertiesType2 = flowRuntime_umd.ref("object");
                    _returnType7 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["void"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["void"]())));
                    flowRuntime_umd.param("query", _queryType7).assert(query);
                    flowRuntime_umd.param("properties", _propertiesType2).assert(properties);
                    voQuery = Query["new"]().forIn({
                      '@doc': this.collectionFullName()
                    }).filter(query).patch(properties).into(this.collectionFullName());
                    _context10.next = 8;
                    return this.query(voQuery);

                  case 8:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));

          function patchBy(_x11, _x12) {
            return _patchBy.apply(this, arguments);
          }

          return patchBy;
        }()
      }, {
        key: "includes",
        value: function () {
          var _includes = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11(id) {
            var _idType, _returnType8;

            return regenerator.wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _idType = flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number());
                    _returnType8 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["boolean"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())));
                    flowRuntime_umd.param("id", _idType).assert(id);
                    _context11.t0 = _returnType8;
                    _context11.next = 6;
                    return this.adapter.includes(this.delegate, id, this.collectionFullName());

                  case 6:
                    _context11.t1 = _context11.sent;
                    return _context11.abrupt("return", _context11.t0.assert.call(_context11.t0, _context11.t1));

                  case 8:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11, this);
          }));

          function includes(_x13) {
            return _includes.apply(this, arguments);
          }

          return includes;
        }()
      }, {
        key: "length",
        value: function () {
          var _length = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12() {
            var _returnType9;

            return regenerator.wrap(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    _returnType9 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.ref("Promise", flowRuntime_umd.number())));
                    _context12.t0 = _returnType9;
                    _context12.next = 4;
                    return this.adapter.length(this.delegate, this.collectionFullName());

                  case 4:
                    _context12.t1 = _context12.sent;
                    return _context12.abrupt("return", _context12.t0.assert.call(_context12.t0, _context12.t1));

                  case 6:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee12, this);
          }));

          function length() {
            return _length.apply(this, arguments);
          }

          return length;
        }()
      }, {
        key: "exists",
        value: function () {
          var _exists = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee13(query) {
            var _queryType8, _returnType10, voQuery, cursor;

            return regenerator.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _queryType8 = flowRuntime_umd.ref("object");
                    _returnType10 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["boolean"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())));
                    flowRuntime_umd.param("query", _queryType8).assert(query);
                    voQuery = Query["new"]().forIn({
                      '@doc': this.collectionFullName()
                    }).filter(query).limit(1)["return"]('@doc');
                    _context13.next = 6;
                    return this.query(voQuery);

                  case 6:
                    cursor = _context13.sent;
                    _context13.t0 = _returnType10;
                    _context13.next = 10;
                    return cursor.hasNext();

                  case 10:
                    _context13.t1 = _context13.sent;
                    return _context13.abrupt("return", _context13.t0.assert.call(_context13.t0, _context13.t1));

                  case 12:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13, this);
          }));

          function exists(_x14) {
            return _exists.apply(this, arguments);
          }

          return exists;
        }()
      }, {
        key: "query",
        value: function () {
          var _query = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee14(aoQuery) {
            var _aoQueryType, _returnType11, voQuery;

            return regenerator.wrap(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _aoQueryType = flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$3));
                    _returnType11 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.ref(CursorInterface$3, flowRuntime_umd.nullable(this[_MixinTypeParametersSymbol].C), flowRuntime_umd.existential()), flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, flowRuntime_umd.nullable(this[_MixinTypeParametersSymbol].C), flowRuntime_umd.existential()))));
                    flowRuntime_umd.param("aoQuery", _aoQueryType).assert(aoQuery);

                    // console.log('>?>?? QueryableCollectionMixin::query enter');
                    voQuery = function () {
                      if (_.isPlainObject(aoQuery)) {
                        aoQuery = _aoQueryType.assert(_.pick(aoQuery, Object.keys(aoQuery).filter(function (key) {
                          return aoQuery[key] != null;
                        })));
                        return Query["new"](aoQuery);
                      } else {
                        return aoQuery;
                      }
                    }(); // console.log('>?>?? QueryableCollectionMixin::query voQuery', voQuery);


                    _context14.t0 = _returnType11;
                    _context14.t1 = this;
                    _context14.next = 8;
                    return this.parseQuery(voQuery);

                  case 8:
                    _context14.t2 = _context14.sent;
                    _context14.next = 11;
                    return _context14.t1.executeQuery.call(_context14.t1, _context14.t2);

                  case 11:
                    _context14.t3 = _context14.sent;
                    return _context14.abrupt("return", _context14.t0.assert.call(_context14.t0, _context14.t3));

                  case 13:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee14, this);
          }));

          function query(_x15) {
            return _query.apply(this, arguments);
          }

          return query;
        }()
      }, {
        key: "parseQuery",
        value: function () {
          var _parseQuery = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee15(query) {
            var _queryType9, _returnType12;

            return regenerator.wrap(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _queryType9 = flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$3));
                    _returnType12 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$3)), flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$3)))));
                    flowRuntime_umd.param("query", _queryType9).assert(query);
                    _context15.t0 = _returnType12;
                    _context15.next = 6;
                    return this.adapter.parseQuery(this.delegate, query);

                  case 6:
                    _context15.t1 = _context15.sent;
                    return _context15.abrupt("return", _context15.t0.assert.call(_context15.t0, _context15.t1));

                  case 8:
                  case "end":
                    return _context15.stop();
                }
              }
            }, _callee15, this);
          }));

          function parseQuery(_x16) {
            return _parseQuery.apply(this, arguments);
          }

          return parseQuery;
        }()
      }, {
        key: "executeQuery",
        value: function () {
          var _executeQuery = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee16(query) {
            var _queryType10, _returnType13, result;

            return regenerator.wrap(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _queryType10 = flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$3));
                    _returnType13 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.ref(CursorInterface$3, flowRuntime_umd.nullable(this[_MixinTypeParametersSymbol].C), flowRuntime_umd.existential()), flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(CursorInterface$3, flowRuntime_umd.nullable(this[_MixinTypeParametersSymbol].C), flowRuntime_umd.existential()))));
                    flowRuntime_umd.param("query", _queryType10).assert(query);
                    _context16.next = 5;
                    return this.adapter.executeQuery(this.delegate, query);

                  case 5:
                    result = _context16.sent;

                    if (!query.isCustomReturn) {
                      _context16.next = 10;
                      break;
                    }

                    return _context16.abrupt("return", _returnType13.assert(flowRuntime_umd.ref(Cursor, flowRuntime_umd["null"](), flowRuntime_umd.existential()).assert(this._cursorFactory(null, result))));

                  case 10:
                    return _context16.abrupt("return", _returnType13.assert(flowRuntime_umd.ref(Cursor, flowRuntime_umd.ref(CollectionInterface$1, this[_MixinTypeParametersSymbol].D), this[_MixinTypeParametersSymbol].D).assert(this._cursorFactory(this.getName(), result))));

                  case 11:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee16, this);
          }));

          function executeQuery(_x17) {
            return _executeQuery.apply(this, arguments);
          }

          return executeQuery;
        }()
      }]);

      return Mixin;
    }(BaseClass)), _class3[_t$TypeParametersSymb] = _MixinTypeParametersSymbol, _class3.object = {}, _temp), (applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), applyDecoratedDescriptor(_class2.prototype, "findBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "findBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "takeBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "takeBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "deleteBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "destroyBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "destroyBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "removeBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "removeBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "updateBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "updateBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "patchBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "patchBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "includes", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "includes"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "length", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "exists", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "exists"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "query", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "parseQuery", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "parseQuery"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "executeQuery", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "executeQuery"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$4 = '/mixins/QueryableHttpAdapterMixin.js';

// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.
var HttpRequestParamsT = flowRuntime_umd.type("HttpRequestParamsT", flowRuntime_umd.object(flowRuntime_umd.property("requestType", flowRuntime_umd.string()), flowRuntime_umd.property("recordName", flowRuntime_umd.string()), flowRuntime_umd.property("snapshot", flowRuntime_umd.ref("object"), true), flowRuntime_umd.property("id", flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string()), true), flowRuntime_umd.property("query", flowRuntime_umd.ref("object"), true), flowRuntime_umd.property("isCustomReturn", flowRuntime_umd["boolean"](), true)));

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var QueryInterface$4 = flowRuntime_umd.tdz(function () {
  return QueryInterface;
});
var HttpRequestParamsT$1 = flowRuntime_umd.tdz(function () {
  return HttpRequestParamsT;
});
var QueryableHttpAdapterMixin = (function (Module) {
  var _Module$NS = Module.NS,
      assert = _Module$NS.assert,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      _Module$NS$Utils = _Module$NS.Utils,
      _ = _Module$NS$Utils._,
      inflect = _Module$NS$Utils.inflect,
      request = _Module$NS$Utils.request;
  Module.defineMixin(__filename$4, function (BaseClass) {
    var _t$TypeParametersSymb;

    var _dec, _dec2, _class, _class2, _init, _descriptor, _class3, _temp;

    var _MixinTypeParametersSymbol = Symbol("MixinTypeParameters");

    var Mixin = (_dec = flowRuntime_umd.annotate(flowRuntime_umd["class"]("Mixin", function (Mixin) {
      var R = Mixin.typeParameter("R", undefined, flowRuntime_umd.Class(flowRuntime_umd.existential()));
      var T = Mixin.typeParameter("T", undefined, flowRuntime_umd.ref("object"));
      return [flowRuntime_umd["extends"](BaseClass), flowRuntime_umd.staticProperty("object", flowRuntime_umd.any()), flowRuntime_umd.property("queryEndpoint", flowRuntime_umd.string()), flowRuntime_umd.method("constructor", flowRuntime_umd.param("args", flowRuntime_umd.any())), flowRuntime_umd.method("takeBy", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd.param("query", flowRuntime_umd.ref("object")), flowRuntime_umd.param("options", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(T)))), flowRuntime_umd.method("takeMany", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd.param("ids", flowRuntime_umd.array(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number()))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(T)))), flowRuntime_umd.method("takeAll", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(T)))), flowRuntime_umd.method("includes", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd.param("id", flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number())), flowRuntime_umd.param("collectionFullName", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]()))), flowRuntime_umd.method("length", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd.param("collectionFullName", flowRuntime_umd.string()), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.number()))), flowRuntime_umd.method("methodForRequest", flowRuntime_umd.param("params", flowRuntime_umd.ref(HttpRequestParamsT$1)), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("dataForRequest", flowRuntime_umd.param("params", flowRuntime_umd.ref(HttpRequestParamsT$1)), flowRuntime_umd["return"](flowRuntime_umd.nullable(flowRuntime_umd.ref("object")))), flowRuntime_umd.method("makeURL", flowRuntime_umd.param("recordName", flowRuntime_umd.string()), flowRuntime_umd.param("query", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.param("id", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string()))), flowRuntime_umd.param("isQueryable", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("urlForQuery", flowRuntime_umd.param("recordName", flowRuntime_umd.string()), flowRuntime_umd.param("query", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("urlForPatchBy", flowRuntime_umd.param("recordName", flowRuntime_umd.string()), flowRuntime_umd.param("query", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("urlForRemoveBy", flowRuntime_umd.param("recordName", flowRuntime_umd.string()), flowRuntime_umd.param("query", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("urlForTakeBy", flowRuntime_umd.param("recordName", flowRuntime_umd.string()), flowRuntime_umd.param("query", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("buildURL", flowRuntime_umd.param("recordName", flowRuntime_umd.string()), flowRuntime_umd.param("snapshot", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.param("id", flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string()))), flowRuntime_umd.param("requestType", flowRuntime_umd.string()), flowRuntime_umd.param("query", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd["return"](flowRuntime_umd.string())), flowRuntime_umd.method("parseQuery", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd.param("aoQuery", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$4))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$4))))), flowRuntime_umd.method("executeQuery", flowRuntime_umd.param("acRecord", flowRuntime_umd.flowInto(R)), flowRuntime_umd.param("aoQuery", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$4))), flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array(flowRuntime_umd.nullable(T)))))];
    })), _dec2 = flowRuntime_umd.decorate(flowRuntime_umd.string()), _dec(_class = initializeMixin(_class = (_class2 = (_temp = (_t$TypeParametersSymb = flowRuntime_umd.TypeParametersSymbol, _class3 = /*#__PURE__*/function (_BaseClass) {
      inherits(Mixin, _BaseClass);

      var _super = _createSuper$3(Mixin);

      function Mixin() {
        var _this;

        classCallCheck(this, Mixin);

        var _typeParameters = {
          R: flowRuntime_umd.typeParameter("R"),
          T: flowRuntime_umd.typeParameter("T")
        };

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        initializerDefineProperty(_this, "queryEndpoint", _descriptor, assertThisInitialized(_this));

        _this[_MixinTypeParametersSymbol] = _typeParameters;
        return _this;
      }

      createClass(Mixin, [{
        key: "takeBy",
        value: function () {
          var _takeBy = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(acRecord, query) {
            var options,
                _acRecordType,
                _queryType,
                _optionsType,
                _returnType,
                params,
                requestObj,
                res,
                body,
                _args = arguments;

            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                    _acRecordType = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _queryType = flowRuntime_umd.ref("object");
                    _optionsType = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));
                    _returnType = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.array(this[_MixinTypeParametersSymbol].T), flowRuntime_umd.ref("Promise", flowRuntime_umd.array(this[_MixinTypeParametersSymbol].T))));
                    flowRuntime_umd.param("acRecord", _acRecordType).assert(acRecord);
                    flowRuntime_umd.param("query", _queryType).assert(query);
                    flowRuntime_umd.param("options", _optionsType).assert(options);
                    params = {};
                    params.requestType = 'takeBy';
                    params.recordName = acRecord.name;
                    params.query = {
                      $filter: query
                    };

                    if (options.$sort != null) {
                      params.query.$sort = options.$sort;
                    }

                    if (options.$limit != null) {
                      params.query.$limit = options.$limit;
                    }

                    if (options.$offset != null) {
                      params.query.$offset = options.$offset;
                    }

                    requestObj = this.requestFor(params);
                    _context.next = 18;
                    return this.makeRequest(requestObj);

                  case 18:
                    res = _context.sent;
                    assert(res.status < 400, "Request failed with status ".concat(res.status, " ").concat(res.message));
                    body = res.body;

                    if (!(body != null && body !== '')) {
                      _context.next = 26;
                      break;
                    }

                    if (_.isString(body)) {
                      body = JSON.parse(body);
                    }

                    return _context.abrupt("return", _returnType.assert(body[this.recordMultipleName(acRecord.name)]));

                  case 26:
                    assert.fail("Record payload has not existed in response body.");

                  case 27:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function takeBy(_x, _x2) {
            return _takeBy.apply(this, arguments);
          }

          return takeBy;
        }()
      }, {
        key: "takeMany",
        value: function () {
          var _takeMany = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(acRecord, ids) {
            var _acRecordType2, _idsType, _returnType2, params, requestObj, res, body;

            return regenerator.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _acRecordType2 = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _idsType = flowRuntime_umd.array(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number()));
                    _returnType2 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.array(this[_MixinTypeParametersSymbol].T), flowRuntime_umd.ref("Promise", flowRuntime_umd.array(this[_MixinTypeParametersSymbol].T))));
                    flowRuntime_umd.param("acRecord", _acRecordType2).assert(acRecord);
                    flowRuntime_umd.param("ids", _idsType).assert(ids);
                    params = {};
                    params.requestType = 'takeBy';
                    params.recordName = acRecord.name;
                    params.query = {
                      $filter: {
                        '@doc.id': {
                          $in: ids
                        }
                      }
                    };
                    requestObj = this.requestFor(params);
                    _context2.next = 12;
                    return this.makeRequest(requestObj);

                  case 12:
                    res = _context2.sent;
                    assert(res.status < 400, "Request failed with status ".concat(res.status, " ").concat(res.message));
                    body = res.body;

                    if (!(body != null && body !== '')) {
                      _context2.next = 20;
                      break;
                    }

                    if (_.isString(body)) {
                      body = JSON.parse(body);
                    }

                    return _context2.abrupt("return", _returnType2.assert(body[this.recordMultipleName(acRecord.name)]));

                  case 20:
                    assert.fail("Record payload has not existed in response body.");

                  case 21:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function takeMany(_x3, _x4) {
            return _takeMany.apply(this, arguments);
          }

          return takeMany;
        }()
      }, {
        key: "takeAll",
        value: function () {
          var _takeAll = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(acRecord) {
            var _acRecordType3, _returnType3, params, requestObj, res, body;

            return regenerator.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _acRecordType3 = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _returnType3 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.array(this[_MixinTypeParametersSymbol].T), flowRuntime_umd.ref("Promise", flowRuntime_umd.array(this[_MixinTypeParametersSymbol].T))));
                    flowRuntime_umd.param("acRecord", _acRecordType3).assert(acRecord);
                    params = {};
                    params.requestType = 'takeAll';
                    params.recordName = acRecord.name;
                    params.query = {};
                    requestObj = this.requestFor(params);
                    _context3.next = 10;
                    return this.makeRequest(requestObj);

                  case 10:
                    res = _context3.sent;
                    assert(res.status < 400, "Request failed with status ".concat(res.status, " ").concat(res.message));
                    body = res.body;

                    if (!(body != null && body !== '')) {
                      _context3.next = 18;
                      break;
                    }

                    if (_.isString(body)) {
                      body = JSON.parse(body);
                    }

                    return _context3.abrupt("return", _returnType3.assert(body[this.recordMultipleName(acRecord.name)]));

                  case 18:
                    assert.fail("Record payload has not existed in response body.");

                  case 19:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function takeAll(_x5) {
            return _takeAll.apply(this, arguments);
          }

          return takeAll;
        }()
      }, {
        key: "includes",
        value: function () {
          var _includes = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(acRecord, id, collectionFullName) {
            var _acRecordType4, _idType, _collectionFullNameType, _returnType4, voQuery, result;

            return regenerator.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _acRecordType4 = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _idType = flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number());
                    _collectionFullNameType = flowRuntime_umd.string();
                    _returnType4 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd["boolean"](), flowRuntime_umd.ref("Promise", flowRuntime_umd["boolean"]())));
                    flowRuntime_umd.param("acRecord", _acRecordType4).assert(acRecord);
                    flowRuntime_umd.param("id", _idType).assert(id);
                    flowRuntime_umd.param("collectionFullName", _collectionFullNameType).assert(collectionFullName);
                    voQuery = {
                      $forIn: {
                        '@doc': collectionFullName
                      },
                      $filter: {
                        '@doc.id': {
                          $eq: id
                        }
                      },
                      $limit: 1,
                      $return: '@doc'
                    };
                    _context4.t0 = this;
                    _context4.next = 11;
                    return this.parseQuery(voQuery);

                  case 11:
                    _context4.t1 = _context4.sent;
                    _context4.next = 14;
                    return _context4.t0.executeQuery.call(_context4.t0, _context4.t1);

                  case 14:
                    result = _context4.sent;
                    return _context4.abrupt("return", _returnType4.assert(result != null && result[0] != null));

                  case 16:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function includes(_x6, _x7, _x8) {
            return _includes.apply(this, arguments);
          }

          return includes;
        }()
      }, {
        key: "length",
        value: function () {
          var _length = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(acRecord, collectionFullName) {
            var _acRecordType5, _collectionFullNameType2, _returnType5, voQuery, result;

            return regenerator.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _acRecordType5 = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _collectionFullNameType2 = flowRuntime_umd.string();
                    _returnType5 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.ref("Promise", flowRuntime_umd.number())));
                    flowRuntime_umd.param("acRecord", _acRecordType5).assert(acRecord);
                    flowRuntime_umd.param("collectionFullName", _collectionFullNameType2).assert(collectionFullName);
                    voQuery = {
                      $forIn: {
                        '@doc': collectionFullName
                      },
                      $count: true
                    };
                    _context5.t0 = this;
                    _context5.next = 9;
                    return this.parseQuery(voQuery);

                  case 9:
                    _context5.t1 = _context5.sent;
                    _context5.next = 12;
                    return _context5.t0.executeQuery.call(_context5.t0, _context5.t1);

                  case 12:
                    result = _context5.sent;
                    return _context5.abrupt("return", _returnType5.assert(result != null ? result[0] != null ? result[0].count : 0 : 0));

                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function length(_x9, _x10) {
            return _length.apply(this, arguments);
          }

          return length;
        }()
      }, {
        key: "methodForRequest",
        value: function methodForRequest(params) {
          var _paramsType = flowRuntime_umd.ref(HttpRequestParamsT$1);

          var _returnType8 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("params", _paramsType).assert(params);
          var requestType = params.requestType;

          switch (requestType) {
            case 'query':
              return _returnType8.assert('POST');

            case 'patchBy':
              return _returnType8.assert('POST');

            case 'removeBy':
              return _returnType8.assert('POST');

            case 'takeBy':
              return _returnType8.assert('GET');

            default:
              return _returnType8.assert(get(getPrototypeOf(Mixin.prototype), "methodForRequest", this).call(this, params));
          }
        }
      }, {
        key: "dataForRequest",
        value: function dataForRequest(params) {
          var _paramsType2 = flowRuntime_umd.ref(HttpRequestParamsT$1);

          var _returnType9 = flowRuntime_umd["return"](flowRuntime_umd.nullable(flowRuntime_umd.ref("object")));

          flowRuntime_umd.param("params", _paramsType2).assert(params);
          var recordName = params.recordName,
              snapshot = params.snapshot,
              requestType = params.requestType,
              query = params.query;

          if (requestType === 'query' || requestType === 'patchBy' || requestType === 'removeBy') {
            return _returnType9.assert({
              query: query
            });
          } else {
            return _returnType9.assert(get(getPrototypeOf(Mixin.prototype), "dataForRequest", this).call(this, params));
          }
        }
      }, {
        key: "makeURL",
        value: function makeURL(recordName, query, id, isQueryable) {
          var _recordNameType = flowRuntime_umd.string();

          var _queryType2 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _idType2 = flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string()));

          var _isQueryableType = flowRuntime_umd.nullable(flowRuntime_umd["boolean"]());

          var _returnType10 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("recordName", _recordNameType).assert(recordName);
          flowRuntime_umd.param("query", _queryType2).assert(query);
          flowRuntime_umd.param("id", _idType2).assert(id);
          flowRuntime_umd.param("isQueryable", _isQueryableType).assert(isQueryable);

          var vsUrl = get(getPrototypeOf(Mixin.prototype), "makeURL", this).apply(this, arguments);

          if (isQueryable && this.queryEndpoint != null) {
            vsUrl += encodeURIComponent(this.queryEndpoint);
          }

          if (query != null) {
            query = _queryType2.assert(encodeURIComponent(JSON.stringify(query != null ? query : '')));
            vsUrl += "?query=".concat(query);
          }

          return _returnType10.assert(vsUrl);
        }
      }, {
        key: "urlForQuery",
        value: function urlForQuery(recordName, query) {
          var _recordNameType2 = flowRuntime_umd.string();

          var _queryType3 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _returnType11 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("recordName", _recordNameType2).assert(recordName);
          flowRuntime_umd.param("query", _queryType3).assert(query);
          return _returnType11.assert(this.makeURL(recordName, null, null, true));
        }
      }, {
        key: "urlForPatchBy",
        value: function urlForPatchBy(recordName, query) {
          var _recordNameType3 = flowRuntime_umd.string();

          var _queryType4 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _returnType12 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("recordName", _recordNameType3).assert(recordName);
          flowRuntime_umd.param("query", _queryType4).assert(query);
          return _returnType12.assert(this.makeURL(recordName, null, null, true));
        }
      }, {
        key: "urlForRemoveBy",
        value: function urlForRemoveBy(recordName, query) {
          var _recordNameType4 = flowRuntime_umd.string();

          var _queryType5 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _returnType13 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("recordName", _recordNameType4).assert(recordName);
          flowRuntime_umd.param("query", _queryType5).assert(query);
          return _returnType13.assert(this.makeURL(recordName, null, null, true));
        }
      }, {
        key: "urlForTakeBy",
        value: function urlForTakeBy(recordName, query) {
          var _recordNameType5 = flowRuntime_umd.string();

          var _queryType6 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _returnType14 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("recordName", _recordNameType5).assert(recordName);
          flowRuntime_umd.param("query", _queryType6).assert(query);
          return _returnType14.assert(this.makeURL(recordName, query, null, false));
        }
      }, {
        key: "buildURL",
        value: function buildURL(recordName, snapshot, id, requestType, query) {
          var _recordNameType6 = flowRuntime_umd.string();

          var _snapshotType = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _idType3 = flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string()));

          var _requestTypeType = flowRuntime_umd.string();

          var _queryType7 = flowRuntime_umd.nullable(flowRuntime_umd.ref("object"));

          var _returnType15 = flowRuntime_umd["return"](flowRuntime_umd.string());

          flowRuntime_umd.param("recordName", _recordNameType6).assert(recordName);
          flowRuntime_umd.param("snapshot", _snapshotType).assert(snapshot);
          flowRuntime_umd.param("id", _idType3).assert(id);
          flowRuntime_umd.param("requestType", _requestTypeType).assert(requestType);
          flowRuntime_umd.param("query", _queryType7).assert(query);

          switch (requestType) {
            case 'query':
              return _returnType15.assert(this.urlForQuery(recordName, query));

            case 'patchBy':
              return _returnType15.assert(this.urlForPatchBy(recordName, query));

            case 'removeBy':
              return _returnType15.assert(this.urlForRemoveBy(recordName, query));

            case 'takeBy':
              return _returnType15.assert(this.urlForTakeBy(recordName, query));

            case 'takeAll':
            case 'take':
            case 'push':
            case 'remove':
            case 'override':
            default:
              return _returnType15.assert(get(getPrototypeOf(Mixin.prototype), "buildURL", this).apply(this, arguments));
          }
        }
      }, {
        key: "parseQuery",
        value: function () {
          var _parseQuery = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(acRecord, aoQuery) {
            var _acRecordType6, _aoQueryType, _returnType6, params;

            return regenerator.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _acRecordType6 = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _aoQueryType = flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.ref(QueryInterface$4));
                    _returnType6 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$4)), flowRuntime_umd.ref("Promise", flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$4)))));
                    flowRuntime_umd.param("acRecord", _acRecordType6).assert(acRecord);
                    flowRuntime_umd.param("aoQuery", _aoQueryType).assert(aoQuery);
                    params = {};
                    _context6.t0 = false;
                    _context6.next = _context6.t0 === (aoQuery.$remove == null) ? 9 : _context6.t0 === (aoQuery.$patch == null) ? 16 : 23;
                    break;

                  case 9:
                    if (!(aoQuery.$forIn != null)) {
                      _context6.next = 15;
                      break;
                    }

                    params.requestType = 'removeBy';
                    params.recordName = acRecord.name;
                    params.query = aoQuery;
                    params.isCustomReturn = true;
                    return _context6.abrupt("return", _returnType6.assert(params));

                  case 15:
                    return _context6.abrupt("break", 28);

                  case 16:
                    if (!(aoQuery.$forIn != null)) {
                      _context6.next = 22;
                      break;
                    }

                    params.requestType = 'patchBy';
                    params.recordName = acRecord.name;
                    params.query = aoQuery;
                    params.isCustomReturn = true;
                    return _context6.abrupt("return", _returnType6.assert(params));

                  case 22:
                    return _context6.abrupt("break", 28);

                  case 23:
                    params.requestType = 'query';
                    params.recordName = acRecord.name;
                    params.query = aoQuery;
                    params.isCustomReturn = aoQuery.$collect != null || aoQuery.$count != null || aoQuery.$sum != null || aoQuery.$min != null || aoQuery.$max != null || aoQuery.$avg != null || aoQuery.$remove != null || aoQuery.$return !== '@doc';
                    return _context6.abrupt("return", _returnType6.assert(params));

                  case 28:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function parseQuery(_x11, _x12) {
            return _parseQuery.apply(this, arguments);
          }

          return parseQuery;
        }()
      }, {
        key: "executeQuery",
        value: function () {
          var _executeQuery = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(acRecord, aoQuery) {
            var _acRecordType7, _aoQueryType2, _returnType7, requestObj, res, body;

            return regenerator.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _acRecordType7 = flowRuntime_umd.flowInto(this[_MixinTypeParametersSymbol].R);
                    _aoQueryType2 = flowRuntime_umd.union(flowRuntime_umd.ref("object"), flowRuntime_umd.string(), flowRuntime_umd.ref(QueryInterface$4));
                    _returnType7 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.array(flowRuntime_umd.nullable(this[_MixinTypeParametersSymbol].T)), flowRuntime_umd.ref("Promise", flowRuntime_umd.array(flowRuntime_umd.nullable(this[_MixinTypeParametersSymbol].T)))));
                    flowRuntime_umd.param("acRecord", _acRecordType7).assert(acRecord);
                    flowRuntime_umd.param("aoQuery", _aoQueryType2).assert(aoQuery);
                    requestObj = this.requestFor(aoQuery);
                    _context7.next = 8;
                    return this.makeRequest(requestObj);

                  case 8:
                    res = _context7.sent;
                    assert(res.status < 400, "Request failed with status ".concat(res.status, " ").concat(res.message));
                    body = res.body;

                    if (!(body != null && body !== '')) {
                      _context7.next = 17;
                      break;
                    }

                    if (_.isString(body)) {
                      body = JSON.parse(body);
                    }

                    if (!_.isArray(body)) {
                      body = [body];
                    }

                    return _context7.abrupt("return", _returnType7.assert(body));

                  case 17:
                    return _context7.abrupt("return", _returnType7.assert([]));

                  case 18:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));

          function executeQuery(_x13, _x14) {
            return _executeQuery.apply(this, arguments);
          }

          return executeQuery;
        }()
      }]);

      return Mixin;
    }(BaseClass)), _class3[_t$TypeParametersSymb] = _MixinTypeParametersSymbol, _class3.object = {}, _temp), (applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _descriptor = applyDecoratedDescriptor(_class2.prototype, "queryEndpoint", [_dec2, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'query';
      }
    }), applyDecoratedDescriptor(_class2.prototype, "takeBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "takeBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "takeMany", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "takeMany"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "takeAll", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "takeAll"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "includes", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "includes"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "length", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "methodForRequest", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "methodForRequest"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "dataForRequest", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "dataForRequest"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "makeURL", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "makeURL"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "urlForQuery", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "urlForQuery"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "urlForPatchBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "urlForPatchBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "urlForRemoveBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "urlForRemoveBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "urlForTakeBy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "urlForTakeBy"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "buildURL", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "buildURL"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "parseQuery", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "parseQuery"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "executeQuery", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "executeQuery"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$5 = '/mixins/QueryableResourceMixin.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
var ResourceListResultT = flowRuntime_umd.type("ResourceListResultT", flowRuntime_umd.exactObject(flowRuntime_umd.property("meta", flowRuntime_umd.exactObject(flowRuntime_umd.property("pagination", flowRuntime_umd.exactObject(flowRuntime_umd.property("limit", flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string("not defined"))), flowRuntime_umd.property("offset", flowRuntime_umd.union(flowRuntime_umd.number(), flowRuntime_umd.string("not defined"))))))), flowRuntime_umd.property("items", flowRuntime_umd.array(flowRuntime_umd.ref("object")))));

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
var ContextInterface = flowRuntime_umd.type("ContextInterface", flowRuntime_umd.object(flowRuntime_umd.property("req", flowRuntime_umd.ref("object")), flowRuntime_umd.property("res", flowRuntime_umd.ref("object")), flowRuntime_umd.property("request", flowRuntime_umd.nullable(flowRuntime_umd.ref("HttpRequestInterface"))), flowRuntime_umd.property("response", flowRuntime_umd.nullable(flowRuntime_umd.ref("HttpResponseInterface"))), flowRuntime_umd.property("cookies", flowRuntime_umd.nullable(flowRuntime_umd.ref("HttpCookiesInterface"))), flowRuntime_umd.property("state", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("respond", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd.property("routePath", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("pathParams", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("transaction", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("session", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("throw", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.number()), flowRuntime_umd.nullable(flowRuntime_umd.string()), flowRuntime_umd.nullable(flowRuntime_umd.ref("object")))), flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("assert", flowRuntime_umd["function"](flowRuntime_umd.rest("_argrest", flowRuntime_umd.ref("args")), flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("onerror", flowRuntime_umd["function"](flowRuntime_umd.param("err", flowRuntime_umd.nullable(flowRuntime_umd.any())), flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("header", flowRuntime_umd.ref("object")), flowRuntime_umd.property("headers", flowRuntime_umd.ref("object")), flowRuntime_umd.property("method", flowRuntime_umd.string()), flowRuntime_umd.property("url", flowRuntime_umd.string()), flowRuntime_umd.property("originalUrl", flowRuntime_umd.string()), flowRuntime_umd.property("origin", flowRuntime_umd.string()), flowRuntime_umd.property("href", flowRuntime_umd.string()), flowRuntime_umd.property("path", flowRuntime_umd.string()), flowRuntime_umd.property("query", flowRuntime_umd.ref("object")), flowRuntime_umd.property("querystring", flowRuntime_umd.string()), flowRuntime_umd.property("host", flowRuntime_umd.string()), flowRuntime_umd.property("hostname", flowRuntime_umd.string()), flowRuntime_umd.property("fresh", flowRuntime_umd["boolean"]()), flowRuntime_umd.property("stale", flowRuntime_umd["boolean"]()), flowRuntime_umd.property("socket", flowRuntime_umd.nullable(flowRuntime_umd.ref("object"))), flowRuntime_umd.property("protocol", flowRuntime_umd.string()), flowRuntime_umd.property("secure", flowRuntime_umd["boolean"]()), flowRuntime_umd.property("ip", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("ips", flowRuntime_umd.array(flowRuntime_umd.string())), flowRuntime_umd.property("subdomains", flowRuntime_umd.array(flowRuntime_umd.string())), flowRuntime_umd.property("is", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array()))), flowRuntime_umd["return"](flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd["boolean"]()))))), flowRuntime_umd.property("accepts", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array(), flowRuntime_umd["boolean"]())))), flowRuntime_umd.property("acceptsEncodings", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd.property("acceptsCharsets", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd.property("acceptsLanguages", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.nullable(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array())))), flowRuntime_umd.property("get", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.string())), flowRuntime_umd["return"](flowRuntime_umd.string()))), flowRuntime_umd.property("body", flowRuntime_umd.any()), flowRuntime_umd.property("status", flowRuntime_umd.nullable(flowRuntime_umd.number())), flowRuntime_umd.property("message", flowRuntime_umd.string()), flowRuntime_umd.property("length", flowRuntime_umd.number()), flowRuntime_umd.property("writable", flowRuntime_umd["boolean"]()), flowRuntime_umd.property("type", flowRuntime_umd.nullable(flowRuntime_umd.string())), flowRuntime_umd.property("headerSent", flowRuntime_umd.nullable(flowRuntime_umd["boolean"]())), flowRuntime_umd.property("set", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.ref("object")))), flowRuntime_umd["return"](flowRuntime_umd.nullable(flowRuntime_umd.any())))), flowRuntime_umd.property("append", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.string(), flowRuntime_umd.union(flowRuntime_umd.string(), flowRuntime_umd.array(flowRuntime_umd.string())))), flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("flushHeaders", flowRuntime_umd["function"](flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("remove", flowRuntime_umd["function"](flowRuntime_umd.rest("args", flowRuntime_umd.tuple(flowRuntime_umd.string())), flowRuntime_umd["return"](flowRuntime_umd["void"]()))), flowRuntime_umd.property("setReqResPair", flowRuntime_umd["function"](flowRuntime_umd.param("req", flowRuntime_umd.ref("object")), flowRuntime_umd.param("res", flowRuntime_umd.ref("object")), flowRuntime_umd["return"](flowRuntime_umd["void"]())))));

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var ContextInterface$1 = flowRuntime_umd.tdz(function () {
  return ContextInterface;
});
var ResourceListResultT$1 = flowRuntime_umd.tdz(function () {
  return ResourceListResultT;
});
var QueryableResourceMixin = (function (Module) {
  var _Module$NS = Module.NS,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      method = _Module$NS.method,
      chains = _Module$NS.chains,
      property = _Module$NS.property,
      _Module$NS$Utils = _Module$NS.Utils,
      _ = _Module$NS$Utils._,
      joi = _Module$NS$Utils.joi,
      assert = _Module$NS$Utils.assert;
  var MAX_LIMIT = 50;
  Module.defineMixin(__filename$5, function (BaseClass) {
    var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _init, _descriptor, _descriptor2, _class3, _temp;

    var Mixin = (_dec = flowRuntime_umd.annotate(flowRuntime_umd["class"]("Mixin", flowRuntime_umd["extends"](BaseClass), flowRuntime_umd.staticProperty("object", flowRuntime_umd.any()), flowRuntime_umd.property("needsLimitation", flowRuntime_umd["boolean"]()), flowRuntime_umd.property("listQuery", flowRuntime_umd.ref("object")), flowRuntime_umd.method("getQuery", flowRuntime_umd.param("args", flowRuntime_umd.any())), flowRuntime_umd.method("showNoHiddenByDefault", flowRuntime_umd.param("args", flowRuntime_umd.any())), flowRuntime_umd.method("list", flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(ResourceListResultT$1)))), flowRuntime_umd.method("query", flowRuntime_umd["return"](flowRuntime_umd.ref("Promise", flowRuntime_umd.array()))))), _dec2 = chains(['query', 'list'], function () {
      // this.initialHook('requiredAuthorizationHeader', {
      //   only: ['query']
      // });
      this.initialHook('parseBody', {
        only: ['query']
      });
      this.beforeHook('getQuery', {
        only: ['list']
      }); // this.beforeHook('showNoHiddenByDefault', {
      //   only: ['list']
      // });
    }), _dec3 = flowRuntime_umd.decorate(flowRuntime_umd["boolean"]()), _dec4 = flowRuntime_umd.decorate(flowRuntime_umd.ref("object")), _dec5 = BaseClass.Module.NS.action, _dec6 = BaseClass.Module.NS.action, _dec(_class = initializeMixin(_class = _dec2(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      inherits(Mixin, _BaseClass);

      var _super = _createSuper$4(Mixin);

      function Mixin() {
        var _this;

        classCallCheck(this, Mixin);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        initializerDefineProperty(_this, "needsLimitation", _descriptor, assertThisInitialized(_this));

        initializerDefineProperty(_this, "listQuery", _descriptor2, assertThisInitialized(_this));

        return _this;
      }

      createClass(Mixin, [{
        key: "getQuery",
        value: function getQuery() {
          this.listQuery = JSON.parse(this.context.query['query'] || "{}");

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return args;
        }
      }, {
        key: "showNoHiddenByDefault",
        value: function () {
          var _showNoHiddenByDefault = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
            var _len3,
                args,
                _key3,
                _args = arguments;

            return regenerator.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (this.listQuery.$filter != null) {
                      if (!/.*\@doc\.isHidden.*/.test(JSON.stringify(this.listQuery.$filter))) {
                        this.listQuery.$filter = {
                          $and: [this.listQuery.$filter, {
                            '@doc.isHidden': false
                          }]
                        };
                      }
                    } else {
                      this.listQuery.$filter = {
                        '@doc.isHidden': false
                      };
                    }

                    for (_len3 = _args.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                      args[_key3] = _args[_key3];
                    }

                    return _context.abrupt("return", args);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function showNoHiddenByDefault() {
            return _showNoHiddenByDefault.apply(this, arguments);
          }

          return showNoHiddenByDefault;
        }()
      }, {
        key: "list",
        value: function () {
          var _list = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
            var _this2 = this;

            var _returnType, receivedQuery, voQuery, limit, skip, vlItems;

            return regenerator.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _returnType = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.ref(ResourceListResultT$1), flowRuntime_umd.ref("Promise", flowRuntime_umd.ref(ResourceListResultT$1))));
                    receivedQuery = _.pick(this.listQuery, ['$filter', '$sort', '$limit', '$offset']); // console.log('dfdfdf', receivedQuery);

                    voQuery = Module.NS.Query["new"]().forIn({
                      '@doc': this.collection.collectionFullName()
                    })["return"]('@doc');

                    if (receivedQuery.$filter) {
                      (function () {
                        var _joi$object$validate = joi.object().validate(receivedQuery.$filter),
                            error = _joi$object$validate.error;

                        if (error != null) {
                          return _this2.context["throw"](400, 'ValidationError: `$filter` must be an object', error.stack);
                        }
                      })();

                      voQuery.filter(receivedQuery.$filter);
                    }

                    if (receivedQuery.$sort) {
                      (function () {
                        var _joi$array$items$vali = joi.array().items(joi.object()).validate(receivedQuery.$sort),
                            error = _joi$array$items$vali.error;

                        if (error != null) {
                          return _this2.context["throw"](400, 'ValidationError: `$sort` must be an array');
                        }
                      })();

                      receivedQuery.$sort.forEach(function (item) {
                        return voQuery.sort(item);
                      });
                    }

                    if (receivedQuery.$limit) {
                      (function () {
                        var _joi$number$validate = joi.number().validate(receivedQuery.$limit),
                            error = _joi$number$validate.error;

                        if (error != null) {
                          return _this2.context["throw"](400, 'ValidationError: `$limit` must be a number', error.stack);
                        }
                      })();

                      voQuery.limit(receivedQuery.$limit);
                    }

                    if (receivedQuery.$offset) {
                      (function () {
                        var _joi$number$validate2 = joi.number().validate(receivedQuery.$offset),
                            error = _joi$number$validate2.error;

                        if (error != null) {
                          return _this2.context["throw"](400, 'ValidationError: `$offset` must be a number', error.stack);
                        }
                      })();

                      voQuery.offset(receivedQuery.$offset);
                    }

                    limit = voQuery.$limit != null ? Number(voQuery.$limit) : MAX_LIMIT; // console.log('sdfsdfsd voQuery', voQuery, limit);

                    if (this.needsLimitation) {
                      voQuery.limit(function () {
                        switch (false) {
                          case !(limit > MAX_LIMIT):
                          case !(limit < 0):
                          case !isNaN(limit):
                            return MAX_LIMIT;

                          default:
                            return limit;
                        }
                      }());
                    } else if (!isNaN(limit)) {
                      voQuery.limit(limit);
                    } // console.log('sdfsdfsd voQuery 22', voQuery);


                    skip = voQuery.$offset != null ? Number(voQuery.$offset) : 0;
                    voQuery.offset(function () {
                      switch (false) {
                        case !(skip < 0):
                        case !isNaN(skip):
                          return 0;

                        default:
                          return skip;
                      }
                    }()); // console.log('sdfsdfsd voQuery 33', voQuery, voQuery.$offset);

                    _context2.next = 13;
                    return this.collection.query(voQuery);

                  case 13:
                    _context2.next = 15;
                    return _context2.sent.toArray();

                  case 15:
                    vlItems = _context2.sent;
                    return _context2.abrupt("return", _returnType.assert({
                      meta: {
                        pagination: {
                          limit: voQuery.$limit != null ? voQuery.$limit : 'not defined',
                          offset: voQuery.$offset != null ? voQuery.$offset : 'not defined'
                        }
                      },
                      items: vlItems
                    }));

                  case 17:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function list() {
            return _list.apply(this, arguments);
          }

          return list;
        }()
      }, {
        key: "query",
        value: function () {
          var _query = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
            var _returnType2, body;

            return regenerator.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _returnType2 = flowRuntime_umd["return"](flowRuntime_umd.union(flowRuntime_umd.array(), flowRuntime_umd.ref("Promise", flowRuntime_umd.array())));
                    body = this.context.request.body;
                    _context3.t0 = _returnType2;
                    _context3.next = 5;
                    return this.collection.query(body.query);

                  case 5:
                    _context3.next = 7;
                    return _context3.sent.toArray();

                  case 7:
                    _context3.t1 = _context3.sent;
                    return _context3.abrupt("return", _context3.t0.assert.call(_context3.t0, _context3.t1));

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function query() {
            return _query.apply(this, arguments);
          }

          return query;
        }()
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _descriptor = applyDecoratedDescriptor(_class2.prototype, "needsLimitation", [_dec3, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return true;
      }
    }), _descriptor2 = applyDecoratedDescriptor(_class2.prototype, "listQuery", [_dec4, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return {};
      }
    }), applyDecoratedDescriptor(_class2.prototype, "getQuery", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getQuery"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "showNoHiddenByDefault", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "showNoHiddenByDefault"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "list", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "list"), _class2.prototype), applyDecoratedDescriptor(_class2.prototype, "query", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype)), _class2)) || _class) || _class) || _class);
    return Mixin;
  });
});

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var index = (function (Module) {
  var _Module$NS = Module.NS,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta;
  return ['QueryableAddon', function (BaseClass) {
    var _dec, _class, _class2, _init, _class3, _temp;

    var Mixin = (_dec = flowRuntime_umd.annotate(flowRuntime_umd["class"]("Mixin", flowRuntime_umd["extends"](BaseClass), flowRuntime_umd.staticProperty("object", flowRuntime_umd.any()))), _dec(_class = QueryableResourceMixin(_class = QueryableHttpAdapterMixin(_class = QueryableCollectionMixin(_class = GenerateAutoincrementIdMixin(_class = Query(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      inherits(Mixin, _BaseClass);

      var _super = _createSuper$5(Mixin);

      function Mixin() {
        classCallCheck(this, Mixin);

        return _super.apply(this, arguments);
      }

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
    return Mixin;
  }];
});

exports.QueryInterface = QueryInterface;
exports.QueryableCollectionInterface = QueryableCollectionInterface;
exports.default = index;
//# sourceMappingURL=index.dev.js.map
