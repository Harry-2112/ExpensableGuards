import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent implements OnInit {
  constructor(private categoriasSvc: CategoriasService) {}
  arrTransaciones: any[] = []; //Este es el array
  categorias: any = [];
  transacciones: any[] = [];
  ngOnInit(): any {
    //Aca recibo las categorias de la api
    this.categoriasSvc.get().subscribe((data) => {
      //paso la data obtenida a un array categorias
      this.categorias = data;
      //foreacj de categorias
      this.categorias.forEach((e: any) => {
        //creo un objeto
        let objTransaction: any = {
          name: e.name,
          icon: e.icon,
          transaction: e.transactions,
        };
        //empujo el objeto creado
        this.arrTransaciones.push(objTransaction);
      });
      this.arrTransaciones.forEach((e: any) => {
        e.transaction.forEach((transaccion: any) => {
          transaccion.name = e.name;
          transaccion.icon = e.icon;
        });
      });
      this.arrTransaciones.forEach((e: any) => {
        e.transaction.forEach((x: any) => {
          this.transacciones.push(x);
        });
      });
      console.log(this.transacciones);
    });
  }
  log() {}
}
