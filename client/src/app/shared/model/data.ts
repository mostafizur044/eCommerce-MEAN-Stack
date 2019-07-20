export class Product {
    _id?: string;
    ProductName: string;
    ProductShotCode: string = '';
    Category: string;
    Price: number;
    Quantity: number;
    Description: string;
    IsBestAchived: boolean = false;
    Origin: string;
    ImageLink: string;
    cartQty?: number;
}