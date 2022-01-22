import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INVENTORY_PRODUCTS } from '../shared/constant/item-product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient){ }
  baseUrl = 'server-api';

  // getInventoryList(obj: any): Observable<any> {
  //   let param = new HttpParams();
  //   for(const key in obj) {
  //     if (key && obj[key] != null) {
  //       param = param.append(key, obj[key])
  //     }
  //   }
  //   return this.http.get<any>(this.baseUrl, { params: param });
  // }
  getInventoryDetails(url: any): Observable<any> {
    // let param = new HttpParams();
    // for(const key in obj) {
    //   if (key && obj[key] != null) {
    //     param = param.append(key, obj[key])
    //   }
    // }
    return this.http.get<any>(url);
  }

  getInventoryList(obj?: any): Observable<any> {
    if (obj.id) {
      const product = INVENTORY_PRODUCTS.find(product => product.id === obj.id);
      return of(product);
    } else {
      return of(INVENTORY_PRODUCTS);
    }
 }
}
