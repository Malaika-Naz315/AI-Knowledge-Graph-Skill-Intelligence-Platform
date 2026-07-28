# AI Knowledge Graph Design
# Nodes
- Student
- Mentor
Student
Mentor
Manager
HR
Admin
Technology
Skill
Project
Product
CaseStudy
Task
Certificate
Documentation
Portfolio
Review
LearningResource
# Student Node
A Student represents an intern or learner in the Ezitech ecosystem.
# Properties

| Property | Data Type | Description |
|----------|-----------|-------------|
|student_id| String    |Unique studentID|
|  name    | String    | Student full name |
| email    | String    | Student email address |
|university| String    | University name |
| degree   | String    | Degree program |
|internship_track| String | AI, MERN, Laravel, Flutter etc. |
| github   | String | GitHub profile |
| linkedin | String | LinkedIn profile |
| experience_level | String | Beginner, Intermediate, Advanced |
# Mentor Node
A Mentor represents an instructor or supervisor who guides students throughout the internship.
# Properties
| Property | Data Type | Description |
|----------|-----------|-------------|
|mentor_id | String | Unique mentor ID |
| name     | String | Mentor full name |
| email    | String | Mentor email |
| specialization | String | Area of expertise |
| experience  | Integer | Years of experience |
| designation | String | Mentor role |
| department  | String | Department or domain |
# Skill Node
A Skill represents a technical competency acquired by a student.
# Properties
| Property | Data Type | Description |
|----------|-----------|-------------|
| skill_id | String | Unique skill ID |
| name     | String | Skill name |
| category | String | AI, Web, Database, DevOps etc. |
| difficulty | String | Beginner, Intermediate, Advanced |
# Technology Node
A Technology represents the software tools, frameworks, programming languages, and platforms used in projects.
# Properties
| Property | Data Type | Description |
|----------|-----------|-------------|
| technology_id | String | Unique technology ID |
| name          | String | Technology name |
| category      | String | Programming Language, Framework, Database, Cloud, etc. |
| version       | String | Technology version (optional) |
# Project Node
A Project represents an internship or engineering project completed by students.
# Properties
| Property | Data Type | Description |
|----------|-----------|-------------|
| project_id | String | Unique project ID |
| title | String | Project title |
| description | String | Project summary |
| domain | String | AI, Web, Mobile, Data Science |
| difficulty | String | Beginner, Intermediate, Advanced |
| status | String | Ongoing or Completed |
| github_repo | String | GitHub repository link |

# Relationships
Student HAS_SKILL Skill
Student WORKED_ON Project
Mentor MENTORS Student
Manager MANAGES Project
HR MANAGES Student
Student EARNS Certificate
Student HAS_PORTFOLIO Portfolio
Student RECEIVES Review
Project USES Technology
Technology REQUIRES Skill
Project BELONGS_TO Product
Project HAS_CASE_STUDY CaseStudy
CaseStudy TEACHES Skill
LearningResource COVERS Skill
Task BELONGS_TO Project
Task ASSIGNED_TO Student
Certificate VALIDATES Skill
Documentation DESCRIBES Project
# Entities csv
students.csv
mentors.csv
managers.csv
hr.csv
admins.csv
skills.csv
technologies.csv
projects.csv
products.csv
case_studies.csv
tasks.csv
certificates.csv
documentation.csv
portfolios.csv
reviews.csv
learning_resources.csv
# Dataset Files
# 1. students.csv
Stores student information.
Columns:
- student_id
- name
- email
- university
- degree
- internship_track
- github
- linkedin
- experience_level
# 2. mentors.csv
Stores mentor information.
Columns:
- mentor_id
- name
- email
- specialization
- experience
- designation
# 3. skills.csv
Stores all technical skills.
Columns:
- skill_id
- name
- category
- difficulty
# 4. technologies.csv
Stores technologies used in projects.
Columns:
- technology_id
- name
- category
- version
# 5. projects.csv
Stores engineering projects.
Columns:
- project_id
- title
- description
- domain
- difficulty
- status
- github_repo
# relationship csvs
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
student_portfolios.csv
student_reviews.csv
documentation_projects.csv
task_projects.csv
task_students.csv
learning_resource_skills.csv