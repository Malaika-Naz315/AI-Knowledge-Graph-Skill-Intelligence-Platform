const StudentCard = ({ student }) => {


    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                border
                border-gray-100
                hover:shadow-xl
                transition-all
                duration-300
            "
        >


            {/* Header */}

            <div className="mb-4">


                <h2
                    className="
                        text-xl
                        font-bold
                        text-gray-800
                    "
                >

                    {student.name}

                </h2>


                <p
                    className="
                        text-sm
                        text-gray-500
                    "
                >

                    {student.email}

                </p>


            </div>





            {/* Details */}

            <div
                className="
                    space-y-3
                    text-sm
                "
            >


                <div>

                    <span className="font-semibold">
                        University:
                    </span>

                    {" "}

                    {student.university || "N/A"}

                </div>




                <div>

                    <span className="font-semibold">
                        Degree:
                    </span>

                    {" "}

                    {student.degree || "N/A"}

                </div>





                <div>

                    <span className="font-semibold">
                        Track:
                    </span>

                    {" "}

                    {student.internship_track || "N/A"}

                </div>





                <div>

                    <span className="font-semibold">
                        Experience:
                    </span>

                    {" "}

                    {student.experience_level || "N/A"}

                </div>



            </div>





            {/* Action */}

            <button

                className="
                    mt-6
                    w-full
                    bg-blue-600
                    text-white
                    py-2
                    rounded-xl
                    hover:bg-blue-700
                    transition
                "

            >

                View Profile

            </button>



        </div>

    );

};


export default StudentCard;