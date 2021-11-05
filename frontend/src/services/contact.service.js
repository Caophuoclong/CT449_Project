import {contactBook, auth} from "../axiosClient/index";
import store from "../store/index";
contactBook.interceptors.request.use(config=>{
    const user = store.getters.loggedInUser;
    if(user && user.token){
        config.headers.Authorization = `${user.token}`;
    }
        
    return config;
})
export default {
    getAll: () => {
        return contactBook.get("/");
    },
    getBy: (name, phone)=>{
        return contactBook.get(`/getby?${name?'name=' + name:""}${phone?'&phone=' + phone:""}`)
    },
    getById: (id) => {
        return contactBook.get(`/${id}`);
    },
    create: (contact) => {
        return contactBook.post("/create", contact);
    },
    update: (phone,contact) => {
        return contactBook.put(`/update/${phone}`, contact);
    },
    favorite: (id)=>{
        return contactBook.put(`/favorite/${id}`);
    },
    delete: (phone) => {
        return contactBook.delete(`/delete/${phone}`);
    },
    deleteAll: () => {
        return contactBook.delete("/delete");
    },
    signIn: (data)=>{
        return auth.post("/signin", data);
    },
    signUp: data =>{
        return auth.post("/signup", data);
    }

}