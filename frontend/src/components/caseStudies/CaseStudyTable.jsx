import CaseStudyRow from "./CaseStudyRow";

function CaseStudyTable({
  caseStudies,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Case Study Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Records : {caseStudies.length}
          </p>
        </div>

        <div className="flex gap-2">

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Active
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {caseStudies.length} Records
          </span>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full divide-y divide-slate-200">

          <thead className="sticky top-0 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Case Study
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Domain
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Difficulty
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Description
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">

            {caseStudies.length > 0 ? (

              caseStudies.map((caseStudy) => (

                <CaseStudyRow
                  key={caseStudy.case_study_id}
                  caseStudy={caseStudy}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-500"
                >
                  No case studies found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold">
            {caseStudies.length}
          </span>{" "}
          case studies
        </p>

        <p className="text-sm text-slate-400">
          AI Knowledge Graph Platform
        </p>

      </div>

    </div>
  );
}

export default CaseStudyTable;