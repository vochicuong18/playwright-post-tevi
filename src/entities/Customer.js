class Customer {
    email;
    password;
    firstName;
    lastName;
    shippingAddress
    billingAddress;

    constructor(email, firstName, lastName, password, shippingAddress, billingAddress) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getShippingAddress() {
        return this.shippingAddress;
    }

    getBillingAddress() {
        return this.billingAddress;
    }

    static Builder = class {
        email
        password
        firstName
        lastName
        shippingAddress
        billingAddress

        setEmail(email) {
            this.email = email;
            return this;
        }

        setFirstName(firstName) {
            this.firstName = firstName;
            return this;
        }

        setLastName(lastName) {
            this.lastName = lastName;
            return this;
        }

        setPassword(password) {
            this.password = password;
            return this;
        }

        setShippingAddress(shippingAddress) {
            this.shippingAddress = shippingAddress;
            return this;
        }

        setBillingAddress(billingAddress) {
            this.billingAddress = billingAddress;
            return this;
        }

        build() {
            return new Customer(this.email, this.firstName, this.lastName, this.password, this.shippingAddress, this.billingAddress);
        }
    };
}

export default Customer;