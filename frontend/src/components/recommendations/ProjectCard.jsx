import { useState } from "react";
import ViewModal from "../common/ViewModal";


function ProjectCard({ project }) {


    const [showModal, setShowModal] = useState(false);



    const handleExplore = () => {

        if(project.url){

            window.open(
                project.url,
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


            <div className="flex justify-between">


                <div>


                    <h3 className="text-lg font-semibold text-slate-800">

                        {
                            project.project_name ||
                            project.name ||
                            "Project"
                        }

                    </h3>


                    <p className="text-sm text-slate-500 mt-2">

                        Domain

                    </p>


                    <p className="font-medium text-slate-700">

                        {
                            project.domain ||
                            "Artificial Intelligence"
                        }

                    </p>


                </div>




                <span
                    className="
                    bg-purple-100
                    text-purple-700
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    "
                >

                    {
                        project.difficulty ||
                        "Advanced"
                    }

                </span>


            </div>







            <p className="text-sm text-slate-500 mt-4">

                {
                    project.description ||
                    "Recommended project based on your skills"
                }

            </p>









            {/* Actions */}


            <div className="flex gap-3 mt-6">



                <button

                    onClick={()=>setShowModal(true)}

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

                    onClick={handleExplore}

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

                    Explore

                </button>



            </div>




        </div>








        {

            showModal &&


            <ViewModal

                data={project}

                title="Project Details"

                onClose={
                    ()=>setShowModal(false)
                }

            />


        }



        </>

    );

}


export default ProjectCard;