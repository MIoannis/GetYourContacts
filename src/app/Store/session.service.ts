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

  get(login, password) {
    this.http.get<Auth>('https://my-json-server.typicode.com/MIoannis/GetYourContacts/db')
      .pipe(take(1), tap(data => {
        if (data.accounts.elisa.login === login && data.accounts.elisa.password === password) {
          this.sessionStore.update({isAuth: true});
        }
      })).subscribe();
  }
}
