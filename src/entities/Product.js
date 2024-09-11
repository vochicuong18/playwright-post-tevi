import Customer from "./Customer";

const ProductType = Object.freeze({
    SINGLE: 'single',
    CONFIGURATION: 'configuration'
})

class Product {
    sku
    name
    type
    price
    qty
    url

    constructor(sku, name, type, price, qty, url) {
        this.sku = sku
        this.name = name
        this.type = type
        this.price = price
        this.qty = qty
        this.url = url
    }

    getSKU() {
        return this.sku
    }

    getName() {
        return this.name
    }

    getType() {
        return this.type
    }

    getPrice() {
        return this.price
    }

    getQty() {
        return this.qty
    }

    getURL() {
        return this.url
    }

    static Builder = class {
        sku
        name
        type
        price
        qty
        url

        setSku(sku) {
            this.sku = sku
            return this
        }

        setName(name) {
            this.name = name
            return this
        }

        setType(type) {
            this.type = type
            return this
        }

        setPrice(price) {
            this.price = price
            return this
        }

        setQty(qty) {
            this.qty = qty
            return this
        }

        setURL(url) {
            this.url = url
            return this
        }

        build() {
            return new Product(this.sku, this.name, this.type, this.price, this.qty, this.url)
        }
    }
}

export default Product
