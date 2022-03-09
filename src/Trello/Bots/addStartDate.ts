import * as jarvis from "../index"

export async function addStartDate(args: {
    auth: any,
    idList: string,
    dateStart: string,
    sleepTime: number
}): Promise<string> {
    
    // Get relevant information about the cards in the list
    let cardArray: any = await jarvis.getList({
        // auth: {
        //     "key": TRELLO_API_KEY,
        //     "token": TRELLO_API_TOKEN
        // },
        idList: args["idList"],
        getCardsInList: true,
        cardParameters: ["name", "id", "start", "due"]
    });

    // // Check which cards need their dates updated
    // let cardUpdatedArray: any = [];
    // for (let card of cardArray["data"]) {
    //     let cardInfoUpdated: object = await jarvis.dateToday({
    //         other: card["id"],
    //         dateStart: card["start"]});
    //     cardUpdatedArray.push(cardInfoUpdated);
    // }

    // // Push changes to Trello
    // for (let card of cardUpdatedArray) {
    //     if (card["shouldChange"]) {
    //         await jarvis.sleep(args["sleepTime"]);
    //         jarvis.updateCards({
    //             idCard: card["other"],
    //             cardProperties: {"start": card["start"]}
    //             });
    //     }
    // }

    return "Done! :)"
}