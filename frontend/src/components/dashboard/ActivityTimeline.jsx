import {
  UserPlus,
  FolderKanban,
  BookOpen,
  UserRoundCheck,
  BrainCircuit,
  Clock
} from "lucide-react";


const activities = [
  {
    title: "New Student Profile Added",
    description:
      "Student information successfully connected with knowledge graph.",
    time: "5 minutes ago",
    icon: UserPlus,
  },

  {
    title: "Project Relationship Updated",
    description:
      "Project requirements linked with relevant skills and technologies.",
    time: "20 minutes ago",
    icon: FolderKanban,
  },

  {
    title: "Learning Resource Connected",
    description:
      "New learning material mapped with required skills.",
    time: "45 minutes ago",
    icon: BookOpen,
  },

  {
    title: "Mentor Expertise Updated",
    description:
      "Mentor skill relationships updated in Neo4j graph.",
    time: "1 hour ago",
    icon: UserRoundCheck,
  },

  {
    title: "Knowledge Graph Sync Completed",
    description:
      "Graph database synchronization completed successfully.",
    time: "2 hours ago",
    icon: BrainCircuit,
  },
];


export default function ActivityTimeline() {


return (

<div
className="
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
gap-3
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
bg-blue-50
text-blue-600
"
>

<Clock size={24}/>

</div>


<div>

<h2
className="
text-xl
font-bold
text-slate-800
"
>
Recent Platform Activity
</h2>


<p
className="
text-sm
text-slate-500
mt-1
"
>
Latest updates from AI knowledge graph system
</p>


</div>


</div>





{/* Timeline */}

<div
className="
relative
ml-4
border-l-2
border-slate-200
space-y-8
"
>


{
activities.map((activity,index)=>{


const Icon = activity.icon;


return (

<div
key={index}
className="
relative
pl-8
"
>


{/* Circle */}

<div
className="
absolute
-left-[17px]
top-1
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-blue-600
text-white
ring-4
ring-white
"
>

<Icon size={15}/>

</div>





<div
className="
rounded-2xl
border
border-slate-100
bg-slate-50
p-4
transition
hover:border-blue-200
hover:bg-blue-50/40
"
>


<div
className="
flex
justify-between
gap-4
"
>


<h3
className="
font-semibold
text-slate-800
"
>

{activity.title}

</h3>



<span
className="
text-xs
text-slate-400
whitespace-nowrap
"
>

{activity.time}

</span>


</div>



<p
className="
mt-2
text-sm
leading-relaxed
text-slate-600
"
>

{activity.description}

</p>


</div>


</div>


)

})

}


</div>


</div>


)

}