function FormField({
  label,
  icon,
  error,
  rightElement,
  wrapperClassName = "",
  required,
  multiline,
  rows = 3,
  ...props
}) {
  const Field = multiline ? "textarea" : "input";

  return (
    <label className={`block ${wrapperClassName}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-400">
        {label}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </span>
      <div className={`relative flex ${multiline ? "items-start" : "items-center"}`}>
        {icon && (
          <span
            className={`pointer-events-none absolute left-3.5 flex h-5 w-5 items-center justify-center text-slate-400 ${
              multiline ? "top-3" : ""
            }`}
          >
            {icon}
          </span>
        )}
        <Field
          rows={multiline ? rows : undefined}
          required={required}
          className={`w-full rounded-lg border bg-slate-50 py-2.5 text-[0.925rem] text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:bg-slate-800 ${
            icon ? "pl-10" : "pl-3.5"
          } ${rightElement ? "pr-10" : "pr-3.5"} ${error ? "border-red-300 dark:border-red-900/60" : "border-slate-200 dark:border-slate-700"} ${
            multiline ? "resize-none" : ""
          }`}
          {...props}
        />
        {rightElement && (
          <span className="absolute right-3.5 flex h-5 w-5 items-center justify-center">{rightElement}</span>
        )}
      </div>
      {error && <span className="mt-1.5 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}

export default FormField;
