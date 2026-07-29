from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

URI = os.getenv("NEO4J_URI")
USERNAME = os.getenv("NEO4J_USERNAME")
PASSWORD = os.getenv("NEO4J_PASSWORD")


class Neo4jConnection:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            URI,
            auth=(USERNAME, PASSWORD)
        )

    def close(self):
        self.driver.close()

    def test_connection(self):
        with self.driver.session() as session:
            result = session.run("RETURN 'Neo4j Connected Successfully!' AS message")
            print(result.single()["message"])


if __name__ == "__main__":
    connection = Neo4jConnection()
    connection.test_connection()
    connection.close()