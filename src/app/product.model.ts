export interface Product {
  id? : number;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  category?: Category;
seller?: { id: number, name?: string, email?: string };
}

export interface Category {
  id: number;
  name: string;
}