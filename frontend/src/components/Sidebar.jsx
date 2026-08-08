import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UserCog,
    Brain,
    Boxes,
    FolderKanban,
    BookOpen,
    Award,
    Package,
    FileText,
    Sparkles,
    Waypoints,
    Database,
    CircleDot,
    UserRoundCheck,
    BarChart3,
    ClipboardList
} from "lucide-react";



function Sidebar() {



const menu = [


{
    name:"Dashboard",
    path:"/dashboard",
    icon:LayoutDashboard
},


{
    name:"Students",
    path:"/students",
    icon:Users
},


{
    name:"Mentors",
    path:"/mentors",
    icon:UserCog
},


{
    name:"Skills",
    path:"/skills",
    icon:Brain
},


{
    name:"Technologies",
    path:"/technologies",
    icon:Boxes
},


{
    name:"Projects",
    path:"/projects",
    icon:FolderKanban
},


{
    name:"Learning Resources",
    path:"/learning-resources",
    icon:BookOpen
},


{
    name:"Certificates",
    path:"/certificates",
    icon:Award
},


{
    name:"Products",
    path:"/products",
    icon:Package
},


{
    name:"Case Studies",
    path:"/case-studies",
    icon:FileText
},


{
    name:"Recommendations",
    path:"/recommendations",
    icon:Sparkles
},





// =====================
// HR MODULE
// =====================


{
    name:"HR Dashboard",
    path:"/hr/dashboard",
    icon:UserRoundCheck
},


{
    name:"HR Students",
    path:"/hr/students",
    icon:Users
},


{
    name:"HR Mentors",
    path:"/hr/mentors",
    icon:UserCog
},


{
    name:"HR Analytics",
    path:"/hr/analytics",
    icon:BarChart3
},


{
    name:"HR Reports",
    path:"/hr/reports",
    icon:ClipboardList
}



];






return (


<aside

className="
flex
h-screen
w-72
flex-col
bg-[#0B1120]
text-white
border-r
border-slate-800
"

>





{/* BRAND */}


<div

className="
px-6
py-6
border-b
border-slate-800
"

>


<div className="flex items-center gap-3">



<div

className="
relative
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-blue-500
via-indigo-600
to-purple-600
shadow-lg
"

>


<Waypoints size={25}/>



<div

className="
absolute
-right-1
-top-1
h-3
w-3
rounded-full
bg-green-400
border-2
border-[#0B1120]
"

/>



</div>





<div>

<h1 className="text-sm font-bold tracking-wide">

AI Knowledge Graph

</h1>


<p className="text-xs text-slate-400 mt-1">

Skill Intelligence Platform

</p>


</div>



</div>



</div>








{/* NAVIGATION */}


<nav

className="
flex-1
overflow-y-auto
px-4
py-6
"

>


<div

className="
mb-4
flex
items-center
gap-2
px-3
"

>


<Database size={14} className="text-blue-400"/>


<p

className="
text-xs
font-semibold
uppercase
tracking-widest
text-slate-500
"

>

Platform Modules

</p>


</div>







<ul className="space-y-2">


{

menu.map((item)=>{


const Icon = item.icon;



return (


<li key={item.path}>


<NavLink

to={item.path}


className={({isActive})=>


`

relative
group
flex
items-center
gap-3
rounded-xl
px-4
py-3
text-sm
font-medium
transition-all
duration-300


${
isActive

?

"bg-blue-600 text-white shadow-lg shadow-blue-600/30"

:

"text-slate-300 hover:bg-slate-800 hover:text-white"

}

`

}


>


<Icon

size={19}

className="
transition
duration-300
group-hover:scale-110
"

/>



<span>

{item.name}

</span>






{

item.name==="Recommendations" &&

<span

className="
ml-auto
rounded-full
bg-purple-500/20
px-2
py-0.5
text-[10px]
text-purple-300
"

>

AI

</span>

}



{

item.name.startsWith("HR") &&

<span

className="
ml-auto
rounded-full
bg-green-500/20
px-2
py-0.5
text-[10px]
text-green-300
"

>

HR

</span>

}



</NavLink>



</li>


)



})

}



</ul>



</nav>









{/* SYSTEM STATUS */}


<div

className="
border-t
border-slate-800
p-5
"

>


<div

className="
mb-4
rounded-2xl
bg-slate-800/70
p-4
"

>


<div className="flex items-center gap-2">


<CircleDot

size={14}

className="text-green-400"

/>


<p className="text-sm font-semibold">

System Status

</p>


</div>



<p className="mt-2 text-xs text-slate-400">

Neo4j Graph Database Connected

</p>


</div>






<div

className="
rounded-xl
bg-slate-800
p-3
"

>


<p className="text-sm font-semibold">

Malaika Naz

</p>


<p className="text-xs text-slate-400">

Backend • FastAPI • Neo4j

</p>


</div>




</div>






</aside>



)


}



export default Sidebar;