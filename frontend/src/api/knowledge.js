import api from "./axios";

export const askKnowledgeQuestion = async (question, studentId = null) => {
  const response = await api.post("/knowledge/query", {
    question,
    student_id: studentId,
  });

  return response.data;
};