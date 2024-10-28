import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Supplier {
  id: number;
  name: string;
  description: string;
  address: string;
}


@Component({
  selector: 'app-supplear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './supplear.component.html',
  styleUrl: './supplear.component.scss'
})
export class SupplearComponent implements OnInit {
  suppliers: Supplier[] = [
    { id: 1, name: 'Proveedor A', description: 'Descripción A', address: 'Dirección A' },
    { id: 2, name: 'Proveedor B', description: 'Descripción B', address: 'Dirección B' }
  ];

  isModalOpen = false;
  selectedSupplier: Supplier | null = null;
  supplierData: Supplier = { id: 0, name: '', description: '', address: '' };

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes cargar los proveedores desde una API si es necesario.
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
      const index = this.suppliers.findIndex(s => s.id);
      if (index !== -1) {
        this.suppliers[index] = { ...this.supplierData };
      }
    } else {
      // Agregar proveedor
      this.supplierData.id = this.suppliers.length + 1; // Asignar un nuevo ID
      this.suppliers.push({ ...this.supplierData });
    }
    
    // Cerrar el modal y mostrar un mensaje de éxito
    this.closeModal();
    alert('Proveedor guardado con éxito.');
  }
  

  deleteSupplier(id: number) {
    this.suppliers = this.suppliers.filter(s => s.id !== id);
    alert('Proveedor eliminado con éxito.');
  }
}