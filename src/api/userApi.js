import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:1337",
    withCredentials: true,
    timeout: 90000
})

export const getUserInfo = async () => {
    const result = await userApi.get("/me")
    console.log(result)
    return result
}

export default userApi