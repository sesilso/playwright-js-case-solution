export class Product{
    constructor(name, desc, price){
        this.name = name;
        this.desc = desc;
        this.price = price;
    }

    getInfo(){
        return {name: this.name, desc: this.desc, price:this.price};
    }
}