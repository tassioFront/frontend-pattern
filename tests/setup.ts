import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});

afterEach(() => {
  cleanup();
});
