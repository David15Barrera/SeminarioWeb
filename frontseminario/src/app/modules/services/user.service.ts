import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../manager/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) {}
  
    // Crear un usuario
    createUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiUrl}/create`, user);
    }
  
    // Obtener todos los usuarios
    getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/all`);
    }
  
    // Obtener un usuario por ID
    getUserById(id: number): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/search/${id}`);
    }
  
    // Actualizar un usuario
    updateUser(id: number, user: Partial<User>): Observable<User> {
      return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
    }
  
    // Eliminar un usuario
    deleteUser(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
     // Actualizar el rol de un usuario
  updateUserRole(id_user: number, role_id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updaterole/${id_user}`, { role_id });
  }
}
