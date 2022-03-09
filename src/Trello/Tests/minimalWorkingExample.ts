import * as jarvis from "../index"

// NodeJS-specific. Run "npm i dotenv" first
import dotenv from "dotenv"
dotenv.config({path: ".test.env"})
dotenv.config()

jarvis.addDeadline({
    auth: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN,
    },
    dateIntervalInDays: 10,
    idList: process.env.TRELLO_LIST2
})