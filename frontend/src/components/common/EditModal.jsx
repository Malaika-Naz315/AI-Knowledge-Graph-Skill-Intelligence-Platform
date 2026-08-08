import { useEffect, useState } from "react";


function EditModal({

  data,

  title="Edit Record",

  onClose,

  onSave

}) {


  const [formData,setFormData] = useState({});



  useEffect(()=>{

    if(data){

      setFormData(data);

    }

  },[data]);



  if(!data) return null;



  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };



  const handleSubmit=(e)=>{

    e.preventDefault();

    onSave(formData);

  };



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">


        <div className="mb-5 flex justify-between border-b pb-3">


          <h2 className="text-xl font-semibold">

            {title}

          </h2>


          <button

            onClick={onClose}

            className="text-xl"

          >

            ×

          </button>


        </div>



        <form onSubmit={handleSubmit} className="space-y-4">


          {
            Object.entries(formData)
            .slice(0,5)
            .map(([key,value])=>(


              <div key={key}>


                <label className="mb-1 block text-sm font-medium capitalize">

                  {key.replaceAll("_"," ")}

                </label>



                <input

                  name={key}

                  value={value ?? ""}

                  onChange={handleChange}

                  className="w-full rounded-lg border px-3 py-2"

                />


              </div>


            ))
          }




          <div className="flex justify-end gap-3 pt-4">


            <button

              type="button"

              onClick={onClose}

              className="rounded-lg border px-4 py-2"

            >

              Cancel

            </button>



            <button

              type="submit"

              className="rounded-lg bg-blue-600 px-4 py-2 text-white"

            >

              Save

            </button>


          </div>



        </form>



      </div>


    </div>

  );

}


export default EditModal;