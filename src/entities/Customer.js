class Customer {
    email
    password
    firstName
    lastName

    constructor(email, firstName, lastName, password) {
        this.email = email;
        this.password = password;
        this.firstName = firstName
        this.lastName = lastName
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getFirstName(){
        return this.firstName
    }

    getLastName(){
        return this.lastName
    }

    static Builder = class {
        email
        password
        firstName
        lastName

        setEmail(email){
            this.email = email;
            return this;
        }

        setFirstName(firstName){
            this.firstName = firstName
            return this
        }

        setLastName(lastName){
            this.lastName = lastName
            return this
        }

        setPassword(password){
            this.password = password;
            return this;
        }

        build(){
            return new Customer(this.email, this.firstName, this.lastName, this.password)
        }
    }
}



export default Customer;