import {
  FaLaptopCode,
} from "react-icons/fa";

import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";


function TechnologyRow({
  technology,
  onView,
  onEdit,
  onDelete,
}) {


  return (

    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">


      {/* Technology */}

      <td className="px-6 py-4">


        <div className="flex items-center gap-4">


          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

            <FaLaptopCode className="text-lg" />

          </div>




          <div>

            <h3 className="font-semibold text-slate-900">

              {technology.name}

            </h3>


            <p className="text-sm text-slate-500">

              ID #{technology.technology_id}

            </p>


          </div>


        </div>


      </td>






      {/* Category */}


      <td className="px-6 py-4">


        <Badge variant="primary">

          {technology.category}

        </Badge>


      </td>







      {/* Version */}


      <td className="px-6 py-4 text-slate-700">


        {technology.version || "N/A"}


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

          item={technology}

          onView={onView}

          onEdit={onEdit}

          onDelete={onDelete}

        />


      </td>



    </tr>

  );

}


export default TechnologyRow;