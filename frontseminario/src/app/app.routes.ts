import { Routes } from '@angular/router';
import { AuthNavComponent } from './shared/components/auth-nav/auth-nav.component';
import { ManamanagerNavComponent } from './shared/components/manamanager-nav/manamanager-nav.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

export const routes: Routes = [
    {
        path:'session',
        component: AuthNavComponent,
        loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path:'user',
        component: NavbarComponent,
        loadChildren: () => import('./modules/common-user/common-user.module').then(m =>m.CommonUserModule)
    },
    {
        path:'manager',
        component: ManamanagerNavComponent,
        loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)
    },
    {
        path: "",
        redirectTo: "session/login",
        pathMatch: 'full'
    },
];
