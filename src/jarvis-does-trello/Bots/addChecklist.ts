import * as jarvis from "../index"

export async function addChecklist(args: {
    auth?: { "key": string | undefined, "token": string | undefined } | undefined,
    idList: string,
    idCardSource: string,
    exceptionList?: string[],
    position?: "top" | "bottom",
    sleepTime?: number
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


    // Get relevant information about the cards in the list and the CardSource


    // The only catch here is that the Trello API returns the checklists in alphabetical order, not the order they are in the card. It's important to notice that even if you add indexes in the checklist names, the Trello API will disregard them ang give them in alphabetical order
    let cardSource: any = await jarvis.getCard({
        idCard: args["idCardSource"],
        auth: authParams
    })

    let cardArray: any = await jarvis.getList({
        auth: authParams,
        idList: args["idList"],
        getCardsInList: true
    });

    // Filter out card in exception list
    let exceptionList = args["exceptionList"]
    if (!exceptionList)
        exceptionList = []
    exceptionList.push(args["idCardSource"])
    cardArray =  cardArray.filter((card: { [x: string]: string }) => !exceptionList.includes(card["id"]))
    
    console.log("[OK] addChecklist - Phase 1/3: getList and cardSource")


    // Filter out irrelevant properties from the returned data


    cardSource = cardSource["data"]["idChecklists"]

    cardArray = await jarvis.filterCards({
        cardArray,
        cardProperties: ["id", "idChecklists"]
    })

    // Filter out cards with at least one checklist
    let cardUpdatedArray = []
    for (let card of cardArray["data"])
        if (!card["idChecklists"].length)
            cardUpdatedArray.push(card["id"])

    console.log("[OK] addChecklist - Phase 2/3: get cardUpdatedArray")

    
    // Push changes to Trello


    for (let idCard of cardUpdatedArray) {
        await jarvis.sleep(sleepTime);
        await jarvis.createChecklistInCard({
            auth: authParams,
            idCard,
            idChecklistArray: cardSource,
            position: args["position"]
        });
    }

    console.log("[OK] addChecklist - Phase 3/3: createChecklistInCard")

}