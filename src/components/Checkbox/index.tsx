interface ICheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string | undefined;
}

const Checkbox = ({ checked, onChange, label, name, disabled, error }: ICheckboxProps) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="justify-start cursor-pointer label">
        <input
          id={name}
          name={name}
          className="checkbox checkbox-primary"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="ml-4 label-text">{label}</span>
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
