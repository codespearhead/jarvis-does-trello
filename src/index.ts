import * as jarvisTrello  from "./config/Trello/jarvisTrelloFunctions";

async function main() {
    let response = await jarvisTrello.getCard(process.env.TRELLO_CARD1, ["name", "id"]);
    console.log(response);
}

main()