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

export async function dayDifference(args: {
    other?: string | object,
    dateStart: string | undefined,
    dateEnd: string | undefined,
    numberOfDaysApart: number
}): Promise<object>
{

    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const startDate: Date = new Date(today)
    let endDate: Date = new Date(today)
    let returnData: {
        other?: any,
        dataToUpdate: {
            start?: Date | number,
            due?: Date | number
        }
    } = { dataToUpdate: {} }

    if (args["other"])
        returnData["other"] = args["other"]

    if (!args["dateStart"])
        returnData["dataToUpdate"]["start"] = startDate

    if (!args["dateEnd"]) {
        endDate.setDate(today.getDate() + args["numberOfDaysApart"])
        returnData["dataToUpdate"]["due"] = endDate
    }
    
    return returnData;

}