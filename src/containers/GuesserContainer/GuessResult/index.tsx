import GuessResult from 'components/GuessResult';

const GuessResultContainer = ({ emails }: { emails: string[] }) => {
  return (
    <>
      <h2 className="font-medium">Guess Result:</h2>
      {emails.map((email) => (
        <GuessResult key={email} email={email} />
      ))}
    </>
  );
};

export default GuessResultContainer;
