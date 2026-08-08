import API from "./api";



export const getStudents = async()=>{


    const response = await API.get(
        "/students"
    );


    return response.data;


};