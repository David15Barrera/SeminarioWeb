import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
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
  userId: number | null = null;
  
  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadUserId(); // Asegúrate de llamar a esta función
    // Datos falsos de categorías
    this.categories = [
      { id: 1, name: 'Tecnología' },
      { id: 2, name: 'Hogar' },
      { id: 3, name: 'Ropa' },
    ];
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data.filter(product => product.status === 'AVAILABLE');
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

  loadUserId() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.id) {
        this.userId = storedUser.id;
      } else {
        console.error('No se encontró el usuario en el localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  addToCart(product: Product) {
    if (this.userId !== null) {
      this.cartService.addProductToCart(this.userId, product, 1).subscribe((cartItem) => {
        console.log('Producto agregado al carrito:', cartItem);
        Swal.fire({
          title: 'Agregado al carrito',
          text: `El producto se añadió al carrito.`,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      }, error => {
        console.error('Error al agregar producto al carrito:', error);
        Swal.fire({
          title: 'Error al carrito',
          text: `El producto no se añadió al carrito.`,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesión para agregar productos al carrito.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }
   
  trackByIndex(index: number, item: Product): number {
    return index;
  }
}
