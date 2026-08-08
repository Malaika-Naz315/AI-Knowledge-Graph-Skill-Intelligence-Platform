import {
  FaCode,
} from "react-icons/fa";

import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";


function SkillRow({
  skill,
  onView,
  onEdit,
  onDelete,
}) {


  const difficultyVariant = {

    Beginner: "success",

    Intermediate: "warning",

    Advanced: "danger",

    Expert: "purple",

  };



  return (

    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">



      {/* Skill */}

      <td className="px-6 py-4">


        <div className="flex items-center gap-4">



          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">


            <FaCode className="text-lg" />


          </div>





          <div>


            <h3 className="font-semibold text-slate-900">

              {skill.name}

            </h3>



            <p className="text-sm text-slate-500">

              ID #{skill.skill_id}

            </p>



          </div>



        </div>


      </td>






      {/* Category */}


      <td className="px-6 py-4">


        <Badge variant="primary">

          {skill.category}

        </Badge>


      </td>







      {/* Difficulty */}


      <td className="px-6 py-4 text-center">


        <Badge

          variant={
            difficultyVariant[skill.difficulty] || "secondary"
          }

        >

          {skill.difficulty}

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

          item={skill}

          onView={onView}

          onEdit={onEdit}

          onDelete={onDelete}

        />


      </td>



    </tr>

  );

}



export default SkillRow;