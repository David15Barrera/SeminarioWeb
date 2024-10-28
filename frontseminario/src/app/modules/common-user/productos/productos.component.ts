import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
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

  constructor(private productService: ProductService) {} // Inyectar el servicio

  ngOnInit() {
    this.loadProducts(); // Llamar a la función para cargar los productos
    // Datos falsos de categorías
    this.categories = [
      { id: 1, name: 'Tecnología' },
      { id: 2, name: 'Hogar' },
      { id: 3, name: 'Ropa' },
    ];
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      // Filtrar solo los productos que tienen el estado 'AVAILABLE'
      this.products = data.filter(product => product.status === 'AVAILABLE');
      this.filteredProducts = this.products; // Inicializar filteredProducts
    }, error => {
      console.error('Error al cargar productos:', error); // Manejo de errores
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

  onCategoryChange(categoryId: number) {

  }

  addToCart(product: Product) {
    console.log('Servicio agregado al carrito:', product);
  }

  trackByIndex(index: number, item: Product): number {
    return index;
  }  
}
