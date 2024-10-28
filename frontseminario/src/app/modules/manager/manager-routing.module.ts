import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { EditProductosComponent } from './edit-productos/edit-productos.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProductosComponent } from './productos/productos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SettingsComponent } from './settings/settings.component';
import { SupplearComponent } from './supplear/supplear.component';
import { CreatProdComponent } from './creat-prod/creat-prod.component';
import path from 'path';

const routes: Routes = [
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'edit-product/:idProduct', component: EditProductosComponent
  },{
    path: 'create-product', component: CreatProdComponent
  },
  {
    path: 'empleados', component: EmployeesComponent
  },
  {
    path: 'productos', component: ProductosComponent
  },
  {
    path: 'Reportes', component: ReportesComponent
  },
  {
    path:'configuracion', component: SettingsComponent
  },
  {
    path:'proveedores', component: SupplearComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
