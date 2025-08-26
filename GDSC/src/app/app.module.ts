import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Core Module
import { CoreModule } from './core/core.module';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Feature Modules
import { AuthModule } from './features/auth/auth.module';
import { AdminModule } from './features/admin/admin.module';
import { ExaminerModule } from './features/examiner/examiner.module';
import { CandidateModule } from './features/candidate/candidate.module';
import { CentreModule } from './features/centre/centre.module';
import { CertificationModule } from './features/certification/certification.module';

// Pages Module
import { PagesModule } from './pages/pages.module';

// App Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    
    // Core & Shared
    CoreModule,
    SharedModule,
    
    // Feature Modules
    AuthModule,
    AdminModule,
    ExaminerModule,
    CandidateModule,
    CentreModule,
    CertificationModule,
    
    // Pages Module
    PagesModule,
    
    // App Routing
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
