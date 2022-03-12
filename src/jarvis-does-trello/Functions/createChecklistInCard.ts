import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance"

export async function createChecklistInCard(args: {
    auth: { "key": string | undefined, "token": string | undefined },
    idCard: string,
    idChecklistArray: string[],
    position?: "top" | "bottom"
}): Promise<void>
{

    let trelloApiResponse: AxiosResponse
    let position: string

    if (!args["position"])
        position = "bottom"

    try {
        for (let checklist of args["idChecklistArray"])
            trelloApiResponse = await axiosTrello.post(`/cards/${args["idCard"]}/checklists`, {idChecklistSource: checklist, pos: position}, {params: args["auth"]})
    } catch (err) {
        console.log({error: err })
    }

}