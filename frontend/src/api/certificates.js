import API from "./api";

export const getCertificates = async () => {
    const response = await API.get("/certificates/");
    return response.data;
};