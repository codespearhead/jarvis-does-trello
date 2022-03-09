import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance";

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
    idCard: string,
    cardProperties: any
}

export async function updateCards(args: updateCardInterface): Promise<object> {
    let trelloApiResponse: AxiosResponse;
    try {
        console.log(JSON.stringify(args["cardProperties"]))
        //         trelloApiResponse = await axiosTrello.put(`/cards/${args["idCard"]}`, JSON.stringify(args["cardProperties"]))
            return trelloApiResponse
    } catch (err) {
        return { error: err }
    }
}