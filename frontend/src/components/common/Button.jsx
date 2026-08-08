import clsx from "clsx";

function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  onClick,
  icon: Icon,
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700",

    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",

    outline:
      "bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50",

    success:
      "bg-emerald-600 text-white border border-emerald-600 hover:bg-emerald-700",

    danger:
      "bg-red-600 text-white border border-red-600 hover:bg-red-700",

    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        "active:scale-[0.98]",
        disabled && "cursor-not-allowed opacity-50",
        loading && "cursor-wait",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-20"
            />
            <path
              d="M22 12a10 10 0 0 0-10-10"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>

          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;