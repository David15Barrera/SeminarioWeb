import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierService } from '../../services/supplier.service';
import { UserService } from '../../services/user.service';
import { User } from '../interfaces/user.model';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart.model';
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


interface Productop {
  productId: number;         // Cambia 'id' a 'productId'
  productName: string;       // Cambia 'name' a 'productName'
  totalSold: string;         // Cambia 'available_quantity' a 'totalSold'
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
  startDate: string = ''; // Inicializa como cadena vacía
  endDate: string = '';   // Inicializa como cadena vacía
  allProducts: Product[] = [];  // Para almacenar todos los productos
  filteredProductsByDate: Product[] = []; // Productos filtrados por rango de fechas
  aboveAverageProducts: Productop[] = [];
  allUsers: User[] = []; // Para almacenar todos los usuarios
  registeredUsers: User[] = []; 
  filteredUsers: User[] = []
  completedCarts: { id: number, total: number, tax: number }[] = [];
  totalSales: number = 0;
  cancelledCarts: Cart[] = [];
  constructor(private productService: ProductService, private SupplierService: SupplierService, private userService: UserService, private cartService: CartService) {}


  employees = [
    { id: 1, name: 'Juan Pérez', department: 'Ventas', email: 'juan.perez@empresa.com' },
    { id: 2, name: 'María López', department: 'Marketing', email: 'maria.lopez@empresa.com' },
    { id: 5, name: 'Luis Martínez', department: 'Finanzas', email: 'luis.martinez@empresa.com' },
  ];

  ngOnInit() {
    this.loadAllProducts();
    this.loadProductsAboveAverage();
    this.loadAllUsers();
    this.loadCompletedCarts();
  }

  loadCompletedCarts(): void {
    this.cartService.getAllCarts().subscribe(carts => {
        // Filtramos los carritos completados
        this.completedCarts = carts
            .filter(cart => cart.status === 'COMPLETED')
            .map(cart => ({
                id: cart.id,
                total: Number(cart.total), // Asegúrate de que sea un número
                tax: Number(cart.tax)      // Asegúrate de que sea un número
            }));
        this.calculateTotalSales();
    });
}

loadCancellCarts(): void {
  this.cartService.getAllCarts().subscribe(carts => {
      // Filtramos los carritos completados
      this.cancelledCarts
          .filter(cart => cart.status === 'CANCELLED_ERROR')
          .map(cart => ({
              id: cart.id,
              total: Number(cart.total), // Asegúrate de que sea un número
              tax: Number(cart.tax),      // Asegúrate de que sea un número
              description_error: cart.description_error,
              user_id: cart.user_id
              }));
      this.calculateTotalSales();
  });
}

    calculateTotalSales(): void {
        this.totalSales = this.completedCarts.reduce((acc, cart) => acc + cart.total, 0);
    }


  
  loadAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
      this.filterUsersByRole();
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  filterUsersByRole() {
    // Filtra a los usuarios con role_id 1 (Administrador), 2 (Cliente) y 3 (Empleado)
    this.filteredUsers = this.allUsers.filter(user => 
      user.role_id === 1 || user.role_id === 2 || user.role_id === 3
    );
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Cliente';
      case 3:
        return 'Empleado';
      default:
        return 'Desconocido';
    }
  }
  

  getProductsByDateRange() {
    // Filtrar productos dentro del rango de fechas
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    this.filteredProductsByDate = this.allProducts.filter(product => {
      const createdAt = new Date(product.created_at);
      return createdAt >= start && createdAt <= end;  // Compara fechas
    });
  }

  loadBestSellingProducts() {
    this.SupplierService.getBestSellingProducts().subscribe(data => {
      this.allProducts = data; // Almacena los productos más vendidos
    });
  }

  loadProductsAboveAverage() {
    this.SupplierService.getProductsAboveAverage().subscribe(data => {
      this.aboveAverageProducts = data; // Almacena productos por encima del promedio
    });
  }

  
}