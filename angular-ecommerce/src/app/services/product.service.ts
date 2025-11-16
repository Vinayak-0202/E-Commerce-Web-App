import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
    
    baseUrl: string = 'http://localhost:8080/api/products';  
    categoryUrl: string = 'http://localhost:8080/api/product-category';

    constructor(private httpClient: HttpClient){} 

    getProductList(currentCategoryId:number): Observable<Product[]> {  

        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`;
        console.log('Fetching from URL:', searchUrl);
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(response => {
                console.log('Response received:', response);
                return response._embedded.products;
            })
        ); 
    } 

    getProductCategories(): Observable<ProductCategory[]> {

        return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
            map(response => response._embedded.productCategory)
        );
    }
} 

interface GetResponseProducts {
    _embedded: {
        products: Product[];
    }
}

interface GetResponseProductCategory{
    _embedded: {
        productCategory: ProductCategory[];
    }
}