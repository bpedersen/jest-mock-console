"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var originalDescribe = jasmine.getEnv().describe;

jasmine.getEnv().describe = function (description, specDefinitions) {
  for (var _len = arguments.length, describeArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    describeArgs[_key - 2] = arguments[_key];
  }

  var $jestMockConsoleOriginal = void 0;
  var injectedSpecDefinition = function injectedSpecDefinition() {
    beforeEach(function () {
      $jestMockConsoleOriginal = _extends({}, console);
    });
    afterEach(function () {
      global.console = $jestMockConsoleOriginal;
    });
    specDefinitions.apply(undefined, arguments);
  };
  return originalDescribe.apply(undefined, [description, injectedSpecDefinition].concat(describeArgs));
};