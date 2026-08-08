import {FaChalkboardTeacher} from "react-icons/fa";

import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";


function MentorRow({
mentor,
onView,
onEdit,
onDelete
}){


return(

<tr className="hover:bg-slate-50">


<td className="px-6 py-5">

<div className="flex items-center gap-4">

<div className="h-11 w-11 rounded-full bg-slate-100 flex items-center justify-center">

<FaChalkboardTeacher/>

</div>


<div>

<p className="font-semibold">

{mentor.name}

</p>


<p className="text-xs text-slate-500">

#{mentor.mentor_id}

</p>


</div>


</div>

</td>



<td className="px-6 py-5">

<Badge variant="primary">

{mentor.specialization}

</Badge>

</td>



<td className="px-6 py-5">

{mentor.designation}

</td>



<td className="px-6 py-5">

<Badge variant="purple">

{mentor.department}

</Badge>

</td>



<td className="px-6 py-5 text-center">

<Badge variant="success">

{mentor.experience} Years

</Badge>

</td>



<td className="px-6 py-5 text-center">

<Badge variant="success">

Active

</Badge>

</td>



<td className="px-6 py-5">


<ActionButtons

item={mentor}

onView={onView}

onEdit={onEdit}

onDelete={onDelete}

/>


</td>



</tr>


);


}


export default MentorRow;