import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit-group/edit-group.component';
import {EditSubGroupComponent} from './suppliers/edit-sub-group/edit-sub-group.component';
import {EditPropComponent} from './suppliers/edit-prop/edit-prop.component';
import {FeatureFormComponent} from "./platforms/feature-form/feature-form.component";
import {ProductsComponent} from "./platforms/products/products.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgxFileDropModule} from "ngx-file-drop";
import {CKEditorModule} from "ckeditor4-angular";


@NgModule({
    declarations: [ComparisonToolComponent, EditGroupComponent, EditSubGroupComponent, EditPropComponent, FeatureFormComponent, ProductsComponent],
    imports: [
        CommonModule,
        SystemRoutingModule,
        NgSelectModule,
        FormsModule,
        NgxFileDropModule,
        CKEditorModule,
    ]
})
export class SystemModule {
}
