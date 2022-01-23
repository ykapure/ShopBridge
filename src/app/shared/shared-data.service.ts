import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INVENTORY_PRODUCTS } from './constant/item-product';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
;
  private dataShare = new BehaviorSubject(INVENTORY_PRODUCTS);
  sharedData = this.dataShare.asObservable();
  constructor() { }

  changeSharedData(newData: any) {
    this.dataShare.next(newData);
  }
}
