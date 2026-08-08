import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/dashboard";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import AIInsights from "../components/dashboard/AIInsights";
import QuickActions from "../components/dashboard/QuickActions";
import ProjectsTable from "../components/dashboard/ProjectsTable";
import DashboardFooter from "../components/dashboard/DashboardFooter";


export default function Dashboard(){

const [stats,setStats] = useState(null);

const [loading,setLoading] = useState(true);



const fetchStats = async()=>{

try{

setLoading(true);

const data = await getDashboardStats();

setStats(data);


}

catch(error){

console.log(
"Dashboard Error:",
error
);

}

finally{

setLoading(false);

}

};



useEffect(()=>{

fetchStats();

},[]);





if(loading){

return(

<div
className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
"
>

<div className="text-center">

<div
className="
h-12
w-12
mx-auto
rounded-full
border-4
border-blue-600
border-t-transparent
animate-spin
"
/>


<p className="mt-4 text-slate-600 font-medium">
Loading Dashboard...
</p>


</div>

</div>

)

}



return(

<div
className="
flex
min-h-screen
flex-col
bg-slate-100
"
>


{/* Dashboard Content */}

<div
className="
flex-1
space-y-8
"
>


{/* Dashboard Hero Header */}

<DashboardHeader
refresh={fetchStats}
/>



{/* Stats */}

<DashboardStats
stats={stats}
/>



{/* Charts */}

<AnalyticsCharts/>



{/* Activity + AI */}

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
"
>

<ActivityTimeline/>

<AIInsights/>

</div>




{/* Actions */}

<QuickActions/>




{/* Projects */}

<ProjectsTable/>


</div>





{/* Footer Full Width */}

<DashboardFooter/>


</div>


)


}