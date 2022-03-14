// import * as jarvis from "../index"

// // NodeJS-specific. Run "npm i dotenv" first
// import dotenv from "dotenv"
// dotenv.config({path: ".test.env"})
// dotenv.config({path: ".env"})


const jarvis = require("../../../dist/jarvis-does-trello/index")

// // NodeJS-specific. Run "npm i dotenv" first
// import dotenv from "dotenv"
// dotenv.config({path: ".test.env"})
// dotenv.config({path: ".env"})

async function main() {
    const envFilesArray = await jarvis.listFilesInFolder("./working/", "UTF-8")
    console.log(envFilesArray)
}

main()

// jarvis.addDeadline({
//     auth: {
//         key: process.env.TRELLO_API_BOT_2_KEY1,
//         token: process.env.TRELLO_API_BOT_2_TOKEN1
//     },
//     dateIntervalInDays: 10,
//     idList: process.env.TRELLO_LIST1,
//     exceptionList: ["6228aba44ea965796be08e4b"]
// })

// jarvis.addChecklist({
//     auth: {
//         key: process.env.TRELLO_API_BOT_2_KEY1,
//         token: process.env.TRELLO_API_BOT_2_TOKEN1
//     },
//     idList: process.env.TRELLO_LIST1,
//     idCardSource: process.env.TRELLO_CARD3,
//     exceptionList: ["6228aba44ea965796be08e4b"]
// })

// jarvis.moveCards({
//     auth: {
//         key: process.env.TRELLO_API_BOT_2_KEY1,
//         token: process.env.TRELLO_API_BOT_2_TOKEN1
//     },
//     idListSource: process.env.TRELLO_LIST1,
//     idListTarget: process.env.TRELLO_LIST4,
//     idBoardTarget: process.env.TRELLO_BOARD2,
//     exceptionList: ["6228aba44ea965796be08e4b"]
// })

// Just to save the output into csv file. Does'nt work yet
// import papa from "papaparse"
// dotenv.config({path: "./src/jarvis-does-trello/Tests/envFiles/centralDeDemandas.env"})
// jarvis.getListsOnBoard({
//     auth: {
//         key: process.env.TRELLO_API_BOT_2_KEY1,
//         token: process.env.TRELLO_API_BOT_2_TOKEN1
//     },
//     idBoard: "60ed11c16582857837b9cf4f"
// })