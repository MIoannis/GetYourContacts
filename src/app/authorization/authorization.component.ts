import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from '../Store/session.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  hint = false;

  constructor(private sessionService: SessionService) { }

  onSubmit(form: NgForm) {
    this.sessionService.get(form.value.login, form.value.password);
  }

  showHint() {
    this.hint = true;
  }
}
