import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
// services
import { InterceptorService } from './_services/interceptor.service';
import { UserService } from './_services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { DailyReportComponent } from './home/daily-report/daily-report.component';
import { Constants } from './app.config';
import { ReportGridComponent } from './home/report-grid/report-grid.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgetpasswordComponent,
    DailyReportComponent,
    ReportGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [UserService,Constants,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }], //
  bootstrap: [AppComponent]
})
export class AppModule { }
