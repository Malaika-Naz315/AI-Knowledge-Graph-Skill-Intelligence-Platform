import {
  FaSyncAlt,
  FaDownload,
  FaCircle,
} from "react-icons/fa";


function DashboardHeader({ refresh }) {


const exportReport = () => {

const data = {
project:
"AI Knowledge Graph & Skill Intelligence Platform",

team:[
"Malaika Naz - Backend",
"Saba Hayat - Frontend"
],

status:"System Operational"

};


const blob = new Blob(
[
JSON.stringify(data,null,2)
],
{
type:"application/json"
}
);


const url = URL.createObjectURL(blob);


const link=document.createElement("a");

link.href=url;

link.download="AI_Knowledge_Graph_Report.json";

link.click();


URL.revokeObjectURL(url);


};



return (

<div

className="
relative
overflow-hidden
rounded-3xl
border
border-slate-200
bg-[#F8FAFC]
p-8
shadow-sm
"

>


{/* Background Design */}


<div

className="
absolute
-right-20
-top-20
h-72
w-72
rounded-full
bg-blue-100
blur-3xl
"

/>



<div

className="
absolute
-left-20
-bottom-20
h-60
w-60
rounded-full
bg-indigo-100
blur-3xl
"

/>



<div className="relative flex flex-col lg:flex-row justify-between gap-8">



{/* LEFT CONTENT */}


<div className="max-w-3xl">



<span

className="
inline-flex
items-center
rounded-full
bg-blue-50
border
border-blue-100
px-4
py-1
text-xs
font-semibold
uppercase
tracking-widest
text-blue-700
"

>

Ezitech Internship Project

</span>




<h1

className="
mt-5
text-4xl
lg:text-5xl
font-bold
leading-tight
text-slate-900
"

>

AI Knowledge Graph &

<br/>

<span className="text-blue-700">

Skill Intelligence Platform

</span>


</h1>





<p

className="
mt-5
max-w-2xl
text-lg
leading-7
text-slate-600
"

>

Enterprise intelligence platform connecting students,
mentors, skills, technologies, projects and
AI-powered recommendations using Neo4j Knowledge Graph.

</p>







{/* TEAM */}



<div className="mt-7 flex flex-wrap gap-10">



<div>


<p

className="
text-xs
uppercase
tracking-wider
text-slate-400
"

>

Backend & Knowledge Graph

</p>



<h3

className="
mt-1
font-semibold
text-slate-900
"

>

Malaika Naz

</h3>


<p className="text-sm text-slate-500">

FastAPI • Neo4j • Python

</p>



</div>






<div>


<p

className="
text-xs
uppercase
tracking-wider
text-slate-400
"

>

Frontend Development

</p>



<h3

className="
mt-1
font-semibold
text-slate-900
"

>

Saba Hayat

</h3>


<p className="text-sm text-slate-500">

React • Tailwind • UI/UX

</p>



</div>



</div>








{/* STATUS */}


<div

className="
mt-8
flex
items-center
gap-3
"

>


<FaCircle

className="
text-green-500
text-xs
"

/>


<span

className="
text-sm
font-medium
text-slate-600
"

>

System Operational

</span>



</div>





</div>









{/* BUTTONS */}



<div

className="
flex
flex-col
justify-center
gap-4
"

>


<button

onClick={refresh}

className="
flex
items-center
justify-center
gap-3
rounded-xl
bg-[#0B1120]
px-6
py-3
font-medium
text-white
transition
hover:bg-slate-800
hover:shadow-lg
"

>


<FaSyncAlt/>


Refresh Dashboard


</button>







<button

onClick={exportReport}

className="
flex
items-center
justify-center
gap-3
rounded-xl
border
border-slate-300
bg-white
px-6
py-3
font-medium
text-slate-700
transition
hover:bg-slate-100
"

>


<FaDownload/>


Export Report


</button>




</div>






</div>


</div>


);


}


export default DashboardHeader;