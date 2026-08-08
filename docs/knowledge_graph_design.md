# AI Knowledge Graph & Skill Intelligence Platform
## Knowledge Graph Design

This document defines the knowledge graph structure, entities, properties, relationships, and dataset files used by the AI Knowledge Graph & Skill Intelligence Platform.

---

## 1. Nodes / Entities

The knowledge graph contains the following main entities:

- Student
- Mentor
- Manager
- HR
- Admin
- Technology
- Skill
- Project
- Product
- CaseStudy
- Task
- Certificate
- Documentation
- Portfolio
- Review
- LearningResource

---

## 2. Student Node

A **Student** represents an intern or learner in the Ezitech ecosystem.

### Properties

| Property | Data Type | Description |
|---|---|---|
| student_id | String | Unique student ID |
| name | String | Student full name |
| email | String | Student email address |
| university | String | University name |
| degree | String | Degree program |
| internship_track | String | AI, MERN, Laravel, Flutter, etc. |
| github | String | GitHub profile |
| linkedin | String | LinkedIn profile |
| experience_level | String | Beginner, Intermediate, Advanced |

---

## 3. Mentor Node

A **Mentor** represents an instructor or supervisor who guides students throughout the internship.

### Properties

| Property | Data Type | Description |
|---|---|---|
| mentor_id | String | Unique mentor ID |
| name | String | Mentor full name |
| email | String | Mentor email |
| specialization | String | Area of expertise |
| experience | Integer | Years of experience |
| designation | String | Mentor role |
| department | String | Department or domain |

---

## 4. Skill Node

A **Skill** represents a technical competency acquired or required by a student or project.

### Properties

| Property | Data Type | Description |
|---|---|---|
| skill_id | String | Unique skill ID |
| name | String | Skill name |
| category | String | AI, Web, Database, DevOps, etc. |
| difficulty | String | Beginner, Intermediate, Advanced |

---

## 5. Technology Node

A **Technology** represents software tools, frameworks, programming languages, and platforms used in projects.

### Properties

| Property | Data Type | Description |
|---|---|---|
| technology_id | String | Unique technology ID |
| name | String | Technology name |
| category | String | Programming Language, Framework, Database, Cloud, etc. |
| version | String | Technology version (optional) |

---

## 6. Project Node

A **Project** represents an internship or engineering project completed by students.

### Properties

| Property | Data Type | Description |
|---|---|---|
| project_id | String | Unique project ID |
| title | String | Project title |
| description | String | Project summary |
| domain | String | AI, Web, Mobile, Data Science |
| difficulty | String | Beginner, Intermediate, Advanced |
| status | String | Ongoing or Completed |
| github_repo | String | GitHub repository link |

---

## 7. Other Nodes

The platform also defines the following supporting entities:

- **Manager** — represents project or team management.
- **HR** — represents HR personnel responsible for student-related management and analytics.
- **Product** — groups or represents products associated with projects.
- **CaseStudy** — represents project case studies and their learning context.
- **Certificate** — represents certificates earned by students and validates relevant skills.
- **Documentation** — represents project-related documentation.
- **LearningResource** — represents learning resources covering technical skills.



## 8. Relationships

The knowledge graph connects entities through meaningful relationships:

| Source | Relationship | Target |
|---|---|---|
| Student | HAS_SKILL | Skill |
| Student | WORKED_ON | Project |
| Mentor | MENTORS | Student |
| HR | MANAGES | Student |
| Student | EARNS | Certificate |
| Student | HAS_PORTFOLIO | Portfolio |
| Student | RECEIVES | Review |
| Project | USES | Technology |
| Technology | REQUIRES | Skill |
| Project | BELONGS_TO | Product |
| Project | HAS_CASE_STUDY | CaseStudy |
| CaseStudy | TEACHES | Skill |
| LearningResource | COVERS | Skill |

---

## 9. Entity CSV Files

The main entity datasets are:

```text
students.csv
mentors.csv
managers.csv
hr.csv
skills.csv
technologies.csv
projects.csv
products.csv
case_studies.csv
certificates.csv
documentation.csv
learning_resources.csv
```

---

## 10. Dataset Files

### 10.1 students.csv

Stores student information.

**Columns:**

- student_id
- name
- email
- university
- degree
- internship_track
- github
- linkedin
- experience_level

### 10.2 mentors.csv

Stores mentor information.

**Columns:**

- mentor_id
- name
- email
- specialization
- experience
- designation

### 10.3 skills.csv

Stores all technical skills.

**Columns:**

- skill_id
- name
- category
- difficulty

### 10.4 technologies.csv

Stores technologies used in projects.

**Columns:**

- technology_id
- name
- category
- version

### 10.5 projects.csv

Stores engineering projects.

**Columns:**

- project_id
- title
- description
- domain
- difficulty
- status
- github_repo

---

## 11. Relationship CSV Files

The relationship datasets are:

```text
student_skills.csv
student_projects.csv
mentor_students.csv
manager_projects.csv
hr_students.csv
project_technologies.csv
technology_skills.csv
project_case_studies.csv
case_study_skills.csv
student_certificates.csv
learning_resource_skills.csv
```

These files define the connections between nodes and are used to construct the knowledge graph.

---

## 12. Knowledge Graph Purpose

The knowledge graph organizes students, mentors, skills, technologies, projects, learning resources, certificates, and related entities into a connected structure.

This structure enables the platform to:

- Understand student skills and experience.
- Connect students with projects and mentors.
- Identify relevant technologies and skills.
- Support skill-gap analysis.
- Generate recommendations.
- Provide HR analytics.
- Support student and project insights.
- Retrieve connected information through Neo4j and Cypher queries.

---

## 13. Graph-Based Intelligence

The graph relationships provide the foundation for recommendation and analytics features.

Examples include:

- Finding students with similar skills.
- Identifying recommended skills for a student.
- Finding relevant learning resources.
- Connecting projects with technologies and required skills.
- Providing mentor-related insights.
- Supporting HR dashboards and reports.

---

## 14. Database

The knowledge graph is implemented using **Neo4j** and queried using **Cypher**.

The backend accesses the graph through the Python/FastAPI application and exposes relevant functionality through REST APIs.

---

## 15. Summary

The Knowledge Graph Design provides a structured representation of the Ezitech ecosystem. By connecting students, mentors, projects, skills, technologies, resources, certificates, and supporting entities, the platform can transform disconnected data into meaningful relationships that support analytics, recommendations, and HR decision-making.
