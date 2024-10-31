import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token?: string;
  id: number;
  name: string;
  email: string;
  role: string;
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

  register(userData: { name: string; email: string; address: string; nit: string; password: string; payment_method: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  } 

  
}
