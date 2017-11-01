import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Post } from '../models/post.model';
import * as PostActions from '../actions/post.actions';


interface AppState {
  message: string;
  post: Post;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  message$: Observable<string>;
  post: Observable<Post>;
  text: string;

  constructor(private store: Store<AppState>) {
    this.message$ = store.select('message');
    this.post = this.store.select('post');
  }

  spanishMessage() {
    this.store.dispatch({ type: 'SPANISH' });
  }

  frenchMessage() {
    this.store.dispatch({ type: 'FRENCH' });
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text));
  }

  reset() {
    this.store.dispatch(new PostActions.Reset());
  }

  upVote() {
    this.store.dispatch(new PostActions.Upvote());
  }

  downVote() {
    this.store.dispatch(new PostActions.Downvote());
  }
}
