import axiosClient from "../axiosClient/index";

export default {
    getAll: () => {
        return axiosClient.get("/");
    },
    getBy: (name, phone)=>{
        return axiosClient.get(`/getby?${name?'name=' + name:""}&${name?'phone=' + phone:""}`)
           
    },
    create: (contact) => {
        return axiosClient.post("/create", contact);
    },
    update: (phone,contact) => {
        return axiosClient.put(`/update/${phone}`, contact);
    },
    delete: (phone) => {
        return axiosClient.delete(`/delete/${phone}`);
    },
    deleteAll: () => {
        return axiosClient.delete("/delete");
    }

}