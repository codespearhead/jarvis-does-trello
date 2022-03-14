import { AxiosResponse, axiosTrello } from "../Util/axiosTrelloInstance"
// import papa from "papaparse"

export async function getListsOnBoard(args: {
    auth?: { "key": string | undefined, "token": string | undefined } | undefined,
    idBoard: string | object[],
}): Promise<object> {

    let trelloApiResponse: AxiosResponse
    let authParams: { "key": string | undefined, "token": string | undefined } | undefined;

    if (!args.auth || args.auth === { "key": undefined, "token": undefined }) {
        authParams = undefined
    } else {
        authParams = { "key": args.auth.key, "token": args.auth.token }
    }

    try {
        trelloApiResponse = await axiosTrello.get(`/boards/${args["idBoard"]}/lists`, { params: authParams })
        let relevantData = []
        for (let listInfo of trelloApiResponse["data"]) {
            const { id, name } = listInfo
            relevantData.push({"id": id, "name": name})
        }
        // let relevantDataCSV = papa.unparse(relevantData)
        // console.log(relevantDataCSV)
        return relevantData
    } catch (err) {
        return { error: err }
    }

}