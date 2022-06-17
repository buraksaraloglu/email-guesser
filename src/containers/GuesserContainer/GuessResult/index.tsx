import useClipboard from 'use-clipboard-api';

import GuessResult from 'components/GuessResult';

const GuessResultContainer = ({ emails }: { emails: string[] }) => {
  const [copiedValue, copy] = useClipboard();

  return (
    <>
      <h2 className="font-medium">Guess Results:</h2>
      {emails.map((email) => (
        <GuessResult key={email} email={email} isCopied={copiedValue === email} copy={copy} />
        // <GuessResult key={email} email={email} />
      ))}
    </>
  );
};

export default GuessResultContainer;