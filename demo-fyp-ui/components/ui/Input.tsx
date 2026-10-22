import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  helperText,
  error,
  leftIcon,
  rightElement,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-slate-500 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          {...props}
          className={cn(
            "w-full h-10 rounded-xl bg-slate-900 border text-sm text-slate-100",
            "placeholder:text-slate-500",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500/50",
            error
              ? "border-red-500/50 focus:ring-red-500/40"
              : "border-slate-700/60 hover:border-slate-600/60",
            leftIcon ? "pl-9" : "pl-3.5",
            rightElement ? "pr-10" : "pr-3.5",
            className
          )}
        />

        {rightElement && (
          <span className="absolute right-3 text-slate-500">
            {rightElement}
          </span>
        )}
      </div>

      {(helperText || error) && (
        <p
          className={cn(
            "text-xs",
            error ? "text-red-400" : "text-slate-500"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
