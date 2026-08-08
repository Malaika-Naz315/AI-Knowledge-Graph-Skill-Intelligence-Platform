from fastapi import APIRouter
from app.graph.graph_queries import GraphQueries

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/")
def get_all_products():
    graph = GraphQueries()
    try:
        return graph.get_all_products()
    finally:
        graph.close()


@router.get("/{product_id}")
def get_product_by_id(product_id: str):
    graph = GraphQueries()
    try:
        return graph.get_product_by_id(product_id)
    finally:
        graph.close()