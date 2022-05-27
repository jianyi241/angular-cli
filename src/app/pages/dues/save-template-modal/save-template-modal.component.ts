import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../model/constants";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveTemplateTipModalComponent} from "../save-template-tip-modal/save-template-tip-modal.component";
import {ComparisonSaveTemplateInfo} from "../../../model/po/comparisonTemplateInfo";
import {ReviewRepository} from "../../../repository/review-repository";
import {HttpResult} from "../../../model/common/http-result";
import {ToastRepository} from "../../../repository/toast-repository";
import {TemplatePropertyInfo} from "../../../model/po/templatePropertyInfo";
import {SaveService} from "../../../service/save.service";
import {NgxLoadingSpinnerService} from "@k-adam/ngx-loading-spinner";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-save-template-modal',
    templateUrl: './save-template-modal.component.html',
    styleUrls: ['./save-template-modal.component.less']
})
export class SaveTemplateModalComponent implements OnInit {
    config = {...Constants.EDITOR_CONFIG, editorplaceholder: 'Enter notes'};

    public templateInfo = new ComparisonSaveTemplateInfo();
    templateProps: Array<TemplatePropertyInfo> = new Array<TemplatePropertyInfo>();

    constructor(
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private loadingComponent: NgxLoadingSpinnerService,
        private saveService: SaveService,
        private reviewRepository: ReviewRepository,
        private toastRepository: ToastRepository,) {
    }

    ngOnInit(): void {
    }

    dismiss(): void {
        this.activeModal.dismiss();
    }

    saveTemplate(): void {
        if (!this.templateInfo.name) {
            this.toastRepository.showDanger('Name is required.');
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveFeatureTemplate`)) {
            return;
        }
        this.templateInfo.id = '';
        this.templateInfo.templateProperties = this.templateProps;
        this.loadingComponent.show();
        this.reviewRepository.saveFeatureTemplate(this.templateInfo).subscribe((result: HttpResult<ComparisonSaveTemplateInfo>) => {
            this.loadingComponent.hide();
            if (result.statusCode !== 200) {
                if (result.statusCode === 201) {
                    this.saveOverwriteTip();
                    return;
                } else {
                    this.toastRepository.showDanger(result.msg, 'toastTop');
                    return;
                }
            }
            this.dismiss();
            this.toastRepository.showSuccess('Template saved successfully.', 'toastTop');


        })
    }

    saveOverwriteTip(): void {
        const modalRef = this.modalService.open(SaveTemplateTipModalComponent, {
            windowClass: 'tip-popup-template-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Overwrite the existing template?';
        modalRef.componentInstance.info = 'This name already exists. Overwrite existing template?';
        modalRef.componentInstance.btnText = 'Yes, overwrite it';
        modalRef.componentInstance.btnCancelText = 'No, I’ll change template name';
        modalRef.result.then((result) => {
            this.templateInfo.overwrite = true;
            this.saveTemplate();
        }, (reason) => {
        });
    }
}
