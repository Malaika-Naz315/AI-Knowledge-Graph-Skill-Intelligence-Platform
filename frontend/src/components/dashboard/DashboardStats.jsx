import StatCard from "../common/StatCard";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCode,
  FaLaptopCode,
  FaProjectDiagram,
  FaCertificate,
  FaBookOpen,
  FaBoxOpen,
  FaFolderOpen,
} from "react-icons/fa";



function DashboardStats({stats}){


const cards=[

{
title:"Students",
value:stats?.students || 0,
icon:FaUserGraduate,
color:"blue",
description:"Registered learners"
},


{
title:"Mentors",
value:stats?.mentors || 0,
icon:FaChalkboardTeacher,
color:"green",
description:"Expert mentors"
},


{
title:"Skills",
value:stats?.skills || 0,
icon:FaCode,
color:"purple",
description:"Tracked skills"
},


{
title:"Technologies",
value:stats?.technologies || 0,
icon:FaLaptopCode,
color:"orange",
description:"Connected technologies"
},


{
title:"Projects",
value:stats?.projects || 0,
icon:FaProjectDiagram,
color:"pink",
description:"AI projects"
},


{
title:"Certificates",
value:stats?.certificates || 0,
icon:FaCertificate,
color:"indigo",
description:"Verified certificates"
},


{
title:"Learning Resources",
value:stats?.learning_resources || 0,
icon:FaBookOpen,
color:"cyan",
description:"Learning materials"
},


{
title:"Products",
value:stats?.products || 0,
icon:FaBoxOpen,
color:"teal",
description:"Platform products"
},


{
title:"Case Studies",
value:stats?.case_studies || 0,
icon:FaFolderOpen,
color:"yellow",
description:"Industry cases"
},


];



const colors={

blue:{
bg:"bg-blue-50",
icon:"text-blue-600",
border:"hover:border-blue-400"
},

green:{
bg:"bg-green-50",
icon:"text-green-600",
border:"hover:border-green-400"
},

purple:{
bg:"bg-purple-50",
icon:"text-purple-600",
border:"hover:border-purple-400"
},

orange:{
bg:"bg-orange-50",
icon:"text-orange-600",
border:"hover:border-orange-400"
},

pink:{
bg:"bg-pink-50",
icon:"text-pink-600",
border:"hover:border-pink-400"
},

indigo:{
bg:"bg-indigo-50",
icon:"text-indigo-600",
border:"hover:border-indigo-400"
},

cyan:{
bg:"bg-cyan-50",
icon:"text-cyan-600",
border:"hover:border-cyan-400"
},

teal:{
bg:"bg-teal-50",
icon:"text-teal-600",
border:"hover:border-teal-400"
},

yellow:{
bg:"bg-yellow-50",
icon:"text-yellow-600",
border:"hover:border-yellow-400"
}

};



return(

<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"

>


{

cards.map((card,index)=>{


const Icon=card.icon;

const theme=colors[card.color];


return(


<div

key={index}

className={`
group
bg-white
rounded-2xl
border
border-gray-200
p-6
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
${theme.border}
`}

>


<div

className="
flex
items-start
justify-between
"

>


<div>


<p

className="
text-sm
font-medium
text-gray-500
"

>

{card.title}

</p>



<h2

className="
mt-3
text-4xl
font-bold
text-gray-900
"

>

{card.value}

</h2>



<p

className="
mt-2
text-sm
text-gray-400
"

>

{card.description}

</p>


</div>




<div

className={`
h-14
w-14
rounded-2xl
flex
items-center
justify-center
${theme.bg}
${theme.icon}
group-hover:scale-110
transition
duration-300
`}

>


<Icon size={26}/>


</div>



</div>



<div

className="
mt-6
h-1
w-full
rounded-full
bg-gray-100
overflow-hidden
"

>


<div

className="
h-full
w-2/3
rounded-full
bg-indigo-500
"

>


</div>


</div>


</div>


)


})


}



</div>


)

}


export default DashboardStats;