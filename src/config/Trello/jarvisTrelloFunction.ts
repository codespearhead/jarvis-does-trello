import { AxiosResponse, axiosTrello } from "../util/axiosTrelloInstance";
import * as jarvis from "./jarvisTrelloOperations";

export async function getList(idList: string, parameters: string[] = []): Promise<object[]> {
    let response: object[];
    try {
        let trelloApiResponse: AxiosResponse;
        switch (parameters.length) {
            case 0:
                trelloApiResponse = await axiosTrello.get(`/lists/${idList}`);
                response = await trelloApiResponse.data;
                break;
            case 1:
                trelloApiResponse = await axiosTrello.get(`/lists/${idList}/${parameters[0]}`);
                response = await trelloApiResponse.data;
                break;
            default:
                trelloApiResponse = await axiosTrello.get(`/lists/${idList}/${parameters[0]}`);
                try {
                    switch (parameters[0]) {
                        case "cards":
                            response = await jarvis.operationsOnCards(trelloApiResponse.data, parameters);
                            break;
                    }
                } catch (err) {
                    console.log(err);
                }
        }
    } catch (err) {
        console.log(err);
    } finally {
        return response;
    }
}