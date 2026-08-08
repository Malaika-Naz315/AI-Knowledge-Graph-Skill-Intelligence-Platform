import { FaCertificate } from "react-icons/fa";
import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";

function CertificateRow({
  certificate,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">

      {/* Certificate */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <FaCertificate className="text-lg" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {certificate.name}
            </h3>

            <p className="text-sm text-slate-500">
              ID #{certificate.certificate_id}
            </p>
          </div>

        </div>
      </td>

      {/* Issuer */}
      <td className="px-6 py-4">
        {certificate.issuer}
      </td>

      {/* Level */}
      <td className="px-6 py-4">
        <Badge variant="primary">
          {certificate.level}
        </Badge>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <Badge variant="success">
          Verified
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <ActionButtons
          item={certificate}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>

    </tr>
  );
}

export default CertificateRow;