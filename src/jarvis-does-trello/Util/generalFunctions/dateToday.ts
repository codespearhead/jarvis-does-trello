export async function dateToday(args: {
    other?: any,
    dateStart: string,
}): Promise<object>
{

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let dateStart: Date = new Date(today)
    let shouldChange: boolean = false

    if (!args["dateStart"]) {
        dateStart = today
        shouldChange = true
    }
    else
        dateStart = new Date(args["dateStart"])
    if (!args["other"])
        return { "start": dateStart, "shouldChange": shouldChange }
    else
        return { "other": args["other"], "start": dateStart, "shouldChange": shouldChange }

}