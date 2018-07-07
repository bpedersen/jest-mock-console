// Type definitions for jest-mock-console 0.3.7
// Project: jest-mock-console
// Definitions by: Quentin Golsteyn https://github.com/qgolsteyn

type DefaultConsole = Console;
type ConsoleProps = keyof DefaultConsole;

declare module 'jest-mock-console' {
    export default function MockConsole(): RestoreConsole;
    export default function MockConsole(mockArg: ConsoleProps): RestoreConsole;
    export default function MockConsole(mockArg: ConsoleProps[]): RestoreConsole;
    export default function MockConsole(mockArg: MockObj): RestoreConsole;

    type MockObj = {[key in ConsoleProps]?: DefaultConsole[key]};
    type RestoreConsole = () => void;
}