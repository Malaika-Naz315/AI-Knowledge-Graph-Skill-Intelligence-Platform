import Button from "./Button";

function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
  children,
}) {
  return (
    <div className="mb-7 flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
      {/* Left */}

      <div>
        <div className="mb-2 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            AI Knowledge Graph
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">
        {children}

        {buttonText && (
          <Button
            icon={buttonIcon}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default PageHeader;