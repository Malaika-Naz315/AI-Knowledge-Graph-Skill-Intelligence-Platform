import {
  FaProjectDiagram,
} from "react-icons/fa";


import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";



function ProjectRow({
  project,
  onView,
  onEdit,
  onDelete,
}) {



  return (


    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">





      {/* Project */}


      <td className="px-6 py-4">


        <div className="flex items-center gap-4">



          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">


            <FaProjectDiagram className="text-lg"/>


          </div>






          <div>



            <h3 className="font-semibold text-slate-900">


              {project.title || project.name || "Untitled Project"}


            </h3>




            <p className="text-sm text-slate-500">


              ID #{project.project_id}


            </p>



          </div>




        </div>



      </td>









      {/* Domain */}


      <td className="px-6 py-4">


        <Badge variant="primary">


          {project.domain || "N/A"}


        </Badge>


      </td>









      {/* Difficulty */}


      <td className="px-6 py-4 text-center">


        <Badge

          variant={

            project.difficulty === "Advanced"

            ? "danger"

            :

            project.difficulty === "Intermediate"

            ? "warning"

            :

            "success"

          }

        >


          {project.difficulty || "N/A"}


        </Badge>



      </td>









      {/* Description */}


      <td className="max-w-xs px-6 py-4">


        <p className="truncate text-sm text-slate-600">


          {project.description || "No description available"}


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


          item={project}


          onView={onView}


          onEdit={onEdit}


          onDelete={onDelete}


        />


      </td>







    </tr>


  );


}



export default ProjectRow;