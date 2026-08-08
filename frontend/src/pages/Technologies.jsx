import { useEffect, useMemo, useState } from "react";

import {
  FaLaptopCode,
  FaLayerGroup,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";


import { getTechnologies } from "../api/technologies";

import TechnologyTable from "../components/technologies/TechnologyTable";
import TechnologySkeleton from "../components/technologies/TechnologySkeleton";


import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";


import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";


import { exportTechnologiesCSV } from "../utils/exportCSV";




function Technologies() {


  const [technologies,setTechnologies] = useState([]);

  const [loading,setLoading] = useState(true);


  const [search,setSearch] = useState("");

  const [currentPage,setCurrentPage] = useState(1);



  // Action states

  const [selectedTechnology,setSelectedTechnology] = useState(null);

  const [editTechnology,setEditTechnology] = useState(null);

  const [deleteTechnology,setDeleteTechnology] = useState(null);



  const technologiesPerPage = 10;






  // Fetch Technologies


  useEffect(()=>{


    const fetchTechnologies = async()=>{


      try{


        const data = await getTechnologies();

        setTechnologies(data);


      }
      catch(error){

        console.log(error);

      }
      finally{

        setLoading(false);

      }


    };


    fetchTechnologies();


  },[]);







  // Reset Pagination


  useEffect(()=>{


    setCurrentPage(1);


  },[search]);









  // Search Filter


  const filteredTechnologies = useMemo(()=>{


    return technologies.filter((technology)=>


      `${technology.name}
       ${technology.category}
       ${technology.version}`

      .toLowerCase()

      .includes(search.toLowerCase())


    );


  },[technologies,search]);









  // Pagination


  const totalPages = Math.ceil(

    filteredTechnologies.length / technologiesPerPage

  );



  const paginatedTechnologies = filteredTechnologies.slice(

    (currentPage - 1) * technologiesPerPage,

    currentPage * technologiesPerPage

  );










  // Statistics


  const totalCategories = new Set(

    technologies.map(
      technology=>technology.category
    )

  ).size;




  const totalVersions = new Set(

    technologies.map(
      technology=>technology.version
    )

  ).size;









  // Actions


  const handleView=(technology)=>{


    setSelectedTechnology(technology);


  };





  const handleEdit=(technology)=>{


    setEditTechnology(technology);


  };





  const handleDelete=(technology)=>{


    setDeleteTechnology(technology);


  };









  // Save Edited Technology


  const handleSaveEdit=(updatedTechnology)=>{


    setTechnologies(prev=>

      prev.map(item=>

        item.technology_id === updatedTechnology.technology_id

        ? updatedTechnology

        : item

      )

    );


    setEditTechnology(null);


  };









  // Delete Technology


  const handleConfirmDelete=(technology)=>{


    setTechnologies(prev=>

      prev.filter(item=>

        item.technology_id !== technology.technology_id

      )

    );


    setDeleteTechnology(null);


  };









  return (


    <div className="space-y-7">






      <PageHeader

        title="Technologies"

        subtitle="Explore technologies and frameworks available in the knowledge graph."

      />









      {/* Statistics */}


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">



        <StatCard

          title="Total Technologies"

          value={technologies.length}

          icon={FaLaptopCode}

        />





        <StatCard

          title="Categories"

          value={totalCategories}

          icon={FaLayerGroup}

        />





        <StatCard

          title="Versions"

          value={totalVersions}

          icon={FaChartLine}

        />





        <StatCard

          title="Showing"

          value={filteredTechnologies.length}

          icon={FaLaptopCode}

        />



      </div>









      {/* Search + Export */}



      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">


        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">



          <div className="flex-1">


            <label className="mb-2 block text-sm font-medium text-slate-700">

              Search Technologies

            </label>




            <SearchBar

              value={search}

              onChange={setSearch}

              placeholder="Search technologies..."

            />



          </div>








          <Button

            variant="outline"

            icon={FaDownload}

            onClick={()=>exportTechnologiesCSV(filteredTechnologies)}

          >

            Export CSV

          </Button>




        </div>


      </div>









      {/* Table */}



      {


        loading ? (


          <TechnologySkeleton />


        )


        : paginatedTechnologies.length ? (



          <TechnologyTable


            technologies={paginatedTechnologies}


            onView={handleView}


            onEdit={handleEdit}


            onDelete={handleDelete}


          />



        )



        : (


          <EmptyState

            title="No Technologies Found"

            description="No matching technologies available."

          />


        )


      }









      {/* Pagination */}



      {


        !loading && filteredTechnologies.length > 0 && (



          <Pagination


            currentPage={currentPage}


            totalPages={totalPages}


            onPageChange={setCurrentPage}


          />



        )


      }









      {/* Modals */}



      <ViewModal

        data={selectedTechnology}

        title="Technology Details"

        onClose={()=>setSelectedTechnology(null)}

      />







      <EditModal

        data={editTechnology}

        title="Edit Technology"

        onClose={()=>setEditTechnology(null)}

        onSave={handleSaveEdit}

      />







      <DeleteModal

        data={deleteTechnology}

        title="Delete Technology"

        onClose={()=>setDeleteTechnology(null)}

        onConfirm={handleConfirmDelete}

      />





    </div>

  );

}



export default Technologies;