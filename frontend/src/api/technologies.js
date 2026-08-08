import API from "./api";

export const getTechnologies = async () => {
    const response = await API.get("/technologies");
    return response.data;
};