import { useEffect, useMemo, useState } from "react";

import {
  FaProjectDiagram,
  FaLayerGroup,
  FaCode,
  FaDownload,
} from "react-icons/fa";


import { getProjects } from "../api/projects";


import ProjectTable from "../components/projects/ProjectTable";
import ProjectSkeleton from "../components/projects/ProjectSkeleton";


import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";


import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";


import { exportProjectsCSV } from "../utils/exportCSV";



function Projects(){


const [projects,setProjects]=useState([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

const [currentPage,setCurrentPage]=useState(1);



const [selectedProject,setSelectedProject]=useState(null);

const [editProject,setEditProject]=useState(null);

const [deleteProject,setDeleteProject]=useState(null);



const projectsPerPage=10;






useEffect(()=>{


const fetchProjects=async()=>{


try{


const data=await getProjects();

setProjects(data);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};


fetchProjects();


},[]);








useEffect(()=>{

setCurrentPage(1);

},[search]);








const filteredProjects=useMemo(()=>{


return projects.filter((project)=>

`${project.title}
${project.name}
${project.domain}
${project.difficulty}
${project.description}`

.toLowerCase()

.includes(search.toLowerCase())


);


},[projects,search]);










const totalPages=Math.ceil(

filteredProjects.length/projectsPerPage

);





const paginatedProjects=filteredProjects.slice(

(currentPage-1)*projectsPerPage,

currentPage*projectsPerPage

);








const totalDomains=new Set(

projects.map(project=>project.domain)

).size;



const totalDifficulty=new Set(

projects.map(project=>project.difficulty)

).size;









const handleView=(project)=>{

setSelectedProject(project);

};



const handleEdit=(project)=>{

setEditProject(project);

};



const handleDelete=(project)=>{

setDeleteProject(project);

};









const handleSaveEdit=(updatedProject)=>{


setProjects(prev=>

prev.map(item=>

item.project_id===updatedProject.project_id

?updatedProject

:item

)

);


setEditProject(null);


};









const handleConfirmDelete=(project)=>{


setProjects(prev=>

prev.filter(item=>

item.project_id!==project.project_id

)

);


setDeleteProject(null);


};









return(


<div className="space-y-7">



<PageHeader

title="Projects"

subtitle="Explore projects, technologies and case studies connected with the knowledge graph."

/>







<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


<StatCard

title="Total Projects"

value={projects.length}

icon={FaProjectDiagram}

/>



<StatCard

title="Domains"

value={totalDomains}

icon={FaLayerGroup}

/>



<StatCard

title="Difficulty Levels"

value={totalDifficulty}

icon={FaCode}

/>



<StatCard

title="Showing"

value={filteredProjects.length}

icon={FaProjectDiagram}

/>


</div>









<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">


<div className="flex-1">


<label className="mb-2 block text-sm font-medium text-slate-700">

Search Projects

</label>



<SearchBar

value={search}

onChange={setSearch}

placeholder="Search projects..."

/>



</div>





<Button

variant="outline"

icon={FaDownload}

onClick={()=>exportProjectsCSV(filteredProjects)}

>

Export CSV

</Button>



</div>


</div>










{

loading ? (

<ProjectSkeleton/>

)

:

paginatedProjects.length ? (


<ProjectTable

projects={paginatedProjects}

onView={handleView}

onEdit={handleEdit}

onDelete={handleDelete}

/>


)

:

(

<EmptyState

title="No Projects Found"

description="Try another search."

/>

)

}









{

!loading && filteredProjects.length>0 &&

(

<Pagination

currentPage={currentPage}

totalPages={totalPages}

onPageChange={setCurrentPage}

/>

)

}










<ViewModal

data={selectedProject}

title="Project Details"

onClose={()=>setSelectedProject(null)}

/>





<EditModal

data={editProject}

title="Edit Project"

onClose={()=>setEditProject(null)}

onSave={handleSaveEdit}

/>





<DeleteModal

data={deleteProject}

title="Delete Project"

onClose={()=>setDeleteProject(null)}

onConfirm={handleConfirmDelete}

/>






</div>


);


}



export default Projects;