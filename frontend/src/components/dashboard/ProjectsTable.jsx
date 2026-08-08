import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FolderKanban,
  Search,
  ExternalLink,
} from "lucide-react";


const projects = [

  {
    id:1,
    name:"AI Skill Recommendation Engine",
    skills:["Python","FastAPI","Neo4j"],
    mentor:"AI Specialist",
    status:"Active",
    score:"94%"
  },

  {
    id:2,
    name:"Knowledge Graph Visualization",
    skills:["React","Neo4j","D3.js"],
    mentor:"Frontend Expert",
    status:"In Progress",
    score:"91%"
  },

  {
    id:3,
    name:"Smart Learning Platform",
    skills:["Machine Learning","NLP"],
    mentor:"ML Mentor",
    status:"Completed",
    score:"87%"
  },

  {
    id:4,
    name:"AI Career Guidance System",
    skills:["AI","Recommendation"],
    mentor:"Data Scientist",
    status:"Active",
    score:"90%"
  },

];




function StatusBadge({status}){


const styles={

Active:
"bg-green-100 text-green-700",

"In Progress":
"bg-yellow-100 text-yellow-700",

Completed:
"bg-blue-100 text-blue-700"

};


return(

<span
className={`
px-3 py-1 rounded-full text-xs font-semibold
${styles[status]}
`}
>

{status}

</span>

)

}




export default function ProjectsTable(){


const navigate = useNavigate();


const [search,setSearch]=useState("");



const filteredProjects = projects.filter((project)=>

project.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);



return(


<div
className="
mt-6
bg-white
rounded-2xl
border
border-gray-200
shadow-sm
p-6
"
>



<div
className="
flex
flex-col
md:flex-row
justify-between
gap-5
mb-6
"
>



<div>

<h2
className="
text-xl
font-bold
text-gray-800
flex
items-center
gap-2
"
>

<FolderKanban
size={24}
className="text-indigo-600"
/>


Project Intelligence


</h2>


<p
className="
text-sm
text-gray-500
mt-2
"
>

Connected projects from Knowledge Graph

</p>


</div>





<div
className="
flex
items-center
gap-3
border
border-gray-200
rounded-xl
px-4
py-2
"
>


<Search
size={18}
className="text-gray-400"
/>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search projects..."

className="
outline-none
text-sm
w-56
"

/>


</div>



</div>






<div className="overflow-x-auto">


<table
className="
w-full
text-left
"
>


<thead>

<tr
className="
border-b
text-sm
text-gray-500
"
>

<th className="py-4">
Project
</th>

<th>
Skills
</th>

<th>
Mentor
</th>

<th>
Status
</th>

<th>
AI Score
</th>

<th>
Action
</th>


</tr>

</thead>





<tbody>


{

filteredProjects.map((project)=>(


<tr

key={project.id}

className="
border-b
hover:bg-gray-50
transition
"

>


<td
className="
py-5
font-semibold
text-gray-800
"
>

{project.name}

</td>




<td>

<div
className="
flex
flex-wrap
gap-2
"
>

{

project.skills.map((skill,index)=>(


<span

key={index}

className="
px-2
py-1
rounded-lg
bg-indigo-50
text-indigo-600
text-xs
"

>

{skill}

</span>


))

}

</div>


</td>




<td className="text-gray-600">

{project.mentor}

</td>




<td>

<StatusBadge
status={project.status}
/>

</td>





<td>

<span
className="
px-3
py-1
rounded-full
bg-green-50
text-green-600
font-semibold
text-sm
"
>

{project.score}

</span>


</td>





<td>


<button

onClick={()=>navigate(`/projects/${project.id}`)}

className="
flex
items-center
gap-2
text-indigo-600
hover:text-indigo-800
font-medium
text-sm
"

>

Open

<ExternalLink size={15}/>


</button>


</td>




</tr>


))


}



</tbody>


</table>


</div>



</div>


)

}