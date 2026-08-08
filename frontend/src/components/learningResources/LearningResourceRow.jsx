import { FaBookOpen } from "react-icons/fa";
import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";

function LearningResourceRow({
  learningresource,
  onView,
  onEdit,
  onDelete,
}) {
  const typeVariant = {
    Course: "primary",
    Book: "success",
    Video: "danger",
    Article: "info",
    Documentation: "purple",
  };

  return (
    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">
      {/* Resource */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaBookOpen className="text-lg" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {learningresource.title}
            </h3>

            <p className="text-sm text-slate-500">
              ID #{learningresource.resource_id}
            </p>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <Badge
          variant={typeVariant[learningresource.type] || "default"}
        >
          {learningresource.type || "N/A"}
        </Badge>
      </td>

      {/* Platform */}
      <td className="px-6 py-4">
        <Badge variant="primary">
          {learningresource.platform || "N/A"}
        </Badge>
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
          item={learningresource}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

export default LearningResourceRow;