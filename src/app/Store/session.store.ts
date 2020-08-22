import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
   isAuth: boolean;
}

export function createInitialState(): SessionState {
  return {
    isAuth: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}
