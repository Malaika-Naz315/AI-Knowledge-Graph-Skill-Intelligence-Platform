import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import Button from "./Button";


function ActionButtons({
  item,
  onView,
  onEdit,
  onDelete,
}) {


  return (

    <div className="flex items-center justify-center gap-2">


      <Button

        variant="ghost"

        size="sm"

        icon={FaEye}

        onClick={() => onView && onView(item)}

      />



      <Button

        variant="ghost"

        size="sm"

        icon={FaEdit}

        onClick={() => onEdit && onEdit(item)}

      />



      <Button

        variant="ghost"

        size="sm"

        icon={FaTrash}

        onClick={() => onDelete && onDelete(item)}

        className="text-red-600 hover:bg-red-50 hover:text-red-700"

      />


    </div>

  );

}


export default ActionButtons;