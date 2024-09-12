class Address {
    flat
    street
    area
    city
    district
    phoneNumber

    constructor(flat, street, area, city, district, phoneNumber) {
        this.flat = flat
        this.street = street
        this.area = area
        this.city = city
        this.district = district
        this.phoneNumber = phoneNumber
    }

    getFlat() {
        return this.flat
    }

    getStreet() {
        return this.street
    }

    getArea() {
        return this.area
    }

    getCity() {
        return this.city
    }

    getDistrict() {
        return this.district
    }

    getPhoneNumber() {
        return this.phoneNumber
    }

    static Builder = class {
        flat
        street
        area
        city
        district
        phoneNumber

        setFlat(flat) {
            this.flat = flat
            return this
        }

        setStreet(street) {
            this.street = street
            return this
        }

        setArea(area) {
            this.area = area
            return this
        }

        setCity(city) {
            this.city = city
            return this
        }

        setDistrict(district) {
            this.district = district
            return this
        }

        setPhoneNumber(phoneNumber) {
            this.phoneNumber = phoneNumber
            return this
        }

        build() {
            return new Address(this.flat, this.street, this.area, this.city, this.district, this.phoneNumber)
        }
    }
}
export default Address