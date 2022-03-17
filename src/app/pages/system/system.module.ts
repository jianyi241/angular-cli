import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { ComparisonToolComponent } from './suppliers/comparison-tool/comparison-tool.component';
import { EditGroupComponent } from './suppliers/edit-group/edit-group.component';
import { EditSubGroupComponent } from './suppliers/edit-sub-group/edit-sub-group.component';
import { EditPropComponent } from './suppliers/edit-prop/edit-prop.component';


@NgModule({
  declarations: [ComparisonToolComponent, EditGroupComponent, EditSubGroupComponent, EditPropComponent],
  imports: [
    CommonModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
