'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultKeys = ['log', 'warn', 'error'];

var mockConsole = function mockConsole(mockArg) {
  var originalConsole = _extends({}, console);
  // No argument
  if (!mockArg) {
    defaultKeys.forEach(function (key) {
      global.console[key] = jest.fn();
    });
  }
  // Argument is a string
  else if (typeof mockArg === 'string' || mockArg instanceof String) {
      global.console[mockArg] = jest.fn();
    }
    // Argument is an array
    else if (Array.isArray(mockArg)) {
        mockArg.forEach(function (key) {
          global.console[key] = jest.fn();
        });
      }
      // Argument is an object
      else {
          Object.keys(mockArg).forEach(function (key) {
            global.console[key] = mockArg[key];
          });
        }
  // Return function to restore console
  var restore = function restore() {
    return global.console = originalConsole;
  };
  return function () {
    global.console = originalConsole;
  };
};

exports.default = mockConsole;