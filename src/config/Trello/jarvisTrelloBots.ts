import * as jarvisOperations from "./jarvisTrelloOperations";
import * as jarvisFunctions from "./jarvisTrelloFunctions";
import { dayDifference } from "../util/generalFunctions/dateDifference";
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
 * - improvement: There has to be shorthand way to make the iterator in the for..in loop a JS object automagically
*/
export async function addDeadline(idList: string, incrementInDays: number): Promise<object> {

    interface addDeadlineType {
        addDue: any[],
        addStart: any[],
        removeDue: any[]
    }
    interface cardDates {
        name?: string,
        id: string,
        start: string,
        due: string
    }

    try {
        let promiseResponse: any = jsonObject;//await jarvisFunctions.getList(idList, ["cards", "name", "id", "start", "due"]);
        let response: cardDates[] = promiseResponse["data"];
        let temporaryData: addDeadlineType = { addDue: [], addStart: [], removeDue: [] };
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        for (let cardInfo of response) {
            if (!cardInfo["start"]) {
                temporaryData["addStart"].push(cardInfo);
                jarvisFunctions.updateCard(cardInfo["id"], {"start": today});
        }
            else if (!cardInfo["due"]) {
                temporaryData["addDue"].push(cardInfo);
                jarvisFunctions.updateCard(cardInfo["id"], {"due": today.getDate() + incrementInDays});
            }
            else if ( !dayDifference(cardInfo["start"], cardInfo["due"], incrementInDays)["lesserOrEqualTo"] ) {
                temporaryData["removeDue"].push(cardInfo);
                jarvisFunctions.updateCard(cardInfo["id"], {"due": ""});
            }
        }

        return temporaryData
    } catch (err) {
        return { error: err }
    }
}