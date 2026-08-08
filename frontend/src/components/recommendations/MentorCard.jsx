import { useState } from "react";

import ViewModal from "../common/ViewModal";



function MentorCard({ mentor }) {


    const [showModal, setShowModal] = useState(false);



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
                            mentor.mentor_name ||
                            mentor.name ||
                            "Unknown Mentor"
                        }


                    </h3>





                    <p className="text-sm text-slate-500 mt-2">

                        Expertise

                    </p>



                    <p className="font-medium text-slate-700">

                        {
                            mentor.expertise ||
                            mentor.specialization ||
                            "AI / Technology"
                        }

                    </p>


                </div>







                <span
                    className="
                    bg-emerald-100
                    text-emerald-700
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                    "
                >

                    Mentor Match

                </span>



            </div>









            {/* Similarity */}



            <div className="mt-5">



                <div className="flex justify-between mb-2">


                    <p className="text-sm text-slate-500">

                        Skill Similarity

                    </p>



                    <p className="font-bold text-blue-600">


                        {
                            mentor.skill_similarity ||
                            mentor.similarity ||
                            0
                        }%


                    </p>


                </div>






                <div
                    className="
                    h-2
                    w-full
                    bg-slate-100
                    rounded-full
                    "
                >


                    <div

                        className="
                        h-2
                        bg-emerald-500
                        rounded-full
                        "

                        style={{
                            width:
                            `${Math.min(
                                mentor.skill_similarity ||
                                mentor.similarity ||
                                0,
                                100
                            )}%`
                        }}

                    />


                </div>


            </div>









            {/* Action */}



            <div
                className="
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

                    View Profile

                </button>



            </div>





        </div>









        {

            showModal &&


            <ViewModal


                data={mentor}


                title="Mentor Profile"


                onClose={
                    ()=>setShowModal(false)
                }


            />


        }





        </>

    );

}


export default MentorCard;