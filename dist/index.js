"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var mockConsole = function mockConsole() {
  var originalConsole = _extends({}, console);
  console.log = jest.fn(function (string) {
    return {
      show: function show() {
        return originalConsole.log(string);
      }
    };
  });
  console.warn = jest.fn(function (string) {
    return {
      show: function show() {
        return originalConsole.warn(string);
      }
    };
  });
  console.error = jest.fn(function (string) {
    return {
      show: function show() {
        return originalConsole.error(string);
      }
    };
  });

  return function () {
    console = originalConsole;
  };
};

exports.default = mockConsole;