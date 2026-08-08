import {
  FaBookOpen,
} from "react-icons/fa";

import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";

function CaseStudyRow({
  caseStudy,
  onView,
  onEdit,
  onDelete,
}) {
  const difficultyVariant = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "danger",
  };

  return (
    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">

      {/* Case Study */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaBookOpen className="text-lg" />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {caseStudy.title}
            </h3>

            <p className="text-sm text-slate-500">
              ID #{caseStudy.case_study_id}
            </p>

          </div>

        </div>

      </td>

      {/* Domain */}
      <td className="px-6 py-4">

        <Badge variant="primary">
          {caseStudy.domain || "N/A"}
        </Badge>

      </td>

      {/* Difficulty */}
      <td className="px-6 py-4">

        <Badge
          variant={
            difficultyVariant[caseStudy.difficulty] || "default"
          }
        >
          {caseStudy.difficulty || "N/A"}
        </Badge>

      </td>

      {/* Description */}
      <td className="px-6 py-4">

        <p className="max-w-md truncate text-sm text-slate-600">
          {caseStudy.description || "No description available"}
        </p>

      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">

        <Badge variant="success">
          Active
        </Badge>

      </td>

      {/* Actions */}
      <td className="px-6 py-4">

        <ActionButtons
          item={caseStudy}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </td>

    </tr>
  );
}

export default CaseStudyRow;