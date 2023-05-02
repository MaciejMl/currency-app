import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is string', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-344')).toBeNaN();
  });

  it('should return NaN when there is no input', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return error when input is NaN or string', () => {
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function () {})).toBe('Error');
  });

  it('should return $0.00 when input is less then "zero"', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-10)).toBe('$0.00');
    expect(convertPLNToUSD(-233)).toBe('$0.00');
  });
});
