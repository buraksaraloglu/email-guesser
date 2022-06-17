import 'whatwg-fetch';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';

import { guessEmailMock } from 'mocks/guessEmail';
import GuesserContainer from '.';

jest.mock('use-clipboard-api', () => {
  const useClipboard = jest.fn();
  useClipboard.mockImplementation(() => ['', jest.fn()]);
  return useClipboard;
});

const server = setupServer(guessEmailMock);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

beforeEach(() => {
  render(<GuesserContainer />);
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe('GuesserContainer', () => {
  it('should render correctly', () => {
    const title = screen.getByRole('heading', {
      level: 1,
      name: /email guesser/i,
    });
    expect(title).toBeInTheDocument();

    const fullNameInput = screen.getByRole('textbox', { name: /full name/i });

    expect(fullNameInput).toBeInTheDocument();
    expect(fullNameInput).toHaveFocus();

    const companyUrlInput = screen.getByRole('textbox', { name: /company url/i });
    expect(companyUrlInput).toBeInTheDocument();

    const guessButton = screen.getByRole('button', { name: /guess/i });
    expect(guessButton).toBeInTheDocument();
  });

  it('should render error messages when all form states empty', async () => {
    const guessButton = screen.getByRole('button', { name: /guess email/i });
    expect(guessButton).toBeInTheDocument();

    fireEvent.click(guessButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/company url is required/i)).toBeInTheDocument();
    });
  });

  it('should render invalid full name error', async () => {
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i });
    const guessButton = screen.getByRole('button', { name: /guess email/i });

    fireEvent.change(fullNameInput, { target: { value: 'invalid' } });

    expect(guessButton).toBeInTheDocument();

    fireEvent.click(guessButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is invalid/i)).toBeInTheDocument();
      expect(screen.getByText(/company url is required/i)).toBeInTheDocument();
    });
  });

  it('should render invalid company url error', async () => {
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i });
    const companyUrlInput = screen.getByRole('textbox', { name: /company url/i });
    const guessButton = screen.getByRole('button', { name: /guess email/i });

    fireEvent.change(fullNameInput, { target: { value: 'name surname' } });
    fireEvent.change(companyUrlInput, { target: { value: 'invalid' } });

    fireEvent.click(guessButton);

    await waitFor(() => {
      expect(screen.getByText(/company url is invalid/i)).toBeInTheDocument();
    });
  });

  it('should render invalid company url error', async () => {
    const fullNameInput = screen.getByRole('textbox', { name: /company url/i });
    const companyUrlInput = screen.getByRole('textbox', { name: /company url/i });
    const guessButton = screen.getByRole('button', { name: /guess email/i });

    fireEvent.change(fullNameInput, { target: { value: 'name surname' } });
    fireEvent.change(companyUrlInput, { target: { value: 'invalid' } });

    fireEvent.click(guessButton);

    await waitFor(() => {
      expect(screen.getByText(/company url is invalid/i)).toBeInTheDocument();
    });
  });

  it('should remove errors when inputs are correct', async () => {
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i });
    const companyUrlInput = screen.getByRole('textbox', { name: /company url/i });
    const guessButton = screen.getByRole('button', { name: /guess email/i });

    fireEvent.change(fullNameInput, { target: { value: 'invalid' } });
    fireEvent.change(companyUrlInput, { target: { value: 'invalid' } });

    fireEvent.click(guessButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is invalid/i)).toBeInTheDocument();
      expect(screen.getByText(/company url is invalid/i)).toBeInTheDocument();
    });

    fireEvent.change(fullNameInput, { target: { value: 'test user' } });
    fireEvent.change(companyUrlInput, { target: { value: 'domain.com' } });
    fireEvent.click(guessButton);

    await waitFor(() => {
      expect(screen.queryByText(/full name is invalid/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/company url is invalid/i)).not.toBeInTheDocument();
    });
  });

  it('should submit a request successfully', async () => {
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i });
    const companyUrlInput = screen.getByRole('textbox', { name: /company url/i });
    const guessButton = screen.getByRole('button', { name: /guess email/i });

    fireEvent.change(fullNameInput, { target: { value: 'test user' } });
    fireEvent.change(companyUrlInput, { target: { value: 'domain.com' } });
    fireEvent.submit(guessButton);

    await waitFor(() => {
      expect(screen.getByText(/guess results/i)).toBeInTheDocument();
      expect(screen.getByText('testuser@domain.com')).toBeInTheDocument();
    });
  });
});
