import { useEffect, useState } from "react";


import { getStudents } from "../api/students";


import {
    getRecommendedSkills,
    getRecommendedProjects,
    getRecommendedMentors,
    getRecommendedResources,
    getSimilarStudents
} from "../api/recommendations";



import StatCard from "../components/common/StatCard";
import RecommendationEmpty from "../components/common/RecommendationEmpty";


import SkillCard from "../components/recommendations/SkillCard";
import ProjectCard from "../components/recommendations/ProjectCard";
import MentorCard from "../components/recommendations/MentorCard";
import ResourceCard from "../components/recommendations/ResourceCard";
import SimilarStudentCard from "../components/recommendations/SimilarStudentCard";


import StudentProfileCard from "../components/recommendations/StudentProfileCard";
import SkillGapCard from "../components/recommendations/SkillGapCard";


import RecommendationSkeleton from "../components/recommendations/RecommendationSkeleton";

import AIQuestionBox from "../components/recommendations/AIQuestionBox";



import {
    FaBrain,
    FaProjectDiagram,
    FaUserTie,
    FaBookOpen,
    FaUsers
} from "react-icons/fa";





function Recommendations(){



const [studentId,setStudentId] = useState("STU001");


const [students,setStudents] = useState([]);



const [skills,setSkills] = useState([]);

const [projects,setProjects] = useState([]);

const [mentors,setMentors] = useState([]);

const [resources,setResources] = useState([]);

const [similarStudents,setSimilarStudents] = useState([]);



const [loading,setLoading] = useState(false);



const loadStudents = async()=>{


try{


const data = await getStudents();


setStudents(

data.students || data || []

);


}

catch(error){

console.log(
"Student Loading Error",
error
);

setStudents([]);

}


};





useEffect(()=>{

loadStudents();

},[]);







const selectedStudent = students.find(

(student)=>

student.student_id === studentId

);





const student = selectedStudent || {


student_id:studentId,

name:"Selected Student",

university:"COMSATS University",

experience_level:"Intermediate",

internship_track:"Artificial Intelligence"


};








const skillGap = {


current_skills:

skills.map(

(skill)=>

skill.skill_name

),


missing_skills:[

"Docker",

"LangChain",

"Cloud"

]

};









const loadRecommendations = async()=>{


try{


setLoading(true);



const results = await Promise.allSettled([


getRecommendedSkills(studentId),

getRecommendedProjects(studentId),

getRecommendedMentors(studentId),

getRecommendedResources(studentId),

getSimilarStudents(studentId)


]);




const skillData =
results[0].status==="fulfilled"
?
results[0].value
:
{};



const projectData =
results[1].status==="fulfilled"
?
results[1].value
:
{};



const mentorData =
results[2].status==="fulfilled"
?
results[2].value
:
{};



const resourceData =
results[3].status==="fulfilled"
?
results[3].value
:
{};



const similarData =
results[4].status==="fulfilled"
?
results[4].value
:
{};




setSkills(

skillData.recommended_skills || []

);



setProjects(

projectData.recommended_projects || []

);



setMentors(

mentorData.recommended_mentors || []

);



setResources(

resourceData.learning_resources || []

);



setSimilarStudents(

similarData.similar_students || []

);



}

catch(error){


console.log(
"Recommendation Error",
error
);


setSkills([]);

setProjects([]);

setMentors([]);

setResources([]);

setSimilarStudents([]);


}

finally{


setLoading(false);


}


};









return(


<div className="p-8 space-y-8">





{/* Header */}

<div>


<h1 className="text-3xl font-bold text-slate-800">

AI Recommendation Engine

</h1>


<p className="text-slate-500 mt-2">

Knowledge Graph based personalized recommendations

</p>


</div>







{/* AI QUERY */}

<AIQuestionBox />








{/* Student Selector */}


<div className="
bg-white
border
border-slate-200
rounded-xl
p-6
">


<div className="flex flex-col md:flex-row gap-4">



<select

value={studentId}

onChange={(e)=>
setStudentId(e.target.value)
}

className="
border
border-slate-300
rounded-lg
px-4
py-2
w-full
md:w-72
"

>


<option value="">

Select Student

</option>



{

students.map(

(student)=>(


<option

key={student.student_id}

value={student.student_id}

>


{student.student_id}

{" - "}

{student.name}


</option>


)

)

}


</select>





<button

onClick={loadRecommendations}

className="
bg-blue-600
text-white
px-6
py-2
rounded-lg
hover:bg-blue-700
"

>


{

loading

?

"Loading..."

:

"Generate Recommendations"

}


</button>



</div>



</div>








<StudentProfileCard

student={student}

/>







<div className="grid md:grid-cols-5 gap-6">



<StatCard

title="Skills"

value={skills.length}

icon={FaBrain}

/>



<StatCard

title="Projects"

value={projects.length}

icon={FaProjectDiagram}

/>



<StatCard

title="Mentors"

value={mentors.length}

icon={FaUserTie}

/>



<StatCard

title="Resources"

value={resources.length}

icon={FaBookOpen}

/>



<StatCard

title="Similar Students"

value={similarStudents.length}

icon={FaUsers}

/>



</div>







{

loading

?

<RecommendationSkeleton/>

:

<>



<SkillGapCard

skillGap={skillGap}

/>






<section>

<h2 className="text-xl font-bold mb-4">

Recommended Skills

</h2>



{

skills.length

?

<div className="grid md:grid-cols-3 gap-5">

{

skills.map(

(skill)=>(

<SkillCard

key={skill.skill_id}

skill={skill}

/>

)

)

}

</div>


:

<RecommendationEmpty

message="No skill recommendations available."

/>


}


</section>







<section>

<h2 className="text-xl font-bold mb-4">

Recommended Projects

</h2>



{

projects.length

?

<div className="grid md:grid-cols-3 gap-5">

{

projects.map(

(project)=>(

<ProjectCard

key={project.project_id}

project={project}

/>

)

)

}

</div>


:

<RecommendationEmpty

message="No matching projects found."

/>


}



</section>








<section>

<h2 className="text-xl font-bold mb-4">

Similar Students

</h2>



{

similarStudents.length

?

<div className="grid md:grid-3 gap-5">


{

similarStudents.map(

(student,index)=>(

<SimilarStudentCard

key={index}

student={student}

/>

)

)

}



</div>


:

<RecommendationEmpty

message="No similar students found."

/>


}



</section>








<section>

<h2 className="text-xl font-bold mb-4">

Recommended Mentors

</h2>



{

mentors.length

?

<div className="grid md:grid-cols-3 gap-5">


{

mentors.map(

(mentor)=>(

<MentorCard

key={mentor.mentor_id}

mentor={mentor}

/>

)

)

}


</div>


:

<RecommendationEmpty

message="No mentor matches available."

/>


}



</section>







<section>

<h2 className="text-xl font-bold mb-4">

Learning Resources

</h2>



{

resources.length

?

<div className="grid md:grid-cols-3 gap-5">


{

resources.map(

(resource)=>(

<ResourceCard

key={resource.resource_id}

resource={resource}

/>

)

)

}


</div>


:

<RecommendationEmpty

message="No learning resources found."

/>


}



</section>



</>

}



</div>


);


}



export default Recommendations;