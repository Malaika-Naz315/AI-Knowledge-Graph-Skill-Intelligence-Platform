const HRStatCard = ({
    title,
    value,
    icon
}) => {


    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                flex
                items-center
                justify-between
                hover:shadow-xl
                transition-all
                duration-300
                border
                border-gray-100
            "
        >


            <div>


                <p className="
                    text-gray-500
                    text-sm
                    font-medium
                ">

                    {title}

                </p>



                <h2 className="
                    text-3xl
                    font-bold
                    mt-2
                    text-gray-800
                ">

                    {value}

                </h2>


            </div>





            <div
                className="
                    w-14
                    h-14
                    rounded-full
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    text-blue-600
                    text-2xl
                "
            >

                {icon}


            </div>



        </div>

    );

};


export default HRStatCard;