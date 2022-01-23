import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventoryList: any = [];
  newItem = {};
  activeItem = {
    name: '',
    price: '',
    description: '',
  };
  currentCard: any;
  currentIndex = -1;
  searchKey: any = null;
  ability: any = null;

  page = 1;
  itemsPerPage: any = 20;
  pageSizes = [10, 20, 50];
  totalItems = 0;

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private service: InventoryService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private modalService: NgbModal,
    private sharedService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.getInventoryList();
  }

  getRequestParams(searchKey: any, page: number, itemsPerPage: number): any {
    let params: any = {};

    if (searchKey) {
      params['name'] = searchKey;
      params['ability'] = searchKey;
    }
    if (page) {
      params['offset'] = page - 1;
    }
    if (itemsPerPage) {
      params['limit'] = itemsPerPage;
    }

    return params;
  }

  getInventoryList(searchKey?:any) {
    const reqParams = this.getRequestParams(
      this.searchKey,
      this.page,
      this.itemsPerPage
    );
    this.spinner.show();
    this.service.getInventoryList(searchKey).subscribe(
      (response) => {
        this.inventoryList = response;
        this.totalItems = response.length;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
  openPopup(content: any, item?: any) {
    this.activeItem = item
      ? JSON.parse(JSON.stringify(item))
      : { name: '', price: '', description: '' };
    this.modalService.open(content, { centered: true });
  }

  addInventoryItem(item: any) {
    this.spinner.show();
    this.service.addInventoryItem(item.value).subscribe(
      (response) => {
        this.inventoryList = response;
        this.totalItems = response.length;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  editInventoryItem() {
    this.spinner.show();
    this.service.editInventoryItem(this.activeItem).subscribe(
      (response) => {
        this.inventoryList = response;
        this.totalItems = response.length;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  deleteInventoryItem() {
    this.spinner.show();
    this.service.deleteInventoryItem(this.activeItem).subscribe(
      (response) => {
        this.inventoryList = response;
        this.totalItems = response.length;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
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

  detailsOfProduct(item: any, ind: any) {
  }

  ngOnDestroy(): void {}
}
