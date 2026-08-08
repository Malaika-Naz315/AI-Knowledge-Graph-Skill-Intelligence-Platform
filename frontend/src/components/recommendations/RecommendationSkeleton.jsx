function RecommendationSkeleton() {


    return (

        <div className="space-y-8">





            {/* Profile Skeleton */}


            <div
                className="
                bg-white
                border
                border-slate-200
                rounded-xl
                p-6
                shadow-sm
                animate-pulse
                "
            >


                <div className="flex justify-between">


                    <div>


                        <div
                            className="
                            h-6
                            w-48
                            bg-slate-200
                            rounded
                            "
                        />



                        <div
                            className="
                            h-4
                            w-28
                            bg-slate-200
                            rounded
                            mt-3
                            "
                        />



                    </div>



                    <div
                        className="
                        h-6
                        w-20
                        bg-slate-200
                        rounded-full
                        "
                    />


                </div>







                <div className="grid md:grid-cols-3 gap-5 mt-6">


                    {
                        Array.from(
                            {length:3}
                        ).map(
                            (_,index)=>(

                                <div

                                    key={index}

                                    className="
                                    space-y-3
                                    "

                                >


                                    <div
                                        className="
                                        h-3
                                        w-20
                                        bg-slate-200
                                        rounded
                                        "
                                    />


                                    <div
                                        className="
                                        h-5
                                        w-32
                                        bg-slate-200
                                        rounded
                                        "
                                    />



                                </div>

                            )
                        )
                    }


                </div>



            </div>









            {/* Statistics Skeleton */}



            <div className="grid md:grid-cols-4 gap-6">



                {

                    Array.from(
                        {length:4}
                    ).map(
                        (_,index)=>(


                            <div

                                key={index}

                                className="
                                bg-white
                                border
                                rounded-xl
                                p-5
                                animate-pulse
                                "

                            >



                                <div
                                    className="
                                    h-4
                                    w-24
                                    bg-slate-200
                                    rounded
                                    "
                                />



                                <div
                                    className="
                                    h-8
                                    w-16
                                    bg-slate-200
                                    rounded
                                    mt-4
                                    "
                                />


                            </div>


                        )
                    )

                }


            </div>









            {/* Recommendation Cards Skeleton */}



            {

                Array.from(
                    {length:3}
                ).map(
                    (_,sectionIndex)=>(


                    <div key={sectionIndex}>


                        <div
                            className="
                            h-6
                            w-48
                            bg-slate-200
                            rounded
                            mb-4
                            animate-pulse
                            "
                        />




                        <div className="grid md:grid-cols-3 gap-5">


                            {

                                Array.from(
                                    {length:3}
                                ).map(
                                    (_,index)=>(


                                        <div

                                            key={index}

                                            className="
                                            bg-white
                                            border
                                            rounded-xl
                                            p-5
                                            animate-pulse
                                            "

                                        >


                                            <div
                                                className="
                                                h-5
                                                w-40
                                                bg-slate-200
                                                rounded
                                                "
                                            />



                                            <div
                                                className="
                                                h-4
                                                w-full
                                                bg-slate-200
                                                rounded
                                                mt-4
                                                "
                                            />



                                            <div
                                                className="
                                                h-4
                                                w-28
                                                bg-slate-200
                                                rounded
                                                mt-3
                                                "
                                            />



                                        </div>


                                    )

                                )

                            }


                        </div>



                    </div>


                    )

                )

            }





        </div>

    );


}


export default RecommendationSkeleton;