import { FaInbox } from "react-icons/fa";
import Button from "./Button";

function EmptyState({
  title = "No Data Found",
  description = "There are no records available at the moment.",
  buttonText,
  onButtonClick,
  icon: Icon = FaInbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <Icon className="text-3xl text-slate-500" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {buttonText && (
        <div className="mt-8">
          <Button onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      )}

    </div>
  );
}

export default EmptyState;