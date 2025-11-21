import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';            // ← correct import
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';  
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product!: Product 
 

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  } 

  handleProductDetails() {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe({
      next: (data:Product) => {
        this.product = data;
      }
    });
  }
  
}
