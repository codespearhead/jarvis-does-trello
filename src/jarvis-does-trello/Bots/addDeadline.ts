import * as jarvis from "../index"

export async function addDeadline(args: {
    auth?: { "key": string | undefined, "token": string | undefined } | undefined,
    idList: string,
    dateIntervalInDays: number,
    sleepTime?: number,
    exceptionList?: string[]
}): Promise<void>
{


    // Assign proper value to all parameters


    let sleepTime = args["sleepTime"]
    if (!sleepTime)
        sleepTime = 2.5

    let authParams: { "key": string | undefined, "token": string | undefined } | undefined
    if (!args.auth || args.auth === {"key": undefined, "token": undefined }) {
        authParams = undefined
    } else {
        authParams = {"key": args.auth.key, "token": args.auth.token }
    }


    // Get relevant information about the cards in the list


    let cardArray: any = await jarvis.getList({
        auth: authParams,
        idList: args["idList"],
        getCardsInList: true
    });

    // Filter out card in exception list
    let exceptionList = args["exceptionList"]
    if (!exceptionList)
        exceptionList = []
    cardArray =  cardArray.filter((card: { [x: string]: string }) => !exceptionList.includes(card["id"]))


    console.log("[OK] addDeadline - Phase 1/3: getList")
    

    // Check which cards need their dates updated


    let cardUpdatedArray: any = [];
    for (let card of cardArray) {
        let cardInfoUpdated: any = await jarvis.dayDifference({
            other: {
                idCard: card["id"]
            },
            dateStart: card["start"],
            dateEnd: card["due"],
            numberOfDaysApart: args["dateIntervalInDays"]
        });
        if (Object.keys(cardInfoUpdated["dataToUpdate"]).length)
            cardUpdatedArray.push(cardInfoUpdated)
    }

    console.log("[OK] addDeadline - Phase 2/3: Get cardUpdatedArray")


    // Push changes to Trello


    for (let card of cardUpdatedArray) {
        await jarvis.sleep(sleepTime);
        await jarvis.updateCards({
            auth: authParams,
            idCard: card["other"]["idCard"],
            cardProperties: card["dataToUpdate"]
        });
    }

    console.log("[OK] addDeadline - Phase 3/3: updateCards")

}