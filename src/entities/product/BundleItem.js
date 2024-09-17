import Product from "./Product";

class BundleItem extends Product {
    static Type = Object.freeze({
        CHECKBOX: 'CHECKBOX',
        NONE: 'NONE',
    });

    constructor(sku, name, price, qty, url, label, bundleItemType) {
        super(sku, name, Product.ProductType.BUNDLE_ITEM, price, qty, url);
        this.label = label;
        this.bundleItemType = bundleItemType;
    }

    getLabel() {
        return this.label;
    }

    getBundleItemType() {
        return this.bundleItemType;
    }

    static Builder = class extends Product.Builder {
        label;
        bundleItemType = BundleItem.Type.NONE; // Mặc định là NONE

        setLabel(label) {
            this.label = label;
            return this;
        }

        setBundleItemType(type) {
            this.bundleItemType = type;
            return this;
        }

        build() {
            return new BundleItem(
                this.sku,
                this.name,
                this.price,
                this.qty,
                this.url,
                this.label,
                this.bundleItemType // Truyền bundleItemType khi tạo instance
            );
        }
    };
}

export default BundleItem;