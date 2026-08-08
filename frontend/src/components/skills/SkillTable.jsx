import SkillRow from "./SkillRow";

function SkillTable({
  skills,
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
            Skill Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Records : {skills.length}
          </p>

        </div>


        <div className="flex gap-2">

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Active
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {skills.length} Records
          </span>

        </div>

      </div>




      {/* Table */}

      <div className="overflow-x-auto">


        <table className="min-w-full divide-y divide-slate-200">


          <thead className="sticky top-0 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                Skill
              </th>


              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                Category
              </th>


              <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-slate-600">
                Difficulty
              </th>


              <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-slate-600">
                Status
              </th>


              <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-slate-600">
                Actions
              </th>


            </tr>

          </thead>




          <tbody className="divide-y divide-slate-100">


            {
              skills.length > 0 ? (

                skills.map((skill)=>(

                  <SkillRow

                    key={skill.skill_id}

                    skill={skill}

                    onView={onView}

                    onEdit={onEdit}

                    onDelete={onDelete}

                  />

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="py-12 text-center text-slate-500"
                  >

                    No skills found.

                  </td>

                </tr>

              )

            }


          </tbody>


        </table>


      </div>




      {/* Footer */}

      <div className="flex justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">


        <p className="text-sm text-slate-500">

          Showing{" "}

          <span className="font-semibold">
            {skills.length}
          </span>

          {" "}skills

        </p>


        <p className="text-sm text-slate-400">
          Enterprise Skill Directory
        </p>


      </div>



    </div>

  );

}


export default SkillTable;