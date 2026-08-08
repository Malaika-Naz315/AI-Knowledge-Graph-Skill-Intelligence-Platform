import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  Network,
} from "lucide-react";



const skillData = [
  { name: "Python", demand: 90 },
  { name: "AI", demand: 95 },
  { name: "React", demand: 85 },
  { name: "Neo4j", demand: 75 },
  { name: "FastAPI", demand: 80 },
];



const graphData = [
  { name:"Students", value:50 },
  { name:"Skills", value:20 },
  { name:"Projects", value:20 },
  { name:"Resources", value:10 },
];



const growthData = [
  {month:"Jan", users:200},
  {month:"Feb", users:350},
  {month:"Mar", users:500},
  {month:"Apr", users:700},
  {month:"May", users:900},
];



const connectionData = [
  {name:"Student-Skill", value:218},
  {name:"Projects", value:96},
  {name:"Mentor Links", value:50},
  {name:"Technology", value:72},
];



const COLORS=[
 "#2563eb",
 "#16a34a",
 "#f59e0b",
 "#9333ea"
];



function ChartCard({title,icon,children}){

return(

<div
className="
bg-white
rounded-2xl
border
border-gray-200
shadow-sm
p-6
hover:shadow-lg
transition
duration-300
"
>

<div
className="
flex
items-center
gap-3
mb-5
"
>

<div
className="
p-3
rounded-xl
bg-indigo-50
text-indigo-600
"
>

{icon}

</div>


<h2
className="
text-lg
font-semibold
text-gray-800
"
>

{title}

</h2>


</div>


{children}


</div>

)

}




export default function AnalyticsCharts(){


return(

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
mt-8
"
>


{/* 1 Skill Demand */}


<ChartCard

title="AI Skill Demand Analysis"

icon={<BarChart3 size={22}/>}

>


<div className="h-[300px]">


<ResponsiveContainer width="100%" height="100%">


<BarChart data={skillData}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="name"
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="demand"

fill="#2563eb"

radius={[8,8,0,0]}

/>


</BarChart>


</ResponsiveContainer>


</div>


</ChartCard>





{/* 2 Knowledge Graph Pie */}


<ChartCard

title="Knowledge Graph Entities"

icon={<BrainCircuit size={22}/>}

>


<div className="h-[300px]">


<ResponsiveContainer>


<PieChart>


<Pie

data={graphData}

dataKey="value"

cx="50%"

cy="50%"

innerRadius={70}

outerRadius={105}

paddingAngle={5}

>


{

graphData.map((item,index)=>(


<Cell

key={index}

fill={COLORS[index]}

/>


))

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>



<div
className="
grid
grid-cols-2
gap-3
mt-3
"
>


{

graphData.map((item,index)=>(


<div
key={index}
className="
flex
items-center
gap-2
bg-gray-50
rounded-lg
p-2
"
>


<div

className="
h-3
w-3
rounded-full
"

style={{
background:COLORS[index]
}}

/>


<span className="text-sm text-gray-600">

{item.name}

</span>


</div>


))

}


</div>



</ChartCard>





{/* 3 Growth */}


<ChartCard

title="Platform Growth"

icon={<TrendingUp size={22}/>}

>


<div className="h-[300px]">


<ResponsiveContainer>


<AreaChart data={growthData}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="month"
/>


<YAxis/>


<Tooltip/>


<Area

type="monotone"

dataKey="users"

stroke="#7c3aed"

fill="#ddd6fe"

strokeWidth={3}

/>


</AreaChart>


</ResponsiveContainer>


</div>


</ChartCard>






{/* 4 Graph Connections */}


<ChartCard

title="Knowledge Graph Connections"

icon={<Network size={22}/>}

>


<div className="h-[300px]">


<ResponsiveContainer>


<LineChart data={connectionData}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis

dataKey="name"

/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="value"

stroke="#16a34a"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>


</ChartCard>



</div>


)

}