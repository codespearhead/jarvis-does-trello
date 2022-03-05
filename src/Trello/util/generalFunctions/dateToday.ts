/**
 * Get day difference between two date strings
 * @param dateOneString older date
 * @param dateTwoString later date
 * @returns signed integer
 * 
 * TODO:
 * - feat: create a type for (UTC) date string
 * - improvement: the return of the function must have its own type
 * - improvement: the function fails if the dates are not in the same month or year
 */

interface dayDifferenceInterface {
    other?: any,
    dateStart: string,
}

export async function dateToday(args: dayDifferenceInterface): Promise<object> {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    let dateStart: Date = new Date(today);
    let shouldChange: boolean = false;

    if (!args["dateStart"]) {
        dateStart = today;
        shouldChange = true;
    }
    else
        dateStart = new Date(args["dateStart"])
    if (!args["other"])
        return { "start": dateStart, "shouldChange": shouldChange };
    else
        return { "other": args["other"], "start": dateStart, "shouldChange": shouldChange };
}

// async function localTest() {
//     let tests: any = [];
//     tests.push(await dateToday({dateStart: null, dateEnd: null, numberOfDaysApart: 5}));
//     tests.push(await dateToday({dateStart: null, dateEnd: "2022-03-03T03:59:59.000Z", numberOfDaysApart: 5}));
//     tests.push(await dateToday({dateStart: "2022-03-03T03:59:59.000Z", dateEnd: null, numberOfDaysApart: 5}));
//     // const jsonObject: object[] = require("../../../Trello/util/generalFunctions/dateDifference.test.json")
//     // let tests: any = []
//     // tests.push(await dayDifference({
//     //     idList: idList
//     // }));
//     // for (let data of tests)
//     //     console.log(data);
//     console.log(tests);
// }

// localTest();