
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../interfaces/supplier.model';

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

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = 'http://localhost:3000/api/suppliers';

  constructor(private http: HttpClient) {}

  // Crear un nuevo proveedor
  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.baseUrl}/create`, supplier);
  }

  // Obtener todos los proveedores
  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/all`);
  }

  // Obtener un proveedor por ID
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un proveedor
  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/update/${id}`, supplier);
  }

  // Eliminar un proveedor
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }


   // Obtener productos más vendidos
   getBestSellingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/carts/reportv/products');
  }


 // Obtener productos por encima del promedio
 getProductsAboveAverage(): Observable<Productop[]> {
  return this.http.get<Productop[]>('http://localhost:3000/api/carts/report/products/above-average');
}
}
