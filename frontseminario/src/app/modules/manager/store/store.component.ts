import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../interfaces/store.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  store: Store | null = null;
  isLoading = true;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => {
        // Suponiendo que solo hay una tienda
        if (stores.length > 0) {
          this.store = stores[0]; // Obteniendo la primera tienda
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Manejo de errores, como mostrar un mensaje de error al usuario
      }
    });
  }

  updateStore() {
    if (this.store) {
      this.storeService.updateStore(this.store.id!, this.store).subscribe({
        next: (updatedStore) => {
          console.log('Tienda actualizada:', updatedStore);
          Swal.fire({
            title: "Actualizado",
            text: "Tienda actualizada:",
            icon: "success"
          });
        },
        error: (err) => {
          console.error('Error al actualizar la tienda:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Error al actualizar la tienda',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      });
    }
  }
}