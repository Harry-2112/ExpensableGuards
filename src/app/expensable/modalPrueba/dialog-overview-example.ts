import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from 'src/app/services/categorias.service';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  styleUrls: ['./boton.modal.css'],
})
export class DialogOverviewExample {
  animal!: string;
  name!: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./modal.style.css'],
})
export class DialogOverviewExampleDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private categoriaSrv: CategoriasService,
    private toastr: ToastrService
  ) {}

  colors = [
    'green',
    'teal',
    'orange',
    'blue',
    'yellow',
    'cyan',
    'red',
    'light-blue',
  ];
  itens = ['bank', 'bill', 'cart', 'car', 'bill', 'education', 'game', 'bill'];

  categorias: any[] = [];
  ngOnInit(): void {
    this.categoriaSrv.get().subscribe((data: any) => {
      this.categorias = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(nombre: string, type: string, color: any, icon: any) {
    let colorF = color.childNodes;
    colorF.forEach((e: any) => {
      e.childNodes.forEach((item: any) => {
        if (item.checked == true) {
          const styles = item.style.cssText;
          if (styles == '' || styles == null) {
            colorF = '';
          } else {
            const arr = styles.split(':');
            let arr2 = arr[1];
            colorF = arr2.slice(0, -1);
            colorF = colorF.slice(1);
            return;
          }
        }
      });
    });
    let itemF = icon.childNodes;
    itemF.forEach((e: any) => {
      e.childNodes.forEach((i: any) => {
        i.checked ? (itemF = i.id) : null;
      });
    });
    if (nombre == '' || type == '' || colorF == '' || itemF == '') {
      this.toastr.error('Porfavor complete los datos correctamente', 'Error');
      console.log(nombre, type, colorF, itemF);

      return;
    }
    let modalObj = {
      amount: 0,
      name: nombre,
      transaction_type: type,
      color: colorF,
      icon: itemF,
      id: this.categorias.length + 50,
      transactions: [],
    };
    console.log(modalObj);
    this.categoriaSrv.post(modalObj).subscribe(
      (data) => {
        console.log(data);
        location.reload();
      },
      (err) => {
        this.toastr.error('Porfavor complete los datos correctamente', 'Error');
        console.log(err);
      }
    );
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
