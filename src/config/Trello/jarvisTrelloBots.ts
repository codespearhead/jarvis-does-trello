import * as jarvisOperations from "./jarvisTrelloOperations";
import * as jarvisFunctions from "./jarvisTrelloFunctions";
import { dateDifference } from "../util/generalFunctions/dateDifference";
const jsonObject = require("../../../src/test.json");

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
export async function addDeadline(idList: string, incrementInDays: number = 15): Promise<object[]> {

    interface addDeadlineType {
        addDue: any[],
        addStart: any[],
        removeDue: any[]
    }
    interface cardsDates {
        id: string,
        start: string
        due: string
    }

    try {

        let response: cardsDates[] = jsonObject //await jarvisFunctions.getList(idList, ["id", "start", "due"]);
        let temporaryData: addDeadlineType[] = [{ "addDue": [], "addStart": [], "removeDue": [] }];
        for (let cardInfo of response) {
            if (!cardInfo["start"])
                temporaryData[0]["addStart"].push(cardInfo);
            else if (!cardInfo["due"])
                temporaryData[0]["addDue"].push(cardInfo);
            else if (await dateDifference(cardInfo["due"], cardInfo["start"]) < incrementInDays)
                temporaryData[0]["removeDue"].push(cardInfo);
        }
        return temporaryData
    } catch (err) {
        return [{ "status": err }]
    }
}