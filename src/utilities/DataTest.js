import Customer from '../entities/Customer';
import Product from '../entities/Product.js'
import Address from "../entities/Address";

const fs = require('fs');
const customerRawData = fs.readFileSync('src/data/customer.json');
const productRawData = fs.readFileSync('src/data/product.json')
const customer = JSON.parse(customerRawData);
const product = JSON.parse(productRawData)

export default class DataTest {

    static getProductTest() {
        return new Product.Builder().setName(product.simple_product.name)
            .setSku(product.simple_product.sku)
            .setPrice(product.simple_product.price)
            .setQty(product.simple_product.qty)
            .setURL(product.simple_product.url)
            .build()
    }

    static getCustomerTest() {
        return new Customer.Builder().setEmail(customer.user1.email)
            .setFirstName(customer.user1.firstName)
            .setLastName(customer.user1.lastName)
            .setPassword(customer.user1.password)
            .setShippingAddress(this.getShippingAddressTest())
            .setBillingAddress(this.getBillingAddressTest())
            .build();
    }

    static getShippingAddressTest() {
        return new Address.Builder()
            .setFlat(customer.user1.shippingAddress.flat)
            .setStreet(customer.user1.shippingAddress.street)
            .setArea(customer.user1.shippingAddress.area)
            .setCity(customer.user1.shippingAddress.city)
            .setDistrict(customer.user1.shippingAddress.district)
            .setPhoneNumber(customer.user1.shippingAddress.phoneNumber).build()
    }

    static getBillingAddressTest() {
        return new Address.Builder()
            .setFlat(customer.user1.billingAddress.flat)
            .setStreet(customer.user1.billingAddress.street)
            .setArea(customer.user1.billingAddress.area)
            .setCity(customer.user1.billingAddress.city)
            .setDistrict(customer.user1.billingAddress.district)
            .setPhoneNumber(customer.user1.billingAddress.phoneNumber).build()
    }

    async getEVN() {

    }
}