import MentorRow from "./MentorRow";


function MentorTable({
mentors,
onView,
onEdit,
onDelete
}){


return(

<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


<table className="min-w-full divide-y divide-slate-200">


<thead className="bg-slate-50">

<tr>

<th className="px-6 py-4 text-left">Mentor</th>

<th className="px-6 py-4 text-left">Specialization</th>

<th className="px-6 py-4 text-left">Designation</th>

<th className="px-6 py-4 text-left">Department</th>

<th className="px-6 py-4 text-center">Experience</th>

<th className="px-6 py-4 text-center">Status</th>

<th className="px-6 py-4 text-center">Actions</th>

</tr>

</thead>


<tbody>


{
mentors.map((mentor)=>(

<MentorRow

key={mentor.mentor_id}

mentor={mentor}

onView={onView}

onEdit={onEdit}

onDelete={onDelete}

/>


))
}


</tbody>


</table>


</div>


);


}


export default MentorTable;