import { getList } from "../Functions/getList";
import { updateCards } from "../Functions/updateCards";
import { dateToday } from "../util/generalFunctions/dateToday"
import { sleep } from "../util/generalFunctions/sleep";

interface addStartDateInterface {
    idList: string,
    dateStart: string,
    sleepTime: number
}

export async function addStartDate(args: addStartDateInterface): Promise<string> {
    
    // Get relevant information about the cards in the list
    let cardArray: any = await getList({
        idList: args["idList"],
        getCardsInList: true,
        cardParameters: ["name", "id", "start", "due"]
    });

    // Check which cards need their dates updated
    let cardUpdatedArray: any = [];
    for (let card of cardArray["data"]) {
        let cardInfoUpdated: object = await dateToday({
            other: card["id"],
            dateStart: card["start"]});
        cardUpdatedArray.push(cardInfoUpdated);
    }

    // Push changes to Trello
    for (let card of cardUpdatedArray) {
        await sleep(args["sleepTime"]);
        if (card["shouldChange"]) {
            updateCards({
                idCard: card["other"],
                cardProperties: {"start": card["start"]}
                });
        }
    }

    return "Done! :)"
}

// import dotenv from "dotenv"
// dotenv.config({path: ".test.env"})
// dotenv.config()
// addDeadline({
//     idList: process.env.TRELLO_LIST1,
//     dateIntervalInDays: 5
// });