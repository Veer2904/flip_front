export interface Product {
  // [x: string]: product;
  ProductID: number;
  Title: string;
  Description?: string;
  Price: number;
  DiscountPrice?: number;
  Stock?: number;
  Brand?: string;
  ImageUrl?: string;
  Rating?: number;
  ReviewsCount?: number;
  Category?: string;
}
