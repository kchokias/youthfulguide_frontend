import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MediaComponent } from './pages/media/media.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { authGuard } from './helpers/auth.guard';
import { GuideProfileComponent } from './pages/guide/guide-profile/guide-profile.component';

const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {path: 'media', component: MediaComponent, canActivate: [authGuard] },
  {path: 'profile-preview', component: GuideProfileComponent, canActivate: [authGuard] },
  {path: 'profile-settings', component: UserProfileComponent, canActivate: [authGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  {path: 'bookings', component: BookingsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
