const lib = require('../exercise1');

describe('fizzBuzz', () => {
  it('throws if input NaN', () => {
    const args = [ null, undefined, "", false, 'string', {id:1} ];

    args.forEach( a => {
      expect(() => { lib.fizzBuzz(a)}).toThrow();
    })
  });

  it('returns Fizz if % 3 === 0', () => {
    const args = [ 3, 6, 12, 18];

    args.forEach( a => {
      expect(lib.fizzBuzz(a)).toBe('Fizz');
    })
  });

  it('returns Buzz if % 5 === 0', () => {
    const args = [ 5, 10, 20, 25];

    args.forEach( a => {
      expect(lib.fizzBuzz(a)).toBe('Buzz');
    })
  });

  it('returns FizzBuzz if % 5 && %3 === 0', () => {
    const args = [ 15, 30, 45, 60];

    args.forEach( a => {
      expect(lib.fizzBuzz(a)).toBe('FizzBuzz');
    })
  });

  it('returns input if % 5 || %3 !== 0', () => {
    const args = [ 2, 7, 11, 13];

    args.forEach( a => {
      expect(lib.fizzBuzz(a)).toEqual(a);
    })
  });

});
