import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Contact } from '../contact.interface';

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact.page',
  templateUrl: './contact.page.component.html',
  styleUrls: ['./contact.page.component.scss']
})
export class ContactPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public searchForm = new FormControl();
  public filterSub$: Subscription;

  value = '';

  contactList: Contact[] = [];
  filteredList: Contact[] = [];
  faPlus = faPlus;
  faTrash = faTrash;

  constructor() { }

  ngAfterViewInit(): void {
    this.filterSub$ = this.searchForm.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filteredList = this._filter(value))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.filterSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.contactList.push({fullName: ''});
    this.filteredList = this.contactList;
  }

  _filter(value: string): Contact[] {
    const filterValue = value.toLowerCase();
    return this.contactList.filter((item: Contact) => item.fullName.toLowerCase().includes(filterValue));
  }

  onSubmit(f: NgForm, i) {
    this.contactList[i] = {fullName: f.value.fullName, phone: f.value.phone, post: f.value.dol, email: f.value.email};
  }

  addContact() {
    this.filteredList.push({fullName: ''});
  }

  deleteContact(i) {
    this.filteredList.splice(i, 1);
  }
}
