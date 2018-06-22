# jest-mock-console
Jest utility to mock the console

[![codecov][codecov-badge]][codecov]
[![build][build-badge]][build]
[![Dependencies][dependencyci-badge]][dependencyci]
[![MIT License][license-badge]][license]


## Table of Contents

* [Problem](#the-problem)
* [Solution](#the-solution)
* [Installation](#installation)
* [Basic Example](#basic-example)
* [Advanced Example](#setuptestframework)
* [mockConsole(mocks)](#mockconsolemocks)
  * [default](#mock-default)
  * [string](#mock-string)
  * [array](#mock-array)
  * [object](#mock-object)

## The problem
If you use console or prop-types in your app, and you use jest then you end up with tests that look like:

<img
  src="https://github.com/pieredome/jest-mock-console/raw/master/img/screenshot-problem.png"
  alt="Terminal Screenshot"
  title="Terminal Screenshot"
  width="500px"
/>

This is not helpful as all of the tests have passed, but you are seeing red. It is especially unhelpful when there is an actual failure as you have to search through all the red to find the actual failed test.

## The solution
This allows you to mock and unmock the console at will, so your tests look like:

<img
  src="https://github.com/pieredome/jest-mock-console/raw/master/img/screenshot-solution.png"
  alt="Terminal Screenshot"
  title="Terminal Screenshot"
  width="500px"
/>

This is much more helpful as you don't see red on success anymore. Then you know when you see red text you know something went wrong.

## Installation

This module is distributed view [npm][npm] which is bundled with [node][node] and should be installed as one of your project's `devDependencies`:

```
npm install --save-dev jest-mock-console
```

## Basic Example

At the top of your test file:

```javascript
import mockConsole from 'jest-mock-console';
```

Then your tests
```javascript
describe(...
  it(...
    const restoreConsole = mockConsole();  // mockConsole returns a function to restore it back to normal
    console.error('This will not show in the test report');
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
  )
)
```

However you always need to restore the console after each test or you will break jest. This is where the [setupTestFramework](#setuptestframework) file comes in.


## Advanced Example

If you don't want to worry about accidentally forgetting to `restoreConsole()` after your tests you can modify jest to unmock after every `it(...)`.

In your jest config:

```javascript
  "setupTestFrameworkScriptFile": "jest-mock-console/dist/setupTestFramework.js"
```

Then in your test files:

```javascript
import mockConsole from 'jest-mock-console';

describe(...
  it(...
    mockConsole();
    console.error('This will not show in the test report');
    expect(console.error).toHaveBeenCalled();
    // No need for restoreConsole as it is called after every `it(...)`
  )
)
```

## mockConsole(mocks)

* **`mocks[string,array,object]`**: The properties of the console you want to mock. Defaults to ['log','warn','error']
  * <a id='mock-default'></a> default - Will mock console.log, console.warn, and console.error
    * `mockConsole()` same as `mockConsole(['log','warn','error'])`
  * <a id='mock-string'></a> string - You can mock a single function
    * `mockConsole('error')`
  * <a id='mock-array'></a> array - You can mock multiple functions
    * `mockConsole(['log', 'info'])`
  * <a id='mock-object'></a> object - You can set custom functions for console
    * ``mockConsole({error: (string) => console.log(`console.error of: ${string}`)})``


## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org/
[codecov-badge]: https://codecov.io/gh/PiereDome/jest-mock-console/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/PiereDome/jest-mock-console
[build-badge]: https://travis-ci.org/PiereDome/jest-mock-console.svg
[build]: https://travis-ci.org/PiereDome/jest-mock-console
[dependencyci-badge]: https://dependencyci.com/github/PiereDome/jest-mock-console/badge
[dependencyci]: https://dependencyci.com/github/PiereDome/jest-mock-console
[license-badge]: https://img.shields.io/npm/l/jest-mock-console.svg
[license]: https://github.com/PiereDome/jest-mock-console/blob/master/other/LICENSE