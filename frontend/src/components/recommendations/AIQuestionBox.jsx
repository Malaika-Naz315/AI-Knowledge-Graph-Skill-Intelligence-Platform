import { useEffect, useState } from "react";

import {
    askQuestion,
    getQuestionSuggestions
} from "../../api/recommendations";



function AIQuestionBox(){


    const [question,setQuestion] = useState("");

    const [answer,setAnswer] = useState([]);

    const [loading,setLoading] = useState(false);

    const [suggestions,setSuggestions] = useState([]);





    // ==============================
    // Load AI Question Suggestions
    // ==============================

    const loadSuggestions = async()=>{


        try{


            const data = await getQuestionSuggestions();


            setSuggestions(

                data.questions || []

            );


        }

        catch(error){


            console.log(
                "Suggestion Error",
                error
            );


        }


    };






    useEffect(()=>{


        loadSuggestions();


    },[]);








    // ==============================
    // Ask Knowledge Graph AI
    // ==============================

    const handleAsk = async()=>{


        if(!question.trim())
            return;



        try{


            setLoading(true);



            const data = await askQuestion(

                question,

                "STU001"

            );



            setAnswer(

                data.answer || []

            );



        }


        catch(error){


            console.log(

                "AI Question Error",

                error

            );


            setAnswer([]);



        }


        finally{


            setLoading(false);


        }



    };







    return(



        <div
        className="
        bg-white
        border
        border-slate-200
        rounded-xl
        p-6
        shadow-sm
        space-y-5
        "
        >





            {/* Header */}


            <div>


                <h2
                className="
                text-xl
                font-bold
                text-slate-800
                "
                >

                🧠 Ask Knowledge Graph AI

                </h2>



                <p
                className="
                text-sm
                text-slate-500
                mt-2
                "
                >

                Ask questions about students, mentors, skills and projects

                </p>


            </div>








            {/* Suggested Questions */}


            <div
            className="
            flex
            flex-wrap
            gap-2
            "
            >


            {

                suggestions.map(

                    (item,index)=>(


                        <button


                        key={index}


                        onClick={()=>setQuestion(item)}



                        className="
                        bg-slate-100
                        hover:bg-blue-100
                        text-sm
                        px-4
                        py-2
                        rounded-full
                        transition
                        "

                        >

                            {item}


                        </button>


                    )

                )

            }


            </div>








            {/* Input Area */}


            <div
            className="
            flex
            gap-3
            "
            >



                <input


                value={question}


                onChange={

                    (e)=>

                    setQuestion(e.target.value)

                }



                placeholder="Example: Which students know Docker?"



                className="
                flex-1
                border
                border-slate-300
                rounded-lg
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-400
                "


                />





                <button


                onClick={handleAsk}



                className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                rounded-lg
                "


                >


                {

                    loading

                    ?

                    "Thinking..."

                    :

                    "Ask AI"


                }


                </button>



            </div>








            {/* AI Response */}



            {

                answer.length > 0 &&



                <div
                className="
                mt-6
                space-y-3
                "
                >



                    <h3
                    className="
                    font-bold
                    text-slate-700
                    "
                    >

                    AI Result

                    </h3>





                    {

                        answer.map(

                            (item,index)=>(


                                <div


                                key={index}


                                className="
                                bg-slate-50
                                border
                                rounded-lg
                                p-4
                                "
                                >



                                {

                                    Object.entries(item).map(

                                        ([key,value])=>(


                                            <div

                                            key={key}

                                            className="
                                            text-sm
                                            mb-2
                                            "
                                            >



                                            <span
                                            className="
                                            font-semibold
                                            capitalize
                                            "
                                            >

                                            {key}:

                                            </span>



                                            {

                                            Array.isArray(value)

                                            ?

                                            value.join(", ")

                                            :

                                            value


                                            }



                                            </div>



                                        )

                                    )

                                }




                                </div>



                            )

                        )


                    }



                </div>



            }




        </div>



    );


}



export default AIQuestionBox;