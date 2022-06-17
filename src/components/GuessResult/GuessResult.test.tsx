import { render } from '@testing-library/react';

import GuessResult from '.';

describe('GuessResult component', () => {
  it('should render correctly', () => {
    const testEmail = 'buraksaraloglu1@gmail.com';
    const { getByText, getByRole } = render(<GuessResult email={testEmail} />);
    expect(getByText(testEmail)).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', `mailto:${testEmail}`);
  });
});
