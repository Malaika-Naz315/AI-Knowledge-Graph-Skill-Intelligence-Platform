function RecommendationEmpty({message}){


    return(


        <div
            className="
            bg-white
            border
            border-dashed
            border-slate-300
            rounded-xl
            p-8
            text-center
            "
        >



            <div
                className="
                text-4xl
                mb-3
                "
            >

                🤖

            </div>




            <h3
                className="
                text-lg
                font-semibold
                text-slate-700
                "
            >

                No Recommendations Found

            </h3>




            <p
                className="
                text-slate-500
                mt-2
                "
            >

                {message}

            </p>



        </div>


    );


}


export default RecommendationEmpty;