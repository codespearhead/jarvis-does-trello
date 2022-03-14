import * as jarvis from "../index"

export async function moveCards(args: {
    auth: { "key": string | undefined, "token": string | undefined } | undefined,
    idListSource: string,
    idListTarget: string,
    idBoardTarget?: string,
    reverseOrder?: boolean,
    sleepTime?: number,
    position?: "top" | "bottom",
    exceptionList?: string[]
}): Promise<void> {


    // Assign proper value to all parameters


    let sleepTime = args["sleepTime"]
    if (!sleepTime)
        sleepTime = 2.5

    // The Trello API returns the cards in a list in reverse order by default
    let reverseOrder = true
    if (args["reverseOrder"])
        reverseOrder = false

    let position = args["position"]
    if (!position)
        position = "top"

    // However, the Trello API returns the cards in the same order if {pos="bottom"}
    if (position === "bottom")
        reverseOrder = !reverseOrder

    // if the target list is in another board, you should disclose the id of that board
    let cardDestination: { idList: string, idBoard?: string, pos: string } = { idList: args["idListTarget"], pos: args["position"] }
    if (args["idBoardTarget"]) {
        cardDestination["idBoard"] = args["idBoardTarget"]

        // Funnily enough, it returns the cards in the correct order if the list is another board. Man I love this API
        reverseOrder = !reverseOrder
    }

    let authParams: { "key": string | undefined, "token": string | undefined } | undefined
    if (!args.auth || args.auth === { "key": undefined, "token": undefined }) {
        authParams = undefined
    } else {
        authParams = { "key": args.auth.key, "token": args.auth.token }
    }


    // Get relevant information about the cards in the list


    let cardArray: any = await jarvis.getList({
        auth: authParams,
        idList: args["idListSource"],
        getCardsInList: true
    });

    // Filter out card in exception list
    let exceptionList = args["exceptionList"]
    if (!exceptionList)
        exceptionList = []
    cardArray =  cardArray.filter((card: { [x: string]: string }) => !exceptionList.includes(card["id"]))

    console.log("[OK] moveCards - Phase 1/3: getList")


    // Reverse card order if need be


    if (reverseOrder)
        cardArray.reverse()

    console.log("[OK] moveCards - Phase 2/3: Reverse card order if need be")


    // Push changes to Trello


    for (let card of cardArray) {
        await jarvis.sleep(sleepTime);
        await jarvis.updateCards({
            auth: authParams,
            idCard: card["id"],
            cardProperties: cardDestination
        });
    }

    console.log("[OK] moveCards - Phase 3/3: updateCards")

}