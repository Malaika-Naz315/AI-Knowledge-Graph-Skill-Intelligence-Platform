from fastapi import APIRouter, HTTPException

from app.schemas.auth_schema import (
    SignupRequest,
    LoginRequest
)

from app.graph.auth_queries import AuthQueries

from app.auth.password import (
    hash_password,
    verify_password
)

from app.auth.jwt import create_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post("/signup")
def signup(user: SignupRequest):

    existing_user = AuthQueries.get_user_by_email(
        user.email
    )


    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )


    hashed_password = hash_password(
        user.password
    )


    new_user = AuthQueries.create_user(
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
        role="HR"
    )


    if not new_user:
        raise HTTPException(
            status_code=500,
            detail="User creation failed"
        )


    return {
        "message": "HR account created successfully",
        "user": {
            "name": new_user["name"],
            "email": new_user["email"],
            "role": new_user["role"]
        }
    }





@router.post("/login")
def login(user: LoginRequest):


    db_user = AuthQueries.get_user_by_email(
        user.email
    )


    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    try:

        password_valid = verify_password(
            user.password,
            db_user["password_hash"]
        )


    except Exception as e:

        print("PASSWORD ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail="Password verification failed"
        )



    if not password_valid:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )



    token = create_token({

        "email": db_user["email"],
        "role": db_user["role"]

    })


    return {

        "message": "Login successful",

        "access_token": token,

        "user": {

            "name": db_user["name"],
            "email": db_user["email"],
            "role": db_user["role"]

        }

    }