import { EMAIL_GUESSER_SERVICE_URL } from 'utils/constants';
import type { IGuessEmailForm } from 'utils/types';

export const guessEmail = async ({ fullName, domainUrl }: IGuessEmailForm) => {
  try {
    const response = await fetch(`${EMAIL_GUESSER_SERVICE_URL}/v1/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, domainUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} ${data.error ?? response.statusText}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(typeof error === 'string' ? error : 'Unknown error');
  }
};
