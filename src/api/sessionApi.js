import axios from "axios";

const sessionApi = axios.create({
    baseURL: "http://localhost:1337",
    withCredentials: true,
    timeout: 90000
})

export const signin = async (body) => {
    const result = await sessionApi.post("/api/sessions", body)
    console.log(result)
    return result
}

export default sessionApi