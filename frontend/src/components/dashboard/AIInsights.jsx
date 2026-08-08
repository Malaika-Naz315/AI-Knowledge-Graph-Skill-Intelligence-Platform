import {
  BrainCircuit,
  TrendingUp,
  Users,
  BookOpen,
  Sparkles,
  Network
} from "lucide-react";


const insights = [

  {
    title: "Top Skill Demand",
    value: "Artificial Intelligence",
    description:
      "AI related skills are currently showing the highest demand across connected projects.",
    icon: TrendingUp,
  },


  {
    title: "Mentor Availability",
    value: "AI & ML Experts",
    description:
      "Students can be matched with mentors according to their skill similarity.",
    icon: Users,
  },


  {
    title: "Recommended Learning Path",
    value: "Python → AI → Deep Learning",
    description:
      "Knowledge graph identifies suitable learning progression based on skill gaps.",
    icon: BookOpen,
  },


  {
    title: "Graph Intelligence",
    value: "Growing Connections",
    description:
      "Neo4j relationships continuously improve recommendation accuracy.",
    icon: Network,
  },

];



export default function AIInsights(){


return (

<div
className="
mt-6
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
>


{/* Header */}

<div
className="
flex
items-center
gap-4
mb-8
"
>


<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-indigo-50
text-indigo-600
"
>

<Sparkles size={24}/>

</div>



<div>


<h2
className="
text-xl
font-bold
text-slate-800
"
>

AI Intelligence Insights

</h2>


<p
className="
mt-1
text-sm
text-slate-500
"
>

Smart analysis generated from knowledge graph relationships

</p>


</div>


</div>





{/* Cards */}

<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
>


{
insights.map((item,index)=>{


const Icon=item.icon;


return (

<div

key={index}

className="
group
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
transition-all
duration-300
hover:-translate-y-1
hover:border-indigo-300
hover:bg-white
hover:shadow-lg
"

>


<div
className="
flex
gap-4
"
>


<div
className="
flex
h-11
w-11
shrink-0
items-center
justify-center
rounded-xl
bg-indigo-100
text-indigo-600
group-hover:bg-indigo-600
group-hover:text-white
transition
"
>

<Icon size={21}/>

</div>





<div>


<p
className="
text-sm
font-medium
text-slate-500
"
>

{item.title}

</p>


<h3
className="
mt-1
font-bold
text-slate-800
"
>

{item.value}

</h3>


<p
className="
mt-2
text-sm
leading-relaxed
text-slate-600
"
>

{item.description}

</p>


</div>


</div>


</div>


)

})

}


</div>


{/* Footer */}

<div
className="
mt-8
flex
items-center
gap-3
rounded-2xl
bg-indigo-50
p-4
"
>


<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
bg-indigo-600
text-white
"
>

<BrainCircuit size={20}/>

</div>


<div>

<h3
className="
font-semibold
text-slate-800
"
>

Knowledge Graph Intelligence Active

</h3>


<p
className="
text-sm
text-slate-600
"
>

Recommendations are generated using connected skills, projects and resources.

</p>


</div>


</div>



</div>


)

}