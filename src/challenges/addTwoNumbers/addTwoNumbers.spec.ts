import { describe, it } from 'vitest';
import { addTwoNumbers } from './addTwoNumbers';

describe('challenges - addTwoNumbers', () => {
  it('Should return reversed integer', () => {
    expect(
      addTwoNumbers(
        { val: 2, next: { val: 4, next: { val: 3, next: null } } },
        { val: 5, next: { val: 6, next: { val: 4, next: null } } }
      )
    ).toEqual({ val: 7, next: { val: 0, next: { val: 8, next: null } } });
    expect(
      addTwoNumbers({ val: 0, next: null }, { val: 0, next: null })
    ).toEqual({ val: 0, next: null });
    expect(
      addTwoNumbers(
        {
          val: 9,
          next: {
            val: 9,
            next: {
              val: 9,
              next: {
                val: 9,
                next: {
                  val: 9,
                  next: {
                    val: 9,
                    next: { val: 9, next: null },
                  },
                },
              },
            },
          },
        },
        {
          val: 9,
          next: { val: 9, next: { val: 9, next: { val: 9, next: null } } },
        }
      )
    ).toEqual({
      val: 8,
      next: {
        val: 9,
        next: {
          val: 9,
          next: {
            val: 9,
            next: {
              val: 0,
              next: { val: 0, next: { val: 0, next: { val: 1, next: null } } },
            },
          },
        },
      },
    });
  });
});
