from .neo4j_driver import Neo4jConnection


class GraphQueries:

    def __init__(self):
     self.connection = Neo4jConnection()
     self.driver = self.connection.driver
     self.database = "neo4j"

    def execute_query(self, query, parameters=None):

     with self.driver.session(database=self.database) as session:

        result = session.run(
            query,
            parameters or {}
        )

        records = []

        for record in result:
            records.append(record.data())

        return records

    def close(self):
        """
        Close Neo4j connection.
        """
        self.connection.close()


    # =========================
    # STUDENT QUERIES
    # =========================

    def get_all_students(self):

        query = """
        MATCH (s:Student)
        RETURN
            s.student_id AS student_id,
            s.name AS name,
            s.email AS email,
            s.university AS university,
            s.degree AS degree,
            s.internship_track AS internship_track,
            s.github AS github,
            s.linkedin AS linkedin,
            s.experience_level AS experience_level
        ORDER BY s.name
        """

        return self.execute_query(query)


    def get_student_by_id(self, student_id):

        query = """
        MATCH (s:Student {student_id: $student_id})
        RETURN
            s.student_id AS student_id,
            s.name AS name,
            s.email AS email,
            s.university AS university,
            s.degree AS degree,
            s.internship_track AS internship_track,
            s.github AS github,
            s.linkedin AS linkedin,
            s.experience_level AS experience_level
        """

        return self.execute_query(
            query,
            {"student_id": student_id}
        )


    def get_student_skills(self, student_id):

        query = """
        MATCH (s:Student {student_id: $student_id})
              -[:HAS_SKILL]->
              (skill:Skill)

        RETURN
            s.name AS student_name,
            collect(skill.name) AS skills
        """

        return self.execute_query(
            query,
            {"student_id": student_id}
        )


    def get_student_projects(self, student_id):

        query = """
        MATCH (s:Student {student_id: $student_id})
              -[:WORKED_ON]->
              (p:Project)

        RETURN
            s.name AS student_name,
            collect({
                project_id: p.project_id,
                project_name: p.name,
                description: p.description
            }) AS projects
        """

        return self.execute_query(
            query,
            {"student_id": student_id}
        )


    def get_student_certificates(self, student_id):

        query = """
        MATCH (s:Student {student_id: $student_id})
              -[:EARNED]->
              (c:Certificate)

        RETURN
            s.name AS student_name,
            collect({
                certificate_id: c.certificate_id,
                certificate_name: c.name
            }) AS certificates
        """

        return self.execute_query(
            query,
            {"student_id": student_id}
        )


       # =========================
    # MENTOR QUERIES
    # =========================

    def get_all_mentors(self):

        query = """
        MATCH (m:Mentor)

        RETURN
            m.mentor_id AS mentor_id,
            m.name AS name,
            m.email AS email,
            m.specialization AS specialization,
            m.experience AS experience,
            m.designation AS designation,
            m.department AS department

        ORDER BY m.name
        """

        return self.execute_query(query)


    def get_mentor_students(self, mentor_id):

        query = """
        MATCH (m:Mentor {mentor_id: $mentor_id})
              -[:MENTORS]->
              (s:Student)

        RETURN
            m.name AS mentor_name,
            collect({
                student_id: s.student_id,
                student_name: s.name,
                email: s.email
            }) AS students
        """

        return self.execute_query(
            query,
            {"mentor_id": mentor_id}
        )


        # =========================
    # SKILL QUERIES
    # =========================

    def get_all_skills(self):

        query = """
        MATCH (skill:Skill)

        RETURN
            skill.skill_id AS skill_id,
            skill.name AS name,
            skill.category AS category,
            skill.difficulty AS difficulty

        ORDER BY skill.name
        """

        return self.execute_query(query)


    def get_students_by_skill(self, skill_id):

        query = """
        MATCH (skill:Skill {skill_id: $skill_id})
              <-[:HAS_SKILL]-
              (s:Student)

        RETURN
            skill.name AS skill_name,
            collect({
                student_id: s.student_id,
                student_name: s.name,
                email: s.email
            }) AS students
        """

        return self.execute_query(
            query,
            {"skill_id": skill_id}
        )
        # =========================
    # TECHNOLOGY QUERIES
    # =========================

    def get_all_technologies(self):

        query = """
        MATCH (t:Technology)

        RETURN
            t.technology_id AS technology_id,
            t.name AS name,
            t.category AS category,
            t.version AS version

        ORDER BY t.name
        """

        return self.execute_query(query)


    def get_technology_skills(self, technology_id):

        query = """
        MATCH (t:Technology {technology_id: $technology_id})
              -[:REQUIRES_SKILL]->
              (s:Skill)

        RETURN
            t.name AS technology_name,
            collect({
                skill_id: s.skill_id,
                skill_name: s.name,
                category: s.category,
                difficulty: s.difficulty
            }) AS skills
        """

        return self.execute_query(
            query,
            {"technology_id": technology_id}
        )


       # =========================
    # PROJECT QUERIES
    # =========================

    def get_all_projects(self):

        query = """
        MATCH (p:Project)

        RETURN
            p.project_id AS project_id,
            p.title AS name,
            p.description AS description,
            p.domain AS domain,
            p.difficulty AS difficulty,
            p.status AS status,
            p.github_repo AS github_repo

        ORDER BY p.title
        """

        return self.execute_query(query)


    def get_project_by_id(self, project_id):

        query = """
        MATCH (p:Project {project_id: $project_id})

        RETURN
            p.project_id AS project_id,
            p.title AS name,
            p.description AS description,
            p.domain AS domain,
            p.difficulty AS difficulty,
            p.status AS status,
            p.github_repo AS github_repo
        """

        return self.execute_query(
            query,
            {"project_id": project_id}
        )


    def get_project_technologies(self, project_id):

        query = """
        MATCH (p:Project {project_id: $project_id})
              -[:USES_TECHNOLOGY]->
              (t:Technology)

        RETURN
            p.title AS project_name,
            collect({
                technology_id: t.technology_id,
                technology_name: t.name
            }) AS technologies
        """

        return self.execute_query(
            query,
            {"project_id": project_id}
        )


    def get_project_products(self, project_id):

        query = """
        MATCH (p:Project {project_id: $project_id})
              -[:BUILDS]->
              (product:Product)

        RETURN
            p.title AS project_name,
            collect({
                product_id: product.product_id,
                product_name: product.name
            }) AS products
        """

        return self.execute_query(
            query,
            {"project_id": project_id}
        )


    def get_project_case_studies(self, project_id):

        query = """
        MATCH (p:Project {project_id: $project_id})
              -[:BASED_ON]->
              (caseStudy:CaseStudy)

        RETURN
            p.title AS project_name,
            collect({
                case_study_id: caseStudy.case_study_id,
                title: caseStudy.title,
                description: caseStudy.description
            }) AS case_studies
        """

        return self.execute_query(
            query,
            {"project_id": project_id}
        )

       # =========================
    # LEARNING RESOURCE QUERIES
    # =========================

    def get_all_learning_resources(self):

        query = """
        MATCH (l:LearningResource)

        RETURN
            l.resource_id AS resource_id,
            l.title AS title,
            l.type AS type,
            l.platform AS platform

        ORDER BY l.title
        """

        return self.execute_query(query)


    def get_learning_resources_by_skill(self, skill_id):

        query = """
        MATCH (skill:Skill {skill_id: $skill_id})
              <-[:REQUIRES_SKILL]-
              (l:LearningResource)

        RETURN
            skill.name AS skill_name,
            collect({
                resource_id: l.resource_id,
                title: l.title,
                type: l.type,
                platform: l.platform
            }) AS resources
        """

        return self.execute_query(
            query,
            {"skill_id": skill_id}
        )
    def get_all_certificates(self):
        query = """
         MATCH (c:Certificate)
         RETURN
         c.certificate_id AS certificate_id,
         c.name AS name,
         c.issuer AS issuer,
         c.level AS level
        ORDER BY c.name
        """
        return self.execute_query(query)
    def get_certificate_by_id(self, certificate_id):
        query = """
         MATCH (c:Certificate {certificate_id: $certificate_id})
         RETURN
          c.certificate_id AS certificate_id,
          c.name AS name,
          c.issuer AS issuer,
          c.level AS level
          """
        result = self.execute_query(query, {"certificate_id": certificate_id})
        return result[0] if result else {}
    def get_all_products(self):
        query = """
         MATCH (p:Product)
          RETURN
          p.product_id AS product_id,
          p.name AS name,
          p.description AS description,
          p.owner_department AS owner_department
           ORDER BY p.name
          """
        return self.execute_query(query)
    def get_product_by_id(self, product_id):
        query = """
          MATCH (p:Product {product_id: $product_id})
           RETURN
           p.product_id AS product_id,
           p.name AS name,
           p.description AS description,
           p.owner_department AS owner_department
           """
        result = self.execute_query(query, {"product_id": product_id})
        return result[0] if result else {}
    def get_all_case_studies(self):
        query = """
        MATCH (c:CaseStudy)
        RETURN
        c.case_study_id AS case_study_id,
        c.title AS title,
        c.description AS description,
        c.domain AS domain,
        c.difficulty AS difficulty
        ORDER BY c.title
        """
        return self.execute_query(query)
    def get_case_study_by_id(self, case_study_id):
        query = """
         MATCH (c:CaseStudy {case_study_id: $case_study_id})
         RETURN
        c.case_study_id AS case_study_id,
        c.title AS title,
        c.description AS description,
        c.domain AS domain,
        c.difficulty AS difficulty
         """
        result = self.execute_query(query, {"case_study_id": case_study_id})
        return result[0] if result else {}
    def get_dashboard_stats(self):
        query = """
    CALL {
        MATCH (s:Student)
        RETURN count(s) AS students
    }

    CALL {
        MATCH (m:Mentor)
        RETURN count(m) AS mentors
    }

    CALL {
        MATCH (sk:Skill)
        RETURN count(sk) AS skills
    }

    CALL {
        MATCH (t:Technology)
        RETURN count(t) AS technologies
    }

    CALL {
        MATCH (p:Project)
        RETURN count(p) AS projects
    }

    CALL {
        MATCH (pr:Product)
        RETURN count(pr) AS products
    }

    CALL {
        MATCH (c:Certificate)
        RETURN count(c) AS certificates
    }

    CALL {
        MATCH (cs:CaseStudy)
        RETURN count(cs) AS case_studies
    }

    CALL {
        MATCH (lr:LearningResource)
        RETURN count(lr) AS learning_resources
    }

    RETURN
        students,
        mentors,
        skills,
        technologies,
        projects,
        products,
        certificates,
        case_studies,
        learning_resources
        """

        result = self.execute_query(query)
        return result[0] if result else {}
    def get_top_skills(self):
        query = """
    MATCH (s:Student)-[:HAS_SKILL]->(sk:Skill)
    RETURN
        sk.skill_id AS skill_id,
        sk.name AS name,
        count(s) AS total_students
    ORDER BY total_students DESC
    LIMIT 5
    """
        return self.execute_query(query)
    def get_top_technologies(self):

     query = """
    MATCH (p:Project)-[:USES_TECHNOLOGY]->(t:Technology)

    RETURN
        t.technology_id AS technology_id,
        t.name AS name,
        count(p) AS total_projects

    ORDER BY total_projects DESC
    LIMIT 5
    """

     return self.execute_query(query)
    def get_recent_students(self):
     query = """
    MATCH (s:Student)
    RETURN
        s.student_id AS student_id,
        s.name AS name,
        s.university AS university,
        s.internship_track AS internship_track
    ORDER BY s.student_id DESC
    LIMIT 5
    """
     return self.execute_query(query)
    def get_recent_projects(self):
 
     query = """
    MATCH (p:Project)

    RETURN
        p.project_id AS project_id,
        p.title AS name,
        p.domain AS domain,
        p.status AS status,
        p.difficulty AS difficulty

    ORDER BY p.project_id DESC
    LIMIT 5
    """

     return self.execute_query(query)
    
if __name__ == "__main__":

    graph = GraphQueries()

    print("\n========== STUDENTS ==========")
    print(graph.get_all_students()[:2])

    print("\n========== PROJECTS ==========")
    print(graph.get_all_projects()[:2])

    print("\n========== MENTORS ==========")
    print(graph.get_all_mentors()[:2])

    print("\n========== SKILLS ==========")
    print(graph.get_all_skills()[:2])

    print("\n========== TECHNOLOGIES ==========")
    print(graph.get_all_technologies()[:2])

    print("\n========== RESOURCES ==========")
    print(graph.get_all_learning_resources()[:2])

    graph.close()