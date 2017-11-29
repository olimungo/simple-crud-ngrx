import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { State, Reducer, Actions } from '../state';
import { Actor } from '../../core/models';

@Component({
  selector: 'feat-actor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ActorEditComponent implements OnInit, OnDestroy {
  id: string;
  firstname: string;
  lastname: string;

  loading: Observable<boolean>;

  private actorSubscrition: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<State>) {
    this.loading = this.store.select(Reducer.getLoading);

    this.actorSubscrition = this.store.select(Reducer.getSelectedActor).subscribe(actor => {
      this.id = actor ? actor.id : null;
      this.firstname = actor ? actor.firstname : null;
      this.lastname = actor ? actor.lastname : null;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new Actions.Edit(params['id']));
      }
    });
  }

  ngOnDestroy() {
    this.actorSubscrition.unsubscribe();
  }

  save() {
    const actor: Actor = { id: this.id, firstname: this.firstname, lastname: this.lastname };

    if (this.id) {
      this.store.dispatch(new Actions.Update(actor));
    } else {
      this.store.dispatch(new Actions.Create(actor));
    }

    this.backToList();
  }

  cancel() {
    this.store.dispatch(new Actions.Cancel());
    this.backToList();
  }

  delete() {
    this.store.dispatch(new Actions.Delete(this.id));
    this.backToList();
  }

  backToList() {
    this.router.navigate(['actors']);
  }
}
