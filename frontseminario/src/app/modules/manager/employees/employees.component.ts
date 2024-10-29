import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../interfaces/user.model';
import Swal from 'sweetalert2';
interface Employee {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  isModalOpen = false;
  selectedEmployee: Employee | null = null;
  selectedRoleId: number = 0;

  roleNames: { [key: number]: string } = {
    1: 'Administrador',
    2: 'Cliente',
    3: 'Empleado'
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.userService.getAllUsers().subscribe(
      (data) => (this.employees = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id || 3
      }))),
      (error) => console.error('Error al cargar empleados:', error)
    );
  }

  openEditModal(employee: Employee) {
    this.selectedEmployee = employee;
    this.selectedRoleId = employee.role_id;
    this.isModalOpen = true;
  }

  closeEditModal() {
    this.isModalOpen = false;
    this.selectedEmployee = null;
  }

  updateRole() {
    if (this.selectedEmployee) {
      this.userService.updateUserRole(this.selectedEmployee.id, this.selectedRoleId).subscribe(
        () => {
          Swal.fire('Éxito', `Rol de ${this.selectedEmployee?.name} actualizado exitosamente`, 'success');
          this.loadEmployees();
          this.closeEditModal();
        },
        (error) => Swal.fire('Error', 'Error al actualizar el rol', 'error')
      );
    }
  }

  deleteEmployee(id: number, name: string) {
    Swal.fire({
      title: `¿Eliminar a ${name}?`,
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          () => {
            Swal.fire('Eliminado', `${name} ha sido eliminado.`, 'success');
            this.loadEmployees();
          },
          (error) => Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
        );
      }
    });
  }
}