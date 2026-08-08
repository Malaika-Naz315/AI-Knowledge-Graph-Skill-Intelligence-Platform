from .neo4j_driver import get_driver



# =====================================================
# RECOMMENDED SKILLS
# =====================================================

def get_recommended_skills(student_id):

    driver = get_driver()

    query = """

    MATCH 
    (s:Student {student_id:$student_id})
    -[:HAS_SKILL]->(:Skill)
    <-[:REQUIRES_SKILL]-(t:Technology)

    MATCH 
    (t)<-[:USES_TECHNOLOGY]-(p:Project)

    MATCH
    (t)-[:REQUIRES_SKILL]->(skill:Skill)


    WHERE NOT 
    (s)-[:HAS_SKILL]->(skill)


    RETURN

        skill.skill_id AS skill_id,

        skill.name AS skill_name,

        COUNT(DISTINCT p) AS project_demand


    ORDER BY project_demand DESC

    LIMIT 5

    """


    with driver.get_session() as session:

        result = session.run(
            query,
            student_id=student_id
        )

        return [
            record.data()
            for record in result
        ]





# =====================================================
# RECOMMENDED PROJECTS
# =====================================================

def get_recommended_projects(student_id):

    driver = get_driver()


    query = """

    MATCH
    (s:Student {student_id:$student_id})
    -[:HAS_SKILL]->(skill:Skill)


    MATCH
    (tech:Technology)
    -[:REQUIRES_SKILL]->(skill)


    MATCH
    (project:Project)
    -[:USES_TECHNOLOGY]->(tech)



    RETURN

        project.project_id AS project_id,

        project.title AS project_name,

        project.domain AS domain,

        project.difficulty AS difficulty,

        project.status AS status,

        COUNT(DISTINCT tech) AS technology_match



    ORDER BY technology_match DESC

    LIMIT 5

    """


    with driver.get_session() as session:

        result = session.run(
            query,
            student_id=student_id
        )

        return [
            record.data()
            for record in result
        ]





# =====================================================
# RECOMMENDED MENTORS
# =====================================================

def get_recommended_mentors(student_id):

    driver = get_driver()


    query = """

    MATCH
    (s:Student {student_id:$student_id})
    -[:HAS_SKILL]->(skill:Skill)


    MATCH
    (mentor:Mentor)
    -[:MENTORS]->(other:Student)
    -[:HAS_SKILL]->(skill)



    RETURN

        mentor.mentor_id AS mentor_id,

        mentor.name AS mentor_name,

        COUNT(skill) AS skill_similarity



    ORDER BY skill_similarity DESC

    LIMIT 5

    """


    with driver.get_session() as session:

        result = session.run(
            query,
            student_id=student_id
        )


        return [
            record.data()
            for record in result
        ]





# =====================================================
# RECOMMENDED LEARNING RESOURCES
# =====================================================

def get_recommended_resources(student_id):

    driver = get_driver()


    query = """

    MATCH
    (s:Student {student_id:$student_id})
    -[:HAS_SKILL]->(skill:Skill)


    MATCH
    (resource:LearningResource)
    -[:TEACHES]->(skill)



    RETURN DISTINCT


        resource.resource_id AS resource_id,

        resource.title AS title,

        resource.platform AS platform,

        resource.type AS type



    LIMIT 5

    """


    with driver.get_session() as session:


        result = session.run(
            query,
            student_id=student_id
        )


        return [
            record.data()
            for record in result
        ]





# =====================================================
# SIMILAR STUDENTS
# =====================================================

def get_similar_students(student_id):

    driver = get_driver()


    query = """

    MATCH
    (s:Student {student_id:$student_id})
    -[:HAS_SKILL]->(skill:Skill)


    MATCH
    (other:Student)
    -[:HAS_SKILL]->(skill)



    WHERE s <> other



    WITH

        other,

        collect(skill.name) AS common_skills,

        count(skill) AS similarity



    RETURN


        other.student_id AS student_id,

        other.name AS name,

        other.experience_level AS experience_level,

        common_skills,

        similarity



    ORDER BY similarity DESC

    LIMIT 5

    """



    with driver.get_session() as session:


        result = session.run(
            query,
            student_id=student_id
        )


        return [
            record.data()
            for record in result
        ]






# =====================================================
# AI KNOWLEDGE GRAPH QUERY ENGINE
# =====================================================

def ask_ai_question(question, student_id=None):

    driver = get_driver()


    q = question.lower()



    params = {}




    # -----------------------------------------------
    # Skill based student search
    # -----------------------------------------------

    skills = [
        "docker",
        "python",
        "react",
        "fastapi",
        "neo4j",
        "redis"
    ]


    matched_skill = None


    for skill in skills:

        if skill in q:

            matched_skill = skill

            break



    if "student" in q and matched_skill:



        cypher = """

        MATCH
        (s:Student)-[:HAS_SKILL]->(sk:Skill)


        WHERE
        toLower(sk.name) = $skill



        RETURN

        s.student_id AS id,

        s.name AS name,

        collect(sk.name) AS skills,

        s.experience_level AS experience



        ORDER BY s.name

        """


        params={
            "skill":matched_skill
        }





    # -----------------------------------------------
    # Mentor Search
    # -----------------------------------------------

    elif "mentor" in q and "ai" in q:


        cypher = """

        MATCH
        (m:Mentor)
        -[:MENTORS]->
        (s:Student)
        -[:HAS_SKILL]->
        (skill:Skill)



        WHERE

        toLower(skill.name) CONTAINS "python"

        OR

        toLower(skill.name) CONTAINS "ai"

        OR

        toLower(skill.name) CONTAINS "machine"



        RETURN

        m.name AS mentor,

        collect(DISTINCT skill.name) AS expertise


        LIMIT 5

        """





    # -----------------------------------------------
    # Production Ready Students
    # -----------------------------------------------

    elif "production" in q:


        cypher = """

        MATCH

        (s:Student)
        -[:HAS_SKILL]->
        (skill:Skill)


        WITH

        s,

        count(skill) AS total_skills



        WHERE total_skills >= 5



        RETURN

        s.student_id AS id,

        s.name AS name,

        total_skills



        ORDER BY total_skills DESC

        """






    # -----------------------------------------------
    # Learning Resources
    # -----------------------------------------------

    elif "resource" in q or "learning" in q:


        cypher = """

        MATCH
        (r:LearningResource)



        RETURN

        r.resource_id AS id,

        r.title AS title,

        r.platform AS platform,

        r.type AS type



        LIMIT 10

        """






    # -----------------------------------------------
    # Missing Skills
    # -----------------------------------------------

    elif "missing" in q and student_id:



        cypher = """

        MATCH(skill:Skill)


        WHERE NOT EXISTS{

        MATCH
        (:Student {student_id:$student_id})
        -[:HAS_SKILL]->
        (skill)

        }


        RETURN

        skill.name AS missing_skill


        LIMIT 10

        """


        params={
            "student_id":student_id
        }





    else:


        return {

            "question":question,

            "answer":[
                {
                    "message":
                    "Question not supported."
                }
            ]

        }




    with driver.get_session() as session:


        result = session.run(
            cypher,
            **params
        )


        return {


            "question":question,


            "answer":[

                record.data()

                for record in result

            ]

        }