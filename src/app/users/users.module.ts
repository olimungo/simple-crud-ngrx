import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './list/list.component';
import { UserCardComponent } from './card/card.component';
import { UserEditComponent } from './edit/edit.component';

import { reducer } from './state/users.reducer';
import { Effects } from './state/users.effects';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([Effects]),
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UsersListComponent, UserCardComponent, UserEditComponent],
  providers: [UsersService]
})
export class UsersModule { }
