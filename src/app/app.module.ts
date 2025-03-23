import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { BodyComponent } from './pages/body/body.component';
import { MediaComponent } from './pages/media/media.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './pages/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { BookingsModule } from './pages/bookings/bookings.module';
import { SharedModule } from './pages/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { GuideProfileComponent } from './pages/guide/guide-profile/guide-profile.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityComponent } from './pages/availability/availability.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    MediaComponent,
    SettingsComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    GuideProfileComponent,
    AvailabilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BookingsModule,
    SharedModule,
    OverlayModule,
    CdkMenuModule,
    FullCalendarModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
