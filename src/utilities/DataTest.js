import Customer from '../entities/Customer';

const fs = require('fs');
const rawData = fs.readFileSync('src/data/customer.json');
const data = JSON.parse(rawData);

export default class DataTest {

    static getCustomerTest() {
        return new Customer.Builder().setEmail(data.user1.email)
        .setFirstName(data.user1.firstName)
        .setLastName(data.user1.lastName)                            
        .setPassword(data.user1.password).build();
    }

    async getEVN(){
        
    }
}