// Type definitions for jest-mock-console 0.3.7
// Project: jest-mock-console
// Definitions by: Quentin Golsteyn https://github.com/qgolsteyn
export = MockConsole;

declare function MockConsole(): MockConsole.RestoreConsole;
declare function MockConsole(mockArg: MockConsole.ConsoleProps | MockConsole.ConsoleProps[] | MockConsole.MockObj): MockConsole.RestoreConsole;

declare namespace MockConsole {
    type ConsoleProps = keyof Console;
    type MockObj = {[key in ConsoleProps]?: Console[key]};
    type RestoreConsole = () => void;
}