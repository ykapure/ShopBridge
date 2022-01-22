import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  // { path: 'details', component: InventoryDetailsComponent }

  // { path: '', component: InventoryListComponent, children: [
  //   { path: 'details', component: InventoryDetailsComponent }
  // ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }