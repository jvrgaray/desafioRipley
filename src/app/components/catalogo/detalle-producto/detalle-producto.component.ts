import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductoInterface } from 'src/app/models/producto-interface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductoInterface,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getUrlImage(producto) {
    return(this.domSanitizer.bypassSecurityTrustStyle(`url(${producto.fullImage}`));
  }
}
