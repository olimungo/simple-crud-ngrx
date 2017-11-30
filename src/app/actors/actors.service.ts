import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'uuid';

import 'rxjs/add/operator/delay';

import { environment } from '../../environments/environment';
import { Actor } from '../core/models';

@Injectable()
export class ActorsService {
  private targetCreate: any;
  private targetRetrieve: any;
  private targetUpdate: any;
  private targetDelete: any;

  constructor(private http: Http) {
    if (environment.production) {
      this.targetCreate = this.createFirebase;
      this.targetRetrieve = this.retrieveFirebase;
      this.targetUpdate = this.updateFirebase;
      this.targetDelete = this.deleteFirebase;
    } else {
      this.targetCreate = this.createLocal;
      this.targetRetrieve = this.retrieveLocal;
      this.targetUpdate = this.updateLocal;
      this.targetDelete = this.deleteLocal;
    }
  }

  create(actor: Actor): Observable<any> {
    return this.targetCreate(actor);
  }

  retrieve(): Observable<Actor[]> {
    return this.targetRetrieve();
  }

  update(actor: Actor): Observable<any> {
    return this.targetUpdate(actor);
  }

  delete(id: string): Observable<any> {
    return this.targetDelete(id);
  }

  createLocal(actor: Actor) {
    const newActor = { ...actor, id: uuid() };

    return this.http.post(`${environment.backEnd}/actors`, newActor).map(() => newActor);
  }

  createFirebase(actor: Actor) {
    return this.http.post(`${environment.backEnd}/actors.json`,
      JSON.stringify({ firstname: actor.firstname, lastname: actor.lastname }))
      .map(result => result.json())
      .map(result => ({ ...actor, id: result.name }));
  }

  retrieveLocal(): Observable<Actor[]> {
    return this.http.get(`${environment.backEnd}/actors`)
      .delay(1000)
      .map(actors => actors.json())
      .map(actors => actors.map(actor => ({ ...actor, fullname: this.getFullname(actor) })));
  }

  retrieveFirebase(): Observable<Actor[]> {
    return this.http.get(`${environment.backEnd}/actors.json`)
      // .delay(1000)
      .map(actors => actors.json())
      .map(actors => {
        const actorsArray = [];

        for (const key in actors) {
          if (actors.hasOwnProperty(key)) {
            actorsArray.push(<Actor>{ id: key, firstname: actors[key].firstname, lastname: actors[key].lastname });
          }
        }

        return actorsArray;
      })
      .map(actors => actors.map(actor => ({ ...actor, fullname: this.getFullname(actor) })));
  }

  updateLocal(actor: Actor) {
    return this.http.put(`${environment.backEnd}/actors/${actor.id}`, { firstname: actor.firstname, lastname: actor.lastname });
  }

  updateFirebase(actor: Actor) {
    return this.http.patch(`${environment.backEnd}/actors/${actor.id}.json`,
      JSON.stringify({ firstname: actor.firstname, lastname: actor.lastname }));
  }

  deleteLocal(id: string) {
    return this.http.delete(`${environment.backEnd}/actors/${id}`);
  }

  deleteFirebase(id: string) {
    return this.http.delete(`${environment.backEnd}/actors/${id}.json`);
  }

  private getFullname(actor: Actor) {
    return actor.lastname + ' ' + actor.firstname;
  }
}
