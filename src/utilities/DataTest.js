import fs from 'fs'
import Customer from '../entities/Customer';
import Product from '../entities/product/Product.js'
import Address from "../entities/Address";
import BundleProduct from "../entities/product/BundleProduct";
import SimpleProduct from "../entities/product/SimpleProduct";
import BundleItem from "../entities/product/BundleItem";

const customerRawData = fs.readFileSync('src/data/customer.json', 'utf-8');
const productRawData = fs.readFileSync('src/data/product.json', 'utf-8')
const customer = JSON.parse(customerRawData);
const product = JSON.parse(productRawData)
let language = process.env.LANGUAGE
export default class DataTest {

    static getLanguage() {
        return language
    }

    static getSimpleProductTest() {
        return new SimpleProduct.Builder()
            .setSku(product[language].simple_product.sku)
            .setName(product[language].simple_product.name)
            .setType(Product.ProductType.SIMPLE)
            .setPrice(product[language].simple_product.price)
            .setQty(product[language].simple_product.qty)
            .setURL(product[language].simple_product.url)
            .build()
    }

    static getBundleProductTest() {
        const jsonData = product[language].bundle_product
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
            .setType(Product.ProductType.BUNDLE)
            .setQty(1)
            .setURL(jsonData.url)
            .setListProducts(productList)
            .build();
    }

    static getCustomerTest() {
        return new Customer.Builder().setEmail(customer[language].user1.email)
            .setFirstName(customer[language].user1.firstName)
            .setLastName(customer[language].user1.lastName)
            .setPassword(customer[language].user1.password)
            .setShippingAddress(this.getShippingAddressTest())
            .setBillingAddress(this.getBillingAddressTest())
            .build();
    }

    static getCustomerTest2() {
        return new Customer.Builder().setEmail(customer[language].user2.email)
            .setFirstName(customer[language].user2.firstName)
            .setLastName(customer[language].user2.lastName)
            .setPassword(customer[language].user2.password)
            .setShippingAddress(this.getShippingAddressTest())
            .setBillingAddress(this.getBillingAddressTest())
            .build();
    }

    static getShippingAddressTest() {
        return new Address.Builder()
            .setFlat(customer[language].user1.shippingAddress.flat)
            .setStreet(customer[language].user1.shippingAddress.street)
            .setArea(customer[language].user1.shippingAddress.area)
            .setCity(customer[language].user1.shippingAddress.city)
            .setDistrict(customer[language].user1.shippingAddress.district)
            .setPhoneNumber(customer[language].user1.shippingAddress.phoneNumber).build()
    }

    static getBillingAddressTest() {
        return new Address.Builder()
            .setFlat(customer[language].user1.billingAddress.flat)
            .setStreet(customer[language].user1.billingAddress.street)
            .setArea(customer[language].user1.billingAddress.area)
            .setCity(customer[language].user1.billingAddress.city)
            .setDistrict(customer[language].user1.billingAddress.district)
            .setPhoneNumber(customer[language].user1.billingAddress.phoneNumber).build()
    }

    static getBundleProductType(type) {
        if (type === 'checkbox') {
            return BundleItem.Type.CHECKBOX;
        } else {
            return BundleItem.Type.NONE;
        }
    }
}