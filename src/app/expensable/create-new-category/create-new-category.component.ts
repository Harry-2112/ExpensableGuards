import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrls: ['./create-new-category.component.css'],
})
export class CreateNewCategoryComponent {
  colors = [
    'danger',
    'warning',
    'success',
    'info',
    'primary',
    'secondary',
    'success opacity-75',
    'danger opacity-75',
  ];
  icons = [
    'fa fa-bank',
    'fa fa-shopping-cart',
    'fa-solid fa-notes-medical',
    'fa fa-gamepad',
    'fa fa-book',
    'fa fa-graduation-cap',
    'fa fa-car',
    'fa fa-gift',
  ];

  category = {
    id: 0,
    name: '',
    amount: 0,
    type: '',
    color: '',
    icon: '',
  };

  @Output() newcategoryevent = new EventEmitter<string>();

  onSubmit(form: NgForm): void {
    this.newcategoryevent.emit(String(JSON.stringify(this.category)));
  }
  select_color(item: string) {
    this.category.color = item;
  }
  select_icon(item: string) {
    this.category.icon = item;
  }
}
