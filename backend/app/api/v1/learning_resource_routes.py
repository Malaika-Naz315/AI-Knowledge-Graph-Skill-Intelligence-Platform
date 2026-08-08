from fastapi import APIRouter, HTTPException
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/learning-resources",
    tags=["Learning Resources"]
)

graph = GraphQueries()


@router.get("/")
def get_all_learning_resources():
    """
    Get all learning resources
    """
    return graph.get_all_learning_resources()


@router.get("/skill/{skill_id}")
def get_learning_resources_by_skill(skill_id: str):
    """
    Get learning resources for a specific skill
    """
    resources = graph.get_learning_resources_by_skill(skill_id)

    if not resources:
        raise HTTPException(
            status_code=404,
            detail="Skill or learning resources not found."
        )

    return resources