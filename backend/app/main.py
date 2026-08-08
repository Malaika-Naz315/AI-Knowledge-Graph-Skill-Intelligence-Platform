from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import dashboard_routes
from app.api.v1 import student_routes
from app.api.v1 import mentor_routes
from app.api.v1 import skill_routes
from app.api.v1 import technology_routes
from app.api.v1 import project_routes
from app.api.v1 import learning_resource_routes
from app.api.v1 import certificate_routes
from app.api.v1 import product_routes
from app.api.v1 import case_study_routes
from app.api.v1 import recommendation_routes
from app.api.v1.auth_routes import router as auth_router
from app.api.v1 import hr_routes




app = FastAPI(
    title="AI Knowledge Graph & Skill Intelligence Platform",
    description="Backend API using FastAPI + Neo4j",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Knowledge Graph API is running successfully!"
    }


app.include_router(dashboard_routes.router)
app.include_router(student_routes.router)
app.include_router(mentor_routes.router)
app.include_router(skill_routes.router)
app.include_router(technology_routes.router)
app.include_router(project_routes.router)
app.include_router(learning_resource_routes.router)
app.include_router(certificate_routes.router)
app.include_router(product_routes.router)
app.include_router(case_study_routes.router)
app.include_router(recommendation_routes.router)
app.include_router(auth_router)
app.include_router(
    hr_routes.router
)
