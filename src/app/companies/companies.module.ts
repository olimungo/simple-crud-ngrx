import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompaniesRoutingModule
  ],
  declarations: [CompaniesComponent]
})
export class CompaniesModule { }
