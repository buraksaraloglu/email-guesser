import { useState } from 'react';

import { guessEmail } from 'api/guessEmail';
import { isValidFullName, isValidUrl } from 'utils/validatiors';
import type { IFormData } from 'containers/GuesserContainer';

export const useGuessEmail = () => {
  const [data, setData] = useState<Set<string>>(() => new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (requestBody: IFormData) => {
    try {
      if (!isValidFullName(requestBody.fullName)) {
        throw new Error('Invalid full name');
      }

      if (!isValidUrl(requestBody.domainUrl)) {
        throw new Error('Invalid domain url');
      }
      setLoading(true);

      const { email } = await guessEmail(requestBody);

      // Instead of adding the same guessed email multiple times,
      // we add it to the set of emails and then convert it to an array
      if (data.has(email)) {
        setData((prevEmails) => {
          prevEmails.delete(email);
          return prevEmails;
        });
      }

      setData((prevEmails) => prevEmails.add(email));
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return { data: Array.from(data).reverse(), loading, error, fetchData };
};
