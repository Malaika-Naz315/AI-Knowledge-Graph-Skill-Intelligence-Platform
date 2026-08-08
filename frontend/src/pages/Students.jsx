import { useEffect, useMemo, useState } from "react";

import {
  FaDownload,
  FaUsers,
  FaUniversity,
  FaLaptopCode,
  FaChartLine,
} from "react-icons/fa";


import { getStudents } from "../api/students";


import StudentTable from "../components/students/StudentTable";
import StudentSkeleton from "../components/students/StudentSkeleton";


import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";


import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";


import { exportStudentsCSV } from "../utils/exportCSV";



function Students() {



  const [students,setStudents] = useState([]);

  const [loading,setLoading] = useState(true);


  const [search,setSearch] = useState("");


  const [currentPage,setCurrentPage] = useState(1);


  const studentsPerPage = 10;



  // Modal States

  const [selectedStudent,setSelectedStudent] = useState(null);

  const [editStudent,setEditStudent] = useState(null);

  const [deleteStudent,setDeleteStudent] = useState(null);





  // Fetch Students

  useEffect(()=>{


    const fetchStudents = async()=>{


      try{


        const data = await getStudents();

        setStudents(data);


      }

      catch(error){

        console.log(error);

      }

      finally{

        setLoading(false);

      }


    };



    fetchStudents();


  },[]);








  // Search


  const filteredStudents = useMemo(()=>{


    return students.filter((student)=>


      `${student.name}

      ${student.university}

      ${student.degree}

      ${student.internship_track}

      ${student.experience_level}`


      .toLowerCase()

      .includes(search.toLowerCase())


    );


  },[students,search]);







  // Pagination


  const totalPages = Math.ceil(

    filteredStudents.length / studentsPerPage

  );



  const paginatedStudents = filteredStudents.slice(

    (currentPage-1)*studentsPerPage,

    currentPage*studentsPerPage

  );









  // Statistics


  const totalUniversities = new Set(

    students.map(s=>s.university)

  ).size;



  const totalTracks = new Set(

    students.map(s=>s.internship_track)

  ).size;



  const totalLevels = new Set(

    students.map(s=>s.experience_level)

  ).size;







  // Actions


  const handleView=(student)=>{

    setSelectedStudent(student);

  };




  const handleEdit=(student)=>{

    setEditStudent(student);

  };




  const handleDelete=(student)=>{

    setDeleteStudent(student);

  };





  const handleSave=(updatedStudent)=>{


    setStudents(prev=>

      prev.map(student=>

        student.student_id === updatedStudent.student_id

        ? updatedStudent

        : student

      )

    );


    setEditStudent(null);


  };






  const handleDeleteConfirm=(student)=>{


    setStudents(prev=>

      prev.filter(

        item=>item.student_id !== student.student_id

      )

    );


    setDeleteStudent(null);


  };









  return (

    <div className="space-y-7">





      <PageHeader

        title="Students"

        subtitle="View, search and analyze all registered students across internship programs."

      />








      {/* Stats */}


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">


        <StatCard

          title="Total Students"

          value={students.length}

          icon={FaUsers}

        />



        <StatCard

          title="Universities"

          value={totalUniversities}

          icon={FaUniversity}

        />



        <StatCard

          title="Internship Tracks"

          value={totalTracks}

          icon={FaLaptopCode}

        />



        <StatCard

          title="Experience Levels"

          value={totalLevels}

          icon={FaChartLine}

        />


      </div>








      {/* Search */}



      <div className="rounded-xl border bg-white p-6 shadow-sm">


        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">


          <div className="flex-1">


            <label className="mb-2 block text-sm font-medium">

              Search Students

            </label>



            <SearchBar

              value={search}

              onChange={setSearch}

              placeholder="Search students..."

            />


          </div>




          <Button

            variant="outline"

            icon={FaDownload}

            onClick={()=>exportStudentsCSV(filteredStudents)}

          >

            Export CSV

          </Button>



        </div>



      </div>









      {/* Table */}



      {

      loading ?


      (

        <StudentSkeleton/>

      )


      : paginatedStudents.length ?


      (

        <StudentTable

          students={paginatedStudents}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDelete}

        />


      )


      :


      (

        <EmptyState

          title="No Students Found"

          description="Try adjusting search."

        />

      )

      }








      {/* Pagination */}



      {

      !loading && filteredStudents.length > 0 &&

      (

        <Pagination

          currentPage={currentPage}

          totalPages={totalPages}

          onPageChange={setCurrentPage}

        />

      )

      }









      {/* Modals */}



      {

      selectedStudent &&

      (

        <ViewModal

          data={selectedStudent}

          title="Student Details"

          onClose={()=>setSelectedStudent(null)}

        />

      )

      }






      {

      editStudent &&

      (

        <EditModal

          data={editStudent}

          title="Edit Student"

          onClose={()=>setEditStudent(null)}

          onSave={handleSave}

        />

      )

      }







      {

      deleteStudent &&

      (

        <DeleteModal

          data={deleteStudent}

          title="Delete Student"

          onClose={()=>setDeleteStudent(null)}

          onConfirm={handleDeleteConfirm}

        />

      )

      }




    </div>

  );

}



export default Students;