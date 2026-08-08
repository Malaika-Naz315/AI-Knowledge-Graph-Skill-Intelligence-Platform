function DeleteModal({

  data,

  title="Delete Confirmation",

  onClose,

  onConfirm

}) {


  if(!data) return null;



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">


        <h2 className="text-xl font-semibold text-slate-900">

          {title}

        </h2>



        <p className="mt-4 text-slate-600">

          Are you sure you want to delete this record?

        </p>



        <div className="mt-4 rounded-lg bg-slate-50 p-3">

          {
            data.name ||
            data.title ||
            data.skill_name ||
            "Selected Record"
          }

        </div>



        <div className="mt-6 flex justify-end gap-3">


          <button

            onClick={onClose}

            className="rounded-lg border px-4 py-2"

          >

            Cancel

          </button>



          <button

            onClick={()=>onConfirm(data)}

            className="rounded-lg bg-red-600 px-4 py-2 text-white"

          >

            Delete

          </button>



        </div>



      </div>


    </div>

  );

}


export default DeleteModal;