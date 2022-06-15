import { useClipboard } from 'hooks/useClipboard';

interface IGuessResult {
  email: string;
}

const GuessResult = ({ email }: IGuessResult) => {
  const { copied, copyToClipboard } = useClipboard();

  const actionButtonClassNames = 'shrink w-full sm:w-auto btn btn-sm sm:btn-xs min-w-max';

  return (
    <div className="flex flex-col gap-4 justify-between items-center p-3 mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg sm:flex-row sm:gap-8">
      <span className="text-sm break-all">{email}</span>
      <div className="flex gap-2 w-full sm:justify-end sm:w-auto">
        <button
          className={actionButtonClassNames}
          onClick={() => {
            copyToClipboard(email);
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
        <a className={actionButtonClassNames} href={`mailto:${email}`}>
          send mail
        </a>
      </div>
    </div>
  );
};

export default GuessResult;
