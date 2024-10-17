class Card {

    static CardType = Object.freeze({
        VISA: 'Visa', MASTERCARD: 'MasterCard'
    })

    constructor(cardName, cardNumber, expireMonth, expireYear, code, type) {
        this.cardName = cardName
        this.cardNumber = cardNumber
        this.expireMonth = expireMonth
        this.expireYear = expireYear
        this.code = code
        this.type = type
    }

    getCardName() {
        return this.cardName
    }

    getCardNumber() {
        return this.cardNumber
    }

    getExpireMonth() {
        return this.expireMonth
    }

    getExpireYear() {
        return this.expireYear
    }

    getCode() {
        return this.code
    }

    getType() {
        return this.type
    }

    static Builder = class {
        setCardName(cardName) {
            this.cardName = cardName
            return this
        }

        setCardNumber(cardNumber) {
            this.cardNumber = cardNumber
            return this
        }

        setExpireMonth(expireMonth) {
            this.expireMonth = expireMonth
            return this
        }

        setExpireYear(expireYear) {
            this.expireYear = expireYear
            return this
        }

        setCode(code) {
            this.code = code
            return this
        }

        build() {
            return new Card(this.cardName, this.cardNumber, this.expireMonth, this.expireYear, this.code)
        }
    }
}

export default Card