class Customer {
    email;
    password;
    firstName;
    lastName;
    address;

    constructor(email, firstName, lastName, password, address) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
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

    getAddress() {
        return this.address;
    }

    static Builder = class {
        email;
        password;
        firstName;
        lastName;
        address;

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

        setAddress(address) {
            this.address = address;
            return this;
        }

        build() {
            return new Customer(this.email, this.firstName, this.lastName, this.password, this.address);
        }
    };
}

export default Customer;