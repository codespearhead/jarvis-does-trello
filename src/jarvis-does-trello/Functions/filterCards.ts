const allowedArguments = ["name", "id", "due", "start", "idChecklists"]

export async function filterCards(args: {
    cardArray: any,
    cardProperties?: string[]
}): Promise<object>
{

    if (!args.cardProperties)
        return { "statusText": "OK", "data": args["cardArray"] }

    // temporaryData shouldn't be any[], but it works if it is
    let temporaryData: any[] = []
    let numberOfCards = args["cardArray"].length
    let numberOfProperties = args["cardProperties"].length
    try {
        if (!args["cardProperties"].every(element => allowedArguments.includes(element))) {
            throw `One of the arguments [ ${args["cardProperties"]} ] is not an allowed. Allowed arguments are: ${allowedArguments.toString()}`
        }
        for (let i = 0; i < numberOfCards; i++) {
            temporaryData.push({});
            for (let j = 0; j < numberOfProperties; j++) {
                let propertyName: string = args["cardProperties"][j]
                if (allowedArguments.includes(propertyName))
                    temporaryData[i][propertyName] = args["cardArray"][i][propertyName]
            }
        }
        return { "statusText": "OK", "data": temporaryData }
    } catch (err) {
        return { "statusText": "FAIL", "error": err }
    }

}