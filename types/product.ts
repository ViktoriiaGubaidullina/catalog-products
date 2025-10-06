type ISODateString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;
type EmailString = string;

export interface ProductReview {
    rating: number;
    comment: string;
    date: ISODateString;
    reviewerName: string;
    reviewerEmail: EmailString;
}

export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface ProductMeta {
    createdAt: ISODateString;
    updatedAt: ISODateString;
    barcode: string;
    qrCode: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: ProductDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ProductReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: ProductMeta;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
