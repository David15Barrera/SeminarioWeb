import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  supplier_id: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.scss'
})
export class VerProductosComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1; // Cantidad a agregar
  categories: string[] = []; // Cambia a un arreglo de strings
  userId: number | null = null; // ID del usuario

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUserId();
    const id = this.route.snapshot.paramMap.get('idproduct');
    if (id) {
      this.loadProduct(+id);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'ID no encontrado',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  }

  // Cargar el ID del usuario desde el localStorage
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

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
        this.loadCategories(this.product.id); // Carga las categorías después de obtener el producto
      },
      error => {
        console.error('Error al cargar el producto:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error al cargar el producto',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    );
  }

  // Método para cargar las categorías asociadas al producto
  loadCategories(productId: number) {
    this.categoryService.getCategoriesByProductId(productId).subscribe(
      (data: { categories: string[] }) => {
        this.categories = data.categories || []; // Asigna las categorías directamente
      },
      error => {
        console.error('Error al cargar las categorías:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error al cargar las categorías',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    );
  }

  addToCart() {
    if (this.product && this.userId !== null) {
      this.cartService.addProductToCart(this.userId, this.product, this.quantity).subscribe(
        () => {
          Swal.fire({
            title: 'Agregado al carrito',
            text: `El producto se añadido al carrito.`,
            icon: 'success',
            confirmButtonText: 'Cool'
          });
        },
        error => {
          console.error('Error al agregar al carrito:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Error al agregar el producto al carrito',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
      );
    } else {
      console.warn('Producto o userId no disponible para agregar al carrito.');
    }
  }
}