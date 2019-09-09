import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(partNumbers: string) {
    const urlApi = `https://simple.ripley.cl/api/v2/products?partNumbers=${partNumbers}`;
    return (this.http.get(urlApi));
  }
}
