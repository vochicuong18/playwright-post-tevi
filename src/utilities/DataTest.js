import Customer from '../entities/Customer';
import Product from '../entities/product/Product.js'
import Address from "../entities/Address";
import BundleProduct from "../entities/product/BundleProduct";
import SimpleProduct from "../entities/product/SimpleProduct";
import BundleItem from "../entities/product/BundleItem";

const fs = require('fs');
const customerRawData = fs.readFileSync('src/data/customer.json');
const productRawData = fs.readFileSync('src/data/product.json')
const customer = JSON.parse(customerRawData);
const product = JSON.parse(productRawData)

export default class DataTest {

    static getSimpleProductTest() {
        return new SimpleProduct.Builder()
            .setSku(product.simple_product.sku)
            .setName(product.simple_product.name)
            .setType(Product.ProductType.SIMPLE)
            .setPrice(product.simple_product.price)
            .setQty(product.simple_product.qty)
            .setURL(product.simple_product.url)
            .build()
    }

    static getBundleProductTest() {
        const jsonData = product.bundle_product
        const productList = [];
        let price = 0;

        const jsonBundleItems = jsonData.bundle_items;
        for (const jProductItem of jsonBundleItems) {
            const productItem = new BundleItem.Builder()
                .setName(jProductItem.name)
                .setSku(jProductItem.sku)
                .setPrice(jProductItem.price)
                .setQty(Math.floor(Math.random() * 3) + 1)
                .setLabel(jProductItem.label)
                .setBundleItemType(this.getBundleProductType(jProductItem.type))
                .build();

            price += productItem.price * productItem.qty;
            productList.push(productItem);
        }

        return new BundleProduct.Builder()
            .setSku(jsonData.sku)
            .setName(jsonData.name)
            .setPrice(price)
            .setQty(1)
            .setURL(jsonData.url)
            .setListProducts(productList)
            .build();
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

    static getBundleProductType(type) {
        if (type === 'checkbox') {
            return BundleItem.Type.CHECKBOX;
        } else {
            return BundleItem.Type.NONE;
        }
    }
}