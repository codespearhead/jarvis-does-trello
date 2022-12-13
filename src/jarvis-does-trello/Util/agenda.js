const jarvis = require("jarvis-does-trello");
const dotenv = require("dotenv");

// Source: https://bobbyhadz.com/blog/javascript-format-date-dd-mm-yyyy
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  const dayOfTheWeek = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ][date.getDay()];
  const dateWithSlashes = [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    String(date.getFullYear()).slice(-2),
  ].join("/");
  return `${dayOfTheWeek} ${dateWithSlashes}`;
}

function isDateColumn(str) {
  return /^(segunda(-feira)?|ter[cç]a(-feira)?|quarta(-feira)?|quinta(-feira)?|sexta(-feira)?|s[aá]bado|domingo) \d{2}\/\d{2}\/(\d{2}|\d{4})$/.test(
    str
  );
}

async function createList(idBoard, list_name, position = "bottom") {
  try {
    await jarvis.axiosTrello.post(
      `https://api.trello.com/1/lists?name=${encodeURI(list_name)}`,
      { pos: position },
      {
        params: {
          idBoard,
          key: auth.key,
          token: auth.token,
        },
      }
    );
    console.log(`[OK] ${list_name}`);
    await jarvis.sleep(1.2);
  } catch (err) {
    console.log({ error: err });
  }
}

async function agenda(auth, idBoard, timeOffset = 0, timeZone = -4) {

  // get list names and ids

  let data = await jarvis.getListsOnBoard({
    auth,
    idBoard,
  });

  // get first and last column dates

  data = data.filter((e) => isDateColumn(e.name));
  data = [data[0], data[data.length - 1]];

  // Check if it's time to add and archive the date columns

  let oldestDay = data[0].name.split(" ")[1].split("/");
  oldestDay[1] = oldestDay[1] === 12 ? 0 : oldestDay[1] - 1;
  oldestDay[2] = oldestDay[2].length === 4 ? oldestDay[2][2] + oldestDay[2][3] : oldestDay[2];
  oldestDay = new Date("20" + oldestDay[2], oldestDay[1], oldestDay[0]);

  let today = new Date();
  const hourToMs = 60*60*1000
  let shouldRun = today.getTime() - oldestDay.getTime() > 24*hourToMs + hourToMs*timeOffset + hourToMs*(-timeZone)

  if (shouldRun) {

    // archive first column date

    try {
      await jarvis.axiosTrello.put(
        `https://api.trello.com/1/lists/${data[0].id}/closed`,
        {
          key: auth.key,
          token: auth.token,
          value: "true",
        }
      );
    } catch (err) {
      console.log({ error: err });
    }

    // Generate last+1 column date's name

    let lastDay = data[1].name.split(" ")[1].split("/");
    lastDay[1] = lastDay[1] === 12 ? 0 : lastDay[1] - 1;

    nextDay = new Date("20" + lastDay[2], lastDay[1], lastDay[0]);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay = formatDate(nextDay);

    // Create last+1 column date

    try {
      await jarvis.axiosTrello.post(
        `https://api.trello.com/1/lists?name=${encodeURI(nextDay)}`,
        { pos: "bottom" },
        {
          params: {
            idBoard,
            key: auth.key,
            token: auth.token,
          },
        }
      );
    } catch (err) {
      console.log({ error: err });
    }
  }
}

async function main() {

  // Source dotenv files

  dotenv.config({ path: "./.env" });
  const envFilesArray = await jarvis.listFilesInFolder({
    pathToFolder: "./envFiles/",
  });
  for (let envFile of envFilesArray)
    dotenv.config({ path: `./envFiles/${envFile}` });

  // agenda({
  //   key: process.env.TRELLO_API_BOT_KEY,
  //   token: process.env.TRELLO_API_BOT_TOKEN,
  // }, process.env.TRELLO_DUMMYBOARD_IDBOARD, 2)

}

main()