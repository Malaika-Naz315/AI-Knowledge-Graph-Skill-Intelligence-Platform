const MentorCard = ({ mentor }) => {


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

            <div className="mb-5">


                <h2
                    className="
                        text-xl
                        font-bold
                        text-gray-800
                    "
                >

                    {mentor.name}

                </h2>



                <p
                    className="
                        text-sm
                        text-gray-500
                    "
                >

                    {mentor.email}

                </p>


            </div>






            {/* Mentor Details */}

            <div
                className="
                    space-y-3
                    text-sm
                "
            >


                <p>

                    <span className="font-semibold">
                        Designation:
                    </span>

                    {" "}

                    {mentor.designation || "N/A"}

                </p>




                <p>

                    <span className="font-semibold">
                        Department:
                    </span>

                    {" "}

                    {mentor.department || "N/A"}

                </p>





                <p>

                    <span className="font-semibold">
                        Specialization:
                    </span>

                    {" "}

                    {mentor.specialization || "N/A"}

                </p>





                <p>

                    <span className="font-semibold">
                        Experience:
                    </span>

                    {" "}

                    {mentor.experience || "N/A"}

                </p>



            </div>







            <button

                className="
                    mt-6
                    w-full
                    bg-green-600
                    text-white
                    py-2
                    rounded-xl
                    hover:bg-green-700
                    transition
                "

            >

                View Mentor Profile

            </button>



        </div>

    );


};


export default MentorCard;