import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available_quantity: number;
  status: 'HIDDEN' | 'DELETED' | 'OUT_OF_STOCK' | 'AVAILABLE';
  created_at: string;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    // Datos falsos de categorías
    this.categories = [
      { id: 1, name: 'Tecnología' },
      { id: 2, name: 'Hogar' },
      { id: 3, name: 'Ropa' },
    ];
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
        this.products = data;
        this.filteredProducts = this.products;
    }, error => {
        console.error('Error al cargar productos:', error);
    });
}


  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(query));
  }

  onFilterChange(filter: string) {
    if (filter === 'available') {
      this.filteredProducts = this.products.filter(product => product.status === 'AVAILABLE');
    } else {
      this.filteredProducts = this.products;
    }
  }


  addToCart(product: Product) {

  }
   
  trackByIndex(index: number, item: Product): number {
    return index;
  }
}
