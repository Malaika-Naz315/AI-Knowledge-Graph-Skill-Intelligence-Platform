import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Users,
  UserRoundCheck,
  FolderKanban,
  Cpu,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { jsPDF } from "jspdf";

import { getHRReports } from "../../services/hrApi";

function HRReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHRReports();

      setReport(data);
    } catch (err) {
      console.error("HR Reports Error:", err);

      setError(
        err?.response?.data?.detail ||
          "Unable to load HR report."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HELPERS
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

  const getArray = (value) => {
    if (Array.isArray(value)) return value;

    return [];
  };

  const getItemName = (item) => {
    if (typeof item === "string") return item;

    return getValue(
      item,
      [
        "name",
        "title",
        "skill_name",
        "technology_name",
        "project_name",
        "student_name",
      ],
      "N/A"
    );
  };

  // =====================================================
  // GENERATE PROFESSIONAL PDF
  // =====================================================

  const generatePDF = () => {
    if (!report) return;

    setGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 18;

      let y = 20;

      // =================================================
      // COLORS
      // =================================================

      const navy = [15, 23, 42];
      const blue = [37, 99, 235];
      const slate = [71, 85, 105];
      const light = [241, 245, 249];
      const border = [203, 213, 225];

      // =================================================
      // HEADER
      // =================================================

      pdf.setFillColor(
        navy[0],
        navy[1],
        navy[2]
      );

      pdf.rect(
        0,
        0,
        pageWidth,
        42,
        "F"
      );

      pdf.setTextColor(255, 255, 255);

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(20);

      pdf.text(
        "EZITECH",
        margin,
        17
      );

      pdf.setFontSize(10);

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.text(
        "AI Knowledge Graph & Skill Intelligence Platform",
        margin,
        25
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(11);

      pdf.text(
        "HR MANAGEMENT REPORT",
        pageWidth - margin,
        17,
        { align: "right" }
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.text(
        new Date().toLocaleDateString(),
        pageWidth - margin,
        25,
        { align: "right" }
      );

      y = 56;

      // =================================================
      // TITLE
      // =================================================

      pdf.setTextColor(
        navy[0],
        navy[1],
        navy[2]
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(20);

      pdf.text(
        "HR Performance &",
        margin,
        y
      );

      y += 8;

      pdf.text(
        "Student Intelligence Report",
        margin,
        y
      );

      y += 10;

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(9);

      pdf.setTextColor(
        slate[0],
        slate[1],
        slate[2]
      );

      pdf.text(
        "Comprehensive overview of students, skills, technologies and projects.",
        margin,
        y
      );

      y += 15;

      // =================================================
      // SUMMARY DATA
      // =================================================

      const summary =
        report.summary || {};

      const totalStudents =
        getValue(
          summary,
          ["total_students", "students"],
          getArray(report.recent_students).length
        );

      const totalMentors =
        getValue(
          summary,
          ["total_mentors", "mentors"],
          "N/A"
        );

      const totalProjects =
        getValue(
          summary,
          ["total_projects", "projects"],
          "N/A"
        );

      const totalTechnologies =
        getValue(
          summary,
          ["total_technologies", "technologies"],
          "N/A"
        );

      const cards = [
        {
          label: "TOTAL STUDENTS",
          value: totalStudents,
        },
        {
          label: "TOTAL MENTORS",
          value: totalMentors,
        },
        {
          label: "TOTAL PROJECTS",
          value: totalProjects,
        },
        {
          label: "TECHNOLOGIES",
          value: totalTechnologies,
        },
      ];

      const cardWidth =
        (pageWidth - margin * 2 - 9) / 2;

      cards.forEach((card, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;

        const x =
          margin +
          col * (cardWidth + 9);

        const cardY =
          y +
          row * 27;

        pdf.setFillColor(
          light[0],
          light[1],
          light[2]
        );

        pdf.setDrawColor(
          border[0],
          border[1],
          border[2]
        );

        pdf.roundedRect(
          x,
          cardY,
          cardWidth,
          22,
          3,
          3,
          "FD"
        );

        pdf.setTextColor(
          slate[0],
          slate[1],
          slate[2]
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(8);

        pdf.text(
          card.label,
          x + 5,
          cardY + 8
        );

        pdf.setTextColor(
          blue[0],
          blue[1],
          blue[2]
        );

        pdf.setFontSize(15);

        pdf.text(
          String(card.value),
          x + 5,
          cardY + 17
        );
      });

      y += 62;

      // =================================================
      // SECTION HELPER
      // =================================================

      const sectionTitle = (title) => {
        if (y > pageHeight - 45) {
          pdf.addPage();
          y = 20;
        }

        pdf.setFillColor(
          blue[0],
          blue[1],
          blue[2]
        );

        pdf.rect(
          margin,
          y - 5,
          3,
          8,
          "F"
        );

        pdf.setTextColor(
          navy[0],
          navy[1],
          navy[2]
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(13);

        pdf.text(
          title,
          margin + 7,
          y + 1
        );

        y += 10;
      };

      // =================================================
      // TOP SKILLS
      // =================================================

      sectionTitle("Top Skills");

      const topSkills =
        getArray(report.top_skills);

      if (topSkills.length === 0) {
        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9);

        pdf.setTextColor(
          slate[0],
          slate[1],
          slate[2]
        );

        pdf.text(
          "No skill data available.",
          margin,
          y
        );

        y += 10;
      } else {
        topSkills
          .slice(0, 8)
          .forEach((skill, index) => {
            const name =
              getItemName(skill);

            const count =
              getValue(
                skill,
                ["count", "total", "frequency"],
                ""
              );

            pdf.setFont(
              "helvetica",
              "normal"
            );

            pdf.setFontSize(9);

            pdf.setTextColor(
              slate[0],
              slate[1],
              slate[2]
            );

            pdf.text(
              `${index + 1}. ${name}`,
              margin + 3,
              y
            );

            if (count !== "") {
              pdf.setFont(
                "helvetica",
                "bold"
              );

              pdf.text(
                String(count),
                pageWidth - margin,
                y,
                { align: "right" }
              );
            }

            y += 6;
          });

        y += 5;
      }

      // =================================================
      // TOP TECHNOLOGIES
      // =================================================

      sectionTitle("Top Technologies");

      const technologies =
        getArray(
          report.top_technologies
        );

      if (technologies.length === 0) {
        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9);

        pdf.text(
          "No technology data available.",
          margin,
          y
        );

        y += 10;
      } else {
        technologies
          .slice(0, 8)
          .forEach((technology, index) => {
            const name =
              getItemName(technology);

            const count =
              getValue(
                technology,
                ["count", "total", "frequency"],
                ""
              );

            pdf.setFont(
              "helvetica",
              "normal"
            );

            pdf.setFontSize(9);

            pdf.setTextColor(
              slate[0],
              slate[1],
              slate[2]
            );

            pdf.text(
              `${index + 1}. ${name}`,
              margin + 3,
              y
            );

            if (count !== "") {
              pdf.setFont(
                "helvetica",
                "bold"
              );

              pdf.text(
                String(count),
                pageWidth - margin,
                y,
                { align: "right" }
              );
            }

            y += 6;
          });

        y += 5;
      }

      // =================================================
      // RECENT STUDENTS
      // =================================================

      sectionTitle("Recent Students");

      const students =
        getArray(
          report.recent_students
        );

      if (students.length === 0) {
        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9);

        pdf.text(
          "No student records available.",
          margin,
          y
        );

        y += 10;
      } else {
        // Table header
        pdf.setFillColor(
          light[0],
          light[1],
          light[2]
        );

        pdf.rect(
          margin,
          y - 5,
          pageWidth - margin * 2,
          8,
          "F"
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(8);

        pdf.setTextColor(
          navy[0],
          navy[1],
          navy[2]
        );

        pdf.text(
          "STUDENT",
          margin + 3,
          y
        );

        pdf.text(
          "EMAIL",
          margin + 72,
          y
        );

        pdf.text(
          "TRACK",
          margin + 145,
          y
        );

        y += 8;

        students
          .slice(0, 10)
          .forEach((student) => {
            const name =
              getValue(
                student,
                [
                  "name",
                  "student_name",
                  "full_name",
                ],
                "N/A"
              );

            const email =
              getValue(
                student,
                ["email"],
                "N/A"
              );

            const track =
              getValue(
                student,
                [
                  "internship_track",
                  "track",
                ],
                "N/A"
              );

            pdf.setFont(
              "helvetica",
              "normal"
            );

            pdf.setFontSize(8);

            pdf.setTextColor(
              slate[0],
              slate[1],
              slate[2]
            );

            pdf.text(
              String(name).substring(0, 30),
              margin + 3,
              y
            );

            pdf.text(
              String(email).substring(0, 32),
              margin + 72,
              y
            );

            pdf.text(
              String(track).substring(0, 20),
              margin + 145,
              y
            );

            y += 6;

            if (y > pageHeight - 35) {
              pdf.addPage();
              y = 20;
            }
          });

        y += 8;
      }

      // =================================================
      // RECENT PROJECTS
      // =================================================

      sectionTitle("Recent Projects");

      const projects =
        getArray(
          report.recent_projects
        );

      if (projects.length === 0) {
        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9);

        pdf.text(
          "No project records available.",
          margin,
          y
        );

        y += 10;
      } else {
        projects
          .slice(0, 10)
          .forEach((project, index) => {
            const name =
              getItemName(project);

            const projectId =
              getValue(
                project,
                [
                  "project_id",
                  "id",
                ],
                ""
              );

            pdf.setFont(
              "helvetica",
              "normal"
            );

            pdf.setFontSize(9);

            pdf.setTextColor(
              slate[0],
              slate[1],
              slate[2]
            );

            pdf.text(
              `${index + 1}. ${String(name).substring(0, 50)}`,
              margin + 3,
              y
            );

            if (projectId) {
              pdf.setFont(
                "helvetica",
                "bold"
              );

              pdf.text(
                String(projectId),
                pageWidth - margin,
                y,
                { align: "right" }
              );
            }

            y += 6;
          });

        y += 8;
      }

      // =================================================
      // SIGNATURE SECTION
      // =================================================

      if (y > pageHeight - 65) {
        pdf.addPage();
        y = 25;
      }

      y += 8;

      pdf.setDrawColor(
        border[0],
        border[1],
        border[2]
      );

      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 20;

      // HR signature

      pdf.setDrawColor(
        slate[0],
        slate[1],
        slate[2]
      );

      pdf.line(
        margin + 5,
        y,
        margin + 70,
        y
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(9);

      pdf.setTextColor(
        navy[0],
        navy[1],
        navy[2]
      );

      pdf.text(
        "HR Representative",
        margin + 37.5,
        y + 6,
        { align: "center" }
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.text(
        "Ezitech",
        margin + 37.5,
        y + 12,
        { align: "center" }
      );

      // Authorized signature

      pdf.line(
        pageWidth - margin - 70,
        y,
        pageWidth - margin - 5,
        y
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(9);

      pdf.text(
        "Authorized Signature",
        pageWidth - margin - 37.5,
        y + 6,
        { align: "center" }
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.text(
        "Ezitech Management",
        pageWidth - margin - 37.5,
        y + 12,
        { align: "center" }
      );

      // =================================================
      // FOOTER ON EVERY PAGE
      // =================================================

      const totalPages =
        pdf.internal.getNumberOfPages();

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        pdf.setPage(page);

        pdf.setDrawColor(
          border[0],
          border[1],
          border[2]
        );

        pdf.line(
          margin,
          pageHeight - 14,
          pageWidth - margin,
          pageHeight - 14
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(7);

        pdf.setTextColor(
          100,
          116,
          139
        );

        pdf.text(
          "Ezitech — AI Knowledge Graph & Skill Intelligence Platform",
          margin,
          pageHeight - 8
        );

        pdf.text(
          `Page ${page} of ${totalPages}`,
          pageWidth - margin,
          pageHeight - 8,
          { align: "right" }
        );
      }

      // =================================================
      // SAVE
      // =================================================

      const date =
        new Date()
          .toISOString()
          .split("T")[0];

      pdf.save(
        `Ezitech_HR_Report_${date}.pdf`
      );

    } catch (err) {
      console.error(
        "PDF Generation Error:",
        err
      );

      alert(
        "Unable to generate PDF report."
      );
    } finally {
      setGenerating(false);
    }
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
            Loading HR report...
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
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-lg">
            <FileText size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              HR Reports
            </h1>

            <p className="mt-1 text-slate-500">
              Generate professional HR intelligence reports
            </p>

          </div>

        </div>

        <button
          onClick={generatePDF}
          disabled={generating}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {generating ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Generating...
            </>
          ) : (
            <>
              <Download size={18} />
              Generate PDF Report
            </>
          )}
        </button>

      </div>

      {/* REPORT PREVIEW */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">

        <div className="mb-6 border-b border-slate-200 pb-5">

          <h2 className="text-xl font-bold text-slate-800">
            Report Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            The generated PDF contains the complete HR intelligence summary.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

          <ReportCard
            icon={<Users size={22} />}
            title="Students"
            value={getValue(
              report?.summary,
              ["total_students", "students"],
              "N/A"
            )}
          />

          <ReportCard
            icon={<UserRoundCheck size={22} />}
            title="Mentors"
            value={getValue(
              report?.summary,
              ["total_mentors", "mentors"],
              "N/A"
            )}
          />

          <ReportCard
            icon={<FolderKanban size={22} />}
            title="Projects"
            value={getValue(
              report?.summary,
              ["total_projects", "projects"],
              "N/A"
            )}
          />

          <ReportCard
            icon={<Cpu size={22} />}
            title="Technologies"
            value={getValue(
              report?.summary,
              ["total_technologies", "technologies"],
              "N/A"
            )}
          />

        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-700">

          <CheckCircle2 size={22} />

          <div>

            <p className="font-semibold">
              Professional PDF Ready
            </p>

            <p className="text-sm">
              Click "Generate PDF Report" to create the final downloadable report.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================================
// REPORT CARD
// =====================================================

function ReportCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

export default HRReports;