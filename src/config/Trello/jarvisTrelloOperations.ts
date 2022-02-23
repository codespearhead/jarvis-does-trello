export async function operationsOnCards(cardArray: any, parameters: string[]): Promise<object[]> {
    parameters.shift();
    try {
        switch (parameters[0]) {
            case "name":
                cardArray = cardArray.map((card: { name: string; }) => card.name);
                break;
            case "id":
                cardArray = cardArray.map((card: { id: string; }) => card.id);
                break;
        }
    } catch (err) {
        console.log(err);
    } finally {
        return cardArray;
    }
}