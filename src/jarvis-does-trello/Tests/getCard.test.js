// const jarvis = require("../../../dist/Trello/index");
// const testDataStringified = require("./getCard.test.json");
// const testData = testDataStringified;

// const cases = [
//     {
//         "idCard": "612bfeb4d3b75f6f89c7b20a",
//         "testData": testData,
//         "return": testData
//     }
// ];

// test.each(cases)("getCard", async (unitCase) => {
//     let response = await jarvis.getCard({
//         idCard: unitCase["idCard"],
//         cardProperties: unitCase["cardProperties"],
//         testData: unitCase["testData"]
//     });
//     await expect(
//         response
//     ).toEqual(
//         unitCase["return"]
//     );
// });

const jarvis = require("../../../dist/Trello/index");
const dotenv = require('../../../node_modules/dotenv')

dotenv.config()
dotenv.config({path: ".test.env"})


// Phase 1 - Testing for development stage

const testData = require("./getCard.test.json");
const cases = [
    {
        "testData": testData,
        "return": testData
    },
    {
        "cardProperties": ["name"],
        "testData": testData,
        "return": { step: "next" }
    },
    {
        "idCard": "any string",
        "cardProperties": ["name"],
        "return": { step: "next" }
    }
];

test.each(cases)("Phase 1: getCard", async (unitCase) => {
    let response = await jarvis.getCard({
        idCard: unitCase["idCard"],
        cardProperties: unitCase["cardProperties"],
        testData: unitCase["testData"]
    });
    await expect(
        response
    ).toEqual(
        unitCase["return"]
    );
});


// Phase 2 - Testing for pre-production stage

realTestData
async function getRealData(){
    realTestData = await jarvis.getCard({ idCard: process.env.TRELLO_CARD_GETCARD })
}
getRealData()

cases = [
    {
        "idCard": realTestData,
        "return": realTestData
    }
];

console.log(realTestData)
test.each(cases)("Phase 2: getCard", async (unitCase) => {
    let response = await jarvis.getCard({
        idCard: unitCase["idCard"]
    });
    await expect(
        response
    ).toEqual(
        unitCase["return"]
    );
});

// async function localTest() {
//     const jsonObj = require("../../../src/Trello/Functions/getCard.test.json");
//     let tests = [];
//     tests.push(await getCard({ testData: [jsonObj] }));
//     tests.push(await getCard({ cardProperties: ["name"], testData: [jsonObj] }));
//     tests.push(await getCard({ cardProperties: [], testData: [jsonObj] }));
//     console.log(tests);
// }

// localTest()