/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveValue(value: string | number | null): R;
    }
  }
}
