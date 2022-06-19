import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { classNames } from 'utils';
import { isValidFullName, isValidUrl } from 'utils/validatiors';
import { MAX_LENGTHS } from 'utils/constants';
import { GUESS_EMAIL_FORM_KEYS, IGuessEmailForm } from 'utils/types';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface IGuessEmailFormProps {
  onSubmit: (data: IGuessEmailForm) => void;
  loading: boolean;
  shouldResetAfterSubmit: boolean;
}

const GuessEmailForm = ({ onSubmit, loading, shouldResetAfterSubmit }: IGuessEmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<IGuessEmailForm>();

  const [shouldKeepCompanyUrl, setShouldKeepCompanyUrl] = useLocalStorage('shouldKeepCompanyUrl', false);

  const handleFormSubmit = (data: IGuessEmailForm) => {
    onSubmit(data);

    if (shouldResetAfterSubmit) {
      reset({
        [GUESS_EMAIL_FORM_KEYS.fullName]: '',
        [GUESS_EMAIL_FORM_KEYS.companyUrl]: shouldKeepCompanyUrl ? data.companyUrl : '',
      });
    }
  };

  useEffect(() => {
    setFocus(GUESS_EMAIL_FORM_KEYS.fullName);
  }, [setFocus]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-1 w-full transition-all duration-200 sm:gap-4"
    >
      <Input
        label="Full name"
        placeholder="Enter a full name (e.g. Jane Doe)"
        disabled={loading}
        {...register(GUESS_EMAIL_FORM_KEYS.fullName, {
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
        {...register(GUESS_EMAIL_FORM_KEYS.companyUrl, {
          required: 'Company URL is required',
          maxLength: {
            value: MAX_LENGTHS.COMPANY_URL,
            message: 'Company URL is too long',
          },
          validate: {
            invalid: (v) => isValidUrl(v) || 'Company URL is invalid',
          },
        })}
        error={errors.companyUrl?.message}
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
  );
};

export default GuessEmailForm;
