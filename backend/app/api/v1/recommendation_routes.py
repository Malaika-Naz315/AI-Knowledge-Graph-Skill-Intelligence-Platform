from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.graph.recommendation_queries import (
    get_recommended_projects,
    get_recommended_skills,
    get_recommended_mentors,
    get_recommended_resources,
    get_similar_students,
    ask_ai_question
)


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


# =====================================================
# REQUEST MODEL
# =====================================================

class QuestionRequest(BaseModel):
    question: str
    student_id: str | None = None



# =====================================================
# RECOMMENDED PROJECTS
# =====================================================

@router.get("/projects/{student_id}")
def recommend_projects(student_id: str):

    try:

        return {
            "student_id": student_id,
            "recommended_projects":
                get_recommended_projects(student_id) or []
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Project recommendation error: {str(e)}"
        )



# =====================================================
# RECOMMENDED SKILLS
# =====================================================

@router.get("/skills/{student_id}")
def recommend_skills(student_id: str):

    try:

        return {
            "student_id": student_id,
            "recommended_skills":
                get_recommended_skills(student_id) or []
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Skill recommendation error: {str(e)}"
        )



# =====================================================
# RECOMMENDED MENTORS
# =====================================================

@router.get("/mentors/{student_id}")
def recommend_mentors(student_id: str):

    try:

        return {
            "student_id": student_id,
            "recommended_mentors":
                get_recommended_mentors(student_id) or []
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Mentor recommendation error: {str(e)}"
        )



# =====================================================
# RECOMMENDED RESOURCES
# =====================================================

@router.get("/resources/{student_id}")
def recommend_resources(student_id: str):

    try:

        return {
            "student_id": student_id,
            "learning_resources":
                get_recommended_resources(student_id) or []
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Resource recommendation error: {str(e)}"
        )



# =====================================================
# SIMILAR STUDENTS
# =====================================================

@router.get("/similar-students/{student_id}")
def recommend_similar_students(student_id: str):

    try:

        return {
            "student_id": student_id,
            "similar_students":
                get_similar_students(student_id) or []
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Similar student recommendation error: {str(e)}"
        )



# =====================================================
# AI QUESTION SUGGESTIONS
# =====================================================

@router.get("/questions")
def question_suggestions():

    return {

        "questions":[

            "Which students know Docker?",

            "Best mentor for AI project?",

            "Which students are production ready?",

            "Show learning resources",

            "What skills are missing?"

        ]

    }




# =====================================================
# AI KNOWLEDGE GRAPH QUERY
# =====================================================

@router.post("/ask")
def ask_question(
    request: QuestionRequest
):

    try:

        result = ask_ai_question(
            question=request.question,
            student_id=request.student_id
        )


        return result



    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"AI Query Error: {str(e)}"
        )