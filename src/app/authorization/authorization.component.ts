import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from '../Store/session.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {

  constructor(private sessionService: SessionService) { }

  onSubmit(f: NgForm) {
    this.sessionService.get(f.value.login, f.value.password);
  }
}
