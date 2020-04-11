/* eslint-disable no-undef */
import { asyncForEach } from '../src/utils/asyncUtils';

describe('testing utility functions', () => {
  test('calls asyncForEach', async () => {
    let sum = 0;
    await asyncForEach([1, 2, 3], (num: number) => {
      sum += num;
    });
    expect(sum).toEqual(6);
  });
});
