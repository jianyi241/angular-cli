import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from '../../common/layout/layout.component';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit-group/edit-group.component';

const routes: Routes = [
  {
    path: 'supplier',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/supplier'
      },
      {
        path: '',
        component: ComparisonToolComponent,
      },
      {
        path: 'edit-group',
        component: EditGroupComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
