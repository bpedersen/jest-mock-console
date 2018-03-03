# jest-mock-console

Jest utility to mock the console

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

This is much more helpful as you don't see red unless there is a failure. Then you only have to scan for red to find the problem test.

## Installation

This module is distributed view [npm][npm] which is bundled with [node][node] and should be installed as one of your project's `devDependencies`:

```
npm install --save-dev jest-mock-console
```

## Usage

At the top of your test file:

```javascript
import mockConsole from 'jest-mock-console';

describe(...
  it(...
    const restoreConsole = mockConsole();
    console.error('This will not show in the test report');
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
  )
)
```

## Advanced Usage

If you don't want to worry about accidentally forgetting to `restoreConsole()` after your tests you can modify jest to unmock after every `it(...)`.

In your jest config:

```javascript
  "setupTestFrameworkScriptFile": "jest-mock-console/setupTestFramework.js"
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