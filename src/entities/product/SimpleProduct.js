import Product from './Product';

class SimpleProduct extends Product {
    constructor(builder) {
        super(
            builder.sku,
            builder.name,
            Product.ProductType.SIMPLE,
            builder.price,
            builder.qty,
            builder.url
        );
    }

    static Builder = class extends Product.Builder {
        build() {
            return new SimpleProduct(this);
        }
    };
}

export default SimpleProduct;