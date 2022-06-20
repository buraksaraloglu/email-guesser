/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';

import Alert from '.';

const resetFunction = jest.fn();
describe('Alert', () => {
  test.each([
    { error: new Error('Error message'), reset: resetFunction, title: undefined },
    { error: new Error('Error message'), reset: resetFunction, title: 'Test Title' },
  ])('should render with title: $title', ({ error, reset, title }) => {
    render(<Alert title={title} error={error} resetErrorBoundary={reset} />);

    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});
