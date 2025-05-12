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
import { GuideBookingsComponent } from './pages/guide/guide-bookings/guide-bookings.component';
import { TravelerBookingsComponent } from './pages/traveler/traveler-bookings/traveler-bookings.component';
import { roleGuard } from './helpers/role.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { TravelerPreviewComponent } from './pages/traveler/traveler-preview/traveler-preview.component';


const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {path: 'media', component: MediaComponent, canActivate: [authGuard] },
  {path: 'profile-preview', component: GuideProfilePreviewComponent, canActivate: [authGuard], data: { expectedRole: 'guide'} },
  {path: 'visitor-preview', component: TravelerPreviewComponent, canActivate: [authGuard] },
  {path: 'profile-settings', component: UserProfileSettingsComponent, canActivate: [authGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  {path: 'find-a-guide', component: GuidesListComponent, canActivate: [authGuard] },
  {path: 'bookings', component: GuideBookingsComponent, canActivate: [authGuard] },
  {path: 'my-bookings', component: TravelerBookingsComponent, canActivate: [authGuard, roleGuard], data: { expectedRole: 'visitor'} },
  {path: 'availability', component: AvailabilityComponent, canActivate: [authGuard] },
  {path: 'profile-preview/:id', component: GuideProfilePreviewComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
