import axios from "axios"

export default axios.create({
    baseURL: "https://bookcontact.herokuapp.com/contact",
    headers: {
        "Content-Type": "application/json"
    }
})