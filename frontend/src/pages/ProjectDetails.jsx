import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FolderKanban } from "lucide-react";


export default function ProjectDetails(){


const {id}=useParams();

const navigate=useNavigate();



const projects={

1:{
name:"AI Skill Recommendation Engine",
skills:["Python","FastAPI","Neo4j"],
mentor:"AI Specialist",
score:"94%",
description:
"AI based recommendation engine using Knowledge Graph to suggest skills, projects and learning paths."
},


2:{
name:"Knowledge Graph Visualization",
skills:["React","Neo4j","D3.js"],
mentor:"Frontend Expert",
score:"91%",
description:
"Interactive visualization system for exploring graph relationships."
},


3:{
name:"Smart Learning Platform",
skills:["Machine Learning","NLP"],
mentor:"ML Mentor",
score:"87%",
description:
"AI learning platform for personalized education."
},


4:{
name:"AI Career Guidance System",
skills:["AI","Recommendation"],
mentor:"Data Scientist",
score:"90%",
description:
"Career guidance system based on student skills."
}

};



const project=projects[id];



if(!project){

return(

<div className="p-10">

<h1 className="text-2xl font-bold">

Project Not Found

</h1>

</div>

)

}



return(

<div className="p-8">


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
text-indigo-600
mb-6
"

>

<ArrowLeft size={18}/>

Back


</button>




<div
className="
bg-white
rounded-2xl
border
p-8
shadow-sm
"
>


<div className="flex items-center gap-3">


<div
className="
bg-indigo-100
p-3
rounded-xl
text-indigo-600
"
>

<FolderKanban/>

</div>


<h1 className="text-3xl font-bold">

{project.name}

</h1>


</div>



<p className="mt-6 text-gray-600">

{project.description}

</p>




<div className="mt-8 grid md:grid-cols-3 gap-5">



<div className="bg-gray-50 p-5 rounded-xl">

<h3 className="text-gray-500">
Mentor
</h3>

<p className="font-semibold mt-2">
{project.mentor}
</p>

</div>




<div className="bg-gray-50 p-5 rounded-xl">

<h3 className="text-gray-500">
AI Score
</h3>

<p className="font-semibold mt-2 text-green-600">
{project.score}
</p>

</div>



<div className="bg-gray-50 p-5 rounded-xl">

<h3 className="text-gray-500">
Skills
</h3>

<div className="flex gap-2 flex-wrap mt-2">

{
project.skills.map((skill)=>(

<span
key={skill}
className="
bg-indigo-100
text-indigo-600
px-3
py-1
rounded-full
text-sm
"
>

{skill}

</span>

))
}

</div>


</div>



</div>



</div>


</div>

)

}