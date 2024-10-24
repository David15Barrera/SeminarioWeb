import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js';

const router = express.Router();


router.post('/create', createSupplier); // Ruta para crear un nuevo proveedor
router.get('/all', getAllSuppliers); // Ruta para obtener todos los proveedores
router.get('/:id', getSupplierById); // Ruta para obtener un proveedor por ID
router.put('/update/:id', updateSupplier); // Ruta para actualizar un proveedor
router.delete('/delete/:id', deleteSupplier); // Ruta para eliminar un proveedor

export default router;
