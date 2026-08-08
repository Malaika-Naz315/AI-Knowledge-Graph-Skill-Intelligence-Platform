from fastapi import APIRouter
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"]
)


@router.get("/")
def get_all_certificates():
    graph = GraphQueries()
    try:
        return graph.get_all_certificates()
    finally:
        graph.close()


@router.get("/{certificate_id}")
def get_certificate_by_id(certificate_id: str):
    graph = GraphQueries()
    try:
        return graph.get_certificate_by_id(certificate_id)
    finally:
        graph.close()