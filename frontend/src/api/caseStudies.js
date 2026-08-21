import API from "./api";

export const getCaseStudies = async () => {
    const response = await API.get("/case-studies/");
    return response.data;
};