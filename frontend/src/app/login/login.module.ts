import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
const appRoutes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  declarations: []
})
export class LoginModule {}
