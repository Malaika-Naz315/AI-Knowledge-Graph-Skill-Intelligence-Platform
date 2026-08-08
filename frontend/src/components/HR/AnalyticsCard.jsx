const AnalyticsCard = ({
    title,
    data
}) => {


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
                transition
            "
        >



            <h2
                className="
                    text-xl
                    font-bold
                    mb-5
                    text-gray-800
                "
            >

                {title}

            </h2>







            {

                Array.isArray(data) && data.length > 0 ?


                (

                    <div className="space-y-3">


                        {

                            data.map(

                                (item,index)=>(


                                    <div

                                        key={index}

                                        className="
                                            bg-gray-50
                                            rounded-xl
                                            p-3
                                            flex
                                            justify-between
                                            items-center
                                        "

                                    >


                                        <span
                                            className="
                                                font-medium
                                            "
                                        >

                                            {
                                                item.name ||
                                                item.title ||
                                                "Unknown"
                                            }

                                        </span>




                                        <span
                                            className="
                                                text-blue-600
                                                font-bold
                                            "
                                        >

                                            {
                                                item.total_students ||
                                                item.total_projects ||
                                                ""
                                            }

                                        </span>



                                    </div>


                                )

                            )

                        }


                    </div>


                )


                :


                (

                    <p className="text-gray-500">

                        No data available

                    </p>

                )

            }





        </div>

    );

};


export default AnalyticsCard;