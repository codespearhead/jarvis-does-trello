import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance";

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


export async function getCard(args: {
    idCard?: string,
    cardProperties?: string[],
    testData?: object,
    auth?: { "key": string | undefined, "token": string | undefined } | undefined
}): Promise<object>
{

    let trelloApiResponse: AxiosResponse

    try {
        trelloApiResponse = await axiosTrello.get(`/cards/${args["idCard"]}`, {params: args["auth"]})
        return trelloApiResponse
    } catch (err) {
        return { error: err }
    }

}