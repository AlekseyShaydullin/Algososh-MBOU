import { ElementStates } from '../../types/element-states';
import {reverseAlgorithm} from './reverseAlgorithm';

describe('Test reverse string algorithm', () => {
  const setReverse = jest.fn();

  it('correct reversal with an even number of characters', async () => {
    const string = '1234';
    const arr = string.split('').map(letter => ({letter, state: ElementStates.Default}));

    const reverseString = '4321';
    const reverseArr = reverseString.split('').map(letter => ({letter, state: ElementStates.Modified}));

    await reverseAlgorithm(arr, setReverse);
    expect(setReverse).toHaveBeenCalledWith(reverseArr);
  });

  it('correct reversal with an odd number of characters', async () => {
    const string = '12345';
    const arr = string.split('').map(letter => ({letter, state: ElementStates.Default}));

    const reverseString = '54321';
    const reverseArr = reverseString.split('').map(letter => ({letter, state: ElementStates.Modified}));

    await reverseAlgorithm(arr, setReverse);
    expect(setReverse).toHaveBeenCalledWith(reverseArr);
  });

  it('correct reversal with one character', async () => {
    const string = '5';
    const arr = string.split('').map(letter => ({letter, state: ElementStates.Default}));

    const reverseString = '5';
    const reverseArr = reverseString.split('').map(letter => ({letter, state: ElementStates.Modified}));

    await reverseAlgorithm(arr, setReverse);
    expect(setReverse).toHaveBeenCalledWith(reverseArr);
  });

  it('correct reversal of an empty string', async () => {
    const string = '';
    const arr = string.split('').map(letter => ({letter, state: ElementStates.Default}));

    await reverseAlgorithm(arr, setReverse);
    expect(setReverse).toHaveBeenCalledTimes(0);
  });
})