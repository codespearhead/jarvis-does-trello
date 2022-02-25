/**
 * Get day difference between two date strings
 * @param dateOneString older date
 * @param dateTwoString later date
 * @returns signed integer
 * 
 * TODO:
 * - feat: create a type for (UTC) date string
 */
export async function dateDifference(dateOneString: string, dateTwoString: string): Promise<number> {
    let dateOne: Date = new Date(dateOneString);
    let dateTwo: Date = new Date(dateTwoString);
    return dateTwo.getDay() - dateOne.getDay();
}