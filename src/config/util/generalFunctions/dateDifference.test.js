const dotenv = require('dotenv');
const { dateDifference } = require('../../../../dist/config/util/generalFunctions/dateDifference')

dotenv.config({ path: ".test.env" });

const cases = [
    { 'dateOne': '2022-02-20T12:00:00.000Z', 'dateTwo': '2022-02-25T12:00:00.000Z', 'return': 5 },
    { 'dateOne': '2022-02-25T12:00:00.000Z', 'dateTwo': '2022-02-20T12:00:00.000Z', 'return': -5 }
]

test.each(cases)("", async (A) => {
    await expect(
        dateDifference(
            A["dateOne"], A["dateTwo"]
        )
    ).resolves.toBe(
        A["return"]
    );
})