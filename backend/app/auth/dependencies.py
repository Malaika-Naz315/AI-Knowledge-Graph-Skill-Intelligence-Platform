from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError


SECRET_KEY = "AI_KNOWLEDGE_GRAPH_SECRET"
ALGORITHM = "HS256"


# Swagger me Bearer Token box show karega
security = HTTPBearer()



def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials


    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        email = payload.get("email")
        role = payload.get("role")


        if email is None:

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token"
            )


        return {
            "email": email,
            "role": role
        }



    except JWTError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )




def require_hr(
    current_user: dict = Depends(get_current_user)
):

    if current_user.get("role") != "HR":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="HR access required"
        )


    return current_user