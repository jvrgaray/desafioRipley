import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ProductoInterface } from '../../models/producto-interface';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { retryWhen } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  constructor(
    private dataApiService: DataApiService,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  public productos: ProductoInterface;

  ngOnInit() {
    this.getProducts();
  }

  /* obtiene los productos invocando al service que solicita data a backend
  se agrega reintento trasparente para usuario con un intervalo de 5000 */
  getProducts() {
    this.dataApiService.getAllProducts().pipe(retryWhen (_ => {
      return interval(5000)
    }))
      .subscribe((productos: ProductoInterface) => {
        this.productos = productos;
        console.log(productos);
      });
  }

  getUrlImage(producto) {
    return(this.domSanitizer.bypassSecurityTrustStyle(`url(${producto.fullImage}`));
  }

  verDetalle(producto) {
    this.dialog.open(DetalleProductoComponent, {
      data: producto,
      width: '1000px'
    });
  }
}
