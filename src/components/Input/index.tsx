import { forwardRef } from 'react';

import { classNames } from 'utils';

interface IInputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string | undefined;
}

const Input = forwardRef(
  (
    { label, name, type = 'text', value, onChange, placeholder, error, disabled, ...rest }: IInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="w-full form-control">
        <label htmlFor={name} className="label label-text">
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          className={classNames(
            'w-full',
            'input',
            'input-bordered',
            error && 'input-error',
            disabled && 'input-disabled'
          )}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

export default Input;
