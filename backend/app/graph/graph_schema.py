from app.graph.neo4j_driver import Neo4jConnection


def create_constraints():
    connection = Neo4jConnection()

    constraints = [
        "CREATE CONSTRAINT student_id IF NOT EXISTS FOR (s:Student) REQUIRE s.student_id IS UNIQUE",
        "CREATE CONSTRAINT mentor_id IF NOT EXISTS FOR (m:Mentor) REQUIRE m.mentor_id IS UNIQUE",
        "CREATE CONSTRAINT skill_id IF NOT EXISTS FOR (s:Skill) REQUIRE s.skill_id IS UNIQUE",
        "CREATE CONSTRAINT technology_id IF NOT EXISTS FOR (t:Technology) REQUIRE t.technology_id IS UNIQUE",
        "CREATE CONSTRAINT project_id IF NOT EXISTS FOR (p:Project) REQUIRE p.project_id IS UNIQUE",
        "CREATE CONSTRAINT product_id IF NOT EXISTS FOR (p:Product) REQUIRE p.product_id IS UNIQUE",
        "CREATE CONSTRAINT certificate_id IF NOT EXISTS FOR (c:Certificate) REQUIRE c.certificate_id IS UNIQUE",
        "CREATE CONSTRAINT resource_id IF NOT EXISTS FOR (r:LearningResource) REQUIRE r.resource_id IS UNIQUE",
        "CREATE CONSTRAINT case_id IF NOT EXISTS FOR (c:CaseStudy) REQUIRE c.case_study_id IS UNIQUE"
    ]

    with connection.driver.session() as session:
        for query in constraints:
            session.run(query)

    connection.close()
    print("✅ Graph schema created successfully.")


if __name__ == "__main__":
    create_constraints()