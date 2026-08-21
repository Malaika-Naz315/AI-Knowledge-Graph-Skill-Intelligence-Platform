import API from "./api";

export const getSkills = async () => {
    const response = await API.get("/skills/");
    return response.data;
};