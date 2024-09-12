export default class StringUtility {
    static removeLines(str) {
        return str.split(/\r?\n|\r/).filter(Boolean).join('');
    }

    static removeRedundantCharacter(str, redundant) {
        return str.split(redundant).filter(Boolean).join(' ');
    }

    // convert Object to String

    static async getText(element) {
        let data = await element.textContent()
        data = this.removeLines(data)
        return this.removeRedundantCharacter(data, '  ')
    }

    static async convertPriceToString(price) {
        return `HK$${parseFloat(price).toFixed(2)}`;
    }
}