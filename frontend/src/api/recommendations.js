import API from "./api";


// =======================================================
// Recommended Skills
// =======================================================

export const getRecommendedSkills = async (studentId) => {

  const response = await API.get(
    `/recommendations/skills/${studentId}`
  );

  return response.data;
};




// =======================================================
// Recommended Projects
// =======================================================

export const getRecommendedProjects = async (studentId) => {

  const response = await API.get(
    `/recommendations/projects/${studentId}`
  );

  return response.data;
};




// =======================================================
// Recommended Mentors
// =======================================================

export const getRecommendedMentors = async (studentId) => {

  const response = await API.get(
    `/recommendations/mentors/${studentId}`
  );

  return response.data;
};




// =======================================================
// Recommended Learning Resources
// =======================================================

export const getRecommendedResources = async (studentId) => {

  const response = await API.get(
    `/recommendations/resources/${studentId}`
  );

  return response.data;
};




// =======================================================
// Similar Students
// =======================================================

export const getSimilarStudents = async (studentId) => {

  const response = await API.get(
    `/recommendations/similar-students/${studentId}`
  );

  return response.data;
};




// =======================================================
// AI Knowledge Graph Question
// POST /recommendations/ask
// =======================================================

export const askQuestion = async (
  question,
  studentId = null
) => {


  const response = await API.post(

    "/recommendations/ask",

    {
      question: question,
      student_id: studentId
    }

  );


  return response.data;

};




// =======================================================
// AI Question Suggestions
// GET /recommendations/questions
// =======================================================

export const getQuestionSuggestions = async () => {


  const response = await API.get(

    "/recommendations/questions/"

  );


  return response.data;

};