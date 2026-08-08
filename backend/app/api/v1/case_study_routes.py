from fastapi import APIRouter
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/case-studies",
    tags=["Case Studies"]
)


@router.get("/")
def get_all_case_studies():
    graph = GraphQueries()
    try:
        return graph.get_all_case_studies()
    finally:
        graph.close()


@router.get("/{case_study_id}")
def get_case_study_by_id(case_study_id: str):
    graph = GraphQueries()
    try:
        return graph.get_case_study_by_id(case_study_id)
    finally:
        graph.close()