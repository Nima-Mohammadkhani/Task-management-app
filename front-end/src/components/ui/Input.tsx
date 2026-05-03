import { forwardRef, useState, memo } from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { InputProps } from "../../types/ui";

const Input = memo(forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      secureTextEntry,
      secureToggle = false,
      containerClassName = "",
      inputClassName = "",
      multiline = false,
      rows = 3,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [hidePassword, setHidePassword] = useState(!!secureTextEntry);

    const baseInputClasses = cn(
      "w-full py-2 px-3 text-base outline-none bg-transparent rounded-xl",
      "transition-all duration-200",
      inputClassName,
    );

    const handleTogglePassword = () => {
      setHidePassword(!hidePassword);
    };

    const inputElement = multiline ? (
      <textarea
        className={baseInputClasses}
        rows={rows}
        value={value}
        onChange={onChange}
        {...(props as any)}
      />
    ) : (
      <input
        ref={ref}
        type={hidePassword ? "password" : "text"}
        className={baseInputClasses}
        value={value}
        onChange={onChange}
        {...props}
      />
    );

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label className="block text-sm font-medium text-base-content mb-2">
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center border rounded-xl transition-all duration-200 bg-base-100",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            error && "border-red-500 ring-2 ring-red-500/20",
          )}
        >
          {leftIcon && <span className="mr-2 text-gray-400">{leftIcon}</span>}
          
          {inputElement}
          
          {secureToggle ? (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {hidePassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          ) : (
            rightIcon && <span className="ml-2 text-gray-400">{rightIcon}</span>
          )}
        </div>

        {error && <p className="mt-1 text-error text-sm">{error}</p>}
      </div>
    );
  },
));

Input.displayName = "Input";
export default Input;