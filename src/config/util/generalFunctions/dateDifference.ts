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
export function dayDifference(dateOneString: string, dateTwoString: string, numberOfDaysToCompare: number): any {
    let dateOne: Date = new Date(dateOneString)
    let dateTwo: Date = new Date(dateTwoString)
    let differenceInDays: number = Math.abs(dateOne.getUTCDay() - dateTwo.getUTCDay() - 1); // Skip the day the start date was set

    return {"differenceInDays": differenceInDays, "lesserOrEqualTo": differenceInDays >= numberOfDaysToCompare};
}