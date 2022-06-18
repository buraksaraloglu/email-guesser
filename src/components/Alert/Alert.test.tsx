import { render, screen } from '@testing-library/react';

import Alert from '.';

describe('Alert', () => {
  it('renders without crashing', () => {
    const testError = new Error('This is a test error');
    const reset = () => null;

    render(<Alert error={testError} resetErrorBoundary={reset} />);

    expect(screen.getByText(testError.message)).toBeInTheDocument();
  });

  it('renders with a title', () => {
    const testError = new Error('This is a test error');
    const reset = () => null;

    render(<Alert title="Test" error={testError} resetErrorBoundary={reset} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText(testError.message)).toBeInTheDocument();
  });
});
