import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance";


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