import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'AYUDANTE' | 'EMPLEADO';
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'ADMIN' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com', role: 'AYUDANTE' },
    { id: 3, name: 'Luis Rodríguez', email: 'luis@example.com', role: 'EMPLEADO' }
  ];

  isModalOpen = false;
  selectedEmployee: Employee | null = null;
  selectedRole: string = '';

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes cargar los empleados desde una API si es necesario.
  }

  openEditModal(employee: Employee) {
    this.selectedEmployee = employee;
    this.selectedRole = employee.role;
    this.isModalOpen = true;
  }

  closeEditModal() {
    this.isModalOpen = false;
    this.selectedEmployee = null;
  }

  updateRole() {
 // Aquí puedes realizar una llamada a la API para guardar los cambios.
      alert(`Rol de actualizado a ${this.selectedRole}`);

  }
}