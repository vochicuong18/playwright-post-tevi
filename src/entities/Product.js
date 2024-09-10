const ProductType = Object.freeze({
    SINGLE: 'single',
    CONFIGURATION: 'configuration'
}) 

class Product {
    sku
    name
    type

    constructor(sku, name, type) {
        this.sku = sku
        this.name = name
        this.type = type
    }

    getSKU(){
        return this.sku
    }

    getName(){
        return this.name
    }

    getType(){
        return this.type
    }

    static Builder = class {
        sku
        name
        type

        setSku(sku){
            this.sku = sku
            return this     
        }

        setName(name){
            this.name = name
            return this  
        }

        setType(type){
            this.type = type
            return this  
        }

        build(){
            return new Product(this.sku, this.name, this.type)
        }
    }
}
