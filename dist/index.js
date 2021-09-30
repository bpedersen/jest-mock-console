"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultKeys = ['log', 'warn', 'error'];

var mockConsole = function mockConsole(mockArg) {
  var originalConsole = _objectSpread({}, console); // No argument


  if (!mockArg) {
    defaultKeys.forEach(function (key) {
      global.console[key] = jest.fn();
    });
  } // Argument is a string
  else if (typeof mockArg === 'string' || mockArg instanceof String) {
    global.console[mockArg] = jest.fn();
  } // Argument is an array
  else if (Array.isArray(mockArg)) {
    mockArg.forEach(function (key) {
      global.console[key] = jest.fn();
    });
  } // Argument is an object
  else {
    Object.keys(mockArg).forEach(function (key) {
      global.console[key] = mockArg[key];
    });
  } // Return function to restore console


  return function () {
    global.console = originalConsole;
  };
};

var _default = mockConsole;
exports.default = _default;