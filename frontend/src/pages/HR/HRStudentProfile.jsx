import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  GraduationCap,
  Briefcase,
  Award,
  FolderKanban,
  Code2,
  Download,
  ExternalLink,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { jsPDF } from "jspdf";

import { getHRStudentProfile } from "../../services/hrApi";

function HRStudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD STUDENT PROFILE
  // =====================================================

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getHRStudentProfile(id);

        setStudent(response?.student || null);
        setSkills(Array.isArray(response?.skills) ? response.skills : []);
        setProjects(
          Array.isArray(response?.projects) ? response.projects : []
        );
        setCertificates(
          Array.isArray(response?.certificates)
            ? response.certificates
            : []
        );
      } catch (err) {
        console.error("Student Profile Error:", err);

        setError(
          err?.response?.data?.detail ||
            "Unable to load student profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadStudent();
    }
  }, [id]);

  // =====================================================
  // HELPER
  // =====================================================

  const getValue = (obj, keys, fallback = "N/A") => {
    if (!obj) return fallback;

    for (const key of keys) {
      if (
        obj[key] !== undefined &&
        obj[key] !== null &&
        String(obj[key]).trim() !== ""
      ) {
        return obj[key];
      }
    }

    return fallback;
  };

  // =====================================================
  // PROJECT DETAILS
  // =====================================================

  const handleProjectView = (project) => {
    const projectId = getValue(
      project,
      ["project_id", "id", "projectId"],
      "N/A"
    );

    const title = getValue(
      project,
      ["title", "name", "project_name"],
      "Untitled Project"
    );

    const technologies = getValue(
      project,
      ["technologies", "technology"],
      "N/A"
    );

    const description = getValue(
      project,
      ["description", "details"],
      "No project description available."
    );

    const message = `
Project Details

Project ID: ${projectId}
Title: ${title}
Technologies: ${
      Array.isArray(technologies)
        ? technologies.join(", ")
        : technologies
    }

Description:
${description}
    `;

    window.alert(message);
  };

  // =====================================================
  // GENERATE PROFESSIONAL CERTIFICATE PDF
  // =====================================================

  const generateCertificate = (certificate = {}) => {
    if (!student) return;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const studentName = getValue(
      student,
      ["name", "student_name", "full_name"],
      "Student"
    );

    const certificateName = getValue(
      certificate,
      [
        "certificate_name",
        "title",
        "name",
        "certificate",
      ],
      "Certificate of Achievement"
    );

    const certificateId = getValue(
      certificate,
      [
        "certificate_id",
        "id",
      ],
      ""
    );

    // =================================================
    // BACKGROUND
    // =================================================

    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Outer border
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(1.5);

    pdf.rect(
      10,
      10,
      pageWidth - 20,
      pageHeight - 20
    );

    // Inner border
    pdf.setDrawColor(99, 102, 241);
    pdf.setLineWidth(0.5);

    pdf.rect(
      14,
      14,
      pageWidth - 28,
      pageHeight - 28
    );

    // =================================================
    // HEADER
    // =================================================

    pdf.setTextColor(30, 41, 59);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);

    pdf.text(
      "EZITECH",
      pageWidth / 2,
      30,
      { align: "center" }
    );

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      "AI Knowledge Graph & Skill Intelligence Platform",
      pageWidth / 2,
      37,
      { align: "center" }
    );

    // =================================================
    // CERTIFICATE TITLE
    // =================================================

    pdf.setTextColor(37, 99, 235);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);

    pdf.text(
      "CERTIFICATE OF ACHIEVEMENT",
      pageWidth / 2,
      58,
      { align: "center" }
    );

    // =================================================
    // PRESENTED TO
    // =================================================

    pdf.setTextColor(71, 85, 105);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    pdf.text(
      "This certificate is proudly presented to",
      pageWidth / 2,
      75,
      { align: "center" }
    );

    // =================================================
    // STUDENT NAME
    // =================================================

    pdf.setTextColor(15, 23, 42);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(30);

    pdf.text(
      studentName,
      pageWidth / 2,
      92,
      { align: "center" }
    );

    // Underline
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(0.8);

    pdf.line(
      pageWidth / 2 - 55,
      97,
      pageWidth / 2 + 55,
      97
    );

    // =================================================
    // DESCRIPTION
    // =================================================

    pdf.setTextColor(71, 85, 105);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    const description =
      `In recognition of successful participation, ` +
      `dedication, learning progress, and achievement ` +
      `within the Ezitech AI Knowledge Graph & Skill ` +
      `Intelligence Platform.`;

    const descriptionLines = pdf.splitTextToSize(
      description,
      190
    );

    pdf.text(
      descriptionLines,
      pageWidth / 2,
      113,
      { align: "center" }
    );

    // =================================================
    // CERTIFICATE INFORMATION
    // =================================================

    pdf.setTextColor(51, 65, 85);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);

    pdf.text(
      certificateName,
      pageWidth / 2,
      139,
      { align: "center" }
    );

    if (certificateId !== "") {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);

      pdf.text(
        `Certificate ID: ${certificateId}`,
        pageWidth / 2,
        147,
        { align: "center" }
      );
    }

    // =================================================
    // SIGNATURE SECTION
    // =================================================

    const signatureY = 170;

    pdf.setDrawColor(71, 85, 105);
    pdf.setLineWidth(0.5);

    // HR Signature
    pdf.line(
      45,
      signatureY,
      105,
      signatureY
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(30, 41, 59);

    pdf.text(
      "HR Representative",
      75,
      signatureY + 7,
      { align: "center" }
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    pdf.text(
      "Ezitech",
      75,
      signatureY + 13,
      { align: "center" }
    );

    // Organization
    pdf.line(
      pageWidth - 105,
      signatureY,
      pageWidth - 45,
      signatureY
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);

    pdf.text(
      "Authorized Signature",
      pageWidth - 75,
      signatureY + 7,
      { align: "center" }
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    pdf.text(
      "Ezitech Management",
      pageWidth - 75,
      signatureY + 13,
      { align: "center" }
    );

    // =================================================
    // FOOTER
    // =================================================

    pdf.setTextColor(100, 116, 139);

    pdf.setFontSize(8);

    pdf.text(
      "AI Knowledge Graph & Skill Intelligence Platform",
      pageWidth / 2,
      pageHeight - 25,
      { align: "center" }
    );

    pdf.text(
      `Issued on: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 19,
      { align: "center" }
    );

    // =================================================
    // DOWNLOAD
    // =================================================

    const safeName = String(studentName)
      .replace(/[^a-z0-9]/gi, "_")
      .replace(/_+/g, "_");

    pdf.save(
      `${safeName}_Certificate.pdf`
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-lg">
          <Loader2
            className="animate-spin text-blue-600"
            size={24}
          />

          <span className="font-medium text-slate-700">
            Loading student profile...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate("/hr/students")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Students
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  // =====================================================
  // NO STUDENT
  // =====================================================

  if (!student) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">
          Student profile not found.
        </p>
      </div>
    );
  }

  const studentName = getValue(
    student,
    ["name", "student_name", "full_name"],
    "Student"
  );

  const email = getValue(
    student,
    ["email"],
    "N/A"
  );

  const university = getValue(
    student,
    ["university"],
    "N/A"
  );

  const degree = getValue(
    student,
    ["degree"],
    "N/A"
  );

  const internshipTrack = getValue(
    student,
    ["internship_track", "track"],
    "N/A"
  );

  const experience = getValue(
    student,
    ["experience_level", "experience"],
    "N/A"
  );

  const github = getValue(
    student,
    ["github"],
    ""
  );

  const linkedin = getValue(
    student,
    ["linkedin"],
    ""
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* BACK */}
      <button
        onClick={() => navigate("/hr/students")}
        className="mb-6 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Students
      </button>

      {/* PROFILE HEADER */}
      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

              <User size={40} />

            </div>

            <div>

              <p className="mb-1 text-sm text-blue-100">
                Student Profile
              </p>

              <h1 className="text-3xl font-bold">
                {studentName}
              </h1>

              <p className="mt-1 text-blue-100">
                {email}
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

            <p className="text-xs text-blue-100">
              Student ID
            </p>

            <p className="mt-1 text-lg font-bold">
              {id}
            </p>

          </div>

        </div>

      </div>

      {/* BASIC INFORMATION */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

        <InfoCard
          icon={<GraduationCap size={22} />}
          title="University"
          value={university}
        />

        <InfoCard
          icon={<Code2 size={22} />}
          title="Degree"
          value={degree}
        />

        <InfoCard
          icon={<Briefcase size={22} />}
          title="Internship Track"
          value={internshipTrack}
        />

        <InfoCard
          icon={<Award size={22} />}
          title="Experience"
          value={experience}
        />

      </div>

      {/* SOCIAL LINKS */}

      <div className="mb-8 flex flex-wrap gap-3">

        {github && github !== "N/A" && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
         <Code2 size={18} />
GitHub
<ExternalLink size={14} />
          </a>
        )}

        {linkedin && linkedin !== "N/A" && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <User size={18} />
LinkedIn
<ExternalLink size={14} />
          </a>
        )}

      </div>

      {/* SKILLS */}

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Code2 size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Skills
            </h2>

            <p className="text-sm text-slate-500">
              Student's current skill set
            </p>
          </div>

        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">

            {skills.map((skill, index) => {

              const skillName =
                typeof skill === "string"
                  ? skill
                  : getValue(
                      skill,
                      ["name", "skill_name", "skill"],
                      "Skill"
                    );

              return (
                <span
                  key={index}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                >
                  {skillName}
                </span>
              );
            })}

          </div>
        ) : (
          <EmptyState text="No skills available." />
        )}

      </section>

      {/* PROJECTS */}

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <FolderKanban size={22} />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Projects
              </h2>

              <p className="text-sm text-slate-500">
                Projects associated with this student
              </p>

            </div>

          </div>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-600">
            {projects.length}
          </span>

        </div>

        {projects.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {projects.map((project, index) => {

              const projectId = getValue(
                project,
                ["project_id", "id", "projectId"],
                `PROJECT-${index + 1}`
              );

              const title = getValue(
                project,
                ["title", "name", "project_name"],
                "Untitled Project"
              );

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-300 hover:shadow-md"
                >

                  <div className="mb-4 flex items-start justify-between">

                    <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                      <FolderKanban size={20} />
                    </div>

                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {projectId}
                    </span>

                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-800">
                    {title}
                  </h3>

                  <button
                    onClick={() =>
                      handleProjectView(project)
                    }
                    className="mt-3 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View Project
                    <ExternalLink size={16} />
                  </button>

                </div>
              );
            })}

          </div>

        ) : (
          <EmptyState text="No projects available." />
        )}

      </section>

      {/* CERTIFICATES */}

      <section className="rounded-3xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Award size={22} />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Certificates
              </h2>

              <p className="text-sm text-slate-500">
                Generate official achievement certificates
              </p>

            </div>

          </div>

          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-600">
            {certificates.length}
          </span>

        </div>

        {certificates.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {certificates.map((certificate, index) => {

              const certificateName = getValue(
                certificate,
                [
                  "certificate_name",
                  "title",
                  "name",
                  "certificate",
                ],
                `Achievement Certificate ${index + 1}`
              );

              const certificateId = getValue(
                certificate,
                ["certificate_id", "id"],
                ""
              );

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-amber-300 hover:shadow-md"
                >

                  <div className="mb-4 flex items-center gap-4">

                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                      <Award size={24} />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate font-bold text-slate-800">
                        {certificateName}
                      </h3>

                      {certificateId && (
                        <p className="mt-1 text-xs text-slate-500">
                          ID: {certificateId}
                        </p>
                      )}

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      generateCertificate(certificate)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Download size={18} />
                    Generate Certificate PDF
                  </button>

                </div>
              );
            })}

          </div>

        ) : (

          <EmptyState text="No certificates available." />

        )}

      </section>

    </div>
  );
}

// =====================================================
// INFO CARD
// =====================================================

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 truncate text-sm font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}

// =====================================================
// EMPTY STATE
// =====================================================

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

      <CheckCircle2
        size={30}
        className="mx-auto mb-3 text-slate-300"
      />

      <p className="text-sm text-slate-500">
        {text}
      </p>

    </div>
  );
}

export default HRStudentProfile;