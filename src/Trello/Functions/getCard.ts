import { AxiosResponse, axiosTrello } from "../util/axiosTrelloInstance";
import { filterCards } from "./filterCards";

/**
 * Fetch information about a card
 * @param idCard id of card
 * @param cardProperties array containing ["due"]
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable response, which holds an array of JSON objects as follows, where both the keys and their values are either strings or other (nested) JSON object: [{...}, {...}, {"foo": {...}, ...}]
 * - Trello returns status: 200 even if the parameters are malformed and the API call does nothing 
*/

interface getCardInterface {
    idCard?: string,
    cardProperties?: string[],
    testData?: object
}

export async function getCard(args: getCardInterface): Promise<object> {
    let response: object;
    let trelloApiResponse: AxiosResponse;
    try {
        if (args["testData"])
            if (!args["cardProperties"]) {
                response = args["testData"];
            }
            else
                response = { step: "next" };
        else {
            if (!args["cardProperties"])
                trelloApiResponse = await axiosTrello.get(`/cards/${args["idCard"]}`);
            else
                response = { step: "next" };
        }
        return response;
    } catch (err) {
        return { error: err };
    }
}

// async function localTest() {
//     const jsonObj = require("../../../src/Trello/Functions/getCard.test.json");
//     let tests = [];
//     tests.push(await getCard({ testData: [jsonObj] }));
//     tests.push(await getCard({ cardProperties: ["name"], testData: [jsonObj] }));
//     tests.push(await getCard({ cardProperties: [], testData: [jsonObj] }));
//     console.log(tests);
// }

// localTest()