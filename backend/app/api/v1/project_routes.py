from fastapi import APIRouter, HTTPException
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

graph = GraphQueries()


@router.get("/")
def get_all_projects():
    """
    Get all projects
    """
    return graph.get_all_projects()


@router.get("/{project_id}")
def get_project_by_id(project_id: str):
    """
    Get project by ID
    """
    project = graph.get_project_by_id(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    return project[0]


@router.get("/{project_id}/technologies")
def get_project_technologies(project_id: str):
    """
    Get technologies used in a project
    """
    technologies = graph.get_project_technologies(project_id)

    if not technologies:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    return technologies[0]


@router.get("/{project_id}/products")
def get_project_products(project_id: str):
    """
    Get products built from a project
    """
    products = graph.get_project_products(project_id)

    if not products:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    return products[0]


@router.get("/{project_id}/case-studies")
def get_project_case_studies(project_id: str):
    """
    Get case studies related to a project
    """
    case_studies = graph.get_project_case_studies(project_id)

    if not case_studies:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    return case_studies[0]