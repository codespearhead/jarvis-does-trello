import { AxiosResponse, axiosTrello } from "../util/axiosTrelloInstance";
import { filterCards } from "./filterCards";

/**
 * Fetch information about a list on cards in it
 * @param idList id of the list
 * @param parameters array containing ["card"] to take all information of the cards in the list, or ["cards", x], where the optional x as of now can either be "name" or "id" to just return this information about the cards in the list
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable response, which holds an array of JSON objects as follows, where both the keys and their values are either strings or other (nested) JSON object: [{...}, {...}, {"foo": {...}, ...}]
 * - feat: add the remainder of the properties in the switch(parameters[0]). All paramenters that aren't either "name" or "id" will return [{"error": "parameter yet to be implemented"}]
 */

interface getListInterface {
    idList: string | object[],
    getCardsInList?: boolean,
    cardParameters?: string[]
}

export async function getList(args: getListInterface): Promise<object> {
    let trelloApiResponse: AxiosResponse;
    let response: object;
    let extraParm = ""
    if (args["getCardsInList"]) {
        extraParm = "cards";
    }
    try {
        if (typeof args["idList"] === 'string') {
            if (!args["cardParameters"]) {
                trelloApiResponse = await axiosTrello.get(`/lists/${args["idList"]}/${extraParm}`);
                response = trelloApiResponse;
            } else {
                trelloApiResponse = await axiosTrello.get(`/lists/${args["idList"]}/${extraParm}`);
                response = filterCards({cardArray: trelloApiResponse["data"], cardProperties: args["cardParameters"]});
            }
        } else {
            if (!args["cardParameters"])
                response = args["idList"];
            else
                response = { step: "next" };
        }
        return response
    } catch (err) {
        return { error: err }
    }
}


// async function localTest() {
//     const jsonObject: object[] = require("../../../src/Trello/Functions/getList.test.json")
//     const idList: string = "6216811a0cd54f0a231dbfa2";
//     let tests: any = []
//     tests.push(await getList({
//         idList: idList
//     }));
//     tests.push(await getList({
//         idList: idList,
//         getCardsInList: true
//     }));
//     tests.push(await getList({
//         idList: idList,
//         getCardsInList: true,
//         cardParameters: ["name"]
//     }));
//     tests.push(await getList({
//         idList: jsonObject
//     }));
//     tests.push(await getList({
//         idList: jsonObject,
//         cardParameters: ["name"]
//     }));
//     tests.push(await getList({
//         idList: jsonObject,
//         getCardsInList: true,
//         cardParameters: ["name"]
//     }));
//     for (let data of tests)
//         console.log(data);
// }

// // localTest();