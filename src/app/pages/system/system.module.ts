import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { ComparisonToolComponent } from './suppliers/comparison-tool/comparison-tool.component';
import { EditGroupComponent } from './suppliers/edit-group/edit-group.component';


@NgModule({
  declarations: [ComparisonToolComponent, EditGroupComponent],
  imports: [
    CommonModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
