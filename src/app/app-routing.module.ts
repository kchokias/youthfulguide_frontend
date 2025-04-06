import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MediaComponent } from './pages/media/media.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { GuidesListComponent } from './pages/guide/guides-list/guides-list.component';
import { UserProfileSettingsComponent } from './pages/user/user-profile-settings/user-profile-settings.component';
import { authGuard } from './helpers/auth.guard';
import { GuideProfilePreviewComponent } from './pages/guide/guide-profile-preview/guide-profile-preview.component';
import { AvailabilityComponent } from './pages/shared/availability/availability.component';

const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {path: 'media', component: MediaComponent, canActivate: [authGuard] },
  {path: 'profile-preview', component: GuideProfilePreviewComponent, canActivate: [authGuard] },
  {path: 'profile-settings', component: UserProfileSettingsComponent, canActivate: [authGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  {path: 'bookings', component: GuidesListComponent, canActivate: [authGuard] },
  {path: 'availability', component: AvailabilityComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
