export default class PriceUtility {
    static async convertPriceToString(price) {
        return `HK$${parseFloat(price).toFixed(2)}`;
    }
}