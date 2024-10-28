import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
@Component({
  selector: 'app-edit-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-productos.component.html',
  styleUrl: './edit-productos.component.scss'
})
export class EditProductosComponent implements OnInit {
  product: Product | any = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('idProduct'));
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data) => (this.product = data),
        (error) => console.error('Error al cargar el producto:', error)
      );
    } else {
      console.error('No se encontró un ID de producto válido en la URL');
      Swal.fire({
        title: 'Error!',
        text: 'No se encontro ID de producto valido en la URL',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  }
  

  onSubmit(): void {
    if (this.product && this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        () => {
          Swal.fire({
            title: 'Éxito',
            text: 'Producto actualizado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/manager/productos']); // Redirige a la lista de productos después de cerrar el SweetAlert
          });
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el producto',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo',
          });
        }
      );
    }
  }
}