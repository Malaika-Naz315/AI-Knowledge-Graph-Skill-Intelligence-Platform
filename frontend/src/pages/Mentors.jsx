import { useEffect, useMemo, useState } from "react";

import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBuilding,
  FaDownload,
} from "react-icons/fa";


import { getMentors } from "../api/mentors";

import MentorTable from "../components/mentors/MentorTable";
import MentorSkeleton from "../components/mentors/MentorSkeleton";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import Pagination from "../components/common/Pagination";

import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";

import { exportMentorsCSV } from "../utils/exportCSV";



function Mentors(){


const [mentors,setMentors] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");

const [currentPage,setCurrentPage] = useState(1);


const [selectedMentor,setSelectedMentor] = useState(null);

const [editMentor,setEditMentor] = useState(null);

const [deleteMentor,setDeleteMentor] = useState(null);



const mentorsPerPage = 10;



useEffect(()=>{


const fetchMentors = async()=>{

try{

const data = await getMentors();

setMentors(data);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};


fetchMentors();


},[]);





const filteredMentors = useMemo(()=>{


return mentors.filter((mentor)=>

`${mentor.name}
${mentor.specialization}
${mentor.department}
${mentor.designation}`

.toLowerCase()

.includes(search.toLowerCase())


);


},[mentors,search]);





const totalPages = Math.ceil(
filteredMentors.length / mentorsPerPage
);



const paginatedMentors = filteredMentors.slice(

(currentPage-1)*mentorsPerPage,

currentPage*mentorsPerPage

);





const totalDepartments = new Set(
mentors.map(m=>m.department)
).size;



const totalSpecializations = new Set(
mentors.map(m=>m.specialization)
).size;






const handleSave=(updated)=>{


setMentors(prev=>

prev.map(item=>

item.mentor_id === updated.mentor_id

?

updated

:

item

)

);


setEditMentor(null);


};





const handleDelete=(mentor)=>{


setMentors(prev=>

prev.filter(item=>

item.mentor_id !== mentor.mentor_id

)

);


setDeleteMentor(null);


};






return(

<div className="space-y-7">


<PageHeader

title="Mentors"

subtitle="Manage and monitor mentors across internship programs."

/>




<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


<StatCard
title="Total Mentors"
value={mentors.length}
icon={FaChalkboardTeacher}
/>


<StatCard
title="Departments"
value={totalDepartments}
icon={FaBuilding}
/>


<StatCard
title="Specializations"
value={totalSpecializations}
icon={FaUserGraduate}
/>


<StatCard
title="Showing"
value={filteredMentors.length}
icon={FaChalkboardTeacher}
/>


</div>






<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">


<div className="flex-1">


<label className="mb-2 block text-sm font-medium text-slate-700">

Search Mentors

</label>


<SearchBar

value={search}

onChange={setSearch}

placeholder="Search mentor..."

 />


</div>



<Button

variant="outline"

icon={FaDownload}

onClick={()=>exportMentorsCSV(filteredMentors)}

>

Export CSV

</Button>


</div>


</div>






{

loading ?

<MentorSkeleton/>


:

paginatedMentors.length ?


<MentorTable

mentors={paginatedMentors}

onView={setSelectedMentor}

onEdit={setEditMentor}

onDelete={setDeleteMentor}

/>


:

<EmptyState

title="No Mentors Found"

description="Try another search."

/>


}





{

!loading && filteredMentors.length>0 &&

<Pagination

currentPage={currentPage}

totalPages={totalPages}

onPageChange={setCurrentPage}

/>

}





<ViewModal

data={selectedMentor}

title="Mentor Details"

onClose={()=>setSelectedMentor(null)}

/>



<EditModal

data={editMentor}

title="Edit Mentor"

onClose={()=>setEditMentor(null)}

onSave={handleSave}

/>



<DeleteModal

data={deleteMentor}

title="Delete Mentor"

onClose={()=>setDeleteMentor(null)}

onConfirm={handleDelete}

/>




</div>


);


}


export default Mentors;