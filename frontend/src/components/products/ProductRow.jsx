import { FaBoxOpen } from "react-icons/fa";
import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";

function ProductRow({
  product,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">

      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaBoxOpen className="text-lg" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {product.name}
            </h3>

            <p className="text-sm text-slate-500">
              ID #{product.product_id}
            </p>
          </div>

        </div>
      </td>

      {/* Description */}
      <td className="max-w-md px-6 py-4">
        <p className="truncate text-sm text-slate-600">
          {product.description || "No description available"}
        </p>
      </td>

      {/* Department */}
      <td className="px-6 py-4">
        <Badge variant="primary">
          {product.owner_department || "N/A"}
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
          item={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>

    </tr>
  );
}

export default ProductRow;