import axios from "axios"
import { AxiosResponse, AxiosInstance } from "axios"

export { AxiosResponse }
export const axiosTrello: AxiosInstance = axios.create({
    baseURL: 'https://api.trello.com/1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});