from fastapi import APIRouter, HTTPException
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

graph = GraphQueries()


@router.get("/")
def get_all_students():
    """
    Get all students
    """
    return graph.get_all_students()


@router.get("/{student_id}")
def get_student_by_id(student_id: str):
    """
    Get a student by ID
    """
    student = graph.get_student_by_id(student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found."
        )

    return student[0]


@router.get("/{student_id}/skills")
def get_student_skills(student_id: str):
    """
    Get all skills of a student
    """
    skills = graph.get_student_skills(student_id)

    if not skills:
        raise HTTPException(
            status_code=404,
            detail="Student or skills not found."
        )

    return skills[0]


@router.get("/{student_id}/projects")
def get_student_projects(student_id: str):
    """
    Get all projects of a student
    """
    projects = graph.get_student_projects(student_id)

    if not projects:
        raise HTTPException(
            status_code=404,
            detail="Student or projects not found."
        )

    return projects[0]


@router.get("/{student_id}/certificates")
def get_student_certificates(student_id: str):
    """
    Get all certificates of a student
    """
    certificates = graph.get_student_certificates(student_id)

    if not certificates:
        raise HTTPException(
            status_code=404,
            detail="Student or certificates not found."
        )

    return certificates[0]