/**
 * Operate on card object
 * @param cardArray array of objects containing card data from the API
 * @param parameters array containing allowed arguments
 * @returns array of objects with the information about either the whole card or a specific property of it in the particular order the arguments were passed
 * 
 * TODO:
 * - bug: create a type for variable card
 * - feat: add the remainder of the properties in the switch(parameters[0]). Currently all other parameters other than the first element in the array will be ignored
 */
export async function operationsOnCards(cardArray: any, parameters: string[]): Promise<object> {
    let temporaryData: any = [];
    let allowedArguments = ["name", "id", "due", "start"];
    let numberOfProperties = cardArray.length;
    try {
        let element: any;
        if (!parameters.every(element => allowedArguments.includes(element))) {
            throw `One of the arguments [ ${parameters} ] is not an allowed. Allowed arguments are: ${allowedArguments.toString()}`;
        }
        for (let i = 0; i < numberOfProperties; i++) {
            temporaryData.push({});

            //No idea why variable card has this type
            for (element of parameters) {
                temporaryData[i][element] = cardArray.map((card: { [x: string]: any; })  => card[element])[i];
            }

        }
        return { "statusText": "OK", "data": temporaryData }
    } catch (err) {
        return { "statusText": "FAIL", "error": err }
    }
}