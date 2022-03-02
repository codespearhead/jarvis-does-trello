import * as jarvisTrello  from "./config/Trello/jarvisTrelloFunctions";

async function main() {
    let response = await jarvisTrello.getCard(process.env.TRELLO_CARD1, ["id", "start", "due"]);
    console.log(response);
}

main()