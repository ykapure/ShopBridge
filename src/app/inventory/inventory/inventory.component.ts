import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  inventoryList: any = [];
  newItem = {};
  editItem = {
    name : '',
    price : '',
    description : ''
  };
  currentCard: any;
  currentIndex = -1;
  searchKey: any = null;
  ability: any = null;
  
  page = 1; 
  itemsPerPage: any = 20;
  pageSizes = [10, 20, 50];
  totalItems = 0;

  constructor(
    private service: InventoryService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private modalService: NgbModal,
    private sharedService: SharedDataService) { 
  }

  ngOnInit(): void {
    this.getInventoryList();
  }

  getRequestParams(searchKey: any, page: number, itemsPerPage: number): any {
    let params: any = {};

    if (searchKey) {
      params['name'] = searchKey;
      params['ability'] = searchKey;
    }
    if (page) { params['offset'] = page - 1; }
    if (itemsPerPage) { params['limit'] = itemsPerPage; }

    return params;
  }

  getInventoryList() {
    const reqParams = this.getRequestParams(this.searchKey, this.page, this.itemsPerPage);
    this.spinner.show();
    this.service.getInventoryList(reqParams).subscribe((response) => {
      this.inventoryList = response;
      this.totalItems = response.length;
      this.spinner.hide();
    },
    (error) => {
      console.log(error);
      this.spinner.hide();
    });;
  }
  openPopup(content:any, item?: any) {
    this.editItem = JSON.parse(JSON.stringify(item));
    this.modalService.open(content, { centered: true });
  }

  addInventoryItem(item:any) {
    this.spinner.show();
    this.service.addInventoryItem(item.value).subscribe((response) => {
      this.inventoryList = response;
      this.totalItems = response.length;
      this.spinner.hide();
    },
    (error) => {
      console.log(error);
      this.spinner.hide();
    });;
  }

  editInventoryItem() {
    this.spinner.show();
    this.service.editInventoryItem(this.editItem).subscribe((response) => {
      this.inventoryList = response;
      this.totalItems = response.length;
      this.spinner.hide();
    },
    (error) => {
      console.log(error);
      this.spinner.hide();
    });
    this.getInventoryList()
  }

  pageChange(page: any): void {
    this.page = page;
    this.getInventoryList();
  }

  itemsPerPageChange(event: any): void {
    this.itemsPerPage = event.target.value;
    this.page = 1;
    this.getInventoryList();
  }

  setActiveCard(poke: any, ind: any) {
    console.log(poke);
    console.log(ind);
    const obj = {
      searchKey: this.searchKey,
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      activeInventory: poke,
      activeInventoryIndex: ind
    }
    // this.spinner.show();
    // this.sharedService.changeSharedData(obj);
    // this.route.navigateByUrl('/details');
    // this.route.navigate(['/inventory/details']);
  }

  ngOnDestroy(): void {
  }

}

