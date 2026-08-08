import { useState } from "react";

import ViewModal from "../common/ViewModal";



function ResourceCard({ resource }) {


    const [showModal,setShowModal] = useState(false);



    const handleOpenResource = () => {


        if(resource.url){


            window.open(
                resource.url,
                "_blank"
            );


        }
        else{


            setShowModal(true);


        }


    };





    return (

        <>


        <div
            className="
            bg-white
            border
            border-slate-200
            rounded-xl
            p-5
            shadow-sm
            hover:shadow-md
            transition
            "
        >




            <div className="flex items-start justify-between">



                <div>


                    <h3 className="text-lg font-semibold text-slate-800">


                        {
                            resource.title ||
                            "Learning Resource"
                        }


                    </h3>




                    <p className="text-sm text-slate-500 mt-2">

                        Platform

                    </p>




                    <p className="font-medium text-slate-700">


                        {
                            resource.platform ||
                            "Online Learning"
                        }


                    </p>



                </div>





                <span
                    className="
                    bg-indigo-100
                    text-indigo-700
                    text-xs
                    font-medium
                    px-3
                    py-1
                    rounded-full
                    "
                >


                    {
                        resource.type ||
                        "Resource"
                    }


                </span>



            </div>









            <p
                className="
                text-sm
                text-slate-500
                mt-4
                line-clamp-3
                "
            >


                {
                    resource.description ||
                    "Recommended learning material based on student profile."
                }


            </p>








            {/* Actions */}



            <div
                className="
                flex
                gap-3
                mt-6
                "
            >



                <button


                    onClick={
                        ()=>setShowModal(true)
                    }


                    className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    hover:bg-blue-700
                    "

                >

                    View

                </button>







                <button


                    onClick={handleOpenResource}


                    className="
                    border
                    border-blue-600
                    text-blue-600
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    hover:bg-blue-50
                    "

                >

                    Open Resource

                </button>




            </div>





        </div>









        {


            showModal &&



            <ViewModal


                data={resource}


                title="Resource Details"


                onClose={
                    ()=>setShowModal(false)
                }


            />


        }





        </>

    );


}


export default ResourceCard;