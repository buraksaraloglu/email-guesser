import { useState } from 'react';
import { toast } from 'react-toastify';

import { guessEmail } from 'api/guessEmail';
import { isValidFullName, isValidUrl } from 'utils/validatiors';
import type { IGuessEmailForm } from 'utils/types';

export const useGuessEmail = () => {
  const [data, setData] = useState<Set<string>>(() => new Set());
  const [loading, setLoading] = useState(false);

  const fetchData = async (requestBody: IGuessEmailForm) => {
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
      toast(error.message, { type: 'error', autoClose: 3000 });
    }
    setLoading(false);
  };

  return { data: Array.from(data).reverse(), loading, fetchData };
};
