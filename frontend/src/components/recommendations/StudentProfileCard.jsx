import { useState } from "react";

import ViewModal from "../common/ViewModal";



function StudentProfileCard({ student }) {


    const [showModal,setShowModal] = useState(false);



    return (

        <>


        <div
            className="
            bg-white
            border
            border-slate-200
            rounded-xl
            p-6
            shadow-sm
            "
        >




            <div className="flex flex-col md:flex-row justify-between gap-5">





                {/* Student Info */}



                <div>


                    <h2 className="text-2xl font-bold text-slate-800">


                        {
                            student.name ||
                            "Student Profile"
                        }


                    </h2>




                    <p className="text-slate-500 mt-2">


                        {
                            student.university ||
                            "University"
                        }


                    </p>






                    <div className="flex flex-wrap gap-3 mt-4">



                        <span
                            className="
                            bg-blue-100
                            text-blue-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            "
                        >

                            {
                                student.experience_level ||
                                "Intermediate"
                            }


                        </span>





                        <span
                            className="
                            bg-purple-100
                            text-purple-700
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            "
                        >

                            {
                                student.internship_track ||
                                "AI"
                            }


                        </span>




                    </div>



                </div>










                {/* Action */}



                <div>


                    <button


                        onClick={
                            ()=>setShowModal(true)
                        }


                        className="
                        bg-blue-600
                        text-white
                        px-5
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


export default StudentProfileCard;