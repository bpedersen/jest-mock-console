"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Check to see if version before 27 where jasmine is default
if (global.jasmine) {
  var originalDescribe = jasmine.getEnv().describe;

  jasmine.getEnv().describe = function (description, specDefinitions) {
    var $jestMockConsoleEachOriginal;
    var $jestMockConsoleAllOriginal;

    var injectedSpecDefinition = function injectedSpecDefinition() {
      beforeEach(function () {
        $jestMockConsoleEachOriginal = _objectSpread({}, console);
      });
      afterEach(function () {
        global.console = $jestMockConsoleEachOriginal;
      });
      beforeAll(function () {
        $jestMockConsoleAllOriginal = _objectSpread({}, console);
      });
      afterAll(function () {
        global.console = $jestMockConsoleAllOriginal;
      });
      specDefinitions.apply(void 0, arguments);
    };

    for (var _len = arguments.length, describeArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      describeArgs[_key - 2] = arguments[_key];
    }

    return originalDescribe.apply(void 0, [description, injectedSpecDefinition].concat(describeArgs));
  };
} else {
  var _originalDescribe = describe;

  var decorateDescribe = function decorateDescribe(describeFn) {
    return function (description, specDefinitions) {
      var $jestMockConsoleEachOriginal;
      var $jestMockConsoleAllOriginal;

      var injectedSpecDefinition = function injectedSpecDefinition() {
        beforeEach(function () {
          $jestMockConsoleEachOriginal = _objectSpread({}, console);
        });
        afterEach(function () {
          global.console = $jestMockConsoleEachOriginal;
        });
        beforeAll(function () {
          $jestMockConsoleAllOriginal = _objectSpread({}, console);
        });
        afterAll(function () {
          global.console = $jestMockConsoleAllOriginal;
        });
        return specDefinitions.apply(void 0, arguments);
      };

      return describeFn(description, injectedSpecDefinition);
    };
  };

  global.describe = decorateDescribe(_originalDescribe);
  global.describe.skip = decorateDescribe(_originalDescribe.skip);
  global.describe.only = decorateDescribe(_originalDescribe.only);

  global.describe.each = function (table) {
    return decorateDescribe(_originalDescribe.each(table));
  };
}