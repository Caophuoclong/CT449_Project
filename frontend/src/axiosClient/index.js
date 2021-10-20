import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3000/contact/",
    headers: {
        "Content-Type": "application/json"
    }
})