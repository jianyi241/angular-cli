import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { ComparisonToolComponent } from './suppliers/comparison-tool/comparison-tool.component';
import { EditGroupComponent } from './suppliers/edit-group/edit-group.component';
import { EditSubGroupComponent } from './suppliers/edit-sub-group/edit-sub-group.component';
import { EditPropComponent } from './suppliers/edit-prop/edit-prop.component';
import { EditDetailComponent } from './suppliers/edit-detail/edit-detail.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { ProductsComponent } from './platforms/products/products.component';
import { FeatureFormComponent } from './suppliers/feature-form/feature-form.component';
import {NgxFileDropModule} from "ngx-file-drop";


@NgModule({
  declarations: [ComparisonToolComponent, EditGroupComponent, EditSubGroupComponent, EditPropComponent, EditDetailComponent, ProductsComponent, FeatureFormComponent],
    imports: [
        CommonModule,
        SystemRoutingModule,
        NgSelectModule,
        CKEditorModule,
        NgxFileDropModule
    ]
})
export class SystemModule { }
