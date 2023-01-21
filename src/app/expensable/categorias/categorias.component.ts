import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  ngOnInit(): void {}
  total = 1250;
  categories = [
    {
      id: 1,
      name: 'Rent',
      amount: 500,
      type: 'expense',
      color: 'secondary',
      icon: 'fa fa-bank',
    },
    {
      id: 2,
      name: 'Groceries',
      amount: 100,
      type: 'expense',
      color: 'info',
      icon: 'fa fa-shopping-cart',
    },
    {
      id: 3,
      name: 'Transport',
      amount: 150,
      type: 'expense',
      color: 'warning',
      icon: 'fa fa-car',
    },
    {
      id: 4,
      name: 'Health',
      amount: 200,
      type: 'expense',
      color: 'danger',
      icon: 'fa-solid fa-notes-medical',
    },
    {
      id: 5,
      name: 'Gifts',
      amount: 50,
      type: 'expense',
      color: 'success',
      icon: 'fa fa-gift',
    },
    {
      id: 6,
      name: 'Education',
      amount: 250,
      type: 'expense',
      color: 'primary',
      icon: 'fa fa-book',
    },
  ];
  newcategory(category: string) {
    this.categories.push(JSON.parse(category));
  }
}
