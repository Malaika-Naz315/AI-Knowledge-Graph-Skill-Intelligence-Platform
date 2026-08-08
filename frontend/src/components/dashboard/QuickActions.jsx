import {
  UserPlus,
  FolderPlus,
  BookOpen,
  UserCheck,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


function QuickActions(){


const navigate = useNavigate();



const actions=[

{
title:"Explore Students",
description:
"View student profiles and skill intelligence.",
icon:<UserPlus size={24}/>,
path:"/students",
color:"blue"
},


{
title:"Explore Projects",
description:
"Analyze projects connected with technologies.",
icon:<FolderPlus size={24}/>,
path:"/projects",
color:"purple"
},


{
title:"Learning Resources",
description:
"Browse available courses and resources.",
icon:<BookOpen size={24}/>,
path:"/learning-resources",
color:"green"
},


{
title:"Find Mentors",
description:
"Explore mentor expertise and connections.",
icon:<UserCheck size={24}/>,
path:"/mentors",
color:"orange"
},


];



const colors={

blue:
"bg-blue-50 text-blue-600 hover:border-blue-400",

purple:
"bg-purple-50 text-purple-600 hover:border-purple-400",

green:
"bg-green-50 text-green-600 hover:border-green-400",

orange:
"bg-orange-50 text-orange-600 hover:border-orange-400"

};




return(


<div

className="
mt-8
bg-white
rounded-2xl
border
border-gray-200
shadow-sm
p-6
"

>


<div className="mb-6">


<h2

className="
text-xl
font-semibold
text-gray-800
"

>

Quick Actions

</h2>


<p

className="
mt-1
text-sm
text-gray-500
"

>

Navigate quickly through platform modules

</p>


</div>





<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"

>


{

actions.map((action,index)=>(


<div

key={index}

onClick={()=>navigate(action.path)}

className="
group
cursor-pointer
rounded-xl
border
border-gray-200
p-5
transition-all
duration-300
hover:-translate-y-1
hover:shadow-lg
"

>


<div

className="
flex
items-center
justify-between
"

>


<div

className={`
h-12
w-12
rounded-xl
flex
items-center
justify-center
${colors[action.color]}
`}

>

{action.icon}

</div>



<ArrowRight

size={20}

className="
text-gray-400
group-hover:text-indigo-600
transition
"

/>


</div>




<h3

className="
mt-5
font-semibold
text-gray-800
"

>

{action.title}

</h3>



<p

className="
mt-2
text-sm
text-gray-500
leading-relaxed
"

>

{action.description}

</p>



<button

className="
mt-5
text-sm
font-medium
text-indigo-600
"

>

Open Module →

</button>



</div>


))


}



</div>


</div>


)


}


export default QuickActions;