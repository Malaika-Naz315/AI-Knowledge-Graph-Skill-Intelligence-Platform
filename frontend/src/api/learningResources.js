import API from "./api";

export const getLearningResources = async () => {
    const response = await API.get("/learning-resources/");
    return response.data;
};