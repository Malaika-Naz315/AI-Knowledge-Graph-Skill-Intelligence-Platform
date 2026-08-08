import { useEffect, useMemo, useState } from "react";

import {
  FaCode,
  FaLayerGroup,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";


import { getSkills } from "../api/skills";

import SkillTable from "../components/skills/SkillTable";
import SkillSkeleton from "../components/skills/SkillSkeleton";


import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";


import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";


import { exportSkillsCSV } from "../utils/exportCSV";



function Skills() {


  const [skills,setSkills] = useState([]);

  const [loading,setLoading] = useState(true);


  const [search,setSearch] = useState("");

  const [currentPage,setCurrentPage] = useState(1);



  // Action States

  const [selectedSkill,setSelectedSkill] = useState(null);

  const [editSkill,setEditSkill] = useState(null);

  const [deleteSkill,setDeleteSkill] = useState(null);



  const skillsPerPage = 10;





  // Fetch Skills

  useEffect(()=>{


    const fetchSkills = async()=>{


      try{


        const data = await getSkills();

        setSkills(data);


      }
      catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }


    };


    fetchSkills();


  },[]);







  // Reset Pagination

  useEffect(()=>{

    setCurrentPage(1);

  },[search]);







  // Search

  const filteredSkills = useMemo(()=>{


    return skills.filter((skill)=>


      `${skill.name}
      ${skill.category}
      ${skill.difficulty}`

      .toLowerCase()

      .includes(search.toLowerCase())


    );


  },[skills,search]);








  // Pagination


  const totalPages = Math.ceil(

    filteredSkills.length / skillsPerPage

  );



  const paginatedSkills = filteredSkills.slice(

    (currentPage - 1) * skillsPerPage,

    currentPage * skillsPerPage

  );







  // Stats


  const totalCategories = new Set(

    skills.map(skill=>skill.category)

  ).size;



  const totalLevels = new Set(

    skills.map(skill=>skill.difficulty)

  ).size;







  // Actions


  const handleView = (skill)=>{

    setSelectedSkill(skill);

  };



  const handleEdit = (skill)=>{

    setEditSkill(skill);

  };



  const handleDelete = (skill)=>{

    setDeleteSkill(skill);

  };





  const handleSaveEdit = (updatedSkill)=>{


    setSkills(prev =>

      prev.map(skill =>

        skill.skill_id === updatedSkill.skill_id

        ? updatedSkill

        : skill

      )

    );


    setEditSkill(null);


  };






  const handleConfirmDelete = (skill)=>{


    setSkills(prev =>

      prev.filter(item =>

        item.skill_id !== skill.skill_id

      )

    );


    setDeleteSkill(null);


  };









  return (


    <div className="space-y-7">






      <PageHeader

        title="Skills"

        subtitle="Manage and monitor technical skills across the knowledge graph."

      />








      {/* Stats */}


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


        <StatCard

          title="Total Skills"

          value={skills.length}

          icon={FaCode}

        />



        <StatCard

          title="Categories"

          value={totalCategories}

          icon={FaLayerGroup}

        />



        <StatCard

          title="Difficulty Levels"

          value={totalLevels}

          icon={FaChartLine}

        />



        <StatCard

          title="Showing"

          value={filteredSkills.length}

          icon={FaCode}

        />


      </div>









      {/* Search + Export */}



      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">


        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">



          <div className="flex-1">


            <label className="mb-2 block text-sm font-medium text-slate-700">

              Search Skills

            </label>



            <SearchBar

              value={search}

              onChange={setSearch}

              placeholder="Search skills..."

            />


          </div>





          <Button

            variant="outline"

            icon={FaDownload}

            onClick={()=>exportSkillsCSV(filteredSkills)}

          >

            Export CSV

          </Button>



        </div>


      </div>









      {/* Table */}



      {

      loading ? (


        <SkillSkeleton />


      )


      : paginatedSkills.length ? (


        <SkillTable

          skills={paginatedSkills}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDelete}

        />


      )


      :


      (

        <EmptyState

          title="No Skills Found"

          description="No matching skills available."

        />

      )

      }









      {/* Pagination */}



      {

      !loading && filteredSkills.length > 0 && (


        <Pagination

          currentPage={currentPage}

          totalPages={totalPages}

          onPageChange={setCurrentPage}

        />


      )

      }










      {/* Modals */}



      <ViewModal

        data={selectedSkill}

        title="Skill Details"

        onClose={()=>setSelectedSkill(null)}

      />





      <EditModal

        data={editSkill}

        title="Edit Skill"

        onClose={()=>setEditSkill(null)}

        onSave={handleSaveEdit}

      />





      <DeleteModal

        data={deleteSkill}

        title="Delete Skill"

        onClose={()=>setDeleteSkill(null)}

        onConfirm={handleConfirmDelete}

      />






    </div>


  );

}



export default Skills;