import clsx from "clsx";

function StatCard({
  title,
  value,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  trend,
}) {

  return (

    <div
      className="
        group
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:border-slate-300
        hover:shadow-md
      "
    >

      <div className="flex items-center justify-between">


        <div className="min-w-0">


          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>


          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>


          {
            trend && (

              <p className="mt-2 text-xs font-medium text-emerald-600">
                {trend}
              </p>

            )
          }


        </div>



        {
          Icon && (

            <div
              className={clsx(
                "flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200",
                iconBg,
                "group-hover:bg-blue-100"
              )}
            >

              <Icon

                className={clsx(
                  "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                  iconColor
                )}

              />

            </div>

          )
        }



      </div>


    </div>

  );

}


export default StatCard;