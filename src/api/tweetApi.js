import axios from "axios";

const tweetApi = axios.create({
    baseURL: "http://localhost:1337",
    withCredentials: true,
    timeout: 90000
})

export const getTweets = async () => {
    const result = await tweetApi.get("/api/tweets")
    return result.data
}

export const createTweet = async (body) => {
    const result = await tweetApi.post("/api/tweets", body)
    return result.data
}

export const udpateTweet = async (payload) => {
    console.log("id: ", payload.id)
    console.log("payload: ", payload)
    const result = await tweetApi.put(`/api/tweets/${payload.id}`, {
        username: payload.username,
        tweet: payload.tweet
    })
    return result.data
}

export const deleteTweet = async (id) => {
    const result = await tweetApi.delete(`/api/tweets/${id}`)
    return result.data
}

export default tweetApi