import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
    id: number;
    name: string;
    description: string;
  }
  

  @Injectable({
    providedIn: 'root',
  })
  export class CategoryService {
    private apiUrl = 'http://localhost:3000/api/categories'; // URL base de la API
  
    constructor(private http: HttpClient) {}
  
    // Crear una nueva categoría
    createCategory(category: Category): Observable<Category> {
      return this.http.post<Category>(`${this.apiUrl}/create`, category);
    }
  
    // Obtener todas las categorías
    getAllCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.apiUrl}/all`);
    }
  
    // Obtener una categoría por ID
    getCategoryById(id: number): Observable<Category> {
      return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }
  
    // Actualizar una categoría existente
    updateCategory(id: number, category: Category): Observable<Category> {
      return this.http.put<Category>(`${this.apiUrl}/update/${id}`, category);
    }
  
    // Eliminar una categoría
    deleteCategory(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
  
// Cambia la firma de este método en CategoryService
    getCategoriesByProductId(productId: number): Observable<{ categories: string[] }> {
        return this.http.get<{ categories: string[] }>(`${this.apiUrl}/productos/${productId}/categorias`);
    }
  
  }