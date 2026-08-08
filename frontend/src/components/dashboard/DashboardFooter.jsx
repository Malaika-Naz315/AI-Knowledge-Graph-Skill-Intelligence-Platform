import {
  FaDatabase,
  FaCode,
  FaBrain,
  FaHeart,
} from "react-icons/fa";


function DashboardFooter() {


return (

<footer

className="
mt-10
w-full
border-t
border-slate-200
bg-[#F8FAFC]
px-8
py-6
"

>


<div

className="
flex
flex-col
gap-5
lg:flex-row
lg:items-center
lg:justify-between
"

>



{/* LEFT */}


<div>


<h3

className="
text-sm
font-semibold
text-slate-900
"

>

AI Knowledge Graph & Skill Intelligence Platform

</h3>


<p

className="
mt-1
text-sm
text-slate-500
"

>

Enterprise AI platform powered by Neo4j Knowledge Graph

</p>


</div>








{/* CENTER STATUS */}



<div

className="
flex
items-center
gap-5
"

>


<div

className="
flex
items-center
gap-2
text-sm
text-slate-600
"

>

<FaDatabase

className="
text-blue-600
"

/>

Neo4j Connected

</div>





<div

className="
flex
items-center
gap-2
text-sm
text-slate-600
"

>

<FaBrain

className="
text-purple-600
"

/>

AI Intelligence Active

</div>



</div>








{/* RIGHT */}



<div

className="
text-sm
text-slate-500
"

>


<div className="flex items-center gap-2">


<span>

Developed with

</span>





<span>

by Malaika Naz & Saba Hayat

</span>


</div>



<p className="mt-1 text-right text-xs text-slate-400">

© 2026 Ezitech Internship Project

</p>



</div>







</div>


</footer>


);


}


export default DashboardFooter;