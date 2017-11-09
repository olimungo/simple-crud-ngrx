import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { Actor } from '../actor.entity';

import * as ActorsActions from '../state/actors.actions';
import * as ActorsReducer from '../state/actors.reducer';

@Component({
  selector: 'feat-actor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ActorEditComponent implements OnInit, OnDestroy {
  id: string;
  firstname: string;
  lastname: string;

  private actorSubscrition: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<ActorsReducer.State>) {
    this.actorSubscrition = this.store.select(ActorsReducer.getSelectedActor).subscribe(actor => {
      this.id = actor ? actor.id : null;
      this.firstname = actor ? actor.firstname : null;
      this.lastname = actor ? actor.lastname : null;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new ActorsActions.Edit(params['id']));
      } else {
        this.store.dispatch(new ActorsActions.Add());
      }
    });
  }

  ngOnDestroy() {
    this.actorSubscrition.unsubscribe();
  }

  save() {
    const actor: Actor = { id: this.id, firstname: this.firstname, lastname: this.lastname };

    if (this.id) {
      this.store.dispatch(new ActorsActions.Update(actor));
    } else {
      this.store.dispatch(new ActorsActions.Create(actor));
    }

    this.backToList();
  }

  cancel() {
    this.store.dispatch(new ActorsActions.Cancel());
    this.backToList();
  }

  delete() {
    this.store.dispatch(new ActorsActions.Delete(this.id));
    this.backToList();
  }

  backToList() {
    this.router.navigate(['actors']);
  }
}
