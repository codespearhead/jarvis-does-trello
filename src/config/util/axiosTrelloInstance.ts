import axios from "axios";
import { AxiosResponse, AxiosInstance } from "axios"
import dotenv from "dotenv"

dotenv.config({path: ".test.env"})
dotenv.config()

export { AxiosResponse }
export const axiosTrello: AxiosInstance = axios.create({
    baseURL: 'https://api.trello.com/1',
    timeout: 12000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    params: {
        'key': process.env.TRELLO_API_KEY,
        'token': process.env.TRELLO_API_TOKEN
    }
});