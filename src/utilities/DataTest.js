import {test as baseTest} from '@playwright/test';
import fs from "fs";

import SimpleProduct from "../entities/product/SimpleProduct";
import Product from "../entities/product/Product";
import BundleItem from "../entities/product/BundleItem";
import BundleProduct from "../entities/product/BundleProduct";
import Customer from "../entities/Customer";
import Address from "../entities/Address";
import {paymentMethod} from "../entities/Payment";
import {shippingMethod} from "../entities/Shipping";
import Card from "../entities/product/Card";

const customerRawData = fs.readFileSync('src/data/customer.json', 'utf-8');
const productRawData = fs.readFileSync('src/data/product.json', 'utf-8')
const cardRawData = fs.readFileSync('src/data/card.json', 'utf-8')
const product = JSON.parse(productRawData)
const customer = JSON.parse(customerRawData);
const card = JSON.parse(cardRawData)

export const test = baseTest.extend({
    simpleProduct: async ({language}, use) => {
        await use(new SimpleProduct.Builder()
            .setSku(product[language].simple_product.sku)
            .setName(product[language].simple_product.name)
            .setType(Product.ProductType.SIMPLE)
            .setPrice(product[language].simple_product.price)
            .setQty(product[language].simple_product.qty)
            .setURL(product[language].simple_product.url)
            .build())
    },

    bundleProduct: async ({language}, use) => {
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
                .setBundleItemType(getBundleProductType(jProductItem.type))
                .build();

            price += productItem.price * productItem.qty;
            productList.push(productItem);
        }
        await use(new BundleProduct.Builder()
            .setSku(jsonData.sku)
            .setName(jsonData.name)
            .setPrice(price)
            .setType(Product.ProductType.BUNDLE)
            .setQty(1)
            .setURL(jsonData.url)
            .setListProducts(productList)
            .build())
    },

    address: async ({language}, use) => {
        await use(new Address.Builder()
            .setFlat(customer[language].user1.shippingAddress.flat)
            .setStreet(customer[language].user1.shippingAddress.street)
            .setArea(customer[language].user1.shippingAddress.area)
            .setCity(customer[language].user1.shippingAddress.city)
            .setDistrict(customer[language].user1.shippingAddress.district)
            .setPhoneNumber(customer[language].user1.shippingAddress.phoneNumber).build())
    },

    customer1: async ({language}, use) => {
        await use(new Customer.Builder().setEmail(customer[language].user1.email)
            .setFirstName(customer[language].user1.firstName)
            .setLastName(customer[language].user1.lastName)
            .setPassword(customer[language].user1.password)
            .setShippingAddress(getBillingAddressTest(language))
            .setBillingAddress(getBillingAddressTest(language))
            .build())
    },

    customer2: async ({language}, use) => {
        await use(new Customer.Builder().setEmail(customer[language].user2.email)
            .setFirstName(customer[language].user2.firstName)
            .setLastName(customer[language].user2.lastName)
            .setPassword(customer[language].user2.password)
            .setShippingAddress(getShippingAddressTest(language))
            .setBillingAddress(getBillingAddressTest(language))
            .build())
    },

    visa: async ({}, use) => {
        await use(new Card.Builder().setCardName(card[Card.CardType.VISA].name)
            .setCardNumber(card[Card.CardType.VISA].number)
            .setExpireMonth(card[Card.CardType.VISA].month)
            .setExpireYear(card[Card.CardType.VISA].year)
            .setCode(card[Card.CardType.VISA].code)
            .build())
    },

    masterCard: async ({}, use) => {
        await use(new Card.Builder().setCardName(card[Card.CardType.MASTERCARD].name)
            .setCardNumber(card[Card.CardType.MASTERCARD].number)
            .setExpireMonth(card[Card.CardType.MASTERCARD].month)
            .setExpireYear(card[Card.CardType.MASTERCARD].year)
            .setCode(card[Card.CardType.MASTERCARD].code)
            .build())
    },

    cod: async ({}, use) => {
        await use(paymentMethod.cashOnDelivery)
    },

    bestWay: async ({}, use) => {
        await use(shippingMethod.bestWay)
    },

    calculated: async ({simpleProduct, bundleProduct, cod}, use) => {
        const subTotal = simpleProduct.getPrice() * simpleProduct.getQty() + bundleProduct.getPrice() * bundleProduct.getQty();
        const shippingFee = shippingMethod.bestWay.fee;
        const grandTotal = subTotal + shippingFee;
        await use({subTotal, shippingFee, grandTotal});
    },
})

function getBundleProductType(type) {
    if (type === 'checkbox') {
        return BundleItem.Type.CHECKBOX;
    } else {
        return BundleItem.Type.NONE;
    }
}

function getShippingAddressTest(language) {
    return new Address.Builder()
        .setFlat(customer[language].user1.shippingAddress.flat)
        .setStreet(customer[language].user1.shippingAddress.street)
        .setArea(customer[language].user1.shippingAddress.area)
        .setCity(customer[language].user1.shippingAddress.city)
        .setDistrict(customer[language].user1.shippingAddress.district)
        .setPhoneNumber(customer[language].user1.shippingAddress.phoneNumber).build()
}

function getBillingAddressTest(language) {
    return new Address.Builder()
        .setFlat(customer[language].user1.billingAddress.flat)
        .setStreet(customer[language].user1.billingAddress.street)
        .setArea(customer[language].user1.billingAddress.area)
        .setCity(customer[language].user1.billingAddress.city)
        .setDistrict(customer[language].user1.billingAddress.district)
        .setPhoneNumber(customer[language].user1.billingAddress.phoneNumber).build()
}