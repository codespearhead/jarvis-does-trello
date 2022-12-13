const jarvis = require("jarvis-does-trello");
const dotenv = require("dotenv");
const axios = require("axios");

const data = [
  "----",
  "----",
  "----",
  ]
  
async function bot() {
  // Source dotenv files
  dotenv.config({ path: "./.env" });
  const envFilesArray = await jarvis.listFilesInFolder({
    pathToFolder: "./envFiles/",
  });
  for (let envFile of envFilesArray)
    dotenv.config({ path: `./envFiles/${envFile}` });

   const auth = {
     key: process.env.TRELLO_API_BOT_KEY,
     token: process.env.TRELLO_API_BOT_TOKEN,
   };

  try {
    for (let list_name of data) {
      await axios.post(
        `https://api.trello.com/1/lists?name=${encodeURI(list_name)}`,
        { pos: "bottom" },
        {
          params: {
            idBoard: TRELLO_DUMMYBOARD_IDBOARD,
            key: auth.key,
            token: auth.token,
          },
        }
      );
      console.log(`[OK] ${list_name}`);
      await jarvis.sleep(1.2);
    }
  } catch (err) {
    console.log({ error: err });
  }
}

bot();
