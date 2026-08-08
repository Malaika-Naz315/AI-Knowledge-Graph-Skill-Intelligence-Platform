from datetime import datetime, timedelta
from jose import jwt


SECRET_KEY = "AI_KNOWLEDGE_GRAPH_SECRET"
ALGORITHM = "HS256"


def create_token(data: dict):

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        hours=24
    )

    payload.update({
        "exp": expire
    })

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token