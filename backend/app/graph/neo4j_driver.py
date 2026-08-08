from neo4j import GraphDatabase
from dotenv import load_dotenv
import os


# Load environment variables
load_dotenv()


# Neo4j Configuration
URI = os.getenv("NEO4J_URI")
USERNAME = os.getenv("NEO4J_USERNAME")
PASSWORD = os.getenv("NEO4J_PASSWORD")
DATABASE = os.getenv("NEO4J_DATABASE", "aikg")


class Neo4jConnection:

    def __init__(self):

        self.driver = GraphDatabase.driver(
            URI,
            auth=(USERNAME, PASSWORD)
        )

        self.database = DATABASE


    def close(self):

        self.driver.close()


    def get_session(self):

        """
        Returns Neo4j session connected to aikg database
        """

        return self.driver.session(
            database=self.database
        )


    def test_connection(self):

        with self.get_session() as session:

            result = session.run(
                "RETURN 'Neo4j Connected Successfully!' AS message"
            )

            print(result.single()["message"])



# Singleton connection
_connection = None


def get_driver():

    global _connection

    if _connection is None:

        _connection = Neo4jConnection()

    return _connection



# Run test directly
if __name__ == "__main__":

    connection = Neo4jConnection()

    connection.test_connection()

    connection.close()