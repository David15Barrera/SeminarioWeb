import { Router } from 'express';
import {
    createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore
} from '../controllers/storeController.js';

const router = Router();

// Rutas para la tienda
router.post('/', createStore); // Crear tienda
router.get('/', getStores); // Obtener todas las tiendas
router.get('/:id', getStoreById); // Obtener una tienda por ID
router.put('/:id', updateStore); // Actualizar una tienda
router.delete('/:id', deleteStore); // Eliminar una tienda

export default router;
