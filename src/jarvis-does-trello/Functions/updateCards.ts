import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance"
import { sleep } from "../index"

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


export async function updateCards(args: {
    auth?: { "key": string | undefined, "token": string | undefined } | undefined,
    idCard: string,
    cardProperties: any
}): Promise<void>
{

    let authParams: { "key": string | undefined, "token": string | undefined } | undefined
    let trelloApiResponse: AxiosResponse

    if (!args.auth || args.auth === {"key": undefined, "token": undefined }) {
        authParams = undefined
    } else {
        authParams = {"key": args.auth.key, "token": args.auth.token }
    }

    try {
        trelloApiResponse = await axiosTrello.put(`/cards/${args["idCard"]}`, args["cardProperties"], {params: authParams})
    } catch (err) {
        console.log({error: err })
    }

}