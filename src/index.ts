import * as jarvisTrello from "./config/Trello/jarvisTrelloFunction";

async function main() {
    let a = await jarvisTrello.getList(process.env.TRELLO_LIST1, ["cards", "id"]);
    console.log(a);
}

main()