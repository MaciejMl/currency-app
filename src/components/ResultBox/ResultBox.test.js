import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';

describe('Component ResultBox', () => {
  it('should render without crushing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    const valueArray = [
      { amount: 100, usd: 28.57 },
      { amount: 50, usd: 14.29 },
      { amount: 25, usd: 7.14 },
      { amount: 10, usd: 2.86 },
    ];

    for (const value of valueArray) {
      render(<ResultBox from='PLN' to='USD' amount={value.amount} />);

      const outputField = screen.getByTestId('convertedValue');

      expect(outputField).toHaveTextContent(
        `PLN ${value.amount}.00 = $${value.usd}`
      );

      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    const valueArray = [
      { amount: 100, pln: '350.00' },
      { amount: 50, pln: '175.00' },
      { amount: 25, pln: '87.50' },
      { amount: 10, pln: '35.00' },
    ];

    for (const value of valueArray) {
      render(<ResultBox from='USD' to='PLN' amount={value.amount} />);

      const outputField = screen.getByTestId('convertedValue');

      expect(outputField).toHaveTextContent(
        `$${value.amount}.00 = PLN ${value.pln}`
      );

      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN', () => {
    const valueArray = [
      { amount: 100, pln: '100.00' },
      { amount: 50, pln: '50.00' },
      { amount: 25, pln: '25.00' },
      { amount: 10, pln: '10.00' },
    ];

    for (const value of valueArray) {
      render(<ResultBox from='PLN' to='PLN' amount={value.amount} />);

      const outputField = screen.getByTestId('convertedValue');

      expect(outputField).toHaveTextContent(
        `PLN ${value.amount}.00 = PLN ${value.pln}`
      );

      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> USD', () => {
    const valueArray = [
      { amount: 100, usd: '100.00' },
      { amount: 50, usd: '50.00' },
      { amount: 25, usd: '25.00' },
      { amount: 10, usd: '10.00' },
    ];

    for (const value of valueArray) {
      render(<ResultBox from='USD' to='USD' amount={value.amount} />);

      const outputField = screen.getByTestId('convertedValue');

      expect(outputField).toHaveTextContent(
        `$${value.amount}.00 = $${value.usd}`
      );

      cleanup();
    }
  });

  it('should render text "Wrong number.." if amount is < then zero', () => {
    const valueArray = [
      { amount: -100, from: 'PLN', to: 'PLN' },
      { amount: -50, from: 'USD', to: 'USD' },
      { amount: -25, from: 'PLN', to: 'USD' },
      { amount: -10, from: 'USD', to: 'PLN' },
    ];

    for (const value of valueArray) {
      render(
        <ResultBox from={value.from} to={value.to} amount={value.amount} />
      );

      const outputField = screen.getByTestId('convertedValue');

      expect(outputField).toHaveTextContent('Wrong value..');

      cleanup();
    }
  });
});
