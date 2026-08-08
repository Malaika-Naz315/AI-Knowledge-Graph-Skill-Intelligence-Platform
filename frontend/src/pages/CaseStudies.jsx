import { useEffect, useMemo, useState } from "react";

import {
  FaBookOpen,
  FaLayerGroup,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";

import { getCaseStudies } from "../api/caseStudies";

import CaseStudyTable from "../components/caseStudies/CaseStudyTable";
import CaseStudySkeleton from "../components/caseStudies/CaseStudySkeleton";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";

import { exportCaseStudiesCSV } from "../utils/exportCSV";

function CaseStudies() {

  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States

  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [editCaseStudy, setEditCaseStudy] = useState(null);
  const [deleteCaseStudy, setDeleteCaseStudy] = useState(null);

  const caseStudiesPerPage = 10;

  // ==========================
  // Fetch Case Studies
  // ==========================

  useEffect(() => {

    const fetchCaseStudies = async () => {

      try {

        const data = await getCaseStudies();

        setCaseStudies(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchCaseStudies();

  }, []);

  // ==========================
  // Reset Pagination
  // ==========================

  useEffect(() => {

    setCurrentPage(1);

  }, [search]);

  // ==========================
  // Search Filter
  // ==========================

  const filteredCaseStudies = useMemo(() => {

    return caseStudies.filter((caseStudy) =>

      `${caseStudy.title}
       ${caseStudy.domain}
       ${caseStudy.difficulty}
       ${caseStudy.description}`

        .toLowerCase()

        .includes(search.toLowerCase())

    );

  }, [caseStudies, search]);

  // ==========================
  // Pagination
  // ==========================

  const totalPages = Math.ceil(

    filteredCaseStudies.length / caseStudiesPerPage

  );

  const paginatedCaseStudies = filteredCaseStudies.slice(

    (currentPage - 1) * caseStudiesPerPage,

    currentPage * caseStudiesPerPage

  );

  // ==========================
  // Statistics
  // ==========================

  const totalDomains = new Set(

    caseStudies.map((item) => item.domain)

  ).size;

  const totalDifficulty = new Set(

    caseStudies.map((item) => item.difficulty)

  ).size;

  // ==========================
  // Actions
  // ==========================

  const handleView = (caseStudy) => {

    setSelectedCaseStudy(caseStudy);

  };

  const handleEdit = (caseStudy) => {

    setEditCaseStudy(caseStudy);

  };

  const handleDelete = (caseStudy) => {

    setDeleteCaseStudy(caseStudy);

  };

  const handleSave = (updatedCaseStudy) => {

    setCaseStudies((prev) =>

      prev.map((item) =>

        item.case_study_id === updatedCaseStudy.case_study_id

          ? updatedCaseStudy

          : item

      )

    );

    setEditCaseStudy(null);

  };

  const handleConfirmDelete = (caseStudy) => {

    setCaseStudies((prev) =>

      prev.filter(

        (item) =>

          item.case_study_id !== caseStudy.case_study_id

      )

    );

    setDeleteCaseStudy(null);

  };
    return (
    <div className="space-y-7">

      <PageHeader
        title="Case Studies"
        subtitle="Explore real-world case studies connected with projects and technologies."
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Case Studies"
          value={caseStudies.length}
          icon={FaBookOpen}
        />

        <StatCard
          title="Domains"
          value={totalDomains}
          icon={FaLayerGroup}
        />

        <StatCard
          title="Difficulty Levels"
          value={totalDifficulty}
          icon={FaChartLine}
        />

        <StatCard
          title="Showing"
          value={filteredCaseStudies.length}
          icon={FaBookOpen}
        />

      </div>

      {/* Search + Export */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex-1">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Case Studies
            </label>

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search case studies..."
            />

          </div>

          <Button
            variant="outline"
            icon={FaDownload}
            onClick={() => exportCaseStudiesCSV(filteredCaseStudies)}
          >
            Export CSV
          </Button>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <CaseStudySkeleton />

      ) : paginatedCaseStudies.length ? (

        <CaseStudyTable
          caseStudies={paginatedCaseStudies}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      ) : (

        <EmptyState
          title="No Case Studies Found"
          description="No matching case studies available."
        />

      )}

      {/* Pagination */}

      {!loading && filteredCaseStudies.length > 0 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      )}

      {/* View Modal */}

      <ViewModal
        data={selectedCaseStudy}
        title="Case Study Details"
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Edit Modal */}

      <EditModal
        data={editCaseStudy}
        title="Edit Case Study"
        onClose={() => setEditCaseStudy(null)}
        onSave={handleSave}
      />

      {/* Delete Modal */}

      <DeleteModal
        data={deleteCaseStudy}
        title="Delete Case Study"
        onClose={() => setDeleteCaseStudy(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}

export default CaseStudies;