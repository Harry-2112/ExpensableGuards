import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  constructor(private categoriasSvc: CategoriasService) {}
  categories!: any;
  modal = false;
  abrirModal() {
    this.modal ? (this.modal = false) : (this.modal = true);
  }

  ngOnInit(): void {
    this.categoriasSvc.get().subscribe((data) => {
      this.categories = data;
      this.categories.forEach((e: any) => {
        e.amount = 0;
        e.transactions.forEach((iten: any) => {
          e.amount += parseInt(iten.amount);
        });
        if (e.transaction_type != 'income') {
          e.amount = e.amount * -1;
        }
        this.total = this.total + e.amount;
      });
      console.log(this.categories);
    });
  }
  total = 0;

  newcategory(category: string) {
    this.categories.push(JSON.parse(category));
  }

  catego = [
    {
      id: 1,
      name: 'Rent',
      amount: 500,
      type: 'expense',
      color: 'secondary=green',
      icon: 'fa fa-bank',
    },
    {
      id: 2,
      name: 'Groceries',
      amount: 100,
      type: 'expense',
      color: 'info="blue',
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
}
