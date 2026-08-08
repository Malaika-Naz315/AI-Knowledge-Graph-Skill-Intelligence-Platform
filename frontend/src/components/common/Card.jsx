import clsx from "clsx";

function Card({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}) {
  return (
    <div
      className={clsx(
        "bg-white border border-slate-200 rounded-xl shadow-sm",
        hover &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        padding,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;