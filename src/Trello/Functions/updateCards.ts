import { AxiosResponse, axiosTrello } from "../util/axiosTrelloInstance";

/**
 * Fetch information about a card
 * @param idCard id of card
 * @param parameters array containing ["due"]
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable response, which holds an array of JSON objects as follows, where both the keys and their values are either strings or other (nested) JSON object: [{...}, {...}, {"foo": {...}, ...}]
 * - improvement: parameters' type shouldn't be any 
*/

interface updateCardInterface {
    idCard: string, cardProperties: object[], testData?: object
}
export async function updateCard(args: updateCardInterface): Promise<object> {
    let response: object;
    let trelloApiResponse: AxiosResponse;
    try {
        if (!args["testData"])
            trelloApiResponse = await axiosTrello.put(`/cards/${args["idCard"]}`, JSON.stringify(args["cardProperties"]));
        else 
            response = args["testData"];
        response = trelloApiResponse;
        //let response = Promise.resolve([{"Status": "Yet to create function"}])
        return response
        
    } catch (err) {
        return { error: err }
    }
}