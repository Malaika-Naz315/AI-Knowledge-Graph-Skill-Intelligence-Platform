import os
import pandas as pd
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()


class GraphLoader:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            os.getenv("NEO4J_URI"),
            auth=(
                os.getenv("NEO4J_USERNAME"),
                os.getenv("NEO4J_PASSWORD")
            )
        )
        self.database = os.getenv("NEO4J_DATABASE", "neo4j")

    def close(self):
        self.driver.close()

    def execute_query(self, query, parameters=None):
        with self.driver.session(database=self.database) as session:
            return session.run(query, parameters or {})

    def load_csv(self, csv_path):
        return pd.read_csv(csv_path)

    # ==========================================================
    # ENTITY LOADERS
    # ==========================================================

    def load_students(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (s:Student {student_id:$student_id})
        SET
            s.name=$name,
            s.email=$email,
            s.university=$university,
            s.degree=$degree,
            s.internship_track=$internship_track,
            s.github=$github,
            s.linkedin=$linkedin,
            s.experience_level=$experience_level
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Students")

    def load_mentors(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (m:Mentor {mentor_id:$mentor_id})
        SET
            m.name=$name,
            m.email=$email,
            m.specialization=$specialization,
            m.experience=$experience,
            m.designation=$designation,
            m.department=$department
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Mentors")

    def load_skills(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (s:Skill {skill_id:$skill_id})
        SET
            s.name=$name,
            s.category=$category,
            s.difficulty=$difficulty
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Skills")

    def load_technologies(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (t:Technology {technology_id:$technology_id})
        SET
            t.name=$name,
            t.category=$category,
            t.version=$version
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Technologies")

    def load_projects(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (p:Project {project_id:$project_id})
        SET
            p.title=$title,
            p.description=$description,
            p.domain=$domain,
            p.difficulty=$difficulty,
            p.status=$status,
            p.github_repo=$github_repo
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Projects")

    def load_products(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (p:Product {product_id:$product_id})
        SET
            p.name=$name,
            p.description=$description,
            p.owner_department=$owner_department
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Products")

    def load_certificates(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (c:Certificate {certificate_id:$certificate_id})
        SET
            c.name=$name,
            c.issuer=$issuer,
            c.level=$level
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Certificates")

    def load_case_studies(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (c:CaseStudy {case_study_id:$case_study_id})
        SET
            c.title=$title,
            c.domain=$domain,
            c.difficulty=$difficulty,
            c.description=$description
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Case Studies")

    def load_learning_resources(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MERGE (r:LearningResource {resource_id:$resource_id})
        SET
            r.title=$title,
            r.type=$type,
            r.platform=$platform
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.fillna("").to_dict())

        print(f"✅ Loaded {len(df)} Learning Resources")

    # ==========================================================
    # RELATIONSHIP LOADERS
    # ==========================================================

    def load_student_skills(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (s:Student {student_id:$student_id})
        MATCH (k:Skill {skill_id:$skill_id})
        MERGE (s)-[:HAS_SKILL]->(k)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Student-Skill relationships")

    def load_student_projects(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (s:Student {student_id:$student_id})
        MATCH (p:Project {project_id:$project_id})
        MERGE (s)-[:WORKED_ON]->(p)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Student-Project relationships")

    def load_mentor_students(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (m:Mentor {mentor_id:$mentor_id})
        MATCH (s:Student {student_id:$student_id})
        MERGE (m)-[:MENTORS]->(s)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Mentor-Student relationships")

    def load_project_technologies(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (p:Project {project_id:$project_id})
        MATCH (t:Technology {technology_id:$technology_id})
        MERGE (p)-[:USES_TECHNOLOGY]->(t)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Project-Technology relationships")

    def load_technology_skills(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (t:Technology {technology_id:$technology_id})
        MATCH (s:Skill {skill_id:$skill_id})
        MERGE (t)-[:REQUIRES_SKILL]->(s)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Technology-Skill relationships")

    def load_project_products(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (p:Project {project_id:$project_id})
        MATCH (pr:Product {product_id:$product_id})
        MERGE (p)-[:BUILDS]->(pr)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Project-Product relationships")

    def load_project_case_studies(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (p:Project {project_id:$project_id})
        MATCH (c:CaseStudy {case_study_id:$case_study_id})
        MERGE (p)-[:BASED_ON]->(c)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Project-CaseStudy relationships")

    def load_student_certificates(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (s:Student {student_id:$student_id})
        MATCH (c:Certificate {certificate_id:$certificate_id})
        MERGE (s)-[:EARNED]->(c)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} Student-Certificate relationships")

    def load_learning_resource_skills(self, csv_path):
        df = self.load_csv(csv_path)

        query = """
        MATCH (r:LearningResource {resource_id:$resource_id})
        MATCH (s:Skill {skill_id:$skill_id})
        MERGE (r)-[:TEACHES]->(s)
        """

        for _, row in df.iterrows():
            self.execute_query(query, row.to_dict())

        print(f"✅ Loaded {len(df)} LearningResource-Skill relationships")


# ==========================================================
# MAIN
# ==========================================================

def main():
    loader = GraphLoader()

    data_dir = "data/raw"

    # -------------------------
    # Entities
    # -------------------------
    loader.load_students(f"{data_dir}/students.csv")
    loader.load_mentors(f"{data_dir}/mentors.csv")
    loader.load_skills(f"{data_dir}/skills.csv")
    loader.load_technologies(f"{data_dir}/technologies.csv")
    loader.load_projects(f"{data_dir}/projects.csv")
    loader.load_products(f"{data_dir}/products.csv")
    loader.load_certificates(f"{data_dir}/certificates.csv")
    loader.load_case_studies(f"{data_dir}/case_studies.csv")
    loader.load_learning_resources(f"{data_dir}/learning_resources.csv")

    # -------------------------
    # Relationships
    # -------------------------
    loader.load_student_skills(f"{data_dir}/student_skills.csv")
    loader.load_student_projects(f"{data_dir}/student_projects.csv")
    loader.load_mentor_students(f"{data_dir}/mentor_students.csv")
    loader.load_project_technologies(f"{data_dir}/project_technologies.csv")
    loader.load_technology_skills(f"{data_dir}/technology_skills.csv")
    loader.load_project_products(f"{data_dir}/project_products.csv")
    loader.load_project_case_studies(f"{data_dir}/project_case_studies.csv")
    loader.load_student_certificates(f"{data_dir}/student_certificates.csv")
    loader.load_learning_resource_skills(f"{data_dir}/learning_resource_skills.csv")

    loader.close()

    print("\n🎉 Knowledge Graph loaded successfully!")


if __name__ == "__main__":
    main()