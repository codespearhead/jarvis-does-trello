import * as jarvis from "../index"

// NodeJS-specific. Run "npm i dotenv" first
import dotenv from "dotenv"
dotenv.config({path: ".test.env"})
dotenv.config({path: ".env"})

// jarvis.addDeadline({
//     auth: {
//         key: process.env.TRELLO_API_KEY_BOT_7,
//         token: process.env.TRELLO_API_TOKEN_BOT_7,
//     },
//     dateIntervalInDays: 10,
//     idList: process.env.TRELLO_LIST2
// })

// jarvis.addChecklist({
//     auth: {
//         key: process.env.TRELLO_API_KEY_BOT_7,
//         token: process.env.TRELLO_API_TOKEN_BOT_7,
//     },
//     idList: process.env.TRELLO_LIST2,
//     idCardSource: process.env.TRELLO_CARD3
// })

jarvis.moveCards({
    auth: {
    key: process.env.TRELLO_API_KEY_BOT_7,
    token: process.env.TRELLO_API_TOKEN_BOT_7
    },
    idListSource: process.env.TRELLO_LIST2,
    idListTarget: process.env.TRELLO_LIST4,
    idBoardTarget: process.env.TRELLO_BOARD2
})