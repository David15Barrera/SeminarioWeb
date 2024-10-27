import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarritoComponent } from './carrito/carrito.component';
import { ChatComponent } from './chat/chat.component';
import { FacturasComponent } from './facturas/facturas.component';
import { PagosComponent } from './pagos/pagos.component';
import { ProductosComponent } from './productos/productos.component';
import { SettingsComponent } from './settings/settings.component';
import { VerProductosComponent } from './ver-productos/ver-productos.component';

const routes: Routes = [
  {
    path: 'carrito', component: CarritoComponent
  },
  {
    path: 'chat', component: ChatComponent
  },
  {
    path: 'facturas', component: FacturasComponent
  },
  {
    path: 'pagos', component: PagosComponent
  },
  {
    path: 'productos', component: ProductosComponent
  },
  {
    path: 'configuracion', component: SettingsComponent
  },
  {
    path:'ver-productos/:idproduct', component: VerProductosComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonUserRoutingModule { }
