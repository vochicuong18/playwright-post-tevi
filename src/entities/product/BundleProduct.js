import Product from './Product';

class BundleProduct extends Product {
    constructor(builder) {
        super(builder.sku, builder.name, Product.ProductType.BUNDLE, builder.price, builder.qty, builder.url);
        this.bundleItems = builder.bundleItems || [];
    }

    static Builder = class extends Product.Builder {
        constructor() {
            super();
            this.bundleItems = [];
        }

        setListProducts(bundleItems) {
            this.bundleItems = bundleItems;
            return this;
        }

        build() {
            return new BundleProduct(this);
        }
    };

    static builder() {
        return new this.Builder();
    }

    getListProducts() {
        return this.bundleItems;
    }

    setListProducts(bundleItems) {
        this.bundleItems = bundleItems;
    }
}

export default BundleProduct;