import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INVENTORY_PRODUCTS } from '../shared/constant/item-product';
import { SharedDataService } from '../shared/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrl = 'server-api';
  inventory_products:any = INVENTORY_PRODUCTS;

  constructor(private http: HttpClient, private sharedService: SharedDataService){

      this.sharedService.sharedData.subscribe((sharedObj) => {
        this.inventory_products = sharedObj;
      });
  }

  
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

  getInventoryList(key?: any): Observable<any> {
    if (key) {
      const product = this.inventory_products.filter((product:any) => {
        if (product.name.includes(key)) {
          return product;
        } else if (product.description.includes(key)) {
          return product;
        }
      });
      return of(product);
    } else {
      return of(this.inventory_products);
    }
  }

  addInventoryItem(obj?: any): Observable<any> {
    let newObj = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      ...obj
    }
    this.inventory_products.unshift(newObj);
    this.sharedService.changeSharedData(this.inventory_products);
    return of(this.inventory_products);
  }

  editInventoryItem(obj?: any): Observable<any> {
    let newObj  = this.inventory_products.map((product:any) => {
      if (product.id === obj.id) {
        product = obj;
      } 
      return product;
    });
    this.inventory_products = newObj;
    this.sharedService.changeSharedData(newObj);
    return of(this.inventory_products);
  }

  deleteInventoryItem(obj?: any): Observable<any> {
    this.inventory_products.forEach((product:any, ind:any) => {
      if (product.id === obj.id) {
        product = obj;
        this.inventory_products.splice(ind,1);
      }
    });
    // this.inventory_products = newObj;
    this.sharedService.changeSharedData(this.inventory_products);
    return of(this.inventory_products);
  }

}
