import {
  FaUserGraduate,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";


function StudentRow({
  student,
  onView,
  onEdit,
  onDelete,
}) {


  return (

    <tr className="transition-colors duration-200 hover:bg-slate-50">


      {/* Student */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">


          <div className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-slate-100
          ">

            <FaUserGraduate className="text-slate-600" />

          </div>



          <div>

            <h3 className="font-semibold text-slate-900">

              {student.name}

            </h3>


            <p className="mt-1 text-xs text-slate-500">

              #{student.student_id}

            </p>


          </div>


        </div>


      </td>





      {/* University */}


      <td className="px-6 py-5">


        <p className="font-medium text-slate-800">

          {student.university}

        </p>


        <p className="mt-1 text-xs text-slate-500">

          {student.degree}

        </p>


      </td>






      {/* Degree */}


      <td className="px-6 py-5 text-slate-700">


        {student.degree}


      </td>






      {/* Internship Track */}


      <td className="px-6 py-5">


        <Badge variant="primary">

          {student.internship_track}

        </Badge>


      </td>






      {/* Experience */}


      <td className="px-6 py-5">


        <Badge

          variant={
            student.experience_level === "Advanced"
            ? "success"
            :
            student.experience_level === "Intermediate"
            ? "warning"
            :
            "secondary"
          }

        >

          {student.experience_level}

        </Badge>


      </td>






      {/* Status */}


      <td className="px-6 py-5 text-center">


        <Badge variant="success">

          Active

        </Badge>


      </td>







      {/* Social Links */}


      <td className="px-6 py-5">


        <div className="flex items-center justify-center gap-4">


          {
            student.github &&

            <a
              href={student.github}
              target="_blank"
              rel="noreferrer"
              className="
              text-slate-500
              hover:text-slate-900
              "
            >

              <FaGithub />

            </a>

          }




          {
            student.linkedin &&

            <a
              href={student.linkedin}
              target="_blank"
              rel="noreferrer"
              className="
              text-blue-600
              hover:text-blue-700
              "
            >

              <FaLinkedin />

            </a>

          }


        </div>


      </td>









      {/* Actions */}


      <td className="px-6 py-5">


        <ActionButtons

          item={student}

          onView={onView}

          onEdit={onEdit}

          onDelete={onDelete}

        />


      </td>




    </tr>


  );

}



export default StudentRow;