"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _console = _extends({}, console),
    log = _console.log,
    warn = _console.warn,
    error = _console.error;

var originalDescribe = jasmine.getEnv().describe;

jasmine.getEnv().describe = function (description, specDefinitions) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var injectedSpecDefinition = function injectedSpecDefinition() {
    afterEach(function () {
      console.log = log;
      console.warn = warn;
      console.error = error;
    });
    specDefinitions();
  };
  return originalDescribe.apply(undefined, [description, injectedSpecDefinition].concat(args));
};