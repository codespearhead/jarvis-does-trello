import { AxiosResponse, axiosTrello } from "../util/axiosTrelloInstance";
import * as jarvis from "./jarvisTrelloOperations";

/**
 * Fetch information about a list on cards in it
 * @param idList id of the list
 * @param parameters array containing ["card"] to take all information of the cards in the list, or ["cards", x], where the optional x currently can either be "name" or "id" to just return this information abou the cards in the list
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable response, which holds an array of JSON objects as follows, where both the keys and their values are either strings or other (nested) JSON object: [{...}, {...}, {"foo": {...}, ...}]
 * - feat: add the remainder of the properties in the switch(parameters[0]). All paramenters that aren't either "name" or "id" will return [{"error": "parameter yet to be implemented"}]
 */
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
                    switch (parameters[0]) {
                        case "cards":
                            trelloApiResponse = await axiosTrello.get(`/lists/${idList}/${parameters[0]}`);
                            parameters.shift(); // remove first element of array
                            response = await jarvis.operationsOnCards(trelloApiResponse.data, parameters);
                            break;
                        default:
                            throw `Argument [ ${parameters[0]} ] is either malformed or yet to be implemented`;
                    }
                    
        }
        return response
    } catch (err) {
        return [{"status": err}]
    }
}


/**
 * Fetch information about a card
 * @param idCard id of card
 * @param parameters array containing ["due"]
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable response, which holds an array of JSON objects as follows, where both the keys and their values are either strings or other (nested) JSON object: [{...}, {...}, {"foo": {...}, ...}]
 */
 export async function getCard(idCard: string, parameters: string[] = []): Promise<object[]> {
    let response: object[];
    try {
        let trelloApiResponse: AxiosResponse;
        switch (parameters.length) {
            case 0:
                trelloApiResponse = await axiosTrello.get(`/cards/${idCard}`);
                response = await trelloApiResponse.data;
                break;
            case 1:
                trelloApiResponse = await axiosTrello.get(`/cards/${idCard}`);
                response = await trelloApiResponse.data;
                break;
            default:
                trelloApiResponse = await axiosTrello.get(`/cards/${idCard}`);
                
                // The API returns a JSON object instead of a JSON object inside an array, so in order to standardize the arguments passed to the following method, it's best to pass the fetched data inside an array 
                response = await jarvis.operationsOnCards([trelloApiResponse.data], parameters);
                break;  

        }
        return response
    } catch (err) {
        return [{"status": err}]
    }
}