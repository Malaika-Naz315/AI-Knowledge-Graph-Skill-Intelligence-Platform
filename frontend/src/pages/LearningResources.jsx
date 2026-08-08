import { useEffect, useMemo, useState } from "react";

import {
  FaBookOpen,
  FaLayerGroup,
  FaLaptopCode,
  FaDownload,
} from "react-icons/fa";

import { getLearningResources } from "../api/learningResources";

import LearningResourceTable from "../components/learningResources/LearningResourceTable";
import LearningResourceSkeleton from "../components/learningResources/LearningResourceSkeleton";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";

import { exportResourcesCSV } from "../utils/exportCSV";

function LearningResources() {

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [selectedResource, setSelectedResource] = useState(null);
  const [editResource, setEditResource] = useState(null);
  const [deleteResource, setDeleteResource] = useState(null);

  const resourcesPerPage = 10;

  // ==========================
  // Fetch Resources
  // ==========================

  useEffect(() => {

    const fetchResources = async () => {

      try {

        const data = await getLearningResources();
        setResources(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchResources();

  }, []);

  // Reset page after search

  useEffect(() => {

    setCurrentPage(1);

  }, [search]);

  // ==========================
  // Search
  // ==========================

  const filteredResources = useMemo(() => {

    return resources.filter((resource) =>

      `${resource.title}
       ${resource.type}
       ${resource.platform}`

        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [resources, search]);

  // ==========================
  // Pagination
  // ==========================

  const totalPages = Math.ceil(
    filteredResources.length / resourcesPerPage
  );

  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );

  // ==========================
  // Statistics
  // ==========================

  const totalPlatforms = new Set(
    resources.map((resource) => resource.platform)
  ).size;

  const totalTypes = new Set(
    resources.map((resource) => resource.type)
  ).size;

  // ==========================
  // Actions
  // ==========================

  const handleView = (resource) => {

    setSelectedResource(resource);

  };

  const handleEdit = (resource) => {

    setEditResource(resource);

  };

  const handleDelete = (resource) => {

    setDeleteResource(resource);

  };

  const handleSave = (updatedResource) => {

    setResources((prev) =>
      prev.map((resource) =>
        resource.resource_id === updatedResource.resource_id
          ? updatedResource
          : resource
      )
    );

    setEditResource(null);

  };

  const handleConfirmDelete = (resource) => {

    setResources((prev) =>
      prev.filter(
        (item) => item.resource_id !== resource.resource_id
      )
    );

    setDeleteResource(null);

  };
    return (
    <div className="space-y-7">

      <PageHeader
        title="Learning Resources"
        subtitle="Explore courses, books, videos and documentation available in the AI Knowledge Graph."
      />

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Resources"
          value={resources.length}
          icon={FaBookOpen}
        />

        <StatCard
          title="Platforms"
          value={totalPlatforms}
          icon={FaLayerGroup}
        />

        <StatCard
          title="Resource Types"
          value={totalTypes}
          icon={FaLaptopCode}
        />

        <StatCard
          title="Showing"
          value={filteredResources.length}
          icon={FaBookOpen}
        />

      </div>

      {/* Search + Export */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex-1">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Learning Resources
            </label>

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search resources..."
            />

          </div>

          <Button
            variant="outline"
            icon={FaDownload}
            onClick={() => exportResourcesCSV(filteredResources)}
          >
            Export CSV
          </Button>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <LearningResourceSkeleton />

      ) : paginatedResources.length ? (

        <LearningResourceTable
          resources={paginatedResources}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      ) : (

        <EmptyState
          title="No Learning Resources Found"
          description="No matching learning resources available."
        />

      )}

      {/* Pagination */}

      {!loading && filteredResources.length > 0 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      )}

      {/* View Modal */}

      <ViewModal
        data={selectedResource}
        title="Learning Resource Details"
        onClose={() => setSelectedResource(null)}
      />

      {/* Edit Modal */}

      <EditModal
        data={editResource}
        title="Edit Learning Resource"
        onClose={() => setEditResource(null)}
        onSave={handleSave}
      />

      {/* Delete Modal */}

      <DeleteModal
        data={deleteResource}
        title="Delete Learning Resource"
        onClose={() => setDeleteResource(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}

export default LearningResources;