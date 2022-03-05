// Minimal working example (could be shorter, but better explicit than implicit)

import { addDeadline } from "./Bots/addDeadline";
import { sleep } from "./util/generalFunctions/sleep";

async function main(configJSON: any[]): Promise<void> {
    for (let bot of configJSON) {
        await addDeadline({
            idList: bot["idList"],
            dateIntervalInDays: bot["dateIntervalInDays"]
        });
        await sleep(10);
    }
}

const config = require("../../src/Trello/config.json");
main(config);
