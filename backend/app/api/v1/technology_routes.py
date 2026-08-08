from fastapi import APIRouter, HTTPException
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/technologies",
    tags=["Technologies"]
)

graph = GraphQueries()


@router.get("/")
def get_all_technologies():
    """
    Get all technologies
    """
    return graph.get_all_technologies()


@router.get("/{technology_id}/skills")
def get_technology_skills(technology_id: str):
    """
    Get all skills related to a technology
    """
    skills = graph.get_technology_skills(technology_id)

    if not skills:
        raise HTTPException(
            status_code=404,
            detail="Technology not found."
        )

    return skills[0]