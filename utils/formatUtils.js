export class FormatUtils{
    static parsePriceString(amountText){
        if(!amountText.includes('$')){
            throw new Error('El texto ' + amountText + 'does not contain $');
        }
        const amount = parseFloat(amountText.split('$')[1]);
        if(isNaN(amount)){
            throw new Error(amountText + ' cannot be parsed');
        }
        return amount;
    }
}