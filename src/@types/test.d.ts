/// <reference types="node" />
/// <reference types="jest" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}
