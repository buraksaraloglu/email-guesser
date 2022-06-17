import type { FallbackProps } from 'react-error-boundary';

interface IAlert extends FallbackProps {
  title?: string;
}

const Alert = (props: IAlert) => {
  const { title, error } = props;
  return (
    <div className="items-start shadow-lg alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 w-6 h-6 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="block">
        {title && <h3 className="font-bold">{title}</h3>}
        <div className="text-xs">{error.message}</div>
        <div className="text-xs">{error.stack}</div>
      </div>
    </div>
  );
};

export default Alert;
