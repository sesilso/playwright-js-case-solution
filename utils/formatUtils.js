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

    static sumAndRound(numbers){
        let total = 0;
        for(let number of numbers){
            total += number;
        }
        return Math.round(total*100)/100;
    }
}