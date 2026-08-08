function StudentSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      <div className="animate-pulse">

        <div className="border-b border-slate-200 p-6">
          <div className="h-6 w-56 rounded bg-slate-200"></div>
        </div>

        {[1,2,3,4,5,6].map((item)=>(
          <div
            key={item}
            className="flex items-center gap-6 border-b border-slate-100 px-6 py-5"
          >
            <div className="h-11 w-11 rounded-full bg-slate-200"></div>

            <div className="flex-1">
              <div className="mb-2 h-4 w-48 rounded bg-slate-200"></div>
              <div className="h-3 w-32 rounded bg-slate-100"></div>
            </div>

            <div className="h-4 w-32 rounded bg-slate-200"></div>
            <div className="h-4 w-24 rounded bg-slate-200"></div>
            <div className="h-4 w-24 rounded bg-slate-200"></div>
            <div className="h-8 w-20 rounded-full bg-slate-200"></div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default StudentSkeleton;