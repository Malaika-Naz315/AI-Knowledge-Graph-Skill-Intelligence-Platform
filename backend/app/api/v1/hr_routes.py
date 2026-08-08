from fastapi import APIRouter, Depends, HTTPException, status

from app.auth.dependencies import require_hr

from app.graph.graph_queries import GraphQueries

from app.graph.recommendation_queries import (
    get_recommended_skills,
    get_recommended_resources,
    get_similar_students,
)


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(
    prefix="/hr",
    tags=["HR"],
)


# =====================================================
# GRAPH
# =====================================================

graph = GraphQueries()


# =====================================================
# HR PROFILE
# GET /hr/profile
# =====================================================

@router.get("/profile")
def hr_profile(
    user: dict = Depends(require_hr),
):
    return {
        "success": True,
        "message": "HR access granted",
        "user": user,
    }


# =====================================================
# HR DASHBOARD
# GET /hr/dashboard
# =====================================================

@router.get("/dashboard")
def hr_dashboard(
    user: dict = Depends(require_hr),
):
    dashboard_data = graph.get_dashboard_stats()

    return {
        "success": True,
        "message": "HR Dashboard loaded successfully",
        "hr": user.get("email"),
        "dashboard": dashboard_data,
    }


# =====================================================
# ALL STUDENTS
# GET /hr/students
# =====================================================

@router.get("/students")
def get_students(
    user: dict = Depends(require_hr),
):
    students = graph.get_all_students()

    return {
        "success": True,
        "total_students": len(students),
        "students": students,
    }


# =====================================================
# STUDENT PROFILE
# GET /hr/students/{student_id}
# =====================================================

@router.get("/students/{student_id}")
def get_student_profile(
    student_id: str,
    user: dict = Depends(require_hr),
):
    student = graph.get_student_by_id(student_id)

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    skills = graph.get_student_skills(student_id)

    projects = graph.get_student_projects(student_id)

    certificates = graph.get_student_certificates(student_id)

    return {
        "success": True,

        "student": student[0],

        "skills": skills,

        "projects": projects,

        "certificates": certificates,
    }


# =====================================================
# ALL MENTORS
# GET /hr/mentors
# =====================================================

@router.get("/mentors")
def get_mentors(
    user: dict = Depends(require_hr),
):
    mentors = graph.get_all_mentors()

    return {
        "success": True,
        "total_mentors": len(mentors),
        "mentors": mentors,
    }


# =====================================================
# MENTOR PROFILE
# GET /hr/mentors/{mentor_id}
# =====================================================

@router.get("/mentors/{mentor_id}")
def get_mentor_profile(
    mentor_id: str,
    user: dict = Depends(require_hr),
):
    students = graph.get_mentor_students(mentor_id)

    if not students:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mentor not found",
        )

    return {
        "success": True,

        "mentor_id": mentor_id,

        "students": students,
    }


# =====================================================
# HR ANALYTICS
# GET /hr/analytics
# =====================================================

@router.get("/analytics")
def hr_analytics(
    user: dict = Depends(require_hr),
):
    top_skills = graph.get_top_skills()

    top_technologies = graph.get_top_technologies()

    return {
        "success": True,

        "message": "HR Analytics loaded successfully",

        "analytics": {
            "top_skills": top_skills,

            "top_technologies": top_technologies,
        },
    }


# =====================================================
# HR RECOMMENDATION INSIGHTS
# GET /hr/recommendations/{student_id}
# =====================================================

@router.get("/recommendations/{student_id}")
def hr_recommendations(
    student_id: str,
    user: dict = Depends(require_hr),
):
    recommended_skills = get_recommended_skills(
        student_id
    )

    learning_resources = get_recommended_resources(
        student_id
    )

    similar_students = get_similar_students(
        student_id
    )

    return {
        "success": True,

        "message": "HR Recommendation Insights",

        "student_id": student_id,

        "recommendations": {
            "recommended_skills": recommended_skills,

            "learning_resources": learning_resources,

            "similar_students": similar_students,
        },
    }


# =====================================================
# HR REPORTS
# GET /hr/reports
# =====================================================

@router.get("/reports")
def hr_reports(
    user: dict = Depends(require_hr),
):
    summary = graph.get_dashboard_stats()

    top_skills = graph.get_top_skills()

    top_technologies = graph.get_top_technologies()

    recent_students = graph.get_recent_students()

    recent_projects = graph.get_recent_projects()

    return {
        "success": True,

        "message": "HR Report generated successfully",

        "summary": summary,

        "top_skills": top_skills,

        "top_technologies": top_technologies,

        "recent_students": recent_students,

        "recent_projects": recent_projects,
    }