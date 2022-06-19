import { useGuessEmail } from 'hooks/useGuessEmail';
import GuessEmailForm from 'components/GuessEmailForm';
import GuessResultContainer from 'components/GuessResults';

import type { IGuessEmailForm } from 'utils/types';

const GuesserContainer = () => {
  const { data: guessedEmails, loading, fetchData } = useGuessEmail();

  const onSubmit = async (data: IGuessEmailForm) => {
    try {
      await fetchData(data);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-3xl lg:p-8">
      <h1 className="mb-5 text-xl font-medium">Email Guesser</h1>
      <GuessEmailForm onSubmit={onSubmit} loading={loading} shouldResetAfterSubmit />
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
