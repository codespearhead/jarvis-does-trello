// Minimal working example (could be shorter, but better explicit than implicit)

import { addDeadline } from "./Bots/addDeadline";
import { addStartDate } from "./Bots/addStartDate";
import { sleep } from "./util/generalFunctions/sleep";

async function main(botToTest: string): Promise<void> {
    let configJSON: any[];
    switch (botToTest) {
        case "addStartDate": {
            configJSON = require("../../src/Trello/addDeadline.json");
            for (let bot of configJSON) {
                await addStartDate({
                    idList: bot["idList"],
                    dateStart: bot["start"],
                    sleepTime: 5
                });
                await sleep(30);
            }
            break;
        }
        case "addDeadline": {
            configJSON = require("../../src/Trello/addDeadline.json");
            for (let bot of configJSON) {
                await addDeadline({
                    idList: bot["idList"],
                    dateIntervalInDays: bot["dateIntervalInDays"],
                    sleepTime: 5
                });
                await sleep(30);
            }
            break;
        }
    }
}


main("addDeadline");
