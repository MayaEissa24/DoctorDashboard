import { useId } from "react";

function Checkbox({ checked, onChange, children, className = "", labelClassName = "", disabled = false, id, ...props }) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const box = (
    <input
      id={checkboxId}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="h-4 w-4 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-900"
      {...props}
    />
  );

  if (!children) {
    return <span className={`inline-flex ${className}`}>{box}</span>;
  }

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400 ${className}`}
    >
      {box}
      <span className={labelClassName}>{children}</span>
    </label>
  );
}

export default Checkbox;