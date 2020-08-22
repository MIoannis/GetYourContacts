import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ContactPageComponent } from './contactpage/contact.page.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/authorization' },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'contacts', component: ContactPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
