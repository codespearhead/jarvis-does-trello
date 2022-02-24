import * as jarvisTrello from "./config/Trello/jarvisTrelloFunctions";

async function main() {
    //let a = await jarvisTrello.getList(process.env.TRELLO_LIST1, ["cards", "name", "id", "start", "due"]);
    let a = await jarvisTrello.getCard(process.env.TRELLO_CARD1, ["name", "id"]);
    console.log(a);
}

main()