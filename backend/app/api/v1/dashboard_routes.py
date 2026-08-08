from fastapi import APIRouter
from app.graph.graph_queries import GraphQueries


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats():

    graph = GraphQueries()

    try:
        return graph.get_dashboard_stats()

    finally:
        graph.close()



@router.get("/top-skills")
def top_skills():

    graph = GraphQueries()

    try:
        return graph.get_top_skills()

    finally:
        graph.close()



@router.get("/top-technologies")
def top_technologies():

    graph = GraphQueries()

    try:
        return graph.get_top_technologies()

    finally:
        graph.close()



@router.get("/recent-students")
def recent_students():

    graph = GraphQueries()

    try:
        return graph.get_recent_students()

    finally:
        graph.close()



@router.get("/recent-projects")
def recent_projects():

    graph = GraphQueries()

    try:
        return graph.get_recent_projects()

    finally:
        graph.close()