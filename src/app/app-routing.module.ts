import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UploadsComponent } from './dashboard/uploads/uploads.component';
import { HelpComponent } from './dashboard/help/help.component';
import { VinComponent } from './dashboard/vin/vin.component';
import { DealersComponent } from './dashboard/dealers/dealers.component';
import { VioGeneralComponent } from './dashboard/home/vio-general/vio-general.component';
import { VioUwComponent } from './dashboard/home/vio-uw/vio-uw.component';
import { UsersComponent } from './dashboard/users/users.component';
import { ListUserComponent } from './dashboard/users/list-user/list-user.component';
import { CreateUserComponent } from './dashboard/users/create-user/create-user.component';
import { DealerComponent } from './dealer/dealer.component';
import { AuthGuardService} from './services/auth-guard.service';
import { ManagerGuardService } from './services/manager-guard.service';
import { GeneralVioComponent } from './dealer/general-vio/general-vio.component';
import { BillingComponent } from './dealer/billing/billing.component';
import { SearchVinComponent } from './dealer/search-vin/search-vin.component';
import { BigDataComponent } from './dealer/big-data/big-data.component';
import { UpLoadsComponent } from './dealer/up-loads/up-loads.component';
import { LoadMaintenanceComponent } from './load-maintenance/load-maintenance.component';
import { AdviserComponent } from './adviser/adviser.component';
import { ClServiceComponent } from './adviser/cl-service/cl-service.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { ServiceClinicComponent } from './dashboard/service-clinic/service-clinic.component';
import { CreateClicnicComponent } from './dashboard/service-clinic/create-clicnic/create-clicnic.component';
import { ListClinicComponent } from './dashboard/service-clinic/list-clinic/list-clinic.component';
import { ClinicDatailsComponent } from './dashboard/service-clinic/clinic-datails/clinic-datails.component';
import { ClinicFormComponent } from './adviser/cl-service/clinic-form/clinic-form.component';
import { ReportClinicComponent } from './dashboard/service-clinic/report-clinic/report-clinic.component';
import { HomeAdviserComponent } from './adviser/home-adviser/home-adviser.component';
import { KascComponent } from './dashboard/home/kasc/kasc.component';
import { DcsiComponent } from './dashboard/uploads/dcsi/dcsi.component';
import { TermsComponent } from './login/terms/terms.component';
import { CrmReportComponent } from './dashboard/home/crm-report/crm-report.component';
import { SatisfactionSlideComponent } from './dashboard/home/satisfaction-slide/satisfaction-slide.component';
import { KacsDealerSlideComponent } from './dashboard/home/kacs-dealer-slide/kacs-dealer-slide.component';
import { KacsResultSlideComponent } from './dashboard/home/kacs-result-slide/kacs-result-slide.component';
import { LoyaltyDealerSlideComponent } from './dashboard/home/loyalty-dealer-slide/loyalty-dealer-slide.component';
import { CrmResultSlideComponent } from './dashboard/home/crm-result-slide/crm-result-slide.component';
import { FrftDealerSlideComponent } from './dashboard/home/frft-dealer-slide/frft-dealer-slide.component';

const routes: Routes= [
  { path:'login', component: LoginComponent},
  { path:'terms', component:TermsComponent},
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'dealer', component:DealerComponent, canActivate:[AuthGuardService], children:[
    { path:'generalvio', component:GeneralVioComponent },
    { path:'billing', component:BillingComponent },
    { path:'search', component:SearchVinComponent },
    { path:'bigdata', component:BigDataComponent },
    { path:'uploads', component:UpLoadsComponent},
    { path:'uploadMaintenance', component:LoadMaintenanceComponent},
    { path:'', redirectTo:'generalvio', pathMatch:'full'}
  ]},
  { path:'dashboard', component: DashboardComponent, canActivate:[ManagerGuardService], children:[
    { path:'', redirectTo:'menu', pathMatch:'full'},
    { path:'menu', component:MenuComponent},
    { path:'dealers', component: DealersComponent},
    { path:'users', component: UsersComponent, children: [
      { path:'', redirectTo:'listuser', pathMatch:'full' },
      { path:'listuser', component: ListUserComponent },
      { path:'createuser', component: CreateUserComponent }
    ] },
    { path:'home', component:HomeComponent, children: [
      { path:'yearModel', component: VioGeneralComponent },
      { path:'general', component: VioUwComponent },
      { path:'kasc', component:KascComponent},
      { path:'crmreport', component:CrmReportComponent},
      { path:'satisfactionSlide', component:SatisfactionSlideComponent},
      { path:'kacsDealerSlide', component:KacsDealerSlideComponent },
      { path:'kacsResultSlide', component:KacsResultSlideComponent },
      { path:'loyaltyDealerSlide', component:LoyaltyDealerSlideComponent },
      { path:'crmResultSlide', component:CrmResultSlideComponent },
      { path:'frftDealerSlide', component:FrftDealerSlideComponent },
      { path:'', redirectTo:'kacsDealerSlide', pathMatch:'full'}
    ] },
    { path:'upload', component: UploadsComponent, children:[
      { path:'dcsi', component:DcsiComponent},
      { path:'', redirectTo:'dcsi', pathMatch:'full'}
    ] },
    { path:'help', component:HelpComponent },
    { path:'vin', component:VinComponent },
    { path:'serviceClinic', component:ServiceClinicComponent, children:[
      { path:'createclinic', component:CreateClicnicComponent},
      { path:'listclinic', component:ListClinicComponent},
      { path:'clinicdetails/:id', component:ClinicDatailsComponent},
      { path:'reportClinic', component:ReportClinicComponent},
      { path:'', redirectTo:'listclinic', pathMatch:'full'}
    ]}
  ] },
  { path:'adviser', component: AdviserComponent, canActivate:[AuthGuardService], children: [
    { path:'clinicaServicio', component:ClServiceComponent},
    { path:'clinicform/:id', component:ClinicFormComponent},
    { path:'home', component: HomeAdviserComponent},
    { path:'', redirectTo:'home', pathMatch:'full'}
  ]}

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
