function CaseStudySkeleton() {

  return (

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


      <table className="min-w-full divide-y divide-slate-200">


        {/* Header */}

        <thead className="bg-slate-50">


          <tr>


            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Case Study
            </th>


            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Domain
            </th>


            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Difficulty
            </th>


            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Description
            </th>


            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
              Status
            </th>


            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
              Actions
            </th>


          </tr>


        </thead>



        <tbody className="divide-y divide-slate-100">


          {
            Array.from({ length: 6 }).map((_, index) => (


              <tr
                key={index}
                className="border-b border-slate-100"
              >


                {/* Case Study */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-4">

                    <div className="h-11 w-11 rounded-xl bg-slate-200 animate-pulse"></div>


                    <div className="space-y-2">

                      <div className="h-4 w-40 rounded bg-slate-200 animate-pulse"></div>

                      <div className="h-3 w-24 rounded bg-slate-200 animate-pulse"></div>

                    </div>

                  </div>

                </td>



                {/* Domain */}

                <td className="px-6 py-4">

                  <div className="h-6 w-28 rounded-full bg-slate-200 animate-pulse"></div>

                </td>



                {/* Difficulty */}

                <td className="px-6 py-4">

                  <div className="h-6 w-24 rounded-full bg-slate-200 animate-pulse"></div>

                </td>



                {/* Description */}

                <td className="px-6 py-4">

                  <div className="h-4 w-56 rounded bg-slate-200 animate-pulse"></div>

                </td>



                {/* Status */}

                <td className="px-6 py-4 text-center">

                  <div className="mx-auto h-6 w-20 rounded-full bg-slate-200 animate-pulse"></div>

                </td>



                {/* Actions */}

                <td className="px-6 py-4">

                  <div className="mx-auto h-9 w-24 rounded bg-slate-200 animate-pulse"></div>

                </td>


              </tr>


            ))
          }


        </tbody>


      </table>


    </div>

  );

}


export default CaseStudySkeleton;