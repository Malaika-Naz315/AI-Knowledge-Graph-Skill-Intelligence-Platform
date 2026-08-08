import { useState } from "react";

import ViewModal from "../common/ViewModal";



function SkillCard({ skill }) {


    const [showModal,setShowModal] = useState(false);



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
                            skill.skill_name ||
                            skill.name ||
                            "Skill"
                        }


                    </h3>




                    <p className="text-sm text-slate-500 mt-2">

                        Project Demand

                    </p>




                    <p className="text-2xl font-bold text-blue-600 mt-1">


                        {
                            skill.project_demand ||
                            0
                        }


                    </p>



                </div>







                <span
                    className="
                    bg-blue-100
                    text-blue-700
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                    "
                >

                    Skill

                </span>



            </div>









            {/* Demand Indicator */}



            <div className="mt-5">


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
                        bg-blue-600
                        rounded-full
                        "

                        style={{
                            width:
                            `${Math.min(
                                skill.project_demand || 0,
                                100
                            )}%`
                        }}

                    />


                </div>


            </div>









            {/* Action */}



            <div className="mt-6">


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

                    View Skill

                </button>



            </div>





        </div>









        {


            showModal &&



            <ViewModal


                data={skill}


                title="Skill Details"


                onClose={
                    ()=>setShowModal(false)
                }


            />


        }




        </>

    );

}


export default SkillCard;