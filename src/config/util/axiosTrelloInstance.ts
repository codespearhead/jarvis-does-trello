import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios"

import dotenv from "dotenv"
dotenv.config()

const axiosTrello = axios.create({
    baseURL: 'https://api.trello.com/1',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'key': process.env.TRELLO_API_KEY,
        'token': process.env.TRELLO_API_TOKEN
    }
});

const axiosPutTrello = axios.create({
    method: 'put',
    baseURL: 'https://api.trello.com/1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    params: {
        'key': process.env.TRELLO_API_KEY,
        'token': process.env.TRELLO_API_TOKEN
    }
});

export {
    axiosTrello,
    AxiosResponse,
    axiosPutTrello,
    axios,
    AxiosRequestConfig
};