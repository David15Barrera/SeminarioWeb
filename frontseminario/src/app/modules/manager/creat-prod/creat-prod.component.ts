import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id?: number; // id opcional
  name: string;
  description: string;
  price: number;
  available_quantity: number;
  status: 'HIDDEN' | 'DELETED' | 'OUT_OF_STOCK' | 'AVAILABLE';
  created_at?: string; // created_at opcional
  image_url: string;
  supplier_id: number;
}

interface ProductCreationData {
  name: string;
  description: string;
  price: number;
  available_quantity: number;
  status: 'HIDDEN' | 'DELETED' | 'OUT_OF_STOCK' | 'AVAILABLE';
  image_url: string;
  supplier_id: number;
}


@Component({
  selector: 'app-creat-prod',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creat-prod.component.html',
  styleUrl: './creat-prod.component.scss'
})
export class CreatProdComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    available_quantity: 0,
    status: 'AVAILABLE',
    image_url: '',
    supplier_id: 1, // Puedes ajustar el supplier_id según tus necesidades
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit(): void {
    const productData: ProductCreationData = { ...this.product };
    
    this.productService.createProduct(productData).subscribe(
      () => {
        console.log('Producto creado exitosamente');
        this.router.navigate(['/manager/productos']); // Redirige a la lista de productos
      },
      (error) => console.error('Error al crear el producto:', error)
    );
  }
  
  
  
}
