import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './list/list.component';
import { UserCardComponent } from './card/card.component';
import { UserEditComponent } from './edit/edit.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UsersComponent, UsersListComponent, UserCardComponent, UserEditComponent],
  providers: [UsersService]
})
export class UsersModule { }
