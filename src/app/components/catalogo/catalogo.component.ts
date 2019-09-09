import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ProductoInterface } from '../../models/producto-interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  constructor(
    private dataApiService: DataApiService
  ) { }

  private productos: ProductoInterface;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.dataApiService.getAllProducts('1')
    .subscribe((productos: ProductoInterface) => (this.productos = productos));
  }

}
