function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="animate-pulse">

        {/* Header */}

        <div className="border-b border-slate-200 bg-slate-50 p-6">

          <div className="h-6 w-60 rounded bg-slate-200"></div>

          <div className="mt-3 h-4 w-44 rounded bg-slate-100"></div>

        </div>


        {/* Rows */}

        {[1,2,3,4,5,6].map((item)=>(

          <div
            key={item}
            className="flex items-center gap-6 border-b border-slate-100 px-6 py-5"
          >

            {/* Icon */}

            <div className="h-11 w-11 rounded-xl bg-slate-200"></div>


            {/* Product Name */}

            <div className="flex-1">

              <div className="mb-2 h-4 w-48 rounded bg-slate-200"></div>

              <div className="h-3 w-28 rounded bg-slate-100"></div>

            </div>


            {/* Description */}

            <div className="h-4 w-52 rounded bg-slate-200"></div>


            {/* Department */}

            <div className="h-8 w-32 rounded-full bg-slate-200"></div>


            {/* Actions */}

            <div className="flex gap-2">

              <div className="h-8 w-8 rounded-lg bg-slate-200"></div>

              <div className="h-8 w-8 rounded-lg bg-slate-200"></div>

              <div className="h-8 w-8 rounded-lg bg-slate-200"></div>

            </div>


          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductSkeleton;