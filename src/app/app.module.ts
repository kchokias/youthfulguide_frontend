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
import { SharedModule } from './pages/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { UserProfileSettingsComponent } from './pages/user/user-profile-settings/user-profile-settings.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { GuideModule } from './pages/guide/guide.module';
import { TravelerModule } from './pages/traveler/traveler.module';
import { LoginModule } from './pages/login/login.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { TravelerPreviewComponent } from './pages/traveler/traveler-preview/traveler-preview.component';
import { HelpComponent } from './pages/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    MediaComponent,
    SettingsComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    UserProfileSettingsComponent,
    ResetPasswordComponent,
    TravelerPreviewComponent,
    HelpComponent
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
    GuideModule,
    SharedModule,
    OverlayModule,
    TravelerModule,
    CdkMenuModule,
    LoginModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
