import { getList } from "../Functions/getList";
import { dayDifference } from "../util/generalFunctions/dateDifference"

import dotenv from "dotenv"
dotenv.config({path: ".test.env"})
dotenv.config()

interface addDeadlineInterface {
    idList: string,
    dateIntervalInDays: number
}

async function addDeadline(args: addDeadlineInterface) {
    
    let cardArray: any = await getList({
        idList: args["idList"],
        getCardsInList: true,
        cardParameters: ["name", "id", "start", "due"]
    });

    for (let card of cardArray["data"]) {
        let cardUpdatedInfo: any = await dayDifference({
            dateStart: card["start"],
            dateEnd: card["due"],
            numberOfDaysApart: args["dateIntervalInDays"]});
        console.log(cardUpdatedInfo);
        // console.log(card)
        // console.log(typeof card["due"])
    }
}

addDeadline({
    idList: process.env.TRELLO_LIST1,
    dateIntervalInDays: 5
});