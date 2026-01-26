import { GlobalCounter } from './index';

describe('GlobalCounter (isolated tests)', () => {

  const importCounter = () => {
    let CounterClass: typeof import('./index').GlobalCounter;
    jest.isolateModules(() => {
      CounterClass = require('./index').GlobalCounter;
    });
    return CounterClass!;
  };

  it('has initial value 0', () => {
    const Counter = importCounter();
    expect(Counter.getValue()).toBe(0);
  });

  it('increments counter', () => {
    const Counter = importCounter();
    Counter.increment();
    expect(Counter.getValue()).toBe(1);
  });

  it('decrements counter', () => {
    const Counter = importCounter();
    Counter.decrement();
    expect(Counter.getValue()).toBe(-1);
  });

  it('multiplies counter', () => {
    const Counter = importCounter();
    Counter.increment();      // 0 -> 1
    Counter.multiply(5);      // 1 -> 5
    expect(Counter.getValue()).toBe(5);
  });

  it('does not affect other tests', () => {
    const Counter = importCounter();
    expect(Counter.getValue()).toBe(0); // fresh module, count reset
  });

});
