// store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../manager/interfaces/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/store'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Crear una nueva tienda
  createStore(store: Store): Observable<Store> {
    return this.http.post<Store>(this.apiUrl, store);
  }

  // Obtener todas las tiendas
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  // Obtener una tienda por ID
  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una tienda
  updateStore(id: number, store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.apiUrl}/${id}`, store);
  }

  // Eliminar una tienda
  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
