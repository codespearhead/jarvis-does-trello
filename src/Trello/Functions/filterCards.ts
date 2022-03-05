import { AxiosResponse, axiosTrello } from "../util/axiosTrelloInstance";

/**
 * Operate on card object
 * @param cardArray array of objects containing card data from the API
 * @param parameters array containing allowed arguments
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable card and temporaryData
 * - feat: add the remainder of the properties in the switch(parameters[0]). Currently all other parameters other than the first element in the array will be ignored
 */

interface filterCardsInterface {
    cardArray: any,
    cardProperties?: string[],
}

const allowedArguments = ["name", "id", "due", "start"];

export async function filterCards(args: filterCardsInterface): Promise<object> {
    if (!args.cardProperties)
        return { "statusText": "OK", "data": args["cardArray"] }

    // temporaryData shouldn't be any[], but it workings if it is
    let temporaryData: any[] = [];
    let numberOfCards = args["cardArray"].length;
    let numberOfProperties = args["cardProperties"].length;
    try {
        if (!args["cardProperties"].every(element => allowedArguments.includes(element))) {
            throw `One of the arguments [ ${args["cardProperties"]} ] is not an allowed. Allowed arguments are: ${allowedArguments.toString()}`;
        }
        for (let i = 0; i < numberOfCards; i++) {
            temporaryData.push({});
            for (let j = 0; j < numberOfProperties; j++) {
                let propertyName: string = args["cardProperties"][j];
                if (allowedArguments.includes(propertyName))
                    temporaryData[i][propertyName] = args["cardArray"][i][propertyName];
            }
        }
        return { "statusText": "OK", "data": temporaryData }
    } catch (err) {
        return { "statusText": "FAIL", "error": err }
    }
}

// async function localTest() {
//     const jsonObj = require("../../../src/Trello/Functions/filterCards.test.json");
//     let tests: any = []
//     tests.push(await filterCards({
//         cardArray: jsonObj
//     }));
//     tests.push(await filterCards({
//         cardArray: jsonObj,
//         cardProperties: ["name"]
//     }));
//     tests.push(await filterCards({
//         cardArray: jsonObj,
//         cardProperties: ["name", "id"]
//     }));
//     for (let data of tests)
//         console.log(data);
// }

// localTest();