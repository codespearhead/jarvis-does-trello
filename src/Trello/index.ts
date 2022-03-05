// Minimal working example (could be shorter, but better explicit than implicit)

import { addDeadline } from "./Bots/addDeadline";
import { sleep } from "./util/generalFunctions/sleep";

async function main(configJSON: any[]): Promise<void> {
    for (let bot of configJSON) {
        await addDeadline({
            idList: bot["idList"],
            dateIntervalInDays: bot["dateIntervalInDays"],
            sleepTime: 5
        });
        await sleep(30);
    }
}

const config = require("../../src/Trello/config.json");
main(config);
