import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance"


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