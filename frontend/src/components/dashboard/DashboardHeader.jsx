import {
  FaSyncAlt,
  FaDownload,
  FaCircle,
} from "react-icons/fa";

import { jsPDF } from "jspdf";


function DashboardHeader({ refresh }) {


  const exportReport = () => {

    const pdf = new jsPDF();

    // =====================================================
    // TITLE
    // =====================================================

    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "AI Knowledge Graph & Skill Intelligence Platform",
      20,
      25
    );


    // =====================================================
    // SUBTITLE
    // =====================================================

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      "Project Report",
      20,
      35
    );


    // =====================================================
    // LINE
    // =====================================================

    pdf.setLineWidth(0.5);

    pdf.line(
      20,
      40,
      190,
      40
    );


    // =====================================================
    // PROJECT INFORMATION
    // =====================================================

    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Project Overview",
      20,
      55
    );


    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");


    const overview = [
      "Enterprise intelligence platform connecting students,",
      "mentors, skills, technologies, projects and AI-powered",
      "recommendations using Neo4j Knowledge Graph."
    ];


    pdf.text(
      overview,
      20,
      65
    );


    // =====================================================
    // TECHNOLOGIES
    // =====================================================

    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Technology Stack",
      20,
      95
    );


    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      "Backend: FastAPI, Python",
      20,
      105
    );

    pdf.text(
      "Database: Neo4j Knowledge Graph",
      20,
      113
    );

    pdf.text(
      "Frontend: React, Tailwind CSS",
      20,
      121
    );


    // =====================================================
    // TEAM
    // =====================================================

    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Development Team",
      20,
      140
    );


    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");


    pdf.text(
      "Malaika Naz",
      20,
      150
    );

    pdf.text(
      "Backend & Knowledge Graph - FastAPI, Neo4j, Python",
      20,
      158
    );


    pdf.text(
      "Saba Hayat",
      20,
      172
    );

    pdf.text(
      "Frontend Development - React, Tailwind, UI/UX",
      20,
      180
    );


    // =====================================================
    // SYSTEM STATUS
    // =====================================================

    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "System Status",
      20,
      200
    );


    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      "Status: System Operational",
      20,
      210
    );

    pdf.text(
      "Database: Neo4j Graph Database Connected",
      20,
      218
    );


    // =====================================================
    // REPORT DATE
    // =====================================================

    const reportDate =
      new Date().toLocaleString();


    pdf.setFontSize(9);

    pdf.text(
      `Report generated on: ${reportDate}`,
      20,
      280
    );


    // =====================================================
    // DOWNLOAD PDF
    // =====================================================

    pdf.save(
      "AI_Knowledge_Graph_Project_Report.pdf"
    );

  };


  return (

    <div

      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-[#F8FAFC]
      p-8
      shadow-sm
      "

    >


      {/* Background Design */}

      <div

        className="
        absolute
        -right-20
        -top-20
        h-72
        w-72
        rounded-full
        bg-blue-100
        blur-3xl
        "

      />


      <div

        className="
        absolute
        -left-20
        -bottom-20
        h-60
        w-60
        rounded-full
        bg-indigo-100
        blur-3xl
        "

      />


      <div className="relative flex flex-col justify-between gap-8 lg:flex-row">


        {/* LEFT CONTENT */}

        <div className="max-w-3xl">


          <span

            className="
            inline-flex
            items-center
            rounded-full
            border
            border-blue-100
            bg-blue-50
            px-4
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-blue-700
            "

          >

            Ezitech Internship Project

          </span>


          <h1

            className="
            mt-5
            text-4xl
            font-bold
            leading-tight
            text-slate-900
            lg:text-5xl
            "

          >

            AI Knowledge Graph &

            <br />

            <span className="text-blue-700">

              Skill Intelligence Platform

            </span>

          </h1>


          <p

            className="
            mt-5
            max-w-2xl
            text-lg
            leading-7
            text-slate-600
            "

          >

            Enterprise intelligence platform connecting students,
            mentors, skills, technologies, projects and
            AI-powered recommendations using Neo4j Knowledge Graph.

          </p>


          {/* TEAM */}

          <div className="mt-7 flex flex-wrap gap-10">


            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">

                Backend & Knowledge Graph

              </p>


              <h3 className="mt-1 font-semibold text-slate-900">

                Malaika Naz

              </h3>


              <p className="text-sm text-slate-500">

                FastAPI • Neo4j • Python

              </p>

            </div>


            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">

                Frontend Development

              </p>


              <h3 className="mt-1 font-semibold text-slate-900">

                Saba Hayat

              </h3>


              <p className="text-sm text-slate-500">

                React • Tailwind • UI/UX

              </p>

            </div>

          </div>


          {/* STATUS */}

          <div className="mt-8 flex items-center gap-3">


            <FaCircle className="text-xs text-green-500" />


            <span className="text-sm font-medium text-slate-600">

              System Operational

            </span>

          </div>

        </div>


        {/* BUTTONS */}

        <div className="flex flex-col justify-center gap-4">


          <button

            onClick={refresh}

            className="
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-[#0B1120]
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-slate-800
            hover:shadow-lg
            "

          >

            <FaSyncAlt />

            Refresh Dashboard

          </button>


          <button

            onClick={exportReport}

            className="
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-slate-300
            bg-white
            px-6
            py-3
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
            "

          >

            <FaDownload />

            Export PDF Report

          </button>

        </div>

      </div>

    </div>

  );

}


export default DashboardHeader;