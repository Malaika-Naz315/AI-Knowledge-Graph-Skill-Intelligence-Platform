function SkillGapCard({ skillGap }) {


    return (

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





            <div className="flex items-center justify-between">


                <h2 className="text-xl font-bold text-slate-800">

                    Skill Gap Analysis

                </h2>



                <span
                    className="
                    bg-orange-100
                    text-orange-700
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                    "
                >

                    AI Analysis

                </span>


            </div>









            {/* Current Skills */}



            <div className="mt-6">


                <p className="text-sm font-medium text-slate-600 mb-3">

                    Current Skills

                </p>



                <div className="flex flex-wrap gap-2">


                    {

                        skillGap.current_skills?.length > 0


                        ?

                        skillGap.current_skills.map(
                            (skill,index)=>(

                                <span

                                    key={index}

                                    className="
                                    bg-emerald-100
                                    text-emerald-700
                                    text-xs
                                    px-3
                                    py-1
                                    rounded-full
                                    "

                                >

                                    {skill}

                                </span>


                            )

                        )


                        :

                        <p className="text-sm text-slate-500">

                            No current skills available

                        </p>

                    }


                </div>


            </div>









            {/* Missing Skills */}



            <div className="mt-6">


                <p className="text-sm font-medium text-slate-600 mb-3">

                    Recommended Skills To Learn

                </p>





                <div className="flex flex-wrap gap-2">


                    {

                        skillGap.missing_skills?.length > 0


                        ?

                        skillGap.missing_skills.map(
                            (skill,index)=>(


                                <span

                                    key={index}

                                    className="
                                    bg-red-100
                                    text-red-700
                                    text-xs
                                    px-3
                                    py-1
                                    rounded-full
                                    "

                                >

                                    {skill}

                                </span>


                            )

                        )


                        :

                        <p className="text-sm text-slate-500">

                            No skill gaps detected

                        </p>


                    }


                </div>


            </div>









            {/* Suggestion */}



            <div
                className="
                mt-6
                bg-slate-50
                rounded-lg
                p-4
                "
            >


                <p className="text-sm text-slate-600">

                    AI Recommendation:

                </p>



                <p className="text-sm font-medium text-slate-800 mt-1">

                    Focus on missing skills to improve
                    project opportunities.

                </p>


            </div>





        </div>

    );

}


export default SkillGapCard;