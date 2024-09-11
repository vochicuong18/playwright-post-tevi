import Customer from '../entities/Customer';
import Product from '../entities/Product.js'

const fs = require('fs');
const customerRawData = fs.readFileSync('src/data/customer.json');
const productRawData = fs.readFileSync('src/data/product.json')
const customer = JSON.parse(customerRawData);
const product = JSON.parse(productRawData)

export default class DataTest {

    static getCustomerTest() {
        return new Customer.Builder().setEmail(customer.user1.email)
        .setFirstName(customer.user1.firstName)
        .setLastName(customer.user1.lastName)
        .setPassword(customer.user1.password).build();
    }

    static getProductTest(){
        return new Product.Builder().setName(product.simple_product.name)
            .setSku(product.simple_product.sku)
            .setPrice(product.simple_product.price)
            .setQty(product.simple_product.qty)
            .setURL(product.simple_product.url)
            .build()
    }

    async getEVN(){
        
    }
}