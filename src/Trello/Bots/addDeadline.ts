import * as jarvis from "../index"

export async function addDeadline(args: {
    auth?: { "key": string | undefined, "token": string | undefined } | undefined,
    idList: string,
    dateIntervalInDays: number,
    sleepTime?: number
}): Promise<string>
{
    let authParams;
    if (!args.auth || args.auth === {"key": undefined, "token": undefined }) {
        authParams = undefined
    } else {
        authParams = {"key": args.auth.key, "token": args.auth.token }
    }

    // Get relevant information about the cards in the list
    let cardArray: any = await jarvis.getList({
        auth: authParams,
        idList: args["idList"],
        getCardsInList: true,
        cardParameters: ["name", "id", "start", "due"]
    });
    // console.log(cardArray);
    
    // Check which cards need their dates updated
    
    let cardUpdatedArray: any = [];
    for (let card of cardArray["data"]) {
        let cardInfoUpdated: any = await jarvis.dayDifference({
            other: {
                nameCard: card["name"],
                idCard: card["id"]
            },
            dateStart: card["start"],
            dateEnd: card["due"],
            numberOfDaysApart: args["dateIntervalInDays"]
        });
        if (Object.keys(cardInfoUpdated["dataToUpdate"]).length)
            cardUpdatedArray.push(cardInfoUpdated)
    }
    // console.log(cardUpdatedArray)

    // Push changes to Trello
    for (let card of cardUpdatedArray) {
        //await jarvis.sleep(args["sleepTime"]);
        await jarvis.updateCards({
            idCard: card["other"]["idCard"],
            cardProperties: card["dataToUpdate"]
        });
    }

    return "Done! :)"
}