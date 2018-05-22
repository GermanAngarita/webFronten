import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { Moment } from 'moment';

import { HttpClientModule } from '@angular/common/http';

import { VinsService } from './services/vins.service';
import { VioService } from './services/vio.service';
import { DealerService } from './services/dealer.service';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UploadsComponent } from './dashboard/uploads/uploads.component';
import { HelpComponent } from './dashboard/help/help.component';
import { VinComponent } from './dashboard/vin/vin.component';
import { DealersComponent } from './dashboard/dealers/dealers.component';
import { VioGeneralComponent } from './dashboard/home/vio-general/vio-general.component';
import { ModelService } from './services/model.service';
import { VioUwComponent } from './dashboard/home/vio-uw/vio-uw.component';
import { UsersComponent } from './dashboard/users/users.component';
import { CreateUserComponent } from './dashboard/users/create-user/create-user.component';
import { ListUserComponent } from './dashboard/users/list-user/list-user.component';
import { UserService } from './services/user.service';
import { AuthServiceService } from './services/auth-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DealerComponent } from './dealer/dealer.component';
import { ManagerGuardService } from './services/manager-guard.service';
import { GeneralVioComponent } from './dealer/general-vio/general-vio.component';
import { BillingComponent } from './dealer/billing/billing.component';
import { SearchVinComponent } from './dealer/search-vin/search-vin.component';
import { BigDataComponent } from './dealer/big-data/big-data.component';
import { UpLoadsComponent } from './dealer/up-loads/up-loads.component';
import { LoadMaintenanceComponent } from './load-maintenance/load-maintenance.component';
import { TicketService } from './services/ticket.service';
import { AdviserComponent } from './adviser/adviser.component';
import { ClServiceComponent } from './adviser/cl-service/cl-service.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { ServiceClinicComponent } from './dashboard/service-clinic/service-clinic.component';
import { CreateClicnicComponent } from './dashboard/service-clinic/create-clicnic/create-clicnic.component';
import { ClinicService } from './services/clinic.service';
import { ListClinicComponent } from './dashboard/service-clinic/list-clinic/list-clinic.component';
import { ClinicDatailsComponent } from './dashboard/service-clinic/clinic-datails/clinic-datails.component';
import { ClinicFormComponent } from './adviser/cl-service/clinic-form/clinic-form.component';
import { ReportClinicComponent } from './dashboard/service-clinic/report-clinic/report-clinic.component';
import { HomeAdviserComponent } from './adviser/home-adviser/home-adviser.component';
import { KascComponent } from './dashboard/home/kasc/kasc.component';
import { CrmsurveysService } from './services/crmsurveys.service';
import { ComboChartComponent, ComboSeriesVerticalComponent} from './dashboard/home/kasc/combo-chart';
import { DcsiComponent } from './dashboard/uploads/dcsi/dcsi.component';
import { TermsComponent } from './login/terms/terms.component';
import { CrmReportComponent } from './dashboard/home/crm-report/crm-report.component';
import { SatisfactionSlideComponent } from './dashboard/home/satisfaction-slide/satisfaction-slide.component';
import { KacsDealerSlideComponent } from './dashboard/home/kacs-dealer-slide/kacs-dealer-slide.component';
import { KacsResultSlideComponent } from './dashboard/home/kacs-result-slide/kacs-result-slide.component';
import { LoyaltyDealerSlideComponent } from './dashboard/home/loyalty-dealer-slide/loyalty-dealer-slide.component';
import { CrmResultSlideComponent } from './dashboard/home/crm-result-slide/crm-result-slide.component';
import { FrftDealerSlideComponent } from './dashboard/home/frft-dealer-slide/frft-dealer-slide.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    UploadsComponent,
    HelpComponent,
    VinComponent,
    DealersComponent,
    VioGeneralComponent,
    VioUwComponent,
    UsersComponent,
    CreateUserComponent,
    ListUserComponent,
    DealerComponent,
    GeneralVioComponent,
    BillingComponent,
    SearchVinComponent,
    BigDataComponent,
    UpLoadsComponent,
    LoadMaintenanceComponent,
    AdviserComponent,
    ClServiceComponent,
    MenuComponent,
    ServiceClinicComponent,
    CreateClicnicComponent,
    ListClinicComponent,
    ClinicDatailsComponent,
    ClinicFormComponent,
    ReportClinicComponent,
    HomeAdviserComponent,
    KascComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    DcsiComponent,
    TermsComponent,
    CrmReportComponent,
    SatisfactionSlideComponent,
    KacsDealerSlideComponent,
    KacsResultSlideComponent,
    LoyaltyDealerSlideComponent,
    CrmResultSlideComponent,
    FrftDealerSlideComponent
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    MomentModule,
    NgbModule.forRoot()
    
  ],
  providers: [
    {provide:LocationStrategy, useClass:HashLocationStrategy},
    CrmsurveysService,
    ManagerGuardService,
    AuthServiceService,
    AuthGuardService,
    VinsService,
    DealerService,
    VioService,
    ModelService,
    UserService,
    TicketService,
    ClinicService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
