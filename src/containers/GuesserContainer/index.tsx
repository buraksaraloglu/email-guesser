import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGuessEmail } from 'hooks/useGuessEmail';
import { classNames } from 'utils';
import { isValidFullName, isValidUrl } from 'utils/validatiors';
import { MAX_LENGTHS } from 'utils/constants';
import Input from 'components/Input';
import GuessResultContainer from './GuessResult';
import Checkbox from 'components/Checkbox';
import { useLocalStorage } from 'hooks/useLocalStorage';

enum FORM_KEYS {
  fullName = 'fullName',
  domainUrl = 'domainUrl',
}

export interface IFormData {
  fullName: string;
  domainUrl: string;
}

const GuesserContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<IFormData>();

  const [shouldKeepCompanyUrl, setShouldKeepCompanyUrl] = useLocalStorage(
    'shouldKeepCompanyUrl',
    JSON.stringify(false)
  );

  const { data: guessedEmails, loading, fetchData } = useGuessEmail();

  const onSubmit = async (data: IFormData) => {
    try {
      await fetchData(data);
      reset({
        [FORM_KEYS.fullName]: '',
        ...(!shouldKeepCompanyUrl ? { [FORM_KEYS.domainUrl]: '' } : {}),
      });
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    setFocus(FORM_KEYS.fullName);
  }, [setFocus]);

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-3xl lg:p-8">
      <h1 className="mb-5 text-xl font-medium">Email Guesser</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full transition-all duration-200 sm:gap-4"
      >
        <Input
          label="Full name"
          placeholder="Enter a full name (e.g. John Doe)"
          disabled={loading}
          {...register(FORM_KEYS.fullName, {
            required: 'Full name is required',
            maxLength: {
              value: MAX_LENGTHS.FULL_NAME,
              message: 'Full name is too long',
            },
            validate: {
              invalid: (v) => isValidFullName(v) || 'Full name is invalid',
            },
          })}
          error={errors.fullName?.message}
        />
        <Input
          label="Company URL"
          placeholder="Enter a company URL (e.g. babbel.com)"
          disabled={loading}
          {...register(FORM_KEYS.domainUrl, {
            required: 'Company URL is required',
            maxLength: {
              value: MAX_LENGTHS.DOMAIN_URL,
              message: 'Company URL is too long',
            },
            validate: {
              invalid: (v) => isValidUrl(v) || 'Company URL is invalid',
            },
          })}
          error={errors.domainUrl?.message}
        />
        <Checkbox
          checked={shouldKeepCompanyUrl}
          onChange={(e) => setShouldKeepCompanyUrl(e.target.checked)}
          label="Keep company URL"
          disabled={loading}
          name="keepCompanyUrl"
        />

        <button type="submit" className={classNames('btn', 'btn-primary', loading && 'loading btn-disabled')}>
          {loading ? 'Guessing...' : 'Guess email'}
        </button>
      </form>
      {guessedEmails?.length ? (
        <>
          <div className="divider" />
          <GuessResultContainer emails={guessedEmails} />
        </>
      ) : null}
    </div>
  );
};

export default GuesserContainer;
