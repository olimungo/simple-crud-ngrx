import { MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule as StoreDevtools } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { Actor, Movie } from '../core/models';

export const metaReducers: MetaReducer<{}>[] = !environment.production
  ? [storeFreeze]
  : [];
export const StoreDevtoolsModule = !environment.production
  ? StoreDevtools.instrument({ maxAge: 10 })
  : [];
