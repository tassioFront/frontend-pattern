import { describe, it } from 'vitest';
import { calcTodoProgress } from '../calcTodoProgress';

describe('helpers -> calcTodoProgress', () => {
  it('Should calculate fake todo progress', () => {
    expect(
      calcTodoProgress({
        total: 2,
        done: 0,
        inProgress: 0,
      })
    ).toBe(0);

    expect(
      calcTodoProgress({
        total: 2,
        done: 0,
        inProgress: 2,
      })
    ).toBe(50);

    expect(
      calcTodoProgress({
        total: 2,
        done: 2,
        inProgress: 0,
      })
    ).toBe(100);

    expect(
      calcTodoProgress({
        total: 2,
        done: 1,
        inProgress: 1,
      })
    ).toBe(75);

    expect(
      calcTodoProgress({
        total: 2,
        done: 1,
        inProgress: 0,
      })
    ).toBe(50);

    expect(
      calcTodoProgress({
        total: 3,
        done: 1,
        inProgress: 0,
      })
    ).toBe(33);

    expect(
      calcTodoProgress({
        total: 3,
        done: 2,
        inProgress: 0,
      })
    ).toBe(67);
  });
});
