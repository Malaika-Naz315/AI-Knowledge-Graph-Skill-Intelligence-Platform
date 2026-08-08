function ViewModal({

  data,

  title = "Details",

  onClose

}) {


  if (!data) return null;



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">


        <div className="mb-5 flex items-center justify-between border-b pb-3">


          <h2 className="text-xl font-semibold text-slate-900">

            {title}

          </h2>


          <button

            onClick={onClose}

            className="text-xl text-slate-500 hover:text-red-600"

          >

            ×

          </button>


        </div>




        <div className="max-h-[400px] space-y-3 overflow-y-auto">


          {
            Object.entries(data).map(([key,value]) => (

              <div

                key={key}

                className="flex justify-between border-b pb-2"

              >


                <span className="font-medium capitalize text-slate-600">

                  {key.replaceAll("_"," ")}

                </span>



                <span className="max-w-xs text-right text-slate-800">

                  {String(value)}

                </span>


              </div>


            ))
          }


        </div>



      </div>


    </div>

  );

}


export default ViewModal;