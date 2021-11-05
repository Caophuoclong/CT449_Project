import axios from "axios"
import store from "../store/index"
const contactBook = axios.create({
    baseURL: "https://bookcontact.herokuapp.com/contact/",
    headers: {
        "Content-Type": "application/json",
    }
})
const auth = axios.create({
    baseURL: "https://bookcontact.herokuapp.com/api/auth",
    headers: {
        "Content-Type": "application/json"
    }
})

export { contactBook, auth }