import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, NgForm } from '@angular/forms';
import { Contact } from '../contact.interface';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.scss']
})
export class ContactpageComponent implements OnInit, AfterViewInit, OnDestroy {
  public searchForm = new FormControl();
  public filterSub$: Subscription;
  contactlist: Contact[] = [];
  filtredlist: Contact[] = [];
  faPlus = faPlus;
  faTrash = faTrash;

  constructor() { }

  ngAfterViewInit(): void {
    this.filterSub$ = this.searchForm.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filtredlist = this._filter(value))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.filterSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.contactlist.push({fullname: ''});
    this.filtredlist = this.contactlist;
  }

  _filter(value: string): Contact[] {
    const filterValue = value.toLowerCase();
    return this.contactlist.filter((item: Contact) => item.fullname.toLowerCase().includes(filterValue));
  }

  onSubmit(f: NgForm, i) {
    this.contactlist[i] = {fullname: f.value.fullname, phone: f.value.phone, post: f.value.dol, email: f.value.email};
  }

  addContact() {
    this.filtredlist.push({fullname: ''});
  }

  deleteContact(i) {
    this.filtredlist.splice(i, 1);
  }
}
