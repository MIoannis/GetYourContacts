import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { take, tap } from 'rxjs/operators';

interface Auth {
  accounts: {
    elisa: {
      login: string,
      password: string
    }
  };
}

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore, private http: HttpClient) {
  }

  get(l, p) {
    this.http.get<Auth>('https://my-json-server.typicode.com/MIoannis/PersonalAccount/db')
      .pipe(take(1), tap(data => {
        if (data.accounts.elisa.login === l && data.accounts.elisa.password === p) {
          this.sessionStore.update({isAuth: true});
        }
      })).subscribe();
  }
}
