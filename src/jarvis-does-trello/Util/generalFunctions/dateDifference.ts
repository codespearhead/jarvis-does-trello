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