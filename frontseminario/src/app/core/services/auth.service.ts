import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token?: string; // si manejas el token
  id: number; // id del usuario
  name: string; // nombre del usuario
  email: string; // email del usuario
  role: string; // rol del usuario
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; // URL de tu API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem('user'); // Elimina el usuario del localStorage
  }
}
