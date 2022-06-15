import { EMAIL_GUESSER_SERVICE_URL } from 'utils/constants';

export const guessEmail = async ({ fullName, domainUrl }: { fullName: string; domainUrl: string }) => {
  try {
    const response = await fetch(`${EMAIL_GUESSER_SERVICE_URL}/v1/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, domainUrl }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(typeof error === 'string' ? error : 'Unknown error');
  }
};
