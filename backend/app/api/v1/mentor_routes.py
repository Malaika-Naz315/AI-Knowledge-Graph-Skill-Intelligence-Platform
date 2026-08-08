from fastapi import APIRouter, HTTPException
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/mentors",
    tags=["Mentors"]
)

graph = GraphQueries()


@router.get("/")
def get_all_mentors():
    """
    Get all mentors
    """
    return graph.get_all_mentors()


@router.get("/{mentor_id}/students")
def get_mentor_students(mentor_id: str):
    """
    Get all students mentored by a mentor
    """
    students = graph.get_mentor_students(mentor_id)

    if not students:
        raise HTTPException(
            status_code=404,
            detail="Mentor not found."
        )

    return students[0]