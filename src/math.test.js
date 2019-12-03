function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error();
  }
  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error();
  }
  return x + y;
}

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(3, 4)).toBe(7);
  });

  it('add two negative numbers', () => {
    expect(add(-3, -4)).toBe(-7);
  });

  it('throws when given non numbers', () => {
    expect(() => add('3', '4')).toThrow();
    expect(() => add(3, NaN)).toThrow();
  });
});
