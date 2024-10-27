import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { EditProductosComponent } from './edit-productos/edit-productos.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProductosComponent } from './productos/productos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'edit-product/:idProduct', component: EditProductosComponent
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
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
