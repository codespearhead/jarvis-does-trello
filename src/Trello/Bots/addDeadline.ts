import * as jarvis from "../index"

export async function addDeadline(args: {
    auth?: { "key": string | undefined, "token": string | undefined } | undefined,
    idList: string,
    dateIntervalInDays: number,
    sleepTime?: number
}): Promise<void>
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

    console.log("[OK] addDeadline - Phase 1: getList")
    
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

    console.log("[OK] addDeadline - Phase 2: Get cardUpdatedArray")

    // Push changes to Trello (Update Card not Working)
    for (let card of cardUpdatedArray) {
        await jarvis.sleep(args["sleepTime"]);
        await jarvis.updateCards({
            auth: authParams,
            idCard: card["other"]["idCard"],
            cardProperties: card["dataToUpdate"]
        });
    }

    console.log("[OK] addDeadline - Phase 3: updateCards")

}