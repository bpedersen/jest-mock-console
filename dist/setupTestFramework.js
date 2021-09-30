"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var originalDescribe = describe; // Check to see if version before 27 where jasmine is default

var jestVersion = require("jest/package.json").version;

var _jestVersion$split = jestVersion.split("."),
    _jestVersion$split2 = _slicedToArray(_jestVersion$split, 1),
    majorVersion = _jestVersion$split2[0];

if (majorVersion < 27) {
  jasmine.getEnv().describe = function (description, specDefinitions) {
    var $jestMockConsoleOriginal;

    var injectedSpecDefinition = function injectedSpecDefinition() {
      beforeEach(function () {
        $jestMockConsoleOriginal = _objectSpread({}, console);
      });
      afterEach(function () {
        global.console = $jestMockConsoleOriginal;
      });
      specDefinitions.apply(void 0, arguments);
    };

    for (var _len = arguments.length, describeArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      describeArgs[_key - 2] = arguments[_key];
    }

    return originalDescribe.apply(void 0, [description, injectedSpecDefinition].concat(describeArgs));
  };
} else {
  describe = function describe(description, specDefinitions) {
    var $jestMockConsoleOriginal;

    var injectedSpecDefinition = function injectedSpecDefinition() {
      beforeEach(function () {
        $jestMockConsoleOriginal = _objectSpread({}, console);
      });
      afterEach(function () {
        global.console = $jestMockConsoleOriginal;
      });
      return specDefinitions.apply(void 0, arguments);
    };

    return originalDescribe(description, injectedSpecDefinition);
  };
}