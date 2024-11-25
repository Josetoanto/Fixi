import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { AdminPrincipalComponent } from './pages/admin-principal/admin-principal.component';
import { AdminFixisPageComponent } from './pages/admin-fixis-page/admin-fixis-page.component';
import { AdminClientsComponent } from './pages/admin-clients/admin-clients.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { FixiHomeComponent } from './pages/fixi-home/fixi-home.component';
import { FixiPerfilComponent } from './pages/fixi-perfil/fixi-perfil.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent }, // Ruta para la página principal
    { path: 'categoria/:categoria', component: CategoryPageComponent }, // Ruta dinámica para categorías
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingUpComponent },
  { path: 'homeClient', component: UserHomeComponent },
  { path: 'homeAdmin', component: AdminPrincipalComponent},
  { path: 'fixis', component: AdminFixisPageComponent},
  { path: 'clients', component: AdminClientsComponent},
  { path: 'servicios', component: ServiciosComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'homeProveedor', component: FixiHomeComponent },
  { path: 'perfilFixi', component: FixiPerfilComponent },
  { path: '**', component: ErrorPageComponent},
];
