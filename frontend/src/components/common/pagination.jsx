import Button from "./Button";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

      <p className="text-sm text-slate-500">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      <div className="flex gap-3">

        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        <Button
          disabled
          variant="secondary"
        >
          {currentPage}
        </Button>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>

      </div>

    </div>
  );
}

export default Pagination;