import { useState } from "react";

import ViewModal from "../common/ViewModal";



function SimilarStudentCard({ student }) {


    const [showModal, setShowModal] = useState(false);



    // Handle common skills safely

    const skills = Array.isArray(student.common_skills)

        ? student.common_skills

        : student.common_skills

            ? String(student.common_skills)
                .split(",")

            : [];





    const similarity =

        student.similarity ||

        student.skill_similarity ||

        student.similarity_score ||

        0;







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





                {/* Header */}


                <div className="flex items-start justify-between">



                    <div>


                        <h3 className="text-lg font-semibold text-slate-800">


                            {
                                student.name ||

                                student.student_name ||

                                "Similar Student"
                            }


                        </h3>




                        <p className="text-sm text-slate-500 mt-2">

                            Experience Level

                        </p>



                        <p className="font-medium text-slate-700">


                            {
                                student.experience_level ||

                                "N/A"
                            }


                        </p>



                    </div>






                    <span
                        className="
                        bg-green-100
                        text-green-700
                        text-xs
                        font-semibold
                        px-3
                        py-1
                        rounded-full
                        "
                    >

                        Similar Match

                    </span>



                </div>









                {/* Similarity */}



                <div className="mt-5">



                    <div className="flex justify-between mb-2">


                        <p className="text-sm text-slate-500">

                            Skill Similarity

                        </p>



                        <p className="font-bold text-blue-600">


                            {similarity}%


                        </p>



                    </div>





                    <div
                        className="
                        w-full
                        h-2
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
                                    Number(similarity),
                                    100
                                )}%`

                            }}

                        />


                    </div>



                </div>









                {/* Common Skills */}



                {


                    skills.length > 0 &&


                    <div className="mt-5">


                        <p className="text-sm text-slate-500 mb-2">

                            Common Skills

                        </p>



                        <div className="flex flex-wrap gap-2">


                            {

                                skills.map(

                                    (skill,index)=>(


                                        <span

                                            key={index}

                                            className="
                                            bg-blue-50
                                            text-blue-700
                                            text-xs
                                            px-3
                                            py-1
                                            rounded-full
                                            "

                                        >

                                            {skill.trim()}


                                        </span>


                                    )

                                )

                            }


                        </div>



                    </div>


                }









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

                        View Profile

                    </button>



                </div>






            </div>









            {


                showModal &&



                <ViewModal


                    data={student}


                    title="Student Profile"


                    onClose={
                        ()=>setShowModal(false)
                    }


                />


            }





        </>

    );


}



export default SimilarStudentCard;