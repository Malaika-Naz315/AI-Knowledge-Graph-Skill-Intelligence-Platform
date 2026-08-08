from fastapi import APIRouter, HTTPException
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/skills",
    tags=["Skills"]
)

graph = GraphQueries()


@router.get("/")
def get_all_skills():
    """
    Get all skills
    """
    return graph.get_all_skills()


@router.get("/{skill_id}/students")
def get_students_by_skill(skill_id: str):
    """
    Get all students having a specific skill
    """
    students = graph.get_students_by_skill(skill_id)

    if not students:
        raise HTTPException(
            status_code=404,
            detail="Skill not found."
        )

    return students[0]