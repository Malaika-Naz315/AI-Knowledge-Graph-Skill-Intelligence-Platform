import API from "./api";

export const getMentors = async () => {
    const response = await API.get("/mentors");
    return response.data;
};