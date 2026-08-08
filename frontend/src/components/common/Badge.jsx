import clsx from "clsx";

function Badge({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
  default: "bg-slate-100 text-slate-700",

  primary: "bg-blue-100 text-blue-700",

  success: "bg-emerald-100 text-emerald-700",

  warning: "bg-amber-100 text-amber-700",

  danger: "bg-red-100 text-red-700",

  purple: "bg-violet-100 text-violet-700",

  cyan: "bg-cyan-100 text-cyan-700",

  info: "bg-sky-100 text-sky-700",
};

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;