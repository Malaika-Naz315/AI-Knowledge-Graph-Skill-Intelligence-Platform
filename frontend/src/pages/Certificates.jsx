import { useEffect, useMemo, useState } from "react";

import {
  FaCertificate,
  FaLayerGroup,
  FaUniversity,
  FaDownload,
} from "react-icons/fa";

import { getCertificates } from "../api/certificates";

import CertificateTable from "../components/certificates/CertificateTable";
import CertificateSkeleton from "../components/certificates/CertificateSkeleton";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

import ViewModal from "../components/common/ViewModal";
import EditModal from "../components/common/EditModal";
import DeleteModal from "../components/common/DeleteModal";

import { exportCertificatesCSV } from "../utils/exportCSV";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [editCertificate, setEditCertificate] = useState(null);
  const [deleteCertificate, setDeleteCertificate] = useState(null);

  const certificatesPerPage = 10;

  // ==========================
  // Fetch Certificates
  // ==========================

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Reset page after search

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ==========================
  // Search
  // ==========================

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) =>
      `${certificate.name}
       ${certificate.issuer}
       ${certificate.level}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [certificates, search]);

  // ==========================
  // Pagination
  // ==========================

  const totalPages = Math.ceil(
    filteredCertificates.length / certificatesPerPage
  );

  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * certificatesPerPage,
    currentPage * certificatesPerPage
  );

  // ==========================
  // Statistics
  // ==========================

  const totalIssuers = new Set(
    certificates.map((certificate) => certificate.issuer)
  ).size;

  const totalLevels = new Set(
    certificates.map((certificate) => certificate.level)
  ).size;

  // ==========================
  // Actions
  // ==========================

  const handleView = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleEdit = (certificate) => {
    setEditCertificate(certificate);
  };

  const handleDelete = (certificate) => {
    setDeleteCertificate(certificate);
  };

  const handleSave = (updatedCertificate) => {
    setCertificates((prev) =>
      prev.map((certificate) =>
        certificate.certificate_id === updatedCertificate.certificate_id
          ? updatedCertificate
          : certificate
      )
    );

    setEditCertificate(null);
  };

  const handleConfirmDelete = (certificate) => {
    setCertificates((prev) =>
      prev.filter(
        (item) => item.certificate_id !== certificate.certificate_id
      )
    );

    setDeleteCertificate(null);
  };
    return (
    <div className="space-y-7">

      <PageHeader
        title="Certificates"
        subtitle="Manage professional certificates and achievements connected with students."
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Certificates"
          value={certificates.length}
          icon={FaCertificate}
        />

        <StatCard
          title="Issuers"
          value={totalIssuers}
          icon={FaUniversity}
        />

        <StatCard
          title="Levels"
          value={totalLevels}
          icon={FaLayerGroup}
        />

        <StatCard
          title="Showing"
          value={filteredCertificates.length}
          icon={FaCertificate}
        />

      </div>

      {/* Search + Export */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex-1">

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Certificates
            </label>

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search certificates..."
            />

          </div>

          <Button
            variant="outline"
            icon={FaDownload}
            onClick={() => exportCertificatesCSV(filteredCertificates)}
          >
            Export CSV
          </Button>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <CertificateSkeleton />

      ) : paginatedCertificates.length ? (

        <CertificateTable
          certificates={paginatedCertificates}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      ) : (

        <EmptyState
          title="No Certificates Found"
          description="No matching certificates available."
        />

      )}

      {/* Pagination */}

      {!loading && filteredCertificates.length > 0 && (

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      )}

      {/* View Modal */}

      <ViewModal
        data={selectedCertificate}
        title="Certificate Details"
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Edit Modal */}

      <EditModal
        data={editCertificate}
        title="Edit Certificate"
        onClose={() => setEditCertificate(null)}
        onSave={handleSave}
      />

      {/* Delete Modal */}

      <DeleteModal
        data={deleteCertificate}
        title="Delete Certificate"
        onClose={() => setDeleteCertificate(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}

export default Certificates;