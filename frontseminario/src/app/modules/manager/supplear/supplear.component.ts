import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../interfaces/supplier.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-supplear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './supplear.component.html',
  styleUrl: './supplear.component.scss'
})
export class SupplearComponent implements OnInit {
  suppliers: Supplier[] = [];
  isModalOpen = false;
  selectedSupplier: Supplier | null = null;
  supplierData: Supplier = { id: 0, name: '', description: '', address: '' };

  constructor(private supplierService: SupplierService) {} // Inyecta el servicio

  ngOnInit(): void {
    this.loadSuppliers(); // Cargar proveedores al iniciar el componente
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data; // Asignar la respuesta a suppliers
      },
      (error) => {
        console.error('Error al cargar proveedores:', error);
      }
    );
  }

  openAddModal() {
    this.selectedSupplier = null;
    this.supplierData = { id: 0, name: '', description: '', address: '' }; // Resetear los campos
    this.isModalOpen = true;
  }

  openEditModal(supplier: Supplier) {
    this.selectedSupplier = supplier;
    this.supplierData = { ...supplier }; // Clonar los datos del proveedor
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedSupplier = null;
  }

  saveSupplier() {
    if (this.selectedSupplier) {
      // Editar proveedor
      this.supplierService.updateSupplier(this.selectedSupplier.id, this.supplierData).subscribe(
        (updatedSupplier) => {
          const index = this.suppliers.findIndex(s => s.id === updatedSupplier.id);
          if (index !== -1) {
            this.suppliers[index] = updatedSupplier; // Actualizar el proveedor en la lista
          }
          this.closeModal();

          Swal.fire({
            title: "Good job!",
            text: "Proveedor Actualizado con éxito.",
            icon: "success"
          });
        },
        (error) => {
          console.error('Error al actualizar el proveedor:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Error al actualizar el proveedor',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
    } else {
      // Agregar proveedor
      this.supplierService.createSupplier(this.supplierData).subscribe(
        (newSupplier) => {
          this.suppliers.push(newSupplier); // Agregar el nuevo proveedor a la lista
          this.closeModal();
          Swal.fire({
            title: "Good job!",
            text: "Proveedor agregado con éxito.",
            icon: "success"
          });
        },
        (error) => {
          console.error('Error al agregar el proveedor:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Error al agregar el proveedor',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
    }
  }

  deleteSupplier(id: number) {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        this.suppliers = this.suppliers.filter(s => s.id !== id); // Eliminar de la lista
        Swal.fire({
          title: "Good job!",
          text: "Proveedor eliminado con éxito.",
          icon: "success"
        });
      },
      (error) => {
        console.error('Error al eliminar el proveedor:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error al eliminar el proveedor:',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    );
  }
}